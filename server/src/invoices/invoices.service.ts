import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createInvoiceInput: any) {
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

  findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { company: true, customer: true, entry: true },
    });
  }

  update(updateInvoiceInput: Prisma.InvoiceUncheckedUpdateInput) {
    return this.prisma.invoice.update({
      where: { id: updateInvoiceInput.id as string },
      data: updateInvoiceInput,
    });
  }

  remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
