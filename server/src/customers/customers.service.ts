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
    const { input } = orderBy || {};
    return this.prisma.customer.findMany({
      orderBy: {
        _relevance: {
          sort: 'desc',
          fields: ['firstName', 'lastName', 'mobile', 'phone'],
          search: input.replace(/\s+/g, ''),
        },
      },

      include: {
        location: true,
      },
      // where: {
      //   OR: [
      //     {
      //       firstName: {
      //         contains: displayName.trim(),
      //         mode: 'insensitive',
      //       },
      //     },
      //     {
      //       lastName: {
      //         contains: displayName.trim(),
      //         mode: 'insensitive',
      //       },
      //     },
      //     {
      //       phone: {
      //         contains: telephoneNumber.trim(),
      //         mode: 'insensitive',
      //       },
      //     },
      //     {
      //       mobile: {
      //         contains: telephoneNumber.trim(),
      //         mode: 'insensitive',
      //       },
      //     },
      //   ],
      // },
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
