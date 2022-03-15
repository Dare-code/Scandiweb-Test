import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Products from "./components/products";
import { categories } from "./queries/categories";
import { client } from "./index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./components/productdetails";
import Cart from "./components/cart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filtered: [],
      cart: [],
      currency: {
        value: "$",
      },
      categoryName: 'All'
    };
    this.addToCart = this.addToCartHandler.bind(this);
    this.filterProducts = this.filterProductsHandler.bind(this);
    this.setCurrency = this.setCurrencyHandler.bind(this);
  }

  setCurrencyHandler = (e) => {
    this.setState({
      currency: {
        value: e.target.value,
      },
    });
  };

  addToCartHandler(product) {
    this.setState({
      ...this.state,
      cart: [
        ...this.state.cart,
        {
          ...product,
          quantity: 1,
        },
      ],
    });
  }

  componentDidMount = async () => {
    const allCategory = await client.query({
      query: categories,
    });
    let flatListOfCategories = [];
    allCategory.data.categories.map((category) => {
      if (category.name === "all") {
        flatListOfCategories = category.products;
      }
      return true;
    });
    this.setState({
      filtered: flatListOfCategories,
      ...allCategory.data,
    });
  };

  filterProductsHandler = (name) => {
    let filtered = [];
    this.state.categories.map((category) => {
      if (category.name === name) {
        filtered = category.products;
        return true;
      }
      return false;
    });
    this.setState({
      ...this.state,
      filtered: filtered,
      categoryName: name
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            filterProducts={this.filterProducts}
            setCurrency={this.setCurrency}
            {...this.state}
          />
          <Switch>
            <Route exact path="/">
              <Products data={this.state.filtered} {...this.state} categoryName={this.state.categoryName} />
            </Route>
            <Route path="/cart">
              <Cart {...this.state} />
            </Route>
            <Route
              path="/:id"
              component={(match) => {
                return (
                  <ProductDetail
                    addToCart={this.addToCart}
                    {...match}
                    {...this.state}
                  />
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
