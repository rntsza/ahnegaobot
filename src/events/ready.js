const { loadPostedMemes } = require("../services/dbService");
const checkFeed = require("../utils/checkFeed");
const monitorWebSocket = require("../services/websiteMonitorService");

module.exports = async (client) => {
  await loadPostedMemes();
  console.log(`Logado como ${client.user.tag}`);
  setInterval(() => checkFeed(client), process.env.LOOP_INTERVAL || 1000);
  monitorWebSocket();
};