import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropdownCart from "./dropdowncart";
import { client } from "../index";
import { currencies } from "../queries/currencies";

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
    const { currency, setCurrency } = this.props;

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
            value={currency}
            onChange={setCurrency}
          >
            {this.state.currencies.map((currency) => {
              return <option value={currency.symbol} key={currency.label}>{currency.symbol}</option>;
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
