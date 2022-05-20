import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { CustomersService } from 'src/customers/customers.service';

describe('Customer Service INT', () => {
  let prisma: PrismaService;
  let customerService: CustomersService;

  const customerMockValue = {
    firstName: 'John',
    lastName: 'Doe',
    address: 'Groove street',
    city: 'Los Santos',
    countryName: 'USA',
    postalCode: '90210',
    region: 'Los Angeles',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    customerService = moduleRef.get(CustomersService);
    await prisma.cleanDataBase();
  });

  describe('Customer', () => {
    it('Create Customer and return values', async () => {
      const customer = await customerService.create(customerMockValue);
      const customerId: string = customer.id;
      const getUser = await customerService.findOne(customerId);
      expect(getUser).toEqual(customer);
    });

    it('Deletes user', async () => {
      const customer = await customerService.create(customerMockValue);
      const customerId: string = customer.id;
      // Delete user
      await customerService.remove(customerId);
      const getUser = await customerService.findOne(customerId);
      expect(getUser).not.toEqual(customer);
    });

    it('Updates user', async () => {
      const user = await prisma.customer.create({
        data: {
          firstName: 'John',
          lastName: 'Doe',
          address: 'Groove street',
          city: 'Los Santos',
          countryName: 'USA',
          postalCode: '90210',
          region: 'Los Angeles',
        },
      });
      const userId: string = user.id;

      const updateUser = {
        id: userId,
        firstName: 'Eric',
      };

      await customerService.update(updateUser);
      const getUser = await customerService.findOne(userId);
      expect(getUser).toMatchObject({ firstName: 'Eric' });
    });
  });
});
