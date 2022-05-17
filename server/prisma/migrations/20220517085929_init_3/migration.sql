-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DEFAULT E'draft',
ALTER COLUMN "terms" SET DEFAULT E'NET_30';
