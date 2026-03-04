require("dotenv").config();
require("../instrument.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Servidor web iniciado em ${HOST}:${PORT}`));

const client = require("./config/discordClient");
const prisma = require("./config/prismaClient");
const CommandService = require("./services/commandService");
const Sentry = require("@sentry/node");
const cron = require("node-cron");
const memeMonitorService = require("./services/memeMonitorService");
const { messageHandler } = require("./services/messageHandlerService");

const commandService = new CommandService(client);

client.once("ready", async () => {
  console.log(`Logado como ${client.user.tag}`);
  await commandService.registerSlashCommands();
  cron.schedule("0 */6 * * *", async () => {
    console.log("Executando memeMonitorService...");
    await memeMonitorService(client);
  });
});


client.on("interactionCreate", (interaction) => commandService.executeCommand(interaction));
client.on("messageCreate", messageHandler);

if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  console.warn("DISCORD_TOKEN não definido. Bot Discord não será conectado.");
}

app.get("/", (req, res) => res.send("Bot do Discord está ativo e funcionando!"));
app.get("/healthz", (req, res) => res.status(200).json({ ok: true }));
app.get("/status", async (req, res) => {
  try {
    const totalPosts = await prisma.postedMeme.count();
    res.json({ status: "Bot está ativo", totalPosts });
  } catch (error) {
    Sentry.captureException(error);
    res.status(200).json({
      status: "Bot está ativo (DB indisponível)",
      totalPosts: null,
      dbHealthy: false,
    });
  }
});
app.get("/posted-memes", async (req, res) => res.json(await prisma.postedMeme.findMany()));

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
