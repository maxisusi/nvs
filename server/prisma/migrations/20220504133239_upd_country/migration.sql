/*
  Warnings:

  - You are about to drop the column `customerId` on the `ContactPoint` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactPoint" DROP COLUMN "customerId";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "countryCode";
