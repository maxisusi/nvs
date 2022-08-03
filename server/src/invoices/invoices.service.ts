import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { PrismaService } from 'prisma/prisma.service';

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
    invoiceTotalDateStream.push(monthList[key].toFixed(2));
  });

  return invoiceTotalDateStream;
};

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createInvoiceInput: any) {
    console.log('Creating Invoice');
    const {
      date,
      dueDate,
      status,
      taxes,
      terms,
      total,
      remarks,
      customerId,
      companyId,
      entryList,
    } = createInvoiceInput;

    return this.prisma.invoice.create({
      data: {
        date,
        dueDate,
        status,
        taxes,
        terms,
        total,
        remarks,
        company: {
          connect: {
            id: companyId,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
        entry: {
          createMany: {
            data: entryList,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.invoice.findMany({
      include: {
        company: true,
        customer: true,
        entry: true,
      },
    });
  }

  async getPendingInvoiceStream() {
    const getDraftAndPendingInvoices = await this.prisma.invoice.groupBy({
      orderBy: {
        _min: {
          date: 'asc',
        },
      },
      by: ['total', 'date'],
      where: {
        status: {
          in: ['draft', 'pending'],
        },
      },
    });

    return getSumByMonthInvoice(getDraftAndPendingInvoices);
  }
  async getNetInvoicesStream() {
    const getPaidInvoices = await this.prisma.invoice.groupBy({
      orderBy: {
        _min: {
          date: 'asc',
        },
      },
      by: ['total', 'date'],
      where: {
        status: {
          in: ['paid'],
        },
      },
    });
    console.log(getPaidInvoices);
    return getSumByMonthInvoice(getPaidInvoices);
  }

  async getSum() {
    const sum = await this.prisma.invoice.aggregate({
      _sum: {
        total: true,
      },
    });
    return sum._sum.total;
  }

  getInvoiceCount() {
    return this.prisma.invoice.count({});
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { company: true, customer: true, entry: true },
    });
  }

  update(updateInvoiceInput: any) {
    return this.prisma.invoice.update({
      include: { entry: true },
      where: { id: updateInvoiceInput.id as string },
      data: {
        date: updateInvoiceInput.date,
        dueDate: updateInvoiceInput.dueDate,
        status: updateInvoiceInput.status,
        taxes: updateInvoiceInput.taxes,
        total: updateInvoiceInput.total,
        remarks: updateInvoiceInput.remarks,
        entry: {
          deleteMany: {},
          createMany: { data: updateInvoiceInput.entry },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
