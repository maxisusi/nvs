
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCustomerInput {
    firstName: string;
    lastName: string;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    phone?: Nullable<string>;
    address: string;
    postalCode: string;
    countryName: string;
    city: string;
    region: string;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCustomerInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    phone?: Nullable<string>;
    address?: Nullable<string>;
    postalCode?: Nullable<string>;
    countryName?: Nullable<string>;
    city?: Nullable<string>;
    region?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
}

export class OrderByParams {
    input?: Nullable<string>;
}

export class Customer {
    id: string;
    firstName: string;
    lastName: string;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    phone?: Nullable<string>;
    address: string;
    postalCode: string;
    countryName: string;
    city: string;
    region: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract customers(orderBy?: Nullable<OrderByParams>): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;

    abstract customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;
}

export abstract class IMutation {
    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;

    abstract updateCustomer(updateCustomerInput: UpdateCustomerInput): Customer | Promise<Customer>;

    abstract removeCustomer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
