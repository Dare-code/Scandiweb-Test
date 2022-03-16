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
                                    {product.attributes.map((val) => {
                                        return val.items.map((el) => {
                                            return (
                                                <div key={el.id} className="dropdownInactive">
                                                    <span className="size">{el.value}</span>
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
                    <Link onClick={dropDownMenu} className="viewAllBtn" to="/cart">
                        View Bag
                    </Link>
                    <Link className="checkBtn" to="/cart">
                        Check Out
                    </Link>
                </div>
            </div>
        );
    }
}

export default DropdownCart;
