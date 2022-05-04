/*
  Warnings:

  - Added the required column `customerId` to the `ContactPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactPoint" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ContactPoint" ADD CONSTRAINT "ContactPoint_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
