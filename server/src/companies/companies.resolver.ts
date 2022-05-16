import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CompaniesService } from './companies.service';

@Resolver('Company')
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation('createCompany')
  create(
    @Args('createCompanyInput') createCompanyInput: Prisma.CompanyCreateInput,
  ) {
    return this.companiesService.create(createCompanyInput);
  }

  @Query('companies')
  findAll() {
    return this.companiesService.findAll();
  }

  @Query('company')
  findOne(@Args('id') id: string) {
    return this.companiesService.findOne(id);
  }

  // @Mutation('updateCompany')
  // update(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
  //   return this.companiesService.update(
  //     updateCompanyInput.id,
  //     updateCompanyInput,
  //   );
  // }

  @Mutation('removeCompany')
  remove(@Args('id') id: string) {
    return this.companiesService.remove(id);
  }
}
