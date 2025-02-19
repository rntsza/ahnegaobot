require("dotenv").config();
require("../instrument.js");
const express = require("express");
const client = require("./config/discordClient");
const prisma = require("./config/prismaClient");
const CommandService = require("./services/commandService");
const Sentry = require("@sentry/node");
const cron = require("node-cron");
const memeMonitorService = require("./services/memeMonitorService");
const { messageHandler } = require("./services/messageHandlerService");
console.log("1");
const app = express();
const commandService = new CommandService(client);
//const ready = require("./events/ready");
console.log("2");
client.once("ready", async () => {
  console.log(`Logado como ${client.user.tag}`);
  await commandService.registerSlashCommands();
  cron.schedule("0 */6 * * *", async () => {
    console.log("Executando memeMonitorService...");
    await memeMonitorService(client);
  });
  //await ready(client);
});
console.log("3");
client.on("interactionCreate", (interaction) => commandService.executeCommand(interaction));
client.on("messageCreate", messageHandler);
console.log("4");
client.login(process.env.DISCORD_TOKEN);
console.log("5");
app.get("/", (req, res) => res.send("Bot do Discord está ativo e funcionando!"));
app.get("/status", async (req, res) => res.json({ status: "Bot está ativo", totalPosts: await prisma.postedMeme.count() }));
app.get("/posted-memes", async (req, res) => res.json(await prisma.postedMeme.findMany()));
console.log("6");
app.get("/check-memes-now", async (req, res) => {
  try {
    await memeMonitorService(client);
    res.json({ message: "Monitoramento de memes acionado com sucesso." });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Erro ao acionar o monitoramento de memes:", error);
    res.status(500).json({ error: "Erro ao acionar o monitoramento de memes." });
  }
});
console.log("7");
app.listen(process.env.PORT || 10000, () => console.log(`Servidor web iniciado na porta ${process.env.PORT || 3000}`));