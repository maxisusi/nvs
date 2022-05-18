import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEntryInput } from 'src/graphql';
import { UpdateEntryInput } from './dto/update-entry.input';

@Injectable()
export class EntriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEntryInput: CreateEntryInput) {
    const { date, description, invoiceId, quantity, rate, total } =
      createEntryInput;
    return this.prisma.entry.create({
      data: {
        date,
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

  update(id: number, updateEntryInput: UpdateEntryInput) {
    return `This action updates a #${id} entry`;
  }

  remove(id: string) {
    return this.prisma.entry.delete({ where: { id } });
  }
}
