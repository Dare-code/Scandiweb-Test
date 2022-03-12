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
                id: this.props.match.params.id
            }
        });
        this.setState(data);
    };

    render() {
        if (!this.state.data) {
            return <>Loading...</>
        }
        const { gallery, name, description, brand, prices } = this.state.data.product;
     
        return (
            <div className="productDetail" >
                <br />
                <br />
                <div className="imageDetail">
                    <img
                        className="productDetailPicture"
                        src={gallery[0]}
                        alt="img"
                    />
                    <img
                        className="productDetailPicture"
                        src={gallery[0]}
                        alt="img"
                    />
                    <img
                        className="productDetailPicture"
                        src={gallery[0]}
                        alt="img"
                    />
                    <div> <img
                        className="productDetailPicture"
                        src={gallery[0]}
                        alt="img"
                    /></div>

                </div>
                <div className="addToCart">
                    <h2>Detail Page {name}</h2>
                    <h5>{brand}</h5>
                    <p>Prices : </p>

                    <button onClick={()=>{
                        this.props.addToCart(this.state.data.product)
                    }}>Add to Cart</button>
                    <p>
                        <div dangerouslySetInnerHTML={{__html: description}} />
                    </p>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
