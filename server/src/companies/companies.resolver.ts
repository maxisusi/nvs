import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';

@Resolver('Company')
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation('createCompany')
  create(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companiesService.create(createCompanyInput);
  }

  @Query('companies')
  findAll() {
    return this.companiesService.findAll();
  }

  @Query('company')
  findOne(@Args('id') id: number) {
    return this.companiesService.findOne(id);
  }

  @Mutation('updateCompany')
  update(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
    return this.companiesService.update(updateCompanyInput.id, updateCompanyInput);
  }

  @Mutation('removeCompany')
  remove(@Args('id') id: number) {
    return this.companiesService.remove(id);
  }
}
