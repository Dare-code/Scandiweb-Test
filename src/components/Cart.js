import React, { Component } from "react";

class Cart extends Component {
    // eslint-disable-next-line no-useless-constructor
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