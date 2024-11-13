module.exports = {
  name: "ping",
  description: "Responde com Pong!",
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
