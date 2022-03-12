import React from "react";
import "../App.css";
import { client } from "../index";
import { product } from "../query/query";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = async () => {
        const data = await client.query({
            query: product,
            variables: {
                id: this.props.match.params.id,
            },
        });
        this.setState(data);
    };

    render() {
        if (!this.state.data) {
            return <>Loading...</>;
        }
        const { gallery, name, description, brand, prices } =
            this.state.data.product;

        return (
            <div className="mainDiv">
                <div className="imageDetail">
                    {gallery.map((image) => (
                        <img
                            key={image}
                            className="productDetailPicture"
                            src={image}
                            alt="img"
                        />
                    ))}
                </div>
                <div className="productDetail">
                    <div className="singlePicture">
                        <img src={gallery[0]} alt={gallery} />
                    </div>
                    <div className="addToCart">
                        <h2 className="cartName">{name}</h2>
                        <h2 className="cartBrand">{brand}</h2>
                        <div>
                            <p className="price">Size :</p>
                            <div className="sizeBox">
                                <div className="sizeBoxInner"><span className="size">XS</span></div>
                                <div className="active"><span className="sizeActive">S</span></div>
                                <div className="sizeBoxInner"><span className="size">M</span></div>
                                <div className="sizeBoxInner"><span className="size">L</span></div>
                            </div>
                        </div>
                        <div>
                            <p className="price">Price :</p>
                            <p className="amount">
                                {prices[0].currency.symbol} {prices[0].amount}
                            </p>
                        </div>
                        <button
                            className="button"
                            onClick={() => {
                                this.props.addToCart(this.state.data.product);
                            }}
                        >
                            Add to Cart
                        </button>
                        <p>
                            <div
                                className="cartDescription"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
