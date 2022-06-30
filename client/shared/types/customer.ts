import { ContactPoint } from './contactPoint';
import { DateTime, Nullable } from './general';
import { Invoice } from './invoice';

export interface Customer {
  id: Nullable<string>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  email?: Nullable<string>;
  mobile?: Nullable<string>;
  phone?: Nullable<string>;
  address?: Nullable<string>;
  postalCode?: Nullable<string>;
  countryName?: Nullable<string>;
  invoice?: Nullable<Nullable<Invoice>[]>;
  city?: Nullable<string>;
  region?: Nullable<string>;
  contactPoint?: Nullable<Nullable<ContactPoint>[]>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
}
