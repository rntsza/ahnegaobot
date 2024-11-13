const prisma = require("../config/prismaClient");

async function loadPostedMemes() {
  const memes = await prisma.postedMeme.findMany({ orderBy: { postedAt: "desc" } });
  return memes;
}

async function savePostedMeme(guid, link) {
  await prisma.postedMeme.create({ data: { guid, link } });
}

module.exports = { loadPostedMemes, savePostedMeme };