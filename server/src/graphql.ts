
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCompanyInput {
    name: string;
    telephone: string;
    image: string;
    address: string;
    postalCode: string;
    region: string;
    city: string;
    countryName: string;
}

export class UpdateCompanyInput {
    id: string;
    name?: Nullable<string>;
    telephone?: Nullable<string>;
    image?: Nullable<string>;
    address?: Nullable<string>;
    postalCode?: Nullable<string>;
    region?: Nullable<string>;
    city?: Nullable<string>;
    countryName?: Nullable<string>;
}

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

export class CreateCustomerInput {
    firstName: string;
    lastName: string;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    phone?: Nullable<string>;
    contactPointId?: Nullable<string>;
    address: string;
    postalCode: string;
    countryName: string;
    city: string;
    region: string;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCustomerInput {
    id: string;
    contactPointId?: Nullable<string>;
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

export class CreateEntryInput {
    description: string;
    quantity: number;
    rate: number;
    total: number;
    invoiceId: string;
}

export class UpdateEntryInput {
    id: string;
    description?: Nullable<string>;
    quantity?: Nullable<number>;
    rate?: Nullable<number>;
    total?: Nullable<number>;
}

export class CreateInvoiceInput {
    date: DateTime;
    dueDate: DateTime;
    status: string;
    terms: string;
    taxes: number;
    total: number;
    remarks?: Nullable<string>;
    customerId: string;
    companyId: string;
    entryList?: Nullable<NewEntry[]>;
}

export class NewEntry {
    date?: Nullable<DateTime>;
    description?: Nullable<string>;
    quantity?: Nullable<number>;
    rate?: Nullable<number>;
    total?: Nullable<number>;
}

export class UpdateInvoiceInput {
    id: string;
    date?: Nullable<DateTime>;
    dueDate?: Nullable<DateTime>;
    status?: Nullable<string>;
    terms?: Nullable<string>;
    taxes?: Nullable<number>;
    total?: Nullable<number>;
    entry?: Nullable<Entry[]>;
    remarks?: Nullable<string>;
    customerId?: Nullable<string>;
    companyId?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
}

export class Company {
    id?: Nullable<string>;
    name?: Nullable<string>;
    telephone?: Nullable<string>;
    image?: Nullable<string>;
    address?: Nullable<string>;
    postalCode?: Nullable<string>;
    region?: Nullable<string>;
    city?: Nullable<string>;
    countryName?: Nullable<string>;
}

export abstract class IQuery {
    abstract companies(): Nullable<Company>[] | Promise<Nullable<Company>[]>;

    abstract company(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract contactPoints(): Nullable<ContactPoint>[] | Promise<Nullable<ContactPoint>[]>;

    abstract contactPoint(id: string): Nullable<ContactPoint> | Promise<Nullable<ContactPoint>>;

    abstract customers(orderBy?: Nullable<OrderByParams>): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;

    abstract customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract customerCount(): number | Promise<number>;

    abstract entries(): Nullable<Entry>[] | Promise<Nullable<Entry>[]>;

    abstract entry(id: string): Nullable<Entry> | Promise<Nullable<Entry>>;

    abstract invoices(): Nullable<Invoice>[] | Promise<Nullable<Invoice>[]>;

    abstract invoice(id: string): Nullable<Invoice> | Promise<Nullable<Invoice>>;

    abstract sumAllInvoices(): number | Promise<number>;
}

export abstract class IMutation {
    abstract createCompany(createCompanyInput: CreateCompanyInput): Company | Promise<Company>;

    abstract updateCompany(updateCompanyInput: UpdateCompanyInput): Company | Promise<Company>;

    abstract removeCompany(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract createContactPoint(createContactPointInput: CreateContactPointInput): ContactPoint | Promise<ContactPoint>;

    abstract updateContactPoint(updateContactPointInput: UpdateContactPointInput): ContactPoint | Promise<ContactPoint>;

    abstract removeContactPoint(id: string): Nullable<ContactPoint> | Promise<Nullable<ContactPoint>>;

    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;

    abstract updateCustomer(updateCustomerInput: UpdateCustomerInput): Customer | Promise<Customer>;

    abstract removeCustomer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract createEntry(createEntryInput: CreateEntryInput): Entry | Promise<Entry>;

    abstract updateEntry(updateEntryInput: UpdateEntryInput): Entry | Promise<Entry>;

    abstract removeEntry(id: string): Nullable<Entry> | Promise<Nullable<Entry>>;

    abstract createInvoice(createInvoiceInput: CreateInvoiceInput): Invoice | Promise<Invoice>;

    abstract updateInvoice(updateInvoiceInput: UpdateInvoiceInput): Invoice | Promise<Invoice>;

    abstract removeInvoice(id: string): Nullable<Invoice> | Promise<Nullable<Invoice>>;
}

export class ContactPoint {
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

export class Customer {
    id?: Nullable<string>;
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
    contactPoint?: Nullable<Nullable<ContactPoint>[]>;
    meta?: Nullable<Meta>;
    invoice?: Nullable<Nullable<Invoice>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class Meta {
    invoiceTotal?: Nullable<number[]>;
    netProfit?: Nullable<number[]>;
}

export class Invoice {
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
    company: Company;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    entry?: Nullable<Entry[]>;
}

export type DateTime = any;
export type Entry = any;
type Nullable<T> = T | null;
