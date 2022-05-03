import { Injectable } from '@nestjs/common';
import { OrderByParams } from 'src/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCustomerInput: CreateCustomerInput) {
    return 'This action adds a new customer';
  }

  async findAll(orderBy?: OrderByParams) {
    const { displayName } = orderBy || {};
    return this.prisma.customer.findMany({
      // orderBy: {
      //   _relevance: {
      //     sort: 'desc',
      //     fields: ['firstName', 'lastName'],
      //     search: displayName,
      //   },
      // },
      where: {
        OR: [
          {
            firstName: {
              contains: displayName,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: displayName,
              mode: 'insensitive',
            },
          },
        ],
      },

      include: {
        location: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  update(id: number, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
