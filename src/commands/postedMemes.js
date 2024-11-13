const prisma = require("../config/prismaClient");

module.exports = {
  name: "postedmemes",
  description: "Lista todos os memes postados.",
  async execute(interaction) {
    const memes = await prisma.postedMeme.findMany();
    if (memes.length === 0) {
      await interaction.reply("Nenhum meme foi postado ainda.");
    } else {
      const memesList = memes.map(meme => meme.link).join("\n");
      await interaction.reply(`Memes postados:\n${memesList}`);
    }
  }
};
