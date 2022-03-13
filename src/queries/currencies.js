import { gql } from "@apollo/client";

export const currencies = gql`
  query currencies {
    currencies {
      label
      symbol
    }
  }
`;
