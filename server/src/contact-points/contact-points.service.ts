import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactPointInput } from './dto/create-contact-point.input';
import { UpdateContactPointInput } from './dto/update-contact-point.input';

@Injectable()
export class ContactPointsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createContactPointInput: CreateContactPointInput) {
    return 'This action adds a new contactPoint';
  }

  findAll() {
    return this.prisma.contactPoint.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} contactPoint`;
  }

  update(id: number, updateContactPointInput: UpdateContactPointInput) {
    return `This action updates a #${id} contactPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactPoint`;
  }
}
