const monitorWebsite = require("../services/websiteMonitorService");

module.exports = {
  name: "check-site-now",
  description: "Aciona a verificação manual do site.",
  async execute(interaction) {
    try {
      await monitorWebsite();
      await interaction.reply("Verificação do site acionada com sucesso.");
    } catch (error) {
      console.error("Erro ao acionar a verificação do site:", error);
      await interaction.reply("Erro ao acionar a verificação do site.");
    }
  }
};
