import React, { Component } from "react";
import { GetPriceBySymbol } from "../utils/helper";

class Cart extends Component {

    render() {
        return (
            <div className="header-temp">
                <h2 className="cartTitle">Cart</h2>
                <ul className="showCart">
                    {this.props.cart.map((product) => {
                        const price = GetPriceBySymbol(product.prices, this.props.currency)
                        return  (
                            <li key={product.quantity}>
                                <div className="cartDetails">
                                    <h2 className="cartName">{product.name}</h2>
                                    <p className="cartBrand">{product.brand}</p>
                                    <p className="cartCurrency">
                                        {price.currency.symbol}
                                        {price.amount}
                                    </p>
                                    <div className="sizeBox">
                                        {/* {this.state.values.map((val) => (
                                            <div key={val.id} className="sizeBoxInactive">
                                                <span className="size">{val.text}</span>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                                <div className="cartQuantityInner">
                                    <div className="cartCounter" onClick={()=>{
                                        this.props.updateProductQuantity(product, product.quantity+1)
                                    }}><span>+</span></div>
                                    <div className="cartNumber"><span>{product.quantity}</span></div>
                                    <div className="cartCounter" onClick={()=>{
                                        if(product.quantity > 1 ){
                                            this.props.updateProductQuantity(product, product.quantity-1)
                                        }
                                    }}><span>-</span></div>
                                </div>
                                <div className="cartQuantity">
                                    <div className="cartImage">
                                        <img className="cartImageInner" src={product.gallery[0]} alt='img' />
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Cart;
