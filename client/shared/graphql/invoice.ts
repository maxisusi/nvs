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
