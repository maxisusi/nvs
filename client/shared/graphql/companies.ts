import { gql } from '@apollo/client';

export const GET_ALL_COMPANIES = gql`
  query Query {
    companies {
      id
    }
  }
`;
