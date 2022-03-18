import React, { Component } from "react";
import Product from "./product";
import { Link } from "react-router-dom";

class Products extends Component {
    
    render() {

        const { filtered } = this.props;
        return (
            <>
                <div className="title">
                    {this.props.categoryName.toLowerCase() === "all" ? "All categories" : this.props.categoryName}
                </div>
                <div className="productList">
                    {filtered.map((product) => {
                        return (
                                <Link
                                    key={product.id}
                                    className="product"
                                    to={`/${product.id}`}
                                >
                                    <Product product={product} {...this.props} />
                                </Link>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default Products;
