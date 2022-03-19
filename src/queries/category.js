import { gql } from "@apollo/client";

export const getCategory = gql`
query getCategoryProducts($name: String!) {
  category(input:{title:$name}) {
    name,
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
