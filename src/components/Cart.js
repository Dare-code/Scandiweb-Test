import React, { Component } from "react";

class Cart extends Component {
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
            <div className="header-temp">
                <h2 className="cartTitle">Cart</h2>
                <ul className="showCart">
                    {this.props.cart.map((product) => (
                        <li key={product.quantity}>
                            <div className="cartDetails">
                                <h2 className="cartName">{product.name}</h2>
                                <p className="cartBrand">{product.brand}</p>
                                <p className="cartCurrency">
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
                            <div className="cartQuantity">
                                <div>
                                    <div className="cartCounter"><span>+</span></div>
                                    <div className="cartNumber"><span>{product.quantity}</span></div>
                                    <div className="cartCounter"><span>-</span></div>
                                </div>
                                <div className="cartImage">
                                    <img src={product.gallery[0]} alt='img' />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Cart;
