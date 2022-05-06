
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateContactPointInput {
    name: string;
    telephone?: Nullable<string>;
    email?: Nullable<string>;
    address?: Nullable<string>;
    postalCode?: Nullable<string>;
    region?: Nullable<string>;
    city?: Nullable<string>;
    countryName?: Nullable<string>;
}

export class UpdateContactPointInput {
    id: number;
    name: string;
    telephone?: Nullable<string>;
    email?: Nullable<string>;
    address?: Nullable<string>;
    postalCode?: Nullable<string>;
    region?: Nullable<string>;
    city?: Nullable<string>;
    countryName?: Nullable<string>;
}

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

export class ContactPoint {
    id: string;
    name: string;
    telephone?: Nullable<string>;
    email?: Nullable<string>;
    address?: Nullable<string>;
    postalCode?: Nullable<string>;
    region?: Nullable<string>;
    city?: Nullable<string>;
    countryName?: Nullable<string>;
}

export abstract class IQuery {
    abstract contactPoints(): Nullable<ContactPoint>[] | Promise<Nullable<ContactPoint>[]>;

    abstract contactPoint(id: number): Nullable<ContactPoint> | Promise<Nullable<ContactPoint>>;

    abstract customers(orderBy?: Nullable<OrderByParams>): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;

    abstract customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;
}

export abstract class IMutation {
    abstract createContactPoint(createContactPointInput: CreateContactPointInput): ContactPoint | Promise<ContactPoint>;

    abstract updateContactPoint(updateContactPointInput: UpdateContactPointInput): ContactPoint | Promise<ContactPoint>;

    abstract removeContactPoint(id: number): Nullable<ContactPoint> | Promise<Nullable<ContactPoint>>;

    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;

    abstract updateCustomer(updateCustomerInput: UpdateCustomerInput): Customer | Promise<Customer>;

    abstract removeCustomer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;
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

export type DateTime = any;
type Nullable<T> = T | null;
