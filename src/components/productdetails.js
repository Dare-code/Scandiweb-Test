import React from "react";
import { client } from "../index";
import { product } from "../queries/product";
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSizeBox: 1,
            values: [
                { id: 1, text: "XS" },
                { id: 2, text: "S" },
                { id: 3, text: "M" },
                { id: 4, text: "L" },
            ],
            activePhoto: [],
        };
    }
    componentDidMount = async () => {
        const data = await client.query({
            query: product,
            variables: {
                id: this.props.match.params.id,
            },
        });
        this.setState(data);
        this.setState({
            ...this.state,
            activePhoto: this.state.data.product.gallery[0],
        })
    };
    render() {
        if (!this.state.data) {
            return <>Loading...</>;
        }
        const { gallery, name, description, brand, prices } =
            this.state.data.product;
        return (
            <div className="productDetailsPage">
                <div className="imageDetail">
                    {gallery.map((image) => (
                        <img
                            key={image}
                            className="productDetailPicture"
                            src={image}
                            alt="img"
                            onClick={() => this.setState({
                                ...this.state,
                                activePhoto: image
                            })}
                        />
                    ))}
                </div>
                <div className="productDetail">
                    <div className="singlePicture">
                        <img src={this.state.activePhoto} alt='detailsPicture' />
                    </div>
                    <div className="addToCart">
                        <h2 className="cartName">{name}</h2>
                        <h2 className="cartBrand">{brand}</h2>
                        <div>
                            <p className="price">Size :</p>
                            <div className="sizeBox">
                                {this.state.values.map((val) => (
                                    <div
                                        key={val.id}
                                        className={
                                            this.state.activeSizeBox === val.id
                                                ? "sizeBoxActive"
                                                : "sizeBoxInactive"
                                        }
                                        onClick={() => this.setState({ activeSizeBox: val.id })}
                                    >
                                        <span
                                            className={
                                                this.state.activeSizeBox === val.id ? "active" : "size"
                                            }
                                        >
                                            {val.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="price">Price :</p>
                            <p className="amount">
                                {this.props.currency.value}
                                {prices[0].amount}
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
