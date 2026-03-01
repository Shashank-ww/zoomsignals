/*
  Warnings:

  - The `primaryPlatforms` column on the `Signal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `narrative` on the `Signal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Signal" DROP COLUMN "narrative",
ADD COLUMN     "narrative" "Narrative" NOT NULL,
DROP COLUMN "primaryPlatforms",
ADD COLUMN     "primaryPlatforms" "Platform"[];
