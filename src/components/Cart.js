import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props, "Dropdown");
        return (
            <div className="header-temp">Cart
                <ul>
                    {this.props.cart.map(product => (
                        <li>{product.name} -  {product.count}</li>
                    ))}
                </ul>

            </div>
        );
    }
}

export default Cart;