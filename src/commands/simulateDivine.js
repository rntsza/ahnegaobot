const Sentry = require("@sentry/node");

module.exports = {
  name: "simulatedivine",
  description: "Simula um evento de 20 Divine Orbs para testes",

  async execute(interaction) {
    const { processMessage } = require("../services/websiteMonitorService");

    const simulatedMessage = {
      type: 3,
      data: {
        id: 1,
        divineValue: 41,
        chaosValue: 5,
        exaltedValue: 2,
        negativeValue: 1,
        note: "Simulação de Divine Orbs"
      },
      date: new Date().toISOString()
    };

    try {
      await interaction.deferReply();
      await processMessage(simulatedMessage);
      await interaction.followUp("Simulação de evento de Divine Orbs enviada com sucesso.");
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro ao simular evento de Divine Orbs:", error);
      await interaction.followUp("Houve um erro ao simular o evento de Divine Orbs.");
    }
  }
};
