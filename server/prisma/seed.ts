import { PrismaClient } from '@prisma/client';
import GenerateDatas from './generator';

const prisma = new PrismaClient();
const generator = new GenerateDatas();

async function main() {
  await clearFields();

  await generateFields();
}

const generateFields = async () => {
  // * Generate clients
  await prisma.customer
    .createMany({
      data: generator.createCustomer(10),
    })
    .catch((e) => console.log('There was an error', e));

  await prisma.contactPoint
    .createMany({
      data: generator.createContactPoint(3),
    })
    .catch((e) => console.log('There was an error', e));

  await prisma.company
    .createMany({ data: generator.createCompanies(3) })
    .catch((e) => console.log('There was an error', e));
};

// * Clear DB Fields
const clearFields = async () => {
  await prisma.contactPoint.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.company.deleteMany();

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
