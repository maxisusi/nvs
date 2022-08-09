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

export const GET_CUSTOMER_TO_VIEW = gql`
  query Query($customerId: String!) {
    customer(id: $customerId) {
      id
      firstName
      lastName
      email
      mobile
      phone
      address
      postalCode
      countryName
      city
      region
      contactPoint {
        name
        telephone
        email
      }
      invoice {
        invoiceNumber
        id
        status
        total
        date
      }
      meta {
        invoiceTotal
        netProfit
      }
      createdAt
      updatedAt
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
      id
      firstName
      lastName
      postalCode
      city
      address
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
      id
    }
  }
`;
