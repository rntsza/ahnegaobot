module.exports = {
  name: "simulatedivine",
  description: "Simula votos para testar notificações de divine orbs e tumbling wealth",

  async execute(interaction) {
    const monitorWebSocket = require("../services/websiteMonitorService");
    
    const mockMessage = {
      type: 3,
      data: {
        id: 1,
        divineValue: 124,
        chaosValue: 11,
        exaltedValue: 2,
        negativeValue: 10,
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
