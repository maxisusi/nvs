
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
    address: string;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    phone?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCustomerInput {
    id: number;
}

export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    phone?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract customers(): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;

    abstract customer(id: number): Nullable<Customer> | Promise<Nullable<Customer>>;
}

export abstract class IMutation {
    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;

    abstract updateCustomer(updateCustomerInput: UpdateCustomerInput): Customer | Promise<Customer>;

    abstract removeCustomer(id: number): Nullable<Customer> | Promise<Nullable<Customer>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
