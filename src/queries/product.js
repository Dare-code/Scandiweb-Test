import { gql } from "@apollo/client";

export const product = gql`
  query products($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      description
      inStock
      category
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
