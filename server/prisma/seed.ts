import { PrismaClient } from '@prisma/client';
import GenerateDatas from './generator';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const generator = new GenerateDatas();

async function main() {
  await clearFields();

  // await generateFields();
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

  // Generate Invoices
  for (let i = 0; i < 5; i++) {
    await prisma.invoice.create({
      data: {
        customer: {
          create: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            mobile: faker.phone.phoneNumber(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetName(),
            postalCode: faker.address.zipCode(),
            region: faker.address.county(),
            city: faker.address.city(),
            countryName: faker.address.country(),
          },
        },
        company: {
          create: {
            name: faker.company.companyName(),
            address: faker.address.streetName(),
            city: faker.address.city(),
            countryName: faker.address.country(),
            image: faker.image.business(),
            postalCode: faker.address.zipCode(),
            region: faker.address.county(),
            telephone: faker.phone.phoneNumber(),
          },
        },
        entry: {
          createMany: {
            data: [
              {
                date: faker.date.past(),
                description: faker.lorem.sentence(),
                quantity: parseFloat(faker.random.numeric()),
                rate: parseFloat(faker.random.numeric()),
                total: parseFloat(faker.random.numeric()),
              },
              {
                date: faker.date.past(),
                description: faker.lorem.sentence(),
                quantity: parseFloat(faker.random.numeric()),
                rate: parseFloat(faker.random.numeric()),
                total: parseFloat(faker.random.numeric()),
              },
              {
                date: faker.date.past(),
                description: faker.lorem.sentence(),
                quantity: parseFloat(faker.random.numeric()),
                rate: parseFloat(faker.random.numeric()),
                total: parseFloat(faker.random.numeric()),
              },
            ],
          },
        },
        date: faker.date.soon(),
        dueDate: faker.date.future(),
        remarks: faker.lorem.words(10),
        status: 'draft',
        taxes: 7.7,
        terms: 'NET_21',
        total: parseFloat(faker.finance.amount(30, 100, 2)),
      },
    });
  }

  // for (let i = 0; i < 5; i++) {
  //   await prisma.entry.create({
  //     data: {
  //       date: faker.date.past(),
  //       description: faker.lorem.sentence(),
  //       quantity: parseFloat(faker.random.numeric()),
  //       rate: parseFloat(faker.random.numeric()),
  //       total: parseFloat(faker.random.numeric()),
  //     },
  //   });
  // }

  // Generate Entries and invoices
};

// * Clear DB Fields
export const clearFields = async () => {
  const deleteContactPoint = prisma.contactPoint.deleteMany();
  const deleteCustomers = prisma.customer.deleteMany();
  const deleteInvoices = prisma.invoice.deleteMany();
  const deleteCompanies = prisma.company.deleteMany();
  const deleteEntries = prisma.entry.deleteMany();

  await prisma.$transaction([
    deleteInvoices,
    deleteContactPoint,
    deleteCustomers,
    deleteCompanies,
    deleteEntries,
  ]);
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
