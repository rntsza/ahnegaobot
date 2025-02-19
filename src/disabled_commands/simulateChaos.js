// const Sentry = require("@sentry/node");

// module.exports = {
//   name: "simulatechaos",
//   description: "Simula votos para testar notificações de divine orbs e tumbling wealth",

//   async execute(interaction) {
//     const { processMessage } = require("../services/websiteMonitorService");
    
//     const simulatedMessage = {
//       type: 3,
//       data: {
//         id: 1,
//         divineValue: 11,
//         chaosValue: 150,
//         exaltedValue: 2,
//         negativeValue: 1,
//         note: "t3=tumbling wealth",
//       },
//       date: new Date().toISOString()
//     };

//     try {
//       await interaction.deferReply();
//       await processMessage(simulatedMessage);
//       await interaction.reply("Simulação de votos realizada com sucesso.");
//     } catch (error) {
//       Sentry.captureException(error);
//       console.error("Erro ao simular votos:", error);
//       await interaction.followUp("Erro ao simular votos.");
//     }
//   },
// };
