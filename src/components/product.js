import React, { Component } from "react";
import "../App.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {gallery, name} = this.props.product;
    return (
      <div className="product">
        <img
          className="productPicture"
          src={gallery[0]}
          alt={name}
        />
        <h2>{name}</h2>
      </div>
    );
  }
}

export default Product;
