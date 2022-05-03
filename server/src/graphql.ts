
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCustomerInput {
    exampleField?: Nullable<number>;
}

export class UpdateCustomerInput {
    id: number;
}

export class Customer {
    exampleField?: Nullable<number>;
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

type Nullable<T> = T | null;
