import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import CreateCustomers from './customerData';

async function main() {
  clearFields();

  // * Generate clients
  await prisma.customer.createMany({
    data: CreateCustomers(10),
  });
}

// * Clear DB Fields
const clearFields = async () => {
  await prisma.customer.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.company.deleteMany();
  await prisma.contactPoint.deleteMany();
  await prisma.entry.deleteMany();
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
