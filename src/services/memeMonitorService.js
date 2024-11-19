const Parser = require("rss-parser");
const prisma = require("../config/prismaClient");
const fetchMemeContent = require("./fetchMemeContent");
const { EmbedBuilder } = require("discord.js");
const Sentry = require("@sentry/node");

const parser = new Parser();

async function memeMonitorService(client) {
  try {
    const feed = await parser.parseURL(process.env.RSS_FEED_URL);
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    if (!channel) {
      console.error("Canal do Discord não encontrado. Verifique o CHANNEL_ID.");
      return;
    }

    for (const entry of feed.items.reverse()) {
      const uniqueId = entry.guid || entry.link;

      const exists = await prisma.postedMeme.findUnique({ where: { guid: uniqueId } });
      if (exists) continue;

      console.log("Novo meme encontrado:", entry.link);

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
          }
        } else if (memeContent.imageUrls.length > 0) {
          await channel.send({ embeds: [embed] });
          for (const imageUrl of memeContent.imageUrls) {
            await channel.send({ content: imageUrl });
          }
        }

        await prisma.postedMeme.create({
          data: { guid: uniqueId, link: entry.link, postedAt: new Date() },
        });
      }
    }
  } catch (error) {
    console.error("Erro no monitoramento dos memes:", error);
    Sentry.captureException(error);
  }
}

module.exports = memeMonitorService;
