/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ContactPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContactPoint_email_key" ON "ContactPoint"("email");
