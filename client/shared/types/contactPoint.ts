import { Nullable } from './general';

export interface ContactPoint {
  id?: Nullable<string>;
  name?: Nullable<string>;
  telephone?: Nullable<string>;
  email?: Nullable<string>;
  address?: Nullable<string>;
  postalCode?: Nullable<string>;
  region?: Nullable<string>;
  city?: Nullable<string>;
  countryName?: Nullable<string>;
}
