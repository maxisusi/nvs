import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CustomerCreateInput } from 'src/@generated/prisma-nestjs-graphql/customer/customer-create.input';
import { OrderByParams, UpdateCustomerInput } from 'src/graphql';
import { CustomersService } from './customers.service';

@Resolver('Customer')
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation('createCustomer')
  create(
    @Args('createCustomerInput')
    createCustomerInput: CustomerCreateInput,
  ) {
    return this.customersService.create(createCustomerInput);
  }

  @Query('customers')
  findAll() {
    return this.customersService.findAll();
  }

  @Query('customer')
  findOne(@Args('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Query('customerCount')
  customerCount() {
    return this.customersService.customerCount();
  }

  @Mutation('updateCustomer')
  update(
    @Args('updateCustomerInput')
    updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.customersService.update(updateCustomerInput);
  }

  @Mutation('removeCustomer')
  remove(@Args('id') id: string) {
    return this.customersService.remove(id);
  }
}
