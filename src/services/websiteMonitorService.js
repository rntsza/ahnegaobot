const WebSocket = require("ws");
const client = require("../config/discordClient");
const Sentry = require("@sentry/node");
const fs = require("fs");
const path = require("path");

const CHANNEL_TIGRINHO_ID = process.env.CHANNEL_TIGRINHO_ID;
const ROLE_TIGRINHO_ID = process.env.ROLE_TIGRINHO_ID;
const WEBSITE_URL = "https://poemapdevice.com/";

let divineVoteCount = 0;
let tumblingWealthVoteCount = 0;
let positiveVotes = 0;
let negativeVotes = 0;
let notifiedFor20Divine = false;
let lastNotificationTime = 0;
const NOTIFICATION_INTERVAL = 10 * 60 * 1000;

const mapsData = JSON.parse(fs.readFileSync(path.join(__dirname, "../utils/mapsData.json")));

function getMapData(mapId) {
  return mapsData.find((map) => map.idNumerico === String(mapId)) || {};
}

async function sendNotification(channel, content, files) {
  const now = Date.now();
  if (now - lastNotificationTime >= NOTIFICATION_INTERVAL) {
    lastNotificationTime = now;
    await channel.send({ content, files });
  } else {
    console.log("Notificação ignorada devido ao intervalo mínimo.");
  }
}

function resetCounters() {
  divineVoteCount = 0;
  tumblingWealthVoteCount = 0;
  positiveVotes = 0;
  negativeVotes = 0;
  notifiedFor20Divine = false;
  console.log("Logando contadores resetados.");
}

function scheduleReset() {
  const now = new Date();
  const nextHour = new Date(now);
  
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  const delay = nextHour - now;

  setTimeout(() => {
    resetCounters();
    setInterval(resetCounters, 60 * 60 * 1000);
  }, delay);
}

const mapCounters = {};

function resetMapCounters(mapId) {
  mapCounters[mapId] = {
    divineVoteCount: 0,
    tumblingWealthVoteCount: 0,
    positiveVotes: 0,
    negativeVotes: 0,
    notifiedFor20Divine: false
  };
}

function getMapCounter(mapId) {
  if (!mapCounters[mapId]) {
    resetMapCounters(mapId);
  }
  return mapCounters[mapId];
}

scheduleReset();

