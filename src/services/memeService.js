const axios = require("axios");
const cheerio = require("cheerio");

const BLOCK_GIF_FILENAME = "ajax-loader.gif";

async function fetchMemeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $("h1").first().text().trim() || "Meme Sem Título";
    const imageUrls = [];
    $(".entry-content img").each((i, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl && !imageUrl.includes("/wp-content/themes/") && !imageUrl.includes(BLOCK_GIF_FILENAME)) {
        imageUrls.push(imageUrl);
      }
    });

    const videoUrls = [];
    $(".rll-youtube-player").each((i, element) => {
      const videoUrl = $(element).attr("data-src");
      if (videoUrl && !videoUrl.includes(BLOCK_GIF_FILENAME)) videoUrls.push(videoUrl);
    });
    $("iframe").each((i, element) => {
      const videoUrl = $(element).attr("src");
      if (videoUrl && videoUrl.includes("youtube.com") && !videoUrl.includes(BLOCK_GIF_FILENAME)) videoUrls.push(videoUrl);
    });

    return { title, imageUrls, videoUrls };
  } catch (error) {
    Sentry.captureException(error);
    console.error("Erro ao buscar o conteúdo do meme:", error);
    return null;
  }
}

module.exports = fetchMemeContent;