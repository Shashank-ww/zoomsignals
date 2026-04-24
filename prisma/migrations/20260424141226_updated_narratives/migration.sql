/*
  Warnings:

  - The values [SILENT,TEXT_ONLY,VO_ONLY,VISUAL_ONLY,BG_MUSIC_ONLY] on the enum `Narrative` will be removed. If these variants are still used in the database, this will fail.
  - The values [GOOGLE_YT] on the enum `Platform` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Narrative_new" AS ENUM ('THEMATIC', 'CONTEXTUAL', 'TACTICAL', 'STORYTELLING', 'VO_MUSICAL', 'EMOTIONAL', 'INFLUENCER_LED', 'AUTHORITY_LED', 'COMPARATIVE', 'TESTIMONIAL');
ALTER TABLE "Signal" ALTER COLUMN "narrative" TYPE "Narrative_new" USING ("narrative"::text::"Narrative_new");
ALTER TYPE "Narrative" RENAME TO "Narrative_old";
ALTER TYPE "Narrative_new" RENAME TO "Narrative";
DROP TYPE "Narrative_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Platform_new" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'META_PAID', 'TWITTER', 'YOUTUBE', 'SNAPCHAT', 'REDDIT', 'WHATSAPP', 'LINKEDIN', 'PINTEREST');
ALTER TABLE "Signal" ALTER COLUMN "primaryPlatforms" TYPE "Platform_new"[] USING ("primaryPlatforms"::text::"Platform_new"[]);
ALTER TYPE "Platform" RENAME TO "Platform_old";
ALTER TYPE "Platform_new" RENAME TO "Platform";
DROP TYPE "Platform_old";
COMMIT;
