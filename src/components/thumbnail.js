import React, { Component } from "react";
import arrowLeft from "../assets/images/arrowleft.svg";

class Thumbnail extends Component {
    render() {
        console.log(this.props, 'props')
        return (
            <>
                {this.props.cart.map((product, i) => (
                    <div key={i}>
                        <img src={arrowLeft} alt="arrowImg" className="arrowLeft" />
                        <img
                            className="cartImageInner"
                            src={product.gallery[0]}
                            alt="img"
                        />
                        <img
                            src={arrowLeft}
                            alt="arrowImg"
                            className="arrowRight"
                        />
                    </div>
                ))}

            </>
        );
    }
}

export default Thumbnail;
