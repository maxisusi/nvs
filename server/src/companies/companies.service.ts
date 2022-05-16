import { Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';

@Injectable()
export class CompaniesService {
  create(createCompanyInput: CreateCompanyInput) {
    return 'This action adds a new company';
  }

  findAll() {
    return [
      {
        exampleField: 1,
      },
    ];
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
