import React, { Component } from "react";
import { Link } from "react-router-dom";

class DropdownCart extends Component {
    render() {
        const { dropDownMenu, cart } = this.props;
        return (
            <div className="headerTemp">
                <span className="headerTempTitle">
                    My bag : {cart[0].quantity} item
                </span>
                <ul className="showDropdownCart">
                    {cart.map((product) => (
                        <li key={product.name}>
                            <div className="cartDetails">
                                <h2 className="cartDropdownName">{product.name}</h2>
                                <h2 className="cartDropdownName">{product.brand}</h2>
                                <p className="cartDropdownCurrency">
                                    {product.prices[0].currency.symbol}
                                    {product.prices[0].amount}
                                </p>
                                <div className="sizeDropdownBox">
                                    {product.attributes.map((atribute) => {
                                        return atribute.items.map((value) => {
                                            return (
                                                <div key={value.id} className="dropdownInactive">
                                                    <span className="size">{value.value}</span>
                                                </div>
                                            );
                                        });
                                    })}
                                </div>
                            </div>
                            <div className="cartQuantity">
                                <div>
                                    <div className="cartDropdownCounter">
                                        <span>+</span>
                                    </div>
                                    <div className="cartDropdownNumber">
                                        <span>{product.quantity}</span>
                                    </div>
                                    <div className="cartDropdownCounterBottom">
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
                    <div className="totalAmount">
                        <span className="totalAmountTitle">Total</span>
                        <span className="totalPrice">100%</span>
                    </div>
                    <div className="footerMenu">
                        <Link onClick={dropDownMenu} className="viewAllBtn" to="/cart">
                            View Bag
                        </Link>
                        <Link className="checkBtn" to="/cart">
                            Check Out
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DropdownCart;
