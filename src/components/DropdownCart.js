import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetPriceBySymbol } from "../utils/helper";

class DropdownCart extends Component {
    render() {
        const { cart } = this.props;
        let total = 0;
        return (
            <>
            <div className="dropdownBackground"  onClick={this.props.toggleDropdown} />
            <div className="headerTemp">
                <span className="headerTempTitle">
                    My bag : {cart[0].quantity} item
                </span>
                <ul className="showDropdownCart">
                    {cart.map((product) => {
                        const price = GetPriceBySymbol(product.prices, this.props.currency)
                        total += price.amount*product.quantity;
                        return (
                            <li key={product.name}>
                                <div className="cartDetails">
                                    <h2 className="cartDropdownName">{product.name}</h2>
                                    <h2 className="cartDropdownName">{product.brand}</h2>
                                    <p className="cartDropdownCurrency">
                                        {price.currency.symbol}
                                        {price.amount}
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
                                        <div className="cartDropdownCounter" onClick={()=>{
                                        this.props.updateProductQuantity(product, product.quantity+1)
                                    }}>
                                            <span>+</span>
                                        </div>
                                        <div className="cartDropdownNumber">
                                            <span>{product.quantity}</span>
                                        </div>
                                        <div className="cartDropdownCounterBottom" onClick={()=>{
                                        if(product.quantity > 1 ){
                                            this.props.updateProductQuantity(product, product.quantity-1)
                                        }
                                    }}>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div className="cartImage">
                                        <img src={product.gallery[0]} alt="img" />
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>

                <div className="footer">
                    <div className="totalAmount">
                        <span className="totalAmountTitle">Total</span>
                        <span className="totalPrice">{this.props.currency} {total.toFixed(2)}</span>
                    </div>
                    <div className="footerMenu">
                        <Link onClick={this.props.toggleDropdown} className="viewAllBtn" to="/cart">
                            View Bag
                        </Link>
                        <Link className="checkBtn" to="/cart">
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
