require('dotenv').config();

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const parser = new Parser();

const client = new Discord.Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });
const blockGif = 'ajax-loader.gif';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const RSS_FEED_URL = process.env.RSS_FEED_URL;
const LOOP_INTERVAL = parseInt(process.env.LOOP_INTERVAL, 10) || 600000;
const PORT = process.env.PORT || 3000;

let lastPostDate = null;
const postedLinks = new Set();

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
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkFeed() {
    const feed = await parser.parseURL(RSS_FEED_URL);

    for (let entry of feed.items.reverse()) {
        const postDate = new Date(entry.pubDate);
        
        if ((!lastPostDate || postDate > lastPostDate) && !postedLinks.has(entry.link)) {
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
                            await delay(30000);
                        }
                    } else if (memeContent.imageUrls.length > 0) {
                        await channel.send({ embeds: [embed] });
                        for (const imageUrl of memeContent.imageUrls) {
                            await channel.send({ content: imageUrl });
                            await delay(10000);
                        }
                    }

                    postedLinks.add(entry.link);
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

client.once('ready', () => {
    console.log(`Logado como ${client.user.tag}`);
    setInterval(checkFeed, LOOP_INTERVAL);
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
        totalPosts: postedLinks.size
    });
});

app.listen(PORT, () => {
    console.log(`Servidor web iniciado na porta ${PORT}`);
});