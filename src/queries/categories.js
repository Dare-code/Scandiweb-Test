import { gql } from "@apollo/client";

export const getCategories = gql`
  query categories {
    categories {
      name
      products {
        id
        name
        description
        gallery
        brand
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        category
      }
    }
  }
`;