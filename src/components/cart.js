import React, { Component } from "react";
import { GetPriceBySymbol } from "../utils/helper";
import deleteBtn from "../assets/images/deletebutton.svg";
import Thumbnail from "./thumbnail";
import SelectedAtributes from "./selectedatributes";

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
        if (!this.props.cart.length) {
            return <h1 className="titleemptycart">Your cart is empty</h1>;
        }
        return (
            <div className="header-temp">
                <h2 className="cartTitle">Cart</h2>
                <ul className="showCart">
                    {this.props.cart.map((product, i) => {
                        const price = GetPriceBySymbol(product.prices, this.props.currency);
                        return (
                            <li
                                key={`${product.id}-cart-item-wrapper-${JSON.stringify(
                                    product.selectedAttributes
                                )}`}

                                className="cartinner">
                                <div className="cartDetails">
                                    <h2 className="cartName">{product.name}</h2>
                                    <p className="cartBrand">{product.brand}</p>
                                    <p className="cartCurrency">
                                        {price.currency.symbol}
                                        {price.amount}
                                    </p>
                                    <div className="cartAttr">
                                        <SelectedAtributes
                                            attributes={product.selectedAttributes}
                                        />
                                    </div>
                                </div>
                                <div className="cartQuantityInner">
                                    <div
                                        className="cartCounter"
                                        onClick={() => {
                                            this.props.updateProductQuantity(i, product.quantity + 1);
                                        }}
                                    >
                                        <span>+</span>
                                    </div>
                                    <div className="cartNumber">
                                        <span>{product.quantity}</span>
                                    </div>
                                    <div
                                        className="cartCounter"
                                        onClick={() => {
                                            if (product.quantity > 1) {
                                                this.props.updateProductQuantity(
                                                    i,
                                                    product.quantity - 1
                                                );
                                            }
                                        }}
                                    >
                                        <span>-</span>
                                    </div>
                                </div>
                                <div className="cartQuantity">
                                    <div className="cartImage">
                                        <div className="cartImageDelete">
                                            <img
                                                className="cartImageDeleteButton showDeleteButton"
                                                src={deleteBtn}
                                                alt="deleteBtn"
                                                onClick={() => {
                                                    this.props.removeFromCart(i);
                                                }}
                                            />
                                        </div>
                                        <Thumbnail product={product} />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Cart;
