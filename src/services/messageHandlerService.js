const { processPoBLink } = require("./pobMonitorService");

const messageHandler = async (message) => {
  if (message.author.bot) return;

  console.log(`📩 Mensagem recebida: "${message.content}" no canal ${message.channel.id}`);

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message.content.match(urlRegex);

  if (urls) {
    for (const url of urls) {
      if (url.includes("https://pobb.in/")) {
        console.log(`🔍 Link do pobb.in detectado: ${url}`);
        await processPoBLink(message, url);
      }
    }
  }
};

module.exports = { messageHandler };
