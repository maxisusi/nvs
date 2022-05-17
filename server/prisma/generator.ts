import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

class GenerateDatas {
  createCustomer(number: number): Array<Prisma.CustomerCreateInput> {
    const customers: Array<Prisma.CustomerCreateInput> = [];

    for (let i = 0; i < number; i++) {
      const customer: Prisma.CustomerCreateInput = {
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
      };

      customers.push(customer);
    }
    return customers;
  }

  createContactPoint(number: number): Array<Prisma.ContactPointCreateInput> {
    const contactPoints: Array<Prisma.ContactPointCreateInput> = [];

    for (let i = 0; i < number; i++) {
      const contactPoint: Prisma.ContactPointCreateInput = {
        name: faker.name.findName(),
        telephone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        address: faker.address.streetName(),
        postalCode: faker.address.zipCode(),
        region: faker.address.county(),
        city: faker.address.city(),
        countryName: faker.address.country(),
      };

      contactPoints.push(contactPoint);
    }

    return contactPoints;
  }

  createCompanies(number: number): Array<Prisma.CompanyCreateInput> {
    const companyList: Array<Prisma.CompanyCreateInput> = [];

    for (let i = 0; i < number; i++) {
      const company: Prisma.CompanyCreateInput = {
        name: faker.company.companyName(),
        address: faker.address.streetName(),
        city: faker.address.city(),
        countryName: faker.address.country(),
        image: faker.image.business(),
        postalCode: faker.address.zipCode(),
        region: faker.address.county(),
        telephone: faker.phone.phoneNumber(),
      };

      companyList.push(company);
    }

    return companyList;
  }

  createInvoice(number: number) {
    const invoiceList = [];

    for (let i = 0; i < number; i++) {
      const invoice: Prisma.InvoiceCreateInput = {
        customer: {
          create: {
            id: '122',
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
        date: faker.date.soon(),
        dueDate: faker.date.future(),
        remarks: faker.lorem.words(10),
        status: 'draft',
        taxes: 7.7,
        terms: 'NET_21',
        total: parseFloat(faker.finance.amount(30, 100, 2)),
      };

      invoiceList.push(invoice);
    }
    return invoiceList;
  }
}

export default GenerateDatas;
