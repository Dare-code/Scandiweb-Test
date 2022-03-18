import React, { Component } from "react";
import { GetPriceBySymbol, IsProductInCart } from "../utils/helper";
import Shopping from "../assets/images/shopping.svg";

class Product extends Component {
  render() {
    const { gallery, name, inStock, prices } = this.props.product;
    const price = GetPriceBySymbol(prices, this.props.currency)
    const inCart = IsProductInCart(this.props.cart, this.props.product)
    return (
      <div className={"productWrapper" + (inStock ? " outofstock" : "")}>
        <div className="productPicture" style={{
          backgroundImage: `url(${gallery[0]})`
        }}>
          {inStock ? <span className="outofstockMessage">Out of stock</span> : null}
          {inCart ? <img src={Shopping} alt="in cart" className="productInCart" /> : null}
        </div>
        <p className="productDescription">{name}</p>
        
        <p className="productPrice">
          <span>{this.props.currency}</span>
          {price.amount.toFixed(2)}
        </p>
      </div>

    );
  }
}

export default Product;
