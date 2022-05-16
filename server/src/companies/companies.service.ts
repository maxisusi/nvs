import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCompanyInput } from './dto/update-company.input';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCompanyInput: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: createCompanyInput,
    });
  }

  findAll() {
    return this.prisma.company.findMany({});
  }

  findOne(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  update(id: string, updateCompanyInput: UpdateCompanyInput) {
    return `This action updates a #${id} company`;
  }

  remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
