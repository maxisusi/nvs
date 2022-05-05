import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCustomerInput, OrderByParams } from 'src/graphql';
import { PrismaService } from '../../prisma/prisma.service';

import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerInput: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({
      data: createCustomerInput,
    });
  }

  async findAll(orderBy?: OrderByParams) {
    const { input } = orderBy || {};
    return this.prisma.customer.findMany({
      orderBy: {
        _relevance: {
          sort: 'desc',
          fields: ['firstName', 'lastName', 'mobile', 'phone'],
          search: input.replace(/\s+/g, ''),
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  update(updateCustomerInput: Prisma.CustomerUpdateInput) {
    // return this.prisma.customer.update();
  }

  remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
