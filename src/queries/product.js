import { gql } from "@apollo/client";

export const product = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      description
      inStock
      category
      attributes {
        name
        type
        items {
          displayValue
          value
          id
        }
      }
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
