import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { CustomersService } from 'src/customers/customers.service';
import { OrderByParams } from 'src/graphql';

describe('Customer Service INT', () => {
  let prisma: PrismaService;
  let customerService: CustomersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    customerService = moduleRef.get(CustomersService);
    await prisma.cleandDataBase();
  });

  describe('Customer', () => {
    it('should create a customer in DB and return values', async () => {
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
      const getUser = await customerService.findOne(userId);
      expect(getUser).toEqual(user);
    });

    it('should delete a customer in DB', async () => {
      // const user = await prisma.customer.create({
      //   data: {
      //     firstName: 'John',
      //     lastName: 'Doe',
      //     address: 'Groove street',
      //     city: 'Los Santos',
      //     countryName: 'USA',
      //     postalCode: '90210',
      //     region: 'Los Angeles',
      //   },
      // });
      // const userId: string = user.id;
      // Delete user
      const params: OrderByParams = { input: 'john' };
      const getUser = await customerService.findAll(params);

      console.log(getUser);

      // expect(getUser).not.toEqual(user);
    });
  });
});
