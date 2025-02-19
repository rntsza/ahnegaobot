const Sentry = require("@sentry/node");

module.exports = async (interaction) => {
  console.log(`Entrei no interactionCreate.js`);
  if (!interaction.isCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    Sentry.captureException(error);
    console.error("Erro ao executar comando:", error);
  }
};