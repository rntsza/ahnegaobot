-- CreateTable
CREATE TABLE "PostedMeme" (
    "guid" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostedMeme_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostedMeme_guid_key" ON "PostedMeme"("guid");
