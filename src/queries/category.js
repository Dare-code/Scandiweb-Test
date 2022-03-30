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
      category
    }
  }
}

`;
