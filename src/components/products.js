import React, { Component } from "react";
import Product from "./product";
import { Link } from "react-router-dom";

class Products extends Component {
    render() {
        const { data } = this.props;
        return (
            <>
                <div className="title">
                    {this.props.categoryName} Category
                </div>
                <div className="productList">
                    {data.map((product) => {
                        return (
                                <Link
                                    key={product.id}
                                    className="product"
                                    to={`/${product.id}`}
                                >
                                    <Product product={product} />
                                </Link>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default Products;
