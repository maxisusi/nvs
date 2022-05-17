import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomerCreateInput } from 'src/@generated/prisma-nestjs-graphql/customer/customer-create.input';
import {
  OrderByParams,
  UpdateContactPointInput,
  UpdateCustomerInput,
} from 'src/graphql';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerInput: CustomerCreateInput) {
    return this.prisma.customer.create({
      data: createCustomerInput,
    });
  }

  async findAll(orderBy?: OrderByParams) {
    const { input } = orderBy || {};
    return this.prisma.customer.findMany({
      include: { contactPoint: true },
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

  update(updateCustomerInput: UpdateCustomerInput) {
    // * Triggers if there are no contact points
    if (!updateCustomerInput.contactPointId) {
      delete updateCustomerInput['contactPointId'];
      return this.prisma.customer.update({
        where: { id: updateCustomerInput.id as string },
        data: updateCustomerInput,
      });
    }

    const contactPointID = updateCustomerInput.contactPointId;
    delete updateCustomerInput['contactPointId'];
    return this.prisma.customer.update({
      where: { id: updateCustomerInput.id as string },
      data: {
        ...updateCustomerInput,
        contactPoint: {
          connect: {
            id: contactPointID,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
