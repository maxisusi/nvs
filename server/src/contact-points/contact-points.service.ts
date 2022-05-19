import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ContactPointCreateInput } from 'src/@generated/prisma-nestjs-graphql/contact-point/contact-point-create.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactPointsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createContactPointInput: ContactPointCreateInput) {
    return this.prisma.contactPoint.create({
      data: createContactPointInput,
    });
  }

  findAll() {
    return this.prisma.contactPoint.findMany();
  }

  findOne(id: string) {
    return this.prisma.contactPoint.findUnique({
      where: { id },
    });
  }

  update(updateContactPointInput: Prisma.ContactPointUpdateInput) {
    return this.prisma.contactPoint.update({
      where: { id: updateContactPointInput.id as string },
      data: updateContactPointInput,
    });
  }

  remove(id: string) {
    return this.prisma.contactPoint.delete({
      where: { id },
    });
  }
}
