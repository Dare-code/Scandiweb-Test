import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    GetPriceBySymbol,
    GetProductsTotalQuantityFromCart,
} from "../utils/helper";
import deleteBtn from "../assets/images/deletebutton.svg";
import SelectedAtributes from "./selectedatributes";

class DropdownCart extends Component {
    render() {
        const { cart, removeFromCart } = this.props;
        let total = 0;
        const cartItems = GetProductsTotalQuantityFromCart(cart);
        return (
            <>
                <div
                    className={this.props.toggleDropdown ? "dropdownMainBackround" : null}
                    onClick={this.props.toggleDropdown}
                />
                <div
                    className="dropdownBackground"
                    onClick={this.props.toggleDropdown}
                />
                <div className="headerTemp">
                    <span className="headerTempTitle">
                        My bag :{" "}
                        <span>
                            {cartItems} item{cartItems === 1 ? "" : "s"}
                        </span>
                    </span>
                    <ul className="showDropdownCart">
                        {cart.map((product, i) => {
                            const price = GetPriceBySymbol(
                                product.prices,
                                this.props.currency
                            );
                            total += price.amount * product.quantity;
                            return (
                                <li
                                    key={`${product.id}-cart-item-wrapper-${JSON.stringify(
                                        product.selectedAttributes
                                    )}`}
                                >
                                    <div className="cartDetails">
                                        <h2 className="cartDropdownName">{product.name}</h2>
                                        <h2 className="cartDropdownName">{product.brand}</h2>
                                        <p className="cartDropdownCurrency">
                                            {price.currency.symbol}
                                            {price.amount}
                                        </p>
                                        <div className="dropdowncartattr">
                                            <SelectedAtributes
                                                attributes={product.selectedAttributes}
                                            />
                                        </div>
                                    </div>
                                    <div className="cartQuantity">
                                        <div>
                                            <div
                                                className="cartDropdownCounter"
                                                onClick={() => {
                                                    this.props.updateProductQuantity(
                                                        i,
                                                        product.quantity + 1
                                                    );
                                                }}
                                            >
                                                <span>+</span>
                                            </div>
                                            <div className="cartDropdownNumber">
                                                <span>{product.quantity}</span>
                                            </div>
                                            <div
                                                className="cartDropdownCounterBottom"
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
                                        <div className="cartImage">
                                            <div className="cartImageInner">
                                                <img
                                                    className="deleteButton showDeleteBtn"
                                                    src={deleteBtn}
                                                    alt="deleteImg"
                                                    onClick={() => {
                                                        if (cart.length === 1) {
                                                            this.props.toggleDropdown();
                                                        }
                                                        removeFromCart(i);
                                                    }}
                                                />
                                            </div>
                                            <img
                                                className="mainImage"
                                                src={product.gallery[0]}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="footer">
                        <div className="totalAmount">
                            <span className="totalAmountTitle">Total</span>
                            <span className="totalPrice">
                                {this.props.currency} {total.toFixed(2)}
                            </span>
                        </div>
                        <div className="footerMenu">
                            <Link
                                onClick={this.props.toggleDropdown}
                                className="viewAllBtn"
                                to="/cart"
                            >
                                View Bag
                            </Link>
                            <Link
                                className="checkBtn"
                                onClick={this.props.toggleDropdown}
                                to="/cart"
                            >
                                Check Out
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DropdownCart;
