import React, { Component } from "react";

class Product extends Component {
  render() {
    const { gallery, name, inStock, prices } = this.props.product;
    return (
      <>
        <div className={!inStock ? 'default' : 'opacity'}>
          <div className="main">
            <img className="picture" src={gallery[0]} alt={name} />
            {inStock ? <span className="productStock">Out of stock</span> : null}
          </div>
          <p className="productDescription">{name}</p>
          <p className="productPrice">
            <span>{prices[0].currency.symbol}</span>
            {Math.round(prices[0].amount)}
          </p>
        </div>
      </>

    );
  }
}

export default Product;
