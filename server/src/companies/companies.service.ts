import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCompanyInput } from 'src/graphql';

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

  update(updateCompanyInput: UpdateCompanyInput) {
    return this.prisma.company.update({
      where: { id: updateCompanyInput.id as string },
      data: updateCompanyInput,
    });
  }

  remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
