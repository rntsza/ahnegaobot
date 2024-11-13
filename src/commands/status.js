const { EmbedBuilder } = require("discord.js");
const prisma = require("../config/prismaClient");

module.exports = {
  name: "status",
  description: "Mostra o status atual do bot",
  async execute(interaction) {
    await interaction.deferReply();
    
    const totalPosts = await prisma.postedMeme.count();
    const statusEmbed = new EmbedBuilder()
      .setTitle("Status do Bot")
      .addFields(
        { name: "Última verificação do feed", value: new Date().toLocaleString(), inline: true },
        { name: "Total de postagens enviadas", value: `${totalPosts}`, inline: true }
      )
      .setFooter({ text: "Bot do Ah Negão!" })
      .setTimestamp();

    await interaction.reply({ embeds: [statusEmbed] });
  },
};