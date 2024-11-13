const axios = require("axios");
const cheerio = require("cheerio");

const WEBSITE_URL = "https://poemapdevice.com/";

async function checkWebsite() {
  try {
    const { data } = await axios.get(WEBSITE_URL);
    const $ = cheerio.load(data);

    let maxDivineOrbCount = 0;
    const divineOrbImageUrl = `${WEBSITE_URL}DivineOrb.png`;

    console.log("Verificando mapas...");

    $("[id^='map-']").each((index, mapElement) => {
      const mapNameElement = $(mapElement).find("span").first();
      const mapName = mapNameElement.text().trim();
      console.log(`\nMapa encontrado: ${mapName} (ID: ${$(mapElement).attr('id')})`);

      const divineOrbContainer = $(mapElement).find(".divineOrb");
      console.log("Divine Orb Container encontrado:", divineOrbContainer.length > 0);

      const divineOrbElement = divineOrbContainer.find("span").first();
      const divineOrbCount = parseInt(divineOrbElement.text().trim(), 10) || 0;
      console.log(`Contagem de Divine Orbs para ${mapName}: ${divineOrbCount}`);

      const negativeVoteContainer = $(mapElement).find(".negative");
      console.log("Negative Vote Container encontrado:", negativeVoteContainer.length > 0);

      const negativeVoteElement = negativeVoteContainer.find("span").first();
      const negativeVoteCount = parseInt(negativeVoteElement.text().trim(), 10) || 0;
      console.log(`Votos negativos para ${mapName}: ${negativeVoteCount}`);

      if (divineOrbCount > 0 && divineOrbCount > negativeVoteCount) {
        console.log(`Contagem válida de Divine Orbs para ${mapName}`);
        maxDivineOrbCount = Math.max(maxDivineOrbCount, divineOrbCount);
      } else {
        console.log(`Contagem de Divine Orbs ignorada para ${mapName} (negativos: ${negativeVoteCount})`);
      }
    });

    const hasTumblingWealth = $("body").text().includes("tumbling wealth");
    console.log("Presença de 'tumbling wealth':", hasTumblingWealth);

    console.log("\nMaior contagem individual de Divine Orbs válida:", maxDivineOrbCount);

    return { maxDivineOrbCount, hasTumblingWealth, divineOrbImageUrl };
  } catch (error) {
    Sentry.captureException(error);
    console.error("Erro ao verificar o site:", error);
    return { maxDivineOrbCount: 0, hasTumblingWealth: false };
  }
}

module.exports = checkWebsite;
