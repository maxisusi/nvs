-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "mobile" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Country" (
    "countryCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("countryCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_locationId_key" ON "Customer"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_countryId_key" ON "Location"("countryId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("countryCode") ON DELETE RESTRICT ON UPDATE CASCADE;
