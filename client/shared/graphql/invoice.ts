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

export const DEL_INVOICE = gql`
  mutation Mutation($removeInvoiceId: String!) {
    removeInvoice(id: $removeInvoiceId) {
      invoiceNumber
    }
  }
`;
