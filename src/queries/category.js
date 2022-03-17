import { gql } from "@apollo/client";

export const getCategory = gql`
  query category {
    category {
      name
      products {
        id
        name
        brand
        gallery
        category
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
