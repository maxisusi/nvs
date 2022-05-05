import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  prisma.customer.deleteMany({});
  prisma.location.deleteMany({});
  prisma.invoice.deleteMany({});
  prisma.company.deleteMany({});
  prisma.contactPoint.deleteMany({});
  prisma.entry.deleteMany({});
  prisma.country.deleteMany({});
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
