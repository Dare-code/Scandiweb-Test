import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
class DropdownCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props, "Dropdown");
        return (
            <div className="header-temp">
                <ul>
                    {this.props.cart.map(product => (
                        <li>{product.name} -  {product.count}</li>
                    ))}
                </ul>
                <Link to='/cart'>View</Link>
            </div>
        );
    }
}

export default DropdownCart;