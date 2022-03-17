import React from "react";
import { client } from "../index";
import { getProduct } from "../queries/product";
import Atributes from "./atributes";
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSizeBox: [],
            activePhoto: [],
            atribute: [],
        };
    }

    componentDidMount = async () => {
        const data = await client.query({
            query: getProduct,
            variables: {
                id: this.props.match.params.id,
            },
        });
        this.setState(data);
        let attributes = !this.state.data.product.attributes.length
            ? null
            : this.state.data.product.attributes[0].items[0].id;
        this.setState({
            ...this.state,
            activePhoto: this.state.data.product.gallery[0],
            activeSizeBox: attributes,
        });
    };


    render() {
        if (!this.state.data) {
            return <>Loading...</>;
        }
        const { gallery, name, description, brand, prices, attributes } =
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
                            onClick={() =>
                                this.setState({
                                    ...this.state,
                                    activePhoto: image,
                                })
                            }
                        />
                    ))}
                </div>
                <div className="productDetail">
                    <div className="singlePicture">
                        <img
                            src={
                                !this.state.activePhoto ? this.state.activePhoto : gallery[0]
                            }
                            alt="detailsPicture"
                        />
                    </div>
                    <div className="addToCart">
                        <h2 className="cartName">{name}</h2>
                        <h2 className="cartBrand">{brand}</h2>
                        <div>
                            <p className="price">
                                {!attributes.length ? null : attributes[0].name}
                            </p>
                            <Atributes  {...this.state} />
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
