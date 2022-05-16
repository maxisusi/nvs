import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCompanyInput: CreateCompanyInput) {
    return 'This action adds a new company';
  }

  findAll() {
    return this.prisma.company.findMany({});
  }

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  update(id: string, updateCompanyInput: UpdateCompanyInput) {
    return `This action updates a #${id} company`;
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
