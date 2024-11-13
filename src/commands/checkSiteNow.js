const monitorWebsite = require("../services/websiteMonitorService");
const Sentry = require("@sentry/node");

module.exports = {
  name: "check-site-now",
  description: "Aciona a verificação manual do site.",
  async execute(interaction) {
    await interaction.deferReply();
    
    try {
      await monitorWebsite();
      await interaction.editReply("Verificação do site acionada com sucesso.");
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro ao acionar a verificação do site:", error);
      await interaction.editReply("Erro ao acionar a verificação do site.");
    }
  }
};
