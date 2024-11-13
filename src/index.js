require("dotenv").config();
const express = require("express");
const client = require("./config/discordClient");
const prisma = require("./config/prismaClient");
const monitorWebsite = require("./services/websiteMonitorService");
const CommandService = require("./services/commandService");
const Sentry = require("@sentry/node");

const app = express();
const commandService = new CommandService(client);

client.once("ready", async () => {
  console.log(`Logado como ${client.user.tag}`);
  await commandService.registerSlashCommands();
});

client.on("interactionCreate", (interaction) => commandService.executeCommand(interaction));

client.login(process.env.DISCORD_TOKEN);

app.get("/", (req, res) => res.send("Bot do Discord está ativo e funcionando!"));
app.get("/status", async (req, res) => res.json({ status: "Bot está ativo", totalPosts: await prisma.postedMeme.count() }));
app.get("/posted-memes", async (req, res) => res.json(await prisma.postedMeme.findMany()));

app.get("/check-site-now", async (req, res) => {
  try {
    await monitorWebsite();
    res.json({ message: "Verificação do site acionada com sucesso." });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Erro ao acionar a verificação do site:", error);
    res.status(500).json({ error: "Erro ao acionar a verificação do site." });
  }
});

app.listen(process.env.PORT || 3000, () => console.log(`Servidor web iniciado na porta ${process.env.PORT || 3000}`));