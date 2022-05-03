/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `country` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Location` table. All the data in the column will be lost.
  - Added the required column `countryName` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationCountry` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_countryId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "country",
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("countryName");

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "countryId",
ADD COLUMN     "locationCountry" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_locationCountry_fkey" FOREIGN KEY ("locationCountry") REFERENCES "Country"("countryName") ON DELETE RESTRICT ON UPDATE CASCADE;
