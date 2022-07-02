import { Injectable } from '@nestjs/common';
import { CustomerCreateInput } from 'src/@generated/prisma-nestjs-graphql/customer/customer-create.input';
import { UpdateCustomerInput } from 'src/graphql';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerInput: CustomerCreateInput) {
    return this.prisma.customer.create({
      data: createCustomerInput,
    });
  }

  async findAll() {
    return this.prisma.customer.findMany({
      include: { contactPoint: true },
    });
  }

  async findOne(id: string) {
    const customerData = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        contactPoint: true,
        invoice: {
          take: 15,
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    const getAllInvoices = await this.prisma.invoice.groupBy({
      orderBy: {
        _min: {
          date: 'asc',
        },
      },
      by: ['total', 'date'],
      where: {
        customerId: {
          in: id,
        },
        status: {
          in: ['draft', 'pending'],
        },
      },
    });

    // * Iterate trough the list of totals and concat them
    let monthList: any = {};
    for (let i = 0; i < getAllInvoices.length; i++) {
      const dateConvertedToMonth = getAllInvoices[i];

      console.log(parseISO(dateConvertedToMonth.date));
    }

    console.log(getAllInvoices);

    return customerData;
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
