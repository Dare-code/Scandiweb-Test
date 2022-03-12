import { gql } from "@apollo/client";

export const product = gql`
  query products($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
    }
  }
`;

export const category = gql`
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

export const categories = gql`
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

export const currencies = gql`
  query currencies {
    currencies {
      label
      symbol
    }
  }
`;
