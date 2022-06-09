import { gql } from '@apollo/client';

export const GET_CUSTOMERS_GRID = gql`
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

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      firstName
      lastName
    }
  }
`;
