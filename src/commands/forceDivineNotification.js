module.exports = {
  name: "forcedivine",
  description: "Força o envio de uma mensagem de notificação das divine orbs no Discord, permitido somente ao Renato.",

  async execute(interaction) {
    const channel = interaction.client.channels.cache.get(process.env.ID_RENATO);

    if (!channel) {
      await interaction.reply("Canal do Discord não encontrado.");
      return;
    }

    if(!interaction.member.roles.cache.has(process.env.ROLE_ADMIN_ID)) {
      await interaction.reply("Você não tem permissão para executar este comando.");
      return;
    }

    try {
      const divineOrbImageUrl = `${process.env.WEBSITE_URL}DivineOrb.png`;

      await channel.send({
        content: `<@&${process.env.ROLE_TIGRINHO_ID}> Notificação forçada de divine orbs! Mais de 10 divine orbs detectados! 🔥🔥🔥`,
        files: [divineOrbImageUrl],
      });

      await interaction.reply("Notificação de divine orbs enviada com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar notificação de divine orbs:", error);
      await interaction.reply("Ocorreu um erro ao enviar a notificação de divine orbs.");
    }
  },
};
