import "../App.css";
import React, { Component } from "react";
import Product from "./product";
import { Link } from "react-router-dom";

class Products extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="productList">
                {this.props.data.map(product => {
                    return (
                        <Link to={`/${product.id}`} key={product.id}>
                            <Product product={product} />
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default Products;
