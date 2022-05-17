import { CreateEntryInput } from './create-entry.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEntryInput extends PartialType(CreateEntryInput) {
  id: number;
}
