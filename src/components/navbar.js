import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropdownCart from "./dropdowncart";
import { client } from "../index";
import { getCurrencies } from "../queries/currencies";
import bagShopping from "../assets/images/bagshopping.png";
import logo from "../assets/images/logo.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartDropdown: false,
      currencies: [],
      activeNavbarCategory: "all",
    };
    this.addActiveClass = this.addActiveClass.bind(this);
    this.dropDownMenu = this.dropDown.bind(this);
  }

  addActiveClass() {
    const currentState = this.state.activeNavbarCategory;
    this.setState({
      activeNavbarCategory: !currentState,
    });
  }

  dropDown() {
    this.setState({
      showCartDropdown: !this.state.showCartDropdown,
    });
  }

  componentDidMount = async () => {
    const data = await client.query({
      query: getCurrencies,
    });
    this.setState({
      currencies: data.data.currencies,
    });
  };

  render() {
    const { setCurrency } = this.props;
    return (
      <div className="header">
        <div className="categories">
          <ul>
            {this.props.categories.map((category) => {
              return (
                <li
                  key={category.name}
                  onClick={() => {
                    this.props.filterProducts(category.name);
                  }}
                >
                  <Link
                    className={
                      this.state.activeNavbarCategory === category.name
                        ? "activeNavbarCategories"
                        : "defaultNavbarCategories"
                    }
                    onClick={() =>
                      this.setState({ activeNavbarCategory: category.name })
                    }
                    to="/"
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="logo-temp">
          <img src={logo} alt="img" />
        </div>
        <div className="actions">
          <select defaultValue={this.props.value} onChange={setCurrency}>
            {this.state.currencies.map((currency) => {
              return (
                <option value={currency.symbol} key={currency.label}>
                  {currency.symbol}
                </option>
              );
            })}
          </select>
          <div>
            <div
              className="shoppingItem"
              onClick={() => this.dropDown()}
            >
              {this.props.cart.length > 0 ? (
                <span className="count">{this.props.cart.length}</span>
              ) : null}
              <div className="bag">
                <img src={bagShopping} alt="shop" />
              </div>
            </div>
            {this.state.showCartDropdown ? (
              <DropdownCart
                {...this.props}
                dropDownMenu={this.dropDownMenu}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
