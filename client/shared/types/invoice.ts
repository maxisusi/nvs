import { Customer } from './customer';
import { DateTime, Nullable } from './general';

export interface Invoice {
  id?: Nullable<string>;
  date?: Nullable<DateTime>;
  dueDate?: Nullable<DateTime>;
  invoiceNumber?: Nullable<string>;
  status?: Nullable<string>;
  terms?: Nullable<string>;
  taxes?: Nullable<number>;
  total?: Nullable<number>;
  remarks?: Nullable<string>;
  customer: Customer;
  //   company: Company;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  //   entry?: Nullable<Entry[]>;
}
