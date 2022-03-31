import React from "react";
import { client } from "../index";
import { getProduct } from "../queries/product";
import Attributes from "./attributes";
import { GetPriceBySymbol } from "../utils/helper";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePhoto: [],
    };
    this.updateProduct = this.updateProductHandler.bind(this);
  }

  updateProductHandler = (product) => {
    this.setState({
      ...this.setState,
      data: {
        product: product,
      },
    });
  };

  componentDidMount = async () => {
    const product = await client.query({
      query: getProduct,
      variables: {
        id: this.props.match.params.id,
      },
    });
    this.setState(product);
    this.setState({
      ...this.state,
      activePhoto: this.state.data.product.gallery[0],
    });
  };

  render() {
    if (!this.state.data) {
      return <>Loading...</>;
    }
    const {
      gallery,
      name,
      description,
      brand,
      prices,
      inStock,
      attributes,
      selectedAttributes,
    } = this.state.data.product;
    const canAddToCart =
      attributes &&
      attributes.length === Object.keys(selectedAttributes || {}).length;
    const price = GetPriceBySymbol(prices, this.props.currency);
    return (
      <div className="productDetailsPage">
        <div className="imageDetail">
          {gallery.map((image) => (
            <div
              key={image}
              className="thumbnail"
              style={{
                backgroundImage: `url(${image})`,
              }}
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
              src={this.state.activePhoto ? this.state.activePhoto : gallery[0]}
              alt="detailsPicture"
            />
          </div>
          <div className="addToCart">
            <h2 className="cartName">{name}</h2>
            <h2 className="cartBrand">{brand}</h2>
            <div>
              <Attributes {...this.state} updateProduct={this.updateProduct} />
            </div>
            <div>
              <p className="price">Price :</p>
              <p className="amount">
                {price && price.currency.symbol}
                {price && price.amount}
              </p>
            </div>
            {!inStock ? (
              <div className="outofstockMsg">Out of stock</div>
            ) : (
              <div>
                <button
                  className="button"
                  disabled={!canAddToCart}
                  onClick={() => {
                    this.props.addToCart(this.state.data.product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            )}
            <div
              className="cartDescription"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
