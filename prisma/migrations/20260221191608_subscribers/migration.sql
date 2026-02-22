-- CreateEnum
CREATE TYPE "Lifecycle" AS ENUM ('EARLY', 'PEAKING', 'SATURATED');

-- CreateEnum
CREATE TYPE "Velocity" AS ENUM ('EMERGING', 'ACCELERATING', 'STABLE', 'DECLINING');

-- CreateEnum
CREATE TYPE "Confidence" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'META_PAID', 'TWITTER', 'GOOGLE_YT');

-- CreateEnum
CREATE TYPE "Narrative" AS ENUM ('SILENT', 'TACTICAL', 'TEXT_ONLY', 'VO_ONLY', 'VISUAL_ONLY', 'BG_MUSIC_ONLY', 'COMPARATIVE');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('RELEVANT', 'NOT_RELEVANT');

-- CreateTable
CREATE TABLE "Signal" (
    "id" TEXT NOT NULL,
    "formatName" TEXT NOT NULL,
    "narrative" TEXT NOT NULL,
    "insight" TEXT NOT NULL,
    "lifecycle" "Lifecycle" NOT NULL,
    "velocity" "Velocity" NOT NULL,
    "confidence" "Confidence" NOT NULL,
    "approvalStatus" "ApprovalStatus" NOT NULL,
    "primaryPlatforms" TEXT[],
    "repetitionCount" INTEGER NOT NULL,
    "author" TEXT,
    "imageUrl" TEXT,
    "sourceLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Signal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "signalId" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "voterHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_signalId_voterHash_key" ON "Vote"("signalId", "voterHash");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES "Signal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
