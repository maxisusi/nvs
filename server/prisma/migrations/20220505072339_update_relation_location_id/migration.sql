/*
  Warnings:

  - You are about to drop the column `locationId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `ContactPoint` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyAddress,companyPostalCode]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyAddress` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyPostalCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactAddress` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPostalCode` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPostalCode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_locationId_fkey";

-- DropForeignKey
ALTER TABLE "ContactPoint" DROP CONSTRAINT "ContactPoint_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_locationId_fkey";

-- DropIndex
DROP INDEX "Company_locationId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "locationId",
ADD COLUMN     "companyAddress" TEXT NOT NULL,
ADD COLUMN     "companyPostalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContactPoint" DROP COLUMN "locationId",
ADD COLUMN     "contactAddress" TEXT NOT NULL,
ADD COLUMN     "contactPostalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "locationId",
ADD COLUMN     "customerAddress" TEXT NOT NULL,
ADD COLUMN     "customerPostalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("address", "postalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyAddress_companyPostalCode_key" ON "Company"("companyAddress", "companyPostalCode");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_customerAddress_customerPostalCode_fkey" FOREIGN KEY ("customerAddress", "customerPostalCode") REFERENCES "Location"("address", "postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactPoint" ADD CONSTRAINT "ContactPoint_contactAddress_contactPostalCode_fkey" FOREIGN KEY ("contactAddress", "contactPostalCode") REFERENCES "Location"("address", "postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyAddress_companyPostalCode_fkey" FOREIGN KEY ("companyAddress", "companyPostalCode") REFERENCES "Location"("address", "postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
