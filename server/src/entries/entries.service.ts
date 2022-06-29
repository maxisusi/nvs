import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEntryInput, UpdateEntryInput } from 'src/graphql';

@Injectable()
export class EntriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEntryInput: CreateEntryInput) {
    const { description, invoiceId, quantity, rate, total } = createEntryInput;
    return this.prisma.entry.create({
      data: {
        description,
        quantity,
        rate,
        total,
        invoice: {
          connect: {
            id: invoiceId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.entry.findMany({});
  }

  findOne(id: string) {
    return this.prisma.entry.findUnique({ where: { id } });
  }

  update(updateEntryInput: UpdateEntryInput) {
    return this.prisma.entry.update({
      where: { id: updateEntryInput.id as string },
      data: updateEntryInput,
    });
  }

  remove(id: string) {
    return this.prisma.entry.delete({ where: { id } });
  }
}
