import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

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

  async getSum() {
    const sum = await this.prisma.invoice.aggregate({
      _sum: {
        total: true,
      },
    });

    return sum._sum.total;
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
