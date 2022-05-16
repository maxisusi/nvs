import { CreateCompanyInput } from './create-company.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  id: number;
}
