import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { currencies } from "../query/query";
import DropdownCart from "./DropdownCart";
import { client } from "../index";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartDropdown: false,
      currencies: [],
    }
  }

  componentDidMount = async () => {
    const data = await client.query({
      query: currencies,
    });
    this.setState({
      currencies: data.data.currencies,
    });
  };


  render() {
    return (
      <div className="header">
        <div className="categories">
          <ul>
            {this.props.categories.map((el) => {
              return (
                <li
                  key={el.name}
                  className="categories-menu"
                  onClick={() => {
                    this.props.filterProducts(el.name);
                  }}
                >
                  <Link to="/">{el.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="logo-temp">
          <img src="/logo.svg" alt="img" />
        </div>
        <div className="actions">
          <select>
            {this.state.currencies.map((el, i) => {
              return <option key={i}>{el.symbol}</option>;
            })}
          </select>
          <div>
            <div className="shoppingItem" onClick={() => {
              this.setState({
                showCartDropdown: !this.state.showCartDropdown
              })
            }}>
              {this.props.cart.length > 0 ? (
                <span>{this.props.cart.length}</span>
              ) : null}
              <img src="/img.png" alt="shop" />
            </div>
            {this.state.showCartDropdown ? <DropdownCart {...this.props} /> : null}
          </div>
        </div>

      </div>
    );
  }
}

export default Navbar;
