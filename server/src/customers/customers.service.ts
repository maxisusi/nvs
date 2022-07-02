import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { format } from 'date-fns';
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

    const getDraftAndPendingInvoices = await this.prisma.invoice.groupBy({
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

    const getPaidInvoices = await this.prisma.invoice.groupBy({
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
          in: ['paid'],
        },
      },
    });

    const getSumByMonthInvoice = (invoiceObject: any) => {
      // * Aggregates by months to get the sum
      const monthList: any = {};
      const invoiceTotalDateStream = [];
      for (let i = 0; i < invoiceObject.length; i++) {
        const dateConvertedToMonth = format(invoiceObject[i].date, 'M');

        if (!monthList[dateConvertedToMonth]) {
          monthList[dateConvertedToMonth] = invoiceObject[i].total;
        } else {
          monthList[dateConvertedToMonth] += invoiceObject[i].total;
        }
      }
      // * Create stream of invoice on a 1 year period
      for (let i = 1; i < 13; i++) {
        if (!monthList[i]) {
          monthList[i] = 0;
        }
      }

      // * Push all the total into an array stream

      Object.keys(monthList).map((key) => {
        invoiceTotalDateStream.push(monthList[key]);
      });

      return invoiceTotalDateStream;
    };

    console.log(getSumByMonthInvoice(getDraftAndPendingInvoices));
    console.log(getSumByMonthInvoice(getPaidInvoices));

    // * All pending and draft Invoices
    const invoiceTotal = await getSumByMonthInvoice(getDraftAndPendingInvoices);

    // * All paid invoices
    const netProfit = await getSumByMonthInvoice(getPaidInvoices);

    const newCustomer: any = customerData;

    newCustomer.meta = {
      invoiceTotal,
      netProfit,
    };

    return newCustomer;
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
