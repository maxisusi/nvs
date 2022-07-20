import { gql } from '@apollo/client';

export const GET_INVOICES_FOR_GRID = gql`
  query Invoices {
    invoices {
      id
      date
      invoiceNumber
      customer {
        firstName
        lastName
      }
      status
      total
    }
  }
`;

export const GET_INVOICE_VIEW = gql`
  query Invoice($invoiceId: String!) {
    invoice(id: $invoiceId) {
      id
      date
      dueDate
      invoiceNumber
      status
      taxes
      total
      remarks
      customer {
        id
        firstName
        lastName
        postalCode
        city
        address
      }
      company {
        name
        address
        image
        postalCode
        city
      }
      createdAt
      updatedAt
      entry
    }
  }
`;

export const DEL_INVOICE = gql`
  mutation Mutation($removeInvoiceId: String!) {
    removeInvoice(id: $removeInvoiceId) {
      invoiceNumber
    }
  }
`;

export const CREATE_INVOICE = gql`
  mutation Mutation($createInvoiceInput: CreateInvoiceInput!) {
    createInvoice(createInvoiceInput: $createInvoiceInput) {
      id
    }
  }
`;

export const UPDATE_INVOICE_STATUS = gql`
  mutation Mutation($updateInvoiceInput: UpdateInvoiceInput!) {
    updateInvoice(updateInvoiceInput: $updateInvoiceInput) {
      status
    }
  }
`;
