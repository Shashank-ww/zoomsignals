-- CreateTable
CREATE TABLE "Advertiser" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advertiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdvertiserToSignal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Advertiser_brandName_key" ON "Advertiser"("brandName");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertiserToSignal_AB_unique" ON "_AdvertiserToSignal"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertiserToSignal_B_index" ON "_AdvertiserToSignal"("B");

-- AddForeignKey
ALTER TABLE "_AdvertiserToSignal" ADD CONSTRAINT "_AdvertiserToSignal_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToSignal" ADD CONSTRAINT "_AdvertiserToSignal_B_fkey" FOREIGN KEY ("B") REFERENCES "Signal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
