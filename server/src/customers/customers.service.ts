import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCustomerInput, OrderByParams } from 'src/graphql';
import { PrismaService } from '../../prisma/prisma.service';

import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerInput: any) {
    const {
      firstName,
      lastName,
      email,
      mobile,
      phone,
      address,
      city,
      country,
      postalCode,
      region,
    } = createCustomerInput;

    return this.prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
        phone,

        location: {
          connectOrCreate: {
            create: {
              address,
              city,
              postalCode,
              region,

              country: {
                connectOrCreate: {
                  create: {
                    countryName: country,
                  },
                  where: {
                    countryName: country,
                  },
                },
              },
            },
            where: {
              id: 1,
            },
          },
        },
      },
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
      include: {
        location: {
          include: {
            country: true,
          },
        },
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
