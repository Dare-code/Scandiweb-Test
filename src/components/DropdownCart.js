import React, { Component } from "react";
import { Link } from "react-router-dom";
import { product } from "../queries/query";
class DropdownCart extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="headerTemp">
                <div>My bag : {product.count} item</div>
                <div className="mainHeader">
                    {this.props.cart.map((product) => (
                        <>
                            <div>
                                <p>{product.name}</p>
                            </div>
                            <div>
                                <p>{product.count}</p>
                            </div>
                            <div>
                                <div>
                                    <img
                                        className="headerImg"
                                        src={product.gallery[0]}
                                        alt="img"
                                    />
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <Link to="/cart">View All Bags</Link>
            </div>
        );
    }
}

export default DropdownCart;
