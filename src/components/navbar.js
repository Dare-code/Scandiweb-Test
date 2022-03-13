import React, { Component } from "react";
import { Link } from "react-router-dom";

import DropdownCart from "./dropdowncart";
import { client } from "../index";
import { currencies } from "../queries/query";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartDropdown: false,
      currencies: [],
      selectedOption: [],
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

  handleChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    const { selectedOption } = this.state;
    console.log(this.props, selectedOption)
    return (
      <div className="header">
        <div className="categories">
          <ul>
            {this.props.categories.map((category) => {
              return (
                <li
                  key={category.name}
                  className="categories-menu"
                  onClick={() => {
                    this.props.filterProducts(category.name);
                  }}
                >
                  <Link to="/">{category.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="logo-temp">
          <img src="/logo.svg" alt="img" />
        </div>
        <div className="actions">
          <select
            value={selectedOption}
            onChange={this.handleChange}
          >
            {this.state.currencies.map((currency, i) => {
              return <option value={currency.symbol} key={i}>{currency.symbol}</option>;
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
