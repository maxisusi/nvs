/*
  Warnings:

  - You are about to drop the column `companyAddress` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyPostalCode` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `contactAddress` on the `ContactPoint` table. All the data in the column will be lost.
  - You are about to drop the column `contactPostalCode` on the `ContactPoint` table. All the data in the column will be lost.
  - You are about to drop the column `customerAddress` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerPostalCode` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_companyAddress_companyPostalCode_fkey";

-- DropForeignKey
ALTER TABLE "ContactPoint" DROP CONSTRAINT "ContactPoint_contactAddress_contactPostalCode_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_customerAddress_customerPostalCode_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_countryId_fkey";

-- DropIndex
DROP INDEX "Company_companyAddress_companyPostalCode_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyAddress",
DROP COLUMN "companyPostalCode",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContactPoint" DROP COLUMN "contactAddress",
DROP COLUMN "contactPostalCode",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "customerAddress",
DROP COLUMN "customerPostalCode",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Location";
