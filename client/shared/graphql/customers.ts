import { gql } from '@apollo/client';

export const GET_CUSTOMERS_FOR_GRID = gql`
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

export const GET_CUSTOMER_TO_EDIT = gql`
  query Customer($customerId: String!) {
    customer(id: $customerId) {
      address
      city
      countryName
      email
      firstName
      id
      lastName
      mobile
      phone
      postalCode
      region
    }
  }
`;

export const GET_CUSTOMERS_LIST = gql`
  query Customers {
    customers {
      firstName
      lastName
      postalCode
      city
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

export const UPDATE_CUSTOMER = gql`
  mutation Mutation($updateCustomerInput: UpdateCustomerInput!) {
    updateCustomer(updateCustomerInput: $updateCustomerInput) {
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