async function processMessage(parsedMessage) {
  const { id, divineValue, chaosValue, exaltedValue, negativeValue, note } = parsedMessage.data;

  const mapData = getMapData(id);
  const { nomeMapa, urlImagem } = mapData;

  const counters = getMapCounter(id);
  const hasTumblingWealth = note && note.includes("tumbling wealth");
  const hasHighDivineValue = divineValue && divineValue >= 20;
  console.log("Valores recebidos: ", divineValue, chaosValue, exaltedValue, negativeValue, note);

  const channel = client.channels.cache.get(CHANNEL_TIGRINHO_ID);

  if (channel) {
    let regex1 = "";
    let regex2 = "";
    if (note && note.includes("inhabited")) {
      regex1 = `"bom|solar|hum|nim|cul|lun|osts|ndea|ske|itc"`;
      regex2 = `"oa|emons"`;
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
    
    console.log("Contadores: ", divineVoteCount, tumblingWealthVoteCount, positiveVotes, negativeVotes);
    console.log("Notificações: ", notifiedFor20Divine, tumblingWealthVoteCount, divineVoteCount, hasHighDivineValue, hasTumblingWealth);

    // if (divineVoteCount >= 20 && !notifiedFor20Divine && negativeValue <= (divineValue * 0.75)) {
    //   await sendNotification(
    //     channel,
    //     // `🎉 <@&${ROLE_TIGRINHO_ID}> 20 Divine Orbs detectados pela primeira vez! 🔥 \nContagem: ${counters.divineVoteCount} \nMapa: ${nomeMapa} \n👍: ${counters.positiveVotes} \n💩: ${counters.negativeVotes} \nRegex: ${regex1} \nRegex: ${regex2}`,
    //     [urlImagem]
    //   );
    //   notifiedFor20Divine = true;
    // }

    if (counters.tumblingWealthVoteCount > 0 && counters.tumblingWealthVoteCount % 100 === 0) {
      await sendNotification(
        channel,
        `A palavra "tumbling wealth" foi detectada no mapa ${nomeMapa}! \n👍: ${counters.positiveVotes} \n: ${counters.negativeVotes} \nRegex: ${regex1} \nRegex: ${regex2}`,
        [urlImagem]
      );
    }

    if (counters.divineVoteCount > 0 && counters.divineVoteCount % 100 === 0) {
      await sendNotification(
        channel,
        `Mais de ${counters.divineVoteCount} votos para Divine Orbs detectados no mapa ${nomeMapa}! 🔥 \n👍: ${counters.positiveVotes} \n💩: ${counters.negativeVotes} \nRegex: ${regex1} \nRegex: ${regex2}`,
        [urlImagem]
      );
    }

    if (counters.tumblingWealthVoteCount >= 300 || counters.divineVoteCount >= 300) {
      await sendNotification(
        channel,
        `<@&${ROLE_TIGRINHO_ID}> Atenção! O limite de 300 votos foi ultrapassado! \nTumbling Wealth: ${counters.tumblingWealthVoteCount == 1 ? true : false}, Divine Orbs: ${counters.divineVoteCount} \nMapa: ${nomeMapa}, 👍: ${counters.positiveVotes}, 💩: ${counters.negativeVotes} \nRegex: ${regex1} \nRegex: ${regex2}`,
        [urlImagem]
      );
      resetMapCounters(id);
    }

    if (divineValue >= 40 && negativeValue <= (divineValue * 0.75)) {
      await sendNotification(
        channel,
        ` 🚸 <@&${ROLE_TIGRINHO_ID}> Atenção! Tigrinho rolando! \nDivine: ${divineValue}, \nMapa: ${nomeMapa}, \n👍: ${divineValue}, \n💩: ${negativeValue} \nRegex: ${regex1} \nRegex: ${regex2}`,
        [urlImagem]
      );
    }

    if (chaosValue >= 40 && negativeValue <= (chaosValue * 0.75)) {
      await sendNotification(
        channel,
        ` 🚸 <@&${ROLE_TIGRINHO_ID}> Atenção! Tigrinho rolando! \nChaos: ${chaosValue}, \nMapa: ${nomeMapa}, \nTumbling Wealth: ${hasTumblingWealth ? "Tumbling Wealth ativo, olhe o regex, se existir" : "% Chaos*" } \n👍: ${chaosValue}, \n💩: ${negativeValue} \nRegex: ${regex1} \nRegex: ${regex2}`,
        [urlImagem]
      );
    }

    if (note && typeof note === "string" && note.length > 0) {
      await sendNotification(
        channel,
        ` 🚸 <@&${ROLE_TIGRINHO_ID}> Atenção! Tigrinho rolando! \nNota: ${note}, \nMapa: ${nomeMapa}, \nTumbling Wealth: ${hasTumblingWealth ? "Tumbling Wealth ativo, olhe o regex, se existir" : "% Chaos*" } \n👍: ${chaosValue}, \n💩: ${negativeValue} \nRegex: ${regex1} \nRegex: ${regex2}`,
        [urlImagem]
      );
    }

  } else {
    console.error("Canal do Discord não encontrado.");
  }
}

async function monitorWebSocket() {
  const ws = new WebSocket("wss://poemapdevice.com:7201/");

  ws.on("open", () => {
    console.log("Conectado ao WebSocket do poemapdevice.com.");
  });
 
  ws.on("message", async (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type === 3 && parsedMessage.data) {
        await processMessage(parsedMessage);
      }
      console.log("Mensagem WebSocket processada com sucesso.", parsedMessage);
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erro ao processar mensagem WebSocket:", error);
    }
  });

  ws.on("close", () => {
    console.log("Conexão WebSocket fechada. Tentando reconectar em 5 segundos...");
    setTimeout(monitorWebSocket, 5000);
  });

  ws.on("error", (error) => {
    Sentry.captureException(error);
    console.error("Erro na conexão WebSocket:", error);
  });
}

module.exports = monitorWebSocket;
