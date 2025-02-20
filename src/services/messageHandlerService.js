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

  if (message.content == "Toucan" || message.content == "toucan") {
    message.channel.send(`

      ░░░░░░░░▄▄▄▀▀▀▄▄███▄░░░░░░░░░░░░░░
      ░░░░░▄▀▀░░░░░░░▐░▀██▌░░░░░░░░░░░░░
      ░░░▄▀░░░░▄▄███░▌▀▀░▀█░░░░░░░░░░░░░
      ░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌░░░░░░░░░░░░
      ░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄░░░░░░░░░░░
      ░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄░░░░░░
      ░░░░░░░░░░░░░▐░░░░▐███████████▄░░░
      ░░░░░le░░░░░░░▐░░░░▐█████████████▄
      ░░░░toucan░░░░░░▀▄░░░▐█████████████▄ 
      ░░░░░░has░░░░░░░░▀▄▄███████████████ 
      ░░░░░arrived░░░░░░░░░░░░█▀██████░░
      
      `);
  }

  if (message.content == "🦜") {
    message.channel.send(`

      ░░░░░░░░▄▄▄▀▀▀▄▄███▄
      ░░░░░▄▀▀░░░░░░░▐░▀██▌
      ░░░▄▀░░░░▄▄███░▌▀▀░▀█
      ░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌
      ░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄
      ░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄
      

      `);
  }

  if (message.content == "coc" || message.content == "Coc" || message.content == "CoC" || message.content == "COC") {
    message.channel.send(`
͏͏͏͏
      ͏͏͏͏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⢿⣿⣿⠿⠛⠿⣿⣿⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿͏͏͏͏⠟⠉⠄⣀⡤⢤⣤⣈⠁⣠⡔⠶⣾⣿⣿⣿
      ⣿⣿⣿⣿⣿⣿⣿⡿⠛⠋⠁⠄⠄⠄⣼⣿⠁⡀⢹⣿⣷⢹⡇⠄⠎⣿⣿⣿
      ⣿⣿⣿⠿⠛⠉⠁⠄⠄⠄⠄⠄⠄⠄⠹⣇⣀⣡⣾⣿⡿⠉⠛⠒⠒⠋⠉⢸
      ⡿⠋⠁⠄⠄⢀⣤⣤⡀⠄⠄⠄⠄⠄⠄⠈⠙⠛⠛⠉⠄⠄⠄⠄⠄⠄⠄⠈
      ⠄⠄⠄⠄⠄⢹⣧⡈⠿⣷⣄⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣠⢄⣾
      ⠄⠄⠄⠄⠄⠈⠻⢿⣶⣌⣙⡛⠛⠿⠶⠶⠶⠶⠶⠖⣒⣒⣚⣋⡩⢱⣾⣿
      ⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠛⠛⠛⠻⠿⠿⠟⠛⠛⠛⠉⢉⣥⣶⣾⣿⣿⣿
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠒⠶⣿⣿⣿⣿⣿⣿⣿⣿
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿
      ⣿⡿⠛⠛⠛⢻⣿⠿⠛⠛⠛⢿⣿⣿⡿⠛⠛⠛⢻⡟⠛⣿⡿⠛⣻⣿⣿⣿
      ⡟⠄⣼⣿⣿⣿⡇⠄⣾⣿⣧⠄⢻⡏⠄⣼⣿⣿⣿⡇⠄⡟⢀⣴⣿⣿⣿⣿
      ⡇⠄⣿⣿⣿⣿⡄⠄⣿⣿⣿⠄⢸⡇⠄⣿⣿⣿⣿⡇⠄⣀⠈⢻⣿⣿⣿⣿
      ⣿⣄⠈⠙⠛⢻⣧⡄⠙⠛⠉⣠⣿⣷⣄⠈⠙⠛⢹⡇⠄⣿⣧⠄⠻⣿⣿⣿
      `);
  }

  if (message.content == "morbin") {
    message.channel.send(`
      ⠀⠀⢰⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⢀⣀⠀⠀⠀⣀⡀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⣿⠀⠀⠀⠀⣾⠟⠉⠉⢻⣧⠈⣿⣇⠀⢠⡿⠀⢸⡏⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⣿⠀⠀⠀⠸⣿⠀⠀⠀⢸⣿⠀⠘⣿⣀⣾⠇⠀⢸⡿⠛⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⣿⣤⣤⣤⠀⠻⣷⣤⣤⡾⠏⠀⠀⠹⣿⡟⠀⠀⢸⣷⣤⣤⣤⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⣿⡇⠀⢸⣿⣿⠀⣠⡾⠿⠿⢷⣄⠀⣿⡿⠿⠿⣷⡄⠀⣿⠿⠿⢿⣦⠀⢸⣿⠀⣿⡇⠀⠀⣿⡇⠀⣶⠿⠿⣷⡄⠀⠀⠀⠀⠀
⠀⠀⢸⡿⣿⡀⣾⢸⣿⢠⣿⡇⠀⠀⢘⣿⡄⣿⣧⣤⣤⡾⠃⠀⣿⣦⣤⣾⣟⠀⢸⣿⠀⣿⡇⠀⠀⣿⡇⠀⠻⣷⣦⣤⡀⠀⠀⠀⠀⠀
⠀⠀⢸⡇⢹⣷⡇⢸⣿⠀⢿⣇⣀⣀⣸⡿⠀⣿⡇⠈⠻⣷⡀⠀⣿⣀⣀⣀⣿⡇⢸⣿⠀⢿⣇⡀⣀⣿⠀⠰⣦⣀⢀⣹⡗⠀⠀⠀⠀⠀
⠀⠀⠘⠃⠈⠛⠁⠘⠛⠀⠀⠙⠛⠛⠋⠀⠀⠙⠃⠀⠀⠙⠓⠀⠛⠛⠛⠛⠋⠀⠘⠛⠀⠈⠙⠛⠛⠋⠀⠀⠉⠛⠛⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣤⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣠⡴⠾⠃⠘⠛⢀⡿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠛⠿⣦⣄⡀⢀⣀⠉⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠉⠁⠈⠻⠶⠿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`);
  }

  if (message.content == "morbin time") {
    message.channel.send(`
      
͏͏͏͏
      ͏͏͏͏
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⣿⣿⣿⣎⣿⣹⢋⣴⣿⣿⣿⣿⣿⡇⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⠁⠄⠄⠄       
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄ 🔴 ⠄⠄⠂⠈⠛⣿⣿⠿⠿⠋⠉⠁⠄⠙⠛⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⢠⣦⣤⣤⣴⣶⡤⠤⣶⣾⣿⣤⣄⡀ 🔴 ⣛⡁⠠⣾⡀⠄⠄ 
      ⠄⠄⠄⠄⠄⢰⣿⣿⣿⣿⣿⢿⠄⢀⢼⣿⣿⣿⣿⣿⣾⣋⣁⣸⣿⠃⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠍⣿⣿⠟⠁⠐⠄⠃⢸⣿⢋⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⡾⠋⠄⠄⠄⠄⠈⣴⣷⠿⣿⠿⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠁⠄⠄⠄⠄⠄⠄⠄⠄⣀⠄⠄⢸⣿⣿⡿⠁⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⡆⡄⣬⣣⢿⣾⣶⠄⣿⣿⡿⠁⠄⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠋⠁⡟⣻⠻⣿⠇⠄⣿⠻⠁⠄⠄⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢰⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡀⠄⠄⠄⠄⢀⡝⢀⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠱⢠⣀⡀⣤⡾⢁⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

      `);
  }

  if (message.content == "é um lixo") {
    message.reply(`
⠀⠀⠘⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀
⠀⠀⠀⠑⡀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⠁⠀⠀⠀
⠀⠀⠀⠀⠈⠢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⠊⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢀⣀⣀⣀⣀⣀⡀⠤⠄⠒⠈⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⣀⠄⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠔⠒⠒⠒⠒⠒⠢⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡰⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢄⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠙⠄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⢠⠂⠀⠀⠘⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠈⢤⡀⢂⠀⢨⠀⢀⡠⠈⢣⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⢀⡖⠒⠶⠤⠭⢽⣟⣗⠲⠖⠺⣖⣴⣆⡤⠤⠤⠼⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⡈⠃⠀⠀⠀⠘⣺⡟⢻⠻⡆⠀⡏⠀⡸⣿⢿⢞⠄⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢣⡀⠤⡀⡀⡔⠉⣏⡿⠛⠓⠊⠁⠀⢎⠛⡗⡗⢳⡏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢱⠀⠨⡇⠃⠀⢻⠁⡔⢡⠒⢀⠀⠀⡅⢹⣿⢨⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠀⠠⢼⠀⠀⡎⡜⠒⢀⠭⡖⡤⢭⣱⢸⢙⠆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡸⠀⠀⠸⢁⡀⠿⠈⠂⣿⣿⣿⣿⣿⡏⡍⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⠇⠀⠀⠀⠀⠸⢢⣫⢀⠘⣿⣿⡿⠏⣼⡏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣠⠊⠀⣀⠎⠁⠀⠀⠀⠙⠳⢴⡦⡴⢶⣞⣁⣀⣀⡀⠀⠀⠀⠀⠀
⠀⠐⠒⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⢀⠤⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀
  `);
  }

  if (message.content == "build chinesa") {
    message.reply(`
͏      ͏͏͏͏
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣴⣶⣶⣶⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
       ⠀⠀⠀⠀⠀⠀⣀⣴⣾⡿⢟⡹⢩⡝⣹⢻⡿⣿⣿⣿⣷⣦⣄⠀⠀⠀⠀⠀⠀ 
       ⠀⠀⠀⠀⠀⣼⣿⣿⠏⠐⠂⠌⠱⡸⢥⡻⡼⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠸⣿⣿⡏⠠⠁⠀⢦⠀⠑⢪⢵⣻⣽⣿⣿⣿⣿⣿⣿⠂⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠻⡿⡼⠟⣻⣿⠦⢵⣿⢿⣿⣿⣾⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠀⡗⠴⣛⣿⡿⠳⢨⣿⡻⣛⣿⡿⢿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠀⡇⡀⠂⠉⣤⠆⢲⣿⡍⢣⢍⣘⣿⣿⣿⡿⡇⠀⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠀⣗⡘⣤⡿⠳⡿⣿⣿⣿⣆⡜⣮⣷⣿⣿⣷⡇⠀⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠀⢸⢴⢿⣁⣦⣴⣧⣽⣽⣿⣞⣷⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠀⠀⢏⢶⡏⠹⣷⠿⣿⣿⣻⢼⣿⣳⣿⣏⠀⠀⠀⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⠀⠀⠀⠀⠈⣫⣦⡰⢤⣛⢧⣾⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀ 
      ⠀⠀⠀⠀⢀⣀⡤⣔⣾⣹⢿⣻⣿⣿⣿⣿⢿⣯⢿⢞⣽⣿⣿⣶⣄⡀⠀⠀⠀⠀ 
      ⡐⣆⠶⣭⣛⡮⢷⣹⣞⣧⡫⡲⣯⢿⣿⣻⣿⣺⣵⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⣀ 
      ⠹⡬⣓⢧⡹⣝⢯⡽⣞⢶⣻⣽⢪⣿⣫⣵⣿⣿⡿⣿⣿⣿⣿⣿⣿⢿⡟⣟⣯⣛ 
      ⡓⢶⡙⣎⠷⣏⢾⡹⢯⢷⣳⡞⣷⣿⣿⣟⣷⣫⢷⣫⣾⣿⢻⣻⣭⡟⣾⣱⡞⣬.
  `);
  }

  if (message.content.includes("tomando pica")) {
    message.reply(`
  εつ▄█▀█●
  `);
  }

  if (message.content.includes("comunista")) {
    message.reply(`
͏      ͏͏͏͏
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⡿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⠛⡺⣺⣪⣽⣫⣳⡼⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⣿⣿⣿⠋⢻⣰⣿⣿⣿⣿⣿⣿⣿⣷⣟⢾⣽⣿⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⣿⡩⠱⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⠎⢻⡿⣿⣿⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⡿⣭⠂⠀⠀⢸⣿⣿⣿⣿⣿⢿⣿⣿⣿⠛⠕⡯⢒⠾⣿⢿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⡂⠀⣎⠇⠀⠡⠀⠉⠉⣏⠀⠐⠒⠽⣻⣿⠄⡡⡴⢕⡈⠉⡏⣿⣿⣿ 
      ⣿⣿⣿⡟⡄⠀⡨⠑⠀⢠⣤⣴⢼⣿⣿⣿⣿⣿⣿⣗⠄⠀⠀⡈⠐⠲⠀⠹⣿⣿ 
      ⣿⣿⣿⡠⠀⠂⠀⡤⠀⢸⢿⡇⠙⠛⠛⣿⢿⣿⣿⡇⠠⠎⠀⠀⠀⠠⠕⢩⣿⣿ 
      ⣿⣿⣿⡦⠀⠀⠀⡅⠀⠀⠗⠐⠑⠈⠁⠑⠡⠉⠋⠘⢁⣒⠀⠀⠀⢀⣴⣿⣿⣿ 
      ⣿⣿⣿⣿⣷⡄⡀⠀⡉⠐⡀⠀⠀⣀⣀⣀⢀⠄⡀⢀⡧⣵⣠⠀⣤⣿⣿⣿⣿⣿ 
      ⣿⣿⣿⣿⣿⡬⠁⠀⠁⠀⠀⠀⠥⢌⡅⢓⣼⠠⡃⡘⣹⣿⢾⣸⣟⡏⠸⢻⢻⣿ 
      ⣿⣿⣿⣿⣿⣿⣅⢠⠼⢃⠠⢤⠶⠄⠵⢝⣻⢗⣮⣙⣿⠏⠐⠀⠈⠐⠉⠬⢛⣻ 
      ⣿⣿⣿⣯⣯⡿⠙⠀⠢⠠⠆⣊⣂⠐⢱⡜⣿⣩⡧⠗⠍⠀⠀⠀⠀⡀⢄⣀⣀⣾ 
      ⣿⣿⠟⠈⠂⠀⠀⠀⠀⠀⠀⠁⠥⠖⠫⠌⠐⠁⠁⠀⠀⢀⠀⠐⢀⡱⢶⣬⣿⣿ 
      ⣯⠡⠁⠀⠀⠀⠀⠀⢀⣡⠄⡀⠀⠀⠀⠂⠀⠀⡀⠀⠀⢂⢔⢹⣝⢿⣿⣶⣿⣿
    `);
  }

  if (message.content.includes("bom dia")) {
    message.reply(`bom dia meu amor, tudo pog? você é bem omegalul e diff das outras garotas em, namorar com você é gg izi, lul como amo você, as piadas que você conta são muito pepelaugth, muito xesque dale dele doly esse relacionamento, vou feedar você de amor, namorada gap, deu open no meu coração, ff 15 não tanko tanto amor, gankou minha felicidade e campou o meu sorriso.
    `);
  }

  if (message.content.includes("among us")) {
    message.reply(`
  ‼️‼️HOLY FUCKING 🖕👦 SHIT‼️‼️‼️‼️ IS THAT A MOTHERFUCKING 👩💞 AMONG 💰 US 🇺🇸 REFERENCE??????!!!!!!!!!!11!1!1!1!1!1!1 😱! 😱😱😱😱😱😱😱 AMONG 💑👨‍❤️‍👨👩‍❤️‍👩 US 👨 IS THE BEST 👌💯 FUCKING 💦🍆👀 GAME 🎮 🔥🔥🔥🔥💯💯💯💯 RED 🔴 IS SO SUSSSSS 🕵️🕵️🕵️🕵️🕵️🕵️🕵️🟥🟥🟥🟥🟥 COME 💦🏃🏃‍♀️ TO MEDBAY AND WATCH 👀 ME SCAN 👀 🏥🏥🏥🏥🏥🏥🏥🏥 🏥🏥🏥🏥 WHY 😡🤔 IS NO ⚠🚫 ONE 1️⃣ FIXING 👾 O2 🅾 🤬😡🤬😡🤬😡🤬🤬😡🤬🤬😡 OH 🙀 YOUR 👉 CREWMATE? NAME 📛 EVERY 💯 TASK 📋 🔫😠🔫😠🔫😠🔫😠🔫😠 Where Any sus!❓ ❓ Where!❓ ❓ Where! Any sus!❓ Where! ❓ Any sus!❓ ❓ Any sus 🌈🏳️‍🌈! ❓ ❓ ❓ ❓ Where!Where!Where! Any sus!Where!Any sus 🌈🏳️‍🌈 Where!❓ Where! ❓ Where!Any sus❓ ❓ Any sus 💦! ❓ ❓ ❓ ❓ ❓ ❓ Where! ❓ Where! ❓ Any sus!❓ ❓ ❓ ❓ Any sus 🌈🏳️‍🌈! ❓ ❓ Where!❓ Any sus 💦! ❓ ❓ Where!❓ ❓ Where! ❓ Where!Where! ❓ ❓ ❓ ❓ ❓ ❓ ❓ Any sus!❓ ❓ ❓ Any sus!❓ ❓ ❓ ❓ Where! ❓ Where! Where!Any sus!Where! Where! ❓ ❓ ❓ ❓ ❓ ❓ I 👥 think 🤔 it was purple!👀👀👀👀👀👀👀👀👀👀It wasnt me I 👁 was in vents!!!!!!!!!!!!!!😂🤣😂🤣😂🤣😂😂😂🤣🤣🤣😂😂😂
      `);
  }

  if (message.content.includes("juliette")) {
    message.reply(`
  AH NÃO. NÃO...😰😧 NÃO NÃO NÃO NÃO NÃO NÃO....😧😩😭 EU NÃO ACREDITO NAOÉ POSIVEL.😩😭✋😤 DESGRAÇADO. 🤬🤬 COMO OUZA?👊🤬😬 COMO OUZA FALAR MAL DA MINHA RAINHA?????👊😩😭😤  VOCE TEM É INVEJA DA JULIETTE 🌵😍 POR QUE ELA TÁ GANHANDO MUTAAS COISAS🤑💰💸😍 E VOCE NAO SEU LIXOO🚮👎🗑️ CALABOCA AI SUA VIDA DEVE SER UMA MERDA VO COMER SUA MAE E SUAS TIAS GORDA 👩👩🏻🐋 E SUA IRMA 👩🏼 TAMBEM SEU MERRDA.. 🤬😡👊 CARA EU FICO PUTO COM ESSES FDPS.... NAMORAL CARA FALA MAIS UM "A"🗣️🅰️DA MINHA LIDER SUPREMA 😇 DEUZA NA TERRA 😇🙏🌎 PRA VOCE VE SE SEU DISGRAÇADO..😤😡👊 ELA JA E FINALISTA FIO ELA JOGA MUITO O BBB🌵💪🏆🥇 JA GANHOU 12 PROVAS DO ANJO👼 E 7 LIDERS🏆🥇😩👌 INVEJA? A JULIETTE E FODA 🌵💦 MUITO SENSATA🧚 ELA E CALCULSITA E FRIA🥶 E METICULOSA🕵️‍♀️😶 SEU MERDA RESPEITA MINHA FAVORITA ELA SOFREU MUITO NO INICIO TENHA PIEDADE PFF😭😭🥺👉👈  ASSISTO ELA NA CASA 24 HORAS 🤓📺🍆💦1 TWEET POR MINUTO🤓📱🐦 EU QUERO QUE QUANDO ELA SAIA DA CASA ELA ENFIE UM CACTO NO MEU CU 🌵🍑💦😭🥺👉👈..... TA COM INVEJA?🤨🤔👩‍🦽
      `);
  }

  if (message.content.includes("facção")) {
    message.reply(`
  Em caso de investigação policial, eu declaro que não tenho envolvimento com este grupo e não sei como estou no mesmo, provavelmente fui inserido por terceiros, declaro que estou disposto a colaborar com as investigações e estou disposto a me apresentar a depoimento se necessário, declaro que sou completamente inocente e não tenho envolvimento nenhum com este caso mostrado neste post específico.
      `);
  }

  if (message.content.includes("brtt")) {
    message.reply(`
͏      ͏͏͏͏
      ⠄⠄⠄⠄⠄⠄⠄⠄⢀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠾⢶⣄⠄⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣴⣶⣶⣶⣶⣦⣤⣄⣀⠄⠄⠄⠁⠙⠧⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⠄⠄⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠄⢀⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⠄⣼⣿⣿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄⠘⡆⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⣸⣿⣿⣾⣷⣶⣶⣾⣿⣿⣿⠋⠄⠈⠉⠙⠻⡄⠄⠇⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⣸⣿⣿⣯⣦⣀⣤⣿⣿⣿⣿⡀⠄⠄⠄⠄⠄⡇⠄⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣤⣾⣿⣀⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⢿⣿⢿⣿⣿⣿⣿⣿⣿⡿⠛⠃⠄⢨⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄
      ⠄⠄⠄⠄⠘⣿⠈⣿⣿⣿⡟⣋⣻⣷⣶⣶⣀⠄⠁⠈⢻⣿⠟⢩⣿⠁⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⠄⡝⠙⠟⠁⣿⣿⣿⡁⠄⢀⡵⠄⠄⠄⠄⠄⠸⠁⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⢀⠄⠄⠄⠄⠈⠛⠛⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⠄⣷⣄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⠄⢀⣿⣿⣿⣷⣶⣤⣤⡀⠄⠄⠄⠄⢀⣴⣧⡀⠄⠄⠄⠄⠄⠄⠄
      ⠄⠄⠄⠄⠄⣾⣩⣿⣿⣿⣿⣿⣿⣿⣧⣀⣀⣀⣴⣿⣿⣿⡿⠐⠦⣤⣀⣀⡀⠄
      `);
  }

  if (message.content.includes("poe é só um jogo")) {
    message.reply(`
      MULEQUE, É SÓ UM JOGO? CALMA AÍ, PATH OF EXILE É SÓ UM JOGO?\n ELE FALOU QUE PATH OF EXILE É SÓ UM JOGO E QUE EU TENHO QUE JOGAR PRA ME DIVERTIR, MULEQUE POR ISSO QUE ELE NÃO TERMINOU NEM OS ATOS MULEQUE POR ISSO QUE ELE TÁ NOS WHITE MAPS POR ISSO QUE ELE VAI MORRER NO FARMANDO T10, EU NÃO POSSO JOGAR COM CARA RUIM, O CARA FALA QUE EU TENHO QUE JOGAR PRA ME DIVERTIR\n MULEQUE SE EU QUISESSE ME DIVERTIR EU TAVA NA PRAIA CATANDO TATU, EU TINHA BOTADO NO TV XUXA NA TELEVISÃO, EU TAVA COMENDO PUTA, FAZENDO ALGUMA COISA EU NÃO TAVA JOGANDO A MERDA DESSE JOGO, EU NÃO SERIA ENDGAME PLAYER, EU NÃO JOGARIA PRA CARALHO PRA porra MULEQUE PRA ME DIVERTIR, QUANDO EU JOGO EU JOGO PRA VENCER, EU NÃO JOGO PRA ME DIVERTIR, EU JÁ FALEI, MULEQUE, SE EU JOGO E O CARA FAZ AQUILO, O QUE QUE TU QUER QUE EU FAÇA MULEQUE O QUE QUE TU QUER QUE FAÇA???\n MULEQUE SE EU TE CHAMAR PRA JOGAR, E TU FOR A merda DE UM JOGADOR CASUAL TU NÃO ACEITA A PORRA DO CONVITE, POR QUE TU VAI LEVAR RAGE TU VAI FICAR IGUAL UMA putinha TU NÃO VAI AGUENTAR O RAGE E VAI FICAR CHORANDO VAI FALAR QUE EU LEVO A PORRA DO JOGO A SÉRIO, SE EU TÔ JOGANDO O JOGO SE EU TÔ VENCENDO SE EU GOSTO DE VENCER EU LEVO A PORRA DO JOGO A SÉRIO, E NÃO VEM FALAR aAaAaAaAaA vOcE tEm QuE LeVaR o JoGo Na BrInCaDeIrA \n SE EU QUISESSE BRINCAR EU NÃO TAVA JOGANDO A PORRA DE PATH OF EXILE, EU TAVA JOGANDO ADOLETA LÁ NA PUTA QUE PARIU`);
  }

  if (message.content.includes("redpill")) {
    message.reply(`
      Gatinha você é muito based, minha dose de redpill, eu deixo de ser incel MGTOW e viro simp por você.\nSem você sou só um soyboy cringe, sheesh você é perfeita demais No Cap, nem mesmo os sigmas conseguem te tankar, porque você é full chad.\nSeu mindset alpha me tilta de paixão, você é indie e eu fico poggers com a sua beleza, sou hypado em você e fico LMAO com seu humor shitposter edgy.\nVocê é diferente das e-girls normies e tem um aesthetic único bem drip, cai no seu bait e virei beta, desculpa kekw mas é que você é tão full blessed que hitou meu coração e agora eu sou doomer longe de você, seu jeito cult nada bluepill me fascina, e já aviso que não sou pozer porque já te admirava antes de virar trend e meu amor por você nunca vai flopar
      `);
  }

  // if (message.content.includes("")) {
  //   message.reply(`

  //     `);
  // }

  // if (message.content.includes("")) {
  //   message.reply(`

  //     `);
  // }

  // if (message.content.includes("")) {
  //   message.reply(`

  //     `);
  // }





  // if (message.content.includes("")) {
  //   message.reply(`

  //     `);
  // }



































};

module.exports = { messageHandler };
