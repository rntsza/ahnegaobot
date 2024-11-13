module.exports = {
  name: "simulatechaos",
  description: "Simula votos para testar notificações de divine orbs e tumbling wealth",

  async execute(interaction) {
    const monitorWebSocket = require("../services/websiteMonitorService");
    
    const mockMessage = {
      type: 3,
      data: {
        id: 1,
        divineValue: 11,
        chaosValue: 150,
        exaltedValue: 2,
        negativeValue: 1,
        note: "t3=tumbling wealth",
      },
    };

    try {
      await monitorWebSocket.processMessage(mockMessage);
      await interaction.reply("Simulação de votos realizada com sucesso.");
    } catch (error) {
      console.error("Erro ao simular votos:", error);
      await interaction.reply("Erro ao simular votos.");
    }
  },
};
