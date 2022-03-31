import React, { Component } from "react";
import { GetPriceBySymbol } from "../utils/helper";
import Shopping from "../assets/images/shopping.svg";
import { Link } from "react-router-dom";

class Product extends Component {
  constructor(props) {
    super(props);
    this.updateAttributesForProduct =
      this.updateAttributesForProductHander.bind(this);
  }

  updateAttributesForProductHander(key, value) {
    this.props.addToCart({
      ...this.props.product,
      selectedAttributes: {
        ...this.props.product.selectedAttributes,
        [key]: value,
      },
    });
  }

  render() {
    const { gallery, name, inStock, prices, brand, attributes } = this.props.product;
    const price = GetPriceBySymbol(prices, this.props.currency);
    if (!this.props.currency) {
      return <>loading...</>;
    }
    return (
      <div className={"productWrapper" + (!inStock ? " outofstock" : "")}>
        <div
          className="productPicture"
          style={{
            backgroundImage: `url(${gallery[0]})`,
          }}
        >
          <Link className="productLink" to={`/${this.props.product.id}`}></Link>
          {!inStock ? (
            <span className="outofstockMessage">Out of stock</span>
          ) : null}
          <img
            src={Shopping}
            onClick={() => {
              this.updateAttributesForProduct(attributes.attributes, {
                option: attributes[0].items[0].value,
                attributes: attributes[0].items[0].value,
              });
            }}
            alt="in cart"
            className="productInCart inlineAddToCart"
          />
        </div>
        <p className="productDescription">{name}</p>
        <p className="productDescription">{brand}</p>
        <p className="productPrice">
          <span>{this.props.currency}</span>
          {price.amount.toFixed(2)}
        </p>
      </div>
    );
  }
}

export default Product;
