require('dotenv').config();

const Discord = require('discord.js');
const { EmbedBuilder, REST, Routes } = require('discord.js');
const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');
const parser = new Parser();

const client = new Discord.Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });
const blockGif = 'ajax-loader.gif';

//#region environment variables

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const RSS_FEED_URL = process.env.RSS_FEED_URL;
const LOOP_INTERVAL = parseInt(process.env.LOOP_INTERVAL, 10) || 1000;
const PORT = process.env.PORT || 3000;

//#endregion

let lastPostDate = null;
let postedMemes = [];

//#region json file load and save

function loadPostedMemes() {
    if (fs.existsSync('postedMemes.json')) {
        const data = fs.readFileSync('postedMemes.json', 'utf-8');
        try {
            postedMemes = JSON.parse(data) || [];
        } catch (error) {
            console.error("Erro ao carregar postedMemes.json:", error);
            postedMemes = [];
        }
    } else {
        postedMemes = [];
    }
}

function savePostedMemes() {
    fs.writeFileSync('postedMemes.json', JSON.stringify(postedMemes, null, 2));
}

function savePostedMemes() {
    fs.writeFileSync('postedMemes.json', JSON.stringify(postedMemes, null, 2));
}

//#endregion

async function fetchMemeContent(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const title = $('h1').first().text().trim() || "Meme Sem Título";

        const imageUrls = [];
        $('.entry-content img').each((i, element) => {
            const imageUrl = $(element).attr('src');
            if (imageUrl && !imageUrl.includes('/wp-content/themes/') && !imageUrl.includes(blockGif)) {
                imageUrls.push(imageUrl);
            }
        });

        const videoUrls = [];
        $('.rll-youtube-player').each((i, element) => {
            const videoUrl = $(element).attr('data-src');
            if (videoUrl && !videoUrl.includes(blockGif)) videoUrls.push(videoUrl);
        });
        $('iframe').each((i, element) => {
            const videoUrl = $(element).attr('src');
            if (videoUrl && videoUrl.includes("youtube.com") && !videoUrl.includes(blockGif)) videoUrls.push(videoUrl);
        });

        return { title, imageUrls, videoUrls };
    } catch (error) {
        console.error("Erro ao buscar o conteúdo do meme do Ah Negão!, informe o Renato:", error);
        return null;
    }
}

function delay(ms) {
    console.log(`Aguardando ${ms}ms...`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkFeed() {
    const feed = await parser.parseURL(RSS_FEED_URL);

    for (let entry of feed.items.reverse()) {
        const uniqueId = entry.guid || entry.link;

        if (!postedMemes.some(meme => meme.guid === uniqueId)) {
            const channel = client.channels.cache.get(CHANNEL_ID);
            if (channel) {
                const memeContent = await fetchMemeContent(entry.link);

                if (memeContent) {
                    const embed = new EmbedBuilder()
                        .setTitle(memeContent.title)
                        .setURL(entry.link)
                        .setFooter({ text: 'Ah Negão!' });

                    if (memeContent.videoUrls.length > 0) {
                        await channel.send({ embeds: [embed] });
                        for (const videoUrl of memeContent.videoUrls) {
                            await channel.send(`🎥 Assista ao vídeo: ${videoUrl}`);
                            await delay(1000);
                        }
                    } else if (memeContent.imageUrls.length > 0) {
                        await channel.send({ embeds: [embed] });
                        for (const imageUrl of memeContent.imageUrls) {
                            await channel.send({ content: imageUrl });
                            await delay(1000);
                        }
                    }

                    postedMemes.push({ guid: uniqueId, link: entry.link });
                    savePostedMemes();
                } else {
                    await channel.send(`Novo meme: ${entry.title}\n${entry.link}`);
                }
            }
        }
    }

    if (feed.items.length > 0) {
        lastPostDate = new Date(feed.items[0].pubDate);
    }
}

async function registerSlashCommands() {
    const commands = [
        {
            name: 'status',
            description: 'Mostra o status atual do bot'
        }
    ];

    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
    try {
        console.log('Registrando comandos de slash...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('Comandos de slash registrados com sucesso.');
    } catch (error) {
        console.error('Erro ao registrar comandos de slash:', error);
    }
}

client.once('ready', () => {
    console.log(`Logado como ${client.user.tag}`);
    loadPostedMemes();
    registerSlashCommands();
    setInterval(checkFeed, LOOP_INTERVAL);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'status') {
        const statusEmbed = new EmbedBuilder()
            .setTitle("Status do Bot")
            .addFields(
                { name: "Última verificação do feed", value: lastPostDate ? lastPostDate.toLocaleString() : "Ainda não foi verificado", inline: true },
                { name: "Total de postagens enviadas", value: `${postedMemes.length}`, inline: true }
            )
            .setFooter({ text: 'Bot do Ah Negão!' })
            .setTimestamp();

        await interaction.reply({ embeds: [statusEmbed] });
    }
});

client.login(DISCORD_TOKEN);

const app = express();

app.get('/', (req, res) => {
    res.send('Bot do Discord está ativo e funcionando!');
});

app.get('/status', (req, res) => {
    res.json({
        status: 'Bot está ativo',
        lastCheck: lastPostDate,
        totalPosts: postedMemes.length
    });
});

app.get('/posted-memes', (req, res) => {
    res.json(postedMemes);
});

app.listen(PORT, () => {
    console.log(`Servidor web iniciado na porta ${PORT}`);
});