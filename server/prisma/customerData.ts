import { faker } from '@faker-js/faker';

const CreateCustomers = (length: number) => {
  const customers = [];

  for (let i = 0; i < length; i++) {
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
};

export default CreateCustomers;
