import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query Customers {
    customers {
      id
      firstName
      lastName
      phone
      createdAt
    }
  }
`;

export const DEL_CUSTOMER = gql`
  mutation Mutation($removeCustomerId: String!) {
    removeCustomer(id: $removeCustomerId) {
      firstName
    }
  }
`;
