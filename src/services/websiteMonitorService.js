const WebSocket = require("ws");
const client = require("../config/discordClient");

const CHANNEL_TIGRINHO_ID = process.env.CHANNEL_TIGRINHO_ID;
const ROLE_TIGRINHO_ID = process.env.ROLE_TIGRINHO_ID;
const WEBSITE_URL = "https://poemapdevice.com/";

let divineVoteCount = 0;
let tumblingWealthVoteCount = 0;
let positiveVotes = 0;
let negativeVotes = 0;
let notifiedFor20Divine = false;

function resetCounters() {
  divineVoteCount = 0;
  tumblingWealthVoteCount = 0;
  positiveVotes = 0;
  negativeVotes = 0;
  notifiedFor20Divine = false;
}

setInterval(resetCounters, 60 * 60 * 1000);

async function monitorWebSocket() {
  const ws = new WebSocket("wss://poemapdevice.com:7201/");

  ws.on("open", () => {
    console.log("Conectado ao WebSocket do poemapdevice.com.");
  });
  

  let currentMapId = null;

  ws.on("message", async (message) => {
    try {
      const parsedMessage = JSON.parse(message);
  
      if (parsedMessage.type === 3 && parsedMessage.data) {
        const { id, divineValue, chaosValue, exaltedValue, negativeValue, note } = parsedMessage.data;
  
        if (currentMapId !== id) {
          currentMapId = id;
          resetCounters();
        }
  
        const hasTumblingWealth = note && note.includes("tumbling wealth");
        const hasHighDivineValue = divineValue && divineValue > 10;
  
        
        const channel = client.channels.cache.get(CHANNEL_TIGRINHO_ID);

        if (channel) {
          let divineOrbImageUrl = `${WEBSITE_URL}DivineOrb.png`;
          let chaosOrbImageUrl = `${WEBSITE_URL}ChaosOrb.png`;

          let regex1 = "";
          let regex2 = "";
          if (note && note.includes("inhabited")) {
            regex1 = "bom|solar|hum|nim|cul|lun|osts|ndea|ske|itc";
            regex2 = "oa|emons";
          }

          if (hasTumblingWealth) {
            tumblingWealthVoteCount++;
            positiveVotes += chaosValue;
            negativeVotes += negativeValue;
          }
          if (hasHighDivineValue) {
            divineVoteCount++;
            positiveVotes += divineValue;
            negativeVotes += negativeValue;
          }

          if (divineVoteCount >= 20 && !notifiedFor20Divine) {
            await channel.send({
              content: `🎉 <@&${ROLE_TIGRINHO_ID}> 20 Divine Orbs detectados pela primeira vez! 🔥 Contagem: ${divineVoteCount}, 👍: ${positiveVotes}, 💩: ${negativeVotes} --- ${regex1} --- ${regex2}`,
              files: divineOrbImageUrl ? [divineOrbImageUrl] : [],
            });
            notifiedFor20Divine = true;
          }

          if (tumblingWealthVoteCount > 0 && tumblingWealthVoteCount % 100 === 0) {
            await channel.send({
              content: `A palavra "tumbling wealth" foi detectada ${tumblingWealthVoteCount} vezes no mapa! 👍: ${positiveVotes}, 💩: ${negativeVotes} --- ${regex1} --- ${regex2}`,
              files: chaosOrbImageUrl ? [chaosOrbImageUrl] : [],
            });
          }

          if (divineVoteCount > 0 && divineVoteCount % 100 === 0) {
            await channel.send({
              content: `Mais de ${divineVoteCount} votos para Divine Orbs detectados no mapa! 🔥 👍: ${positiveVotes}, 💩: ${negativeVotes} --- ${regex1} --- ${regex2}`,
              files: divineOrbImageUrl ? [divineOrbImageUrl] : [],
            });
          }

          if (tumblingWealthVoteCount >= 300 || divineVoteCount >= 300) {
            await channel.send({
              content: `<@&${ROLE_TIGRINHO_ID}> Atenção! O limite de 300 votos foi ultrapassado! \nTumbling Wealth: ${tumblingWealthVoteCount}, Divine Orbs: ${divineVoteCount} 👍: ${positiveVotes}, 💩: ${negativeVotes} --- ${regex1} --- ${regex2}`,
              files: hasTumblingWealth ? [chaosOrbImageUrl] : [divineOrbImageUrl],
            });

            resetCounters();
          }
        } else {
          console.error("Canal do Discord não encontrado.");
        }
      }
    } catch (error) {
      console.error("Erro ao processar mensagem WebSocket:", error);
    }
  });

  ws.on("close", () => {
    console.log("Conexão WebSocket fechada. Tentando reconectar em 5 segundos...");
    setTimeout(monitorWebSocket, 5000);
  });

  ws.on("error", (error) => {
    console.error("Erro na conexão WebSocket:", error);
  });
}

module.exports = monitorWebSocket;