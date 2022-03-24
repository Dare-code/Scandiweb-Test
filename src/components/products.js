import React, { Component } from "react";
import Product from "./product";
import { client } from "../index";
import { getCategory } from "../queries/category";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }
    componentDidMount = async () => {
        const products = await client.query({
            query: getCategory,
            variables: {
                name: this.props.categoryName,
            },
        });
        this.setState(products.data.category);
    };
    render() {
        return (
            <>
                <div className="title">
                    {this.props.categoryName.toLowerCase() === "all"
                        ? "All categories"
                        : this.props.categoryName}
                </div>
                <div className="productList">
                    {this.state.products.map((product) => {
                        return (
                            <Product key={product.id} product={product} {...this.props} />
                        );
                    })}
                </div>
            </>
        );
    }
}

export default Products;
