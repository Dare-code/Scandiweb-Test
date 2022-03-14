import React, { Component } from "react";
import { Link } from "react-router-dom";
import { product } from "../queries/product";

class DropdownCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [
                { id: 1, text: "XS" },
                { id: 2, text: "S" },
            ],
        };
    }
    render() {
        return (
            <div className="headerTemp">
                <span className="headerTempTitle">
                    My bag : {product.quantity} item
                </span>
                <ul className="showCart">
                    {this.props.cart.map((product) => (
                        <li key={product.name}>
                            <div className="cartDetails">
                                <h2 className="cartDropdownName">{product.name}</h2>
                                <p className="cartDropdownCurrency">
                                    {product.prices[0].currency.symbol}
                                    {product.prices[0].amount}
                                </p>
                                <div className="sizeBox">
                                    {this.state.values.map((val) => (
                                        <div key={val.id} className="sizeBoxInactive">
                                            <span className="size">{val.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {console.log(product.quantity)}
                            <div className="cartQuantity">
                                <div>
                                    <div className="cartDropdownCounter">
                                        <span>+</span>
                                    </div>
                                    <div className="cartDropdownNumber">
                                        <span>{product.quantity}</span>
                                    </div>
                                    <div className="cartDropdownCounter">
                                        <span>-</span>
                                    </div>
                                </div>
                                <div className="cartImage">
                                    <img src={product.gallery[0]} alt="img" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="footer">
                    <Link className="viewAllBtn" to="/cart">View Bag</Link>
                    <Link  className="checkBtn" to="/cart">Check Out</Link>
                </div>
            </div>
        );
    }
}

export default DropdownCart;
