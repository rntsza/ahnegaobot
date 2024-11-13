const { loadPostedMemes, savePostedMeme } = require("../services/dbService");
const fetchMemeContent = require("../services/memeService");
const Parser = require("rss-parser");
const { EmbedBuilder } = require('discord.js');

async function checkFeed(client) {
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  if (!channel) return;
  const parser = new Parser();
  const postedMemes = await loadPostedMemes();
  const feed = await parser.parseURL(process.env.RSS_FEED_URL);

  for (let entry of feed.items.reverse()) {
    const uniqueId = entry.guid || entry.link;
    if (!postedMemes.some((meme) => meme.guid === uniqueId)) {
      const memeContent = await fetchMemeContent(entry.link);
      if (memeContent) {
        const embed = new EmbedBuilder().setTitle(memeContent.title).setURL(entry.link).setFooter({ text: "Ah Negão!" });
        await channel.send({ embeds: [embed] });
        await savePostedMeme(uniqueId, entry.link);
      }
    }
  }
}

module.exports = checkFeed;
