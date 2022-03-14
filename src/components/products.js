import React, { Component } from "react";
import Product from "./product";
import { Link } from "react-router-dom";

class Products extends Component {
    render() {
        const { data } = this.props;
        return (
            <>
                <div className="productList">
                    {data.map((product) => {
                        return (
                            <div key={product.id}>
                                <div className="title">
                                    {product.category}
                                </div>
                                <Link
                                    className="product"
                                    to={`/${product.id}`}
                                >
                                    <Product product={product} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default Products;
