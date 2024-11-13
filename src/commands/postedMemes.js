const prisma = require("../config/prismaClient");

module.exports = {
  name: "postedmemes",
  description: "Lista os três últimos memes postados.",
  async execute(interaction) {
    const memes = await prisma.postedMeme.findMany({
      take: 3,
      orderBy: {
        postedAt: "desc"
      }
    });
    if (memes.length === 0) {
      await interaction.reply("Nenhum meme foi postado ainda.");
    } else {
      const memesList = memes.map(meme => meme.link).join("\n");
      await interaction.reply(`Últimos memes postados:\n${memesList}`);
    }
  }
};
