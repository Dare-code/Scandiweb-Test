import { gql } from "@apollo/client";

export const getProduct = gql`
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
