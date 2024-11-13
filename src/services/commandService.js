const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

class CommandService {
  constructor(client) {
    this.client = client;
    this.commands = new Map();
    this.loadCommands();
  }

  loadCommands() {
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if (command.name) {
        this.commands.set(command.name, command);
        console.log(`Comando carregado: ${command.name}`);
      } else {
        console.warn(`Arquivo de comando ${file} não exporta um comando válido.`);
      }
    }
  }

  async registerSlashCommands() {
    const commandsData = Array.from(this.commands.values()).map(command => ({
      name: command.name,
      description: command.description,
    }));

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
    
    try {
      console.log("Registrando slash commands no Discord...");

      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commandsData }
      );

      console.log("Slash commands registrados no Discord com sucesso.");
    } catch (error) {
      console.error("Erro ao registrar slash commands:", error);
    }
  }

  async executeCommand(interaction) {
    if (!interaction.isCommand()) return;

    const command = this.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply("Comando não encontrado.");
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Erro ao executar o comando ${interaction.commandName}:`, error);
      await interaction.reply("Houve um erro ao executar esse comando!");
    }
  }
}

module.exports = CommandService;
