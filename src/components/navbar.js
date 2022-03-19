import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropdownCart from "./dropdowncart";
import { client } from "../index";
import { getCurrencies } from "../queries/currencies";
import bagShopping from "../assets/images/bagshopping.png";
import logo from "../assets/images/logo.svg";
import { getCategories } from "../queries/categories";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartDropdown: false,
      currencies: [],
      categories: [],
      activeNavbarCategory: "all",
    };
    this.addActiveClass = this.addActiveClass.bind(this);
    this.toggleDropdown = this.toggleDropdownHandler.bind(this);
  }

  addActiveClass() {
    const currentState = this.state.activeNavbarCategory;
    this.setState({
      activeNavbarCategory: !currentState,
    });
  }

  toggleDropdownHandler() {
    this.setState({
      showCartDropdown: !this.state.showCartDropdown,
    });
  }

  componentDidMount = async () => {
    const currencies = await client.query({
      query: getCurrencies,
    });
    const categories = await client.query({
      query: getCategories,
    });

    this.props.setCurrency(currencies.data.currencies[0].symbol);
    this.setState({
      currencies: currencies.data.currencies,
      categories: categories.data.categories,
    });
  };

  render() {
    const { setCurrency } = this.props;
    return (
      <div className="header">
        <div className="categories">
          <ul>
            {this.state.categories.map((category) => {
              return (
                <li
                  key={category.name}
                  onClick={() => {
                    this.props.setCategory(category.name);
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
          <select
            defaultValue={this.props.value}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
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
              onClick={() => this.props.cart.length && this.toggleDropdown()}
            >
              <div className="bag">
                <img src={bagShopping} alt="shop" />
              </div>
              {this.props.cart.length ? (
                <span className="cartItemsLabel">{this.props.cart.length}</span>
              ) : null}
            </div>
            {this.state.showCartDropdown ? (
              <DropdownCart
                {...this.props}
                toggleDropdown={this.toggleDropdown}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
