import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderByParams } from 'src/graphql';
import { CustomersService } from './customers.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver('Customer')
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation('createCustomer')
  create(
    @Args('createCustomerInput')
    createCustomerInput: Prisma.CustomerCreateInput,
  ) {
    return this.customersService.create(createCustomerInput);
  }

  @Query('customers')
  findAll(@Args('orderBy') orderBy?: OrderByParams) {
    return this.customersService.findAll(orderBy);
  }

  @Query('customer')
  findOne(@Args('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Mutation('updateCustomer')
  update(
    @Args('updateCustomerInput')
    updateCustomerInput: Prisma.CustomerUpdateInput,
  ) {
    return this.customersService.update(updateCustomerInput);
  }

  @Mutation('removeCustomer')
  remove(@Args('id') id: string) {
    return this.customersService.remove(id);
  }
}
