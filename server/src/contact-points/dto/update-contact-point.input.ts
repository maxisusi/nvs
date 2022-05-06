import { CreateContactPointInput } from './create-contact-point.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactPointInput extends PartialType(CreateContactPointInput) {
  id: number;
}
