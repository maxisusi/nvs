-- AlterTable
ALTER TABLE "ContactPoint" ALTER COLUMN "telephone" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "countryName" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "region" DROP NOT NULL;
