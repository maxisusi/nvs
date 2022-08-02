import { gql } from '@apollo/client';

export const GET_DASHBOARD_STATS = gql`
  query Query {
    sumAllInvoices
    customerCount
    invoiceCount
  }
`;
