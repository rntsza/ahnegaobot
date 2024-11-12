require("dotenv").config();

const { EmbedBuilder, REST, Routes, Client } = require("discord.js");
const Parser = require("rss-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const parser = new Parser();
const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });
const prisma = new PrismaClient();
const BLOCK_GIF_FILENAME = "ajax-loader.gif";

//#region environment variables

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const RSS_FEED_URL = process.env.RSS_FEED_URL;
const LOOP_INTERVAL = parseInt(process.env.LOOP_INTERVAL, 10) || 1000;
const PORT = process.env.PORT || 3000;

//#endregion

let lastPostDate = null;

//#region Database functions

async function initializeDatabase() {
  await prisma.$connect();
  console.log("Conectado ao banco de dados com Prisma.");
}

async function loadPostedMemes() {
  const memes = await prisma.postedMeme.findMany({
    orderBy: { postedAt: "desc" },
  });
  if (memes.length > 0) {
    lastPostDate = memes[0].postedAt;
  }
  return memes;
}

async function savePostedMeme(guid, link) {
  await prisma.postedMeme.create({
    data: {
      guid,
      link,
    },
  });
}

//#endregion

async function fetchMemeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
        
    const title = $("h1").first().text().trim() || "Meme Sem Título";

    const imageUrls = [];
    $(".entry-content img").each((i, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl && !imageUrl.includes("/wp-content/themes/") && !imageUrl.includes(BLOCK_GIF_FILENAME)) {
        imageUrls.push(imageUrl);
      }
    });

    const videoUrls = [];
    $(".rll-youtube-player").each((i, element) => {
      const videoUrl = $(element).attr("data-src");
      if (videoUrl && !videoUrl.includes(BLOCK_GIF_FILENAME)) videoUrls.push(videoUrl);
    });
    $("iframe").each((i, element) => {
      const videoUrl = $(element).attr("src");
      if (videoUrl && videoUrl.includes("youtube.com") && !videoUrl.includes(BLOCK_GIF_FILENAME)) videoUrls.push(videoUrl);
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
  const postedMemes = await loadPostedMemes();

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
            .setFooter({ text: "Ah Negão!" });

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

          await savePostedMeme(uniqueId, entry.link);
          lastPostDate = new Date(entry.pubDate);
        } else {
          await channel.send(`Novo meme: ${entry.title}\n${entry.link}`);
        }
      }
    }
  }
}

async function clearGlobalCommands() {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  try {
    console.log("Limpando comandos globais antigos...");
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: [] },
    );
    console.log("Comandos globais antigos removidos com sucesso.");
  } catch (error) {
    console.error("Erro ao limpar comandos globais:", error);
  }
}

async function registerSlashCommands() {
  const commands = [
    {
      name: "status",
      description: "Mostra o status atual do bot",
    },
  ];

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  try {
    console.log("Registrando comandos de slash...");
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );
    console.log("Comandos de slash registrados com sucesso.");
  } catch (error) {
    console.error("Erro ao registrar comandos de slash:", error);
  }
}

client.once("ready", async () => {
  console.log(`Logado como ${client.user.tag}`);
  await initializeDatabase();
  await clearGlobalCommands();
  await registerSlashCommands();
  setInterval(checkFeed, LOOP_INTERVAL);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "status") {
    const statusEmbed = new EmbedBuilder()
      .setTitle("Status do Bot")
      .addFields(
        { name: "Última verificação do feed", value: lastPostDate ? lastPostDate.toLocaleString() : "Ainda não foi verificado", inline: true },
        { name: "Total de postagens enviadas", value: `${await prisma.postedMeme.count()}`, inline: true },
      )
      .setFooter({ text: "Bot do Ah Negão!" })
      .setTimestamp();

    await interaction.reply({ embeds: [statusEmbed] });
  }
});

client.login(DISCORD_TOKEN);

const app = express();

app.get("/", (req, res) => {
  res.send("Bot do Discord está ativo e funcionando!");
});

app.get("/status", async (req, res) => {
  res.json({
    status: "Bot está ativo",
    lastCheck: lastPostDate,
    totalPosts: await prisma.postedMeme.count(),
  });
});

app.get("/posted-memes", async (req, res) => {
  const postedMemes = await prisma.postedMeme.findMany();
  res.json(postedMemes);
});

app.listen(PORT, () => {
  console.log(`Servidor web iniciado na porta ${PORT}`);
});