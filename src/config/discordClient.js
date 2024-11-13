const { Client } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

module.exports = client;