import { faker } from '@faker-js/faker';

class GenerateDatas {
  createCustomer(number: number) {
    const customers = [];

    for (let i = 0; i < number; i++) {
      const customer = {
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
}

export default GenerateDatas;
