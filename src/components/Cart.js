import React, { Component } from "react";

class Cart extends Component {
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