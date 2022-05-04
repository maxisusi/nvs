-- DropForeignKey
ALTER TABLE "ContactPoint" DROP CONSTRAINT "ContactPoint_customerId_fkey";

-- CreateTable
CREATE TABLE "_ContactPointToCustomer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactPointToCustomer_AB_unique" ON "_ContactPointToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactPointToCustomer_B_index" ON "_ContactPointToCustomer"("B");

-- AddForeignKey
ALTER TABLE "_ContactPointToCustomer" ADD CONSTRAINT "_ContactPointToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "ContactPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactPointToCustomer" ADD CONSTRAINT "_ContactPointToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
