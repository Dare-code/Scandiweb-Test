import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Products from "./components/products";
import { getCategories } from "./queries/categories";
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
      currency: false,
      categoryName: 'All'
    };
    this.addToCart = this.addToCartHandler.bind(this);
    this.removeFromCart = this.removeFromCartHandler.bind(this);
    this.updateProductQuantity = this.updateProductQuantityHandler.bind(this);
    this.filterProducts = this.filterProductsHandler.bind(this);
    this.setCurrency = this.setCurrencyHandler.bind(this);
  }

  setCurrencyHandler(currency) {
    this.setState({
      currency: currency,
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

  updateProductQuantityHandler(product, qunatity) {
      const _cart = [...this.state.cart];
      _cart.map(cartProduct => {
        if( cartProduct.id === product.id ){
          cartProduct.quantity = qunatity;
        }
        return true;
      });

      this.setState({
        ...this.state,
        cart: _cart
      });

  }

  removeFromCartHandler(product) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(cartProduct => {
        return cartProduct.id !== product.id
      })
    });
  }

  componentDidMount = async () => {
    const allCategory = await client.query({
      query: getCategories,
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
    console.log(this.state, "crs")

    return (
      <div className="App">
        <Router>
          <Navbar
            filterProducts={this.filterProducts}
            setCurrency={this.setCurrency}
            updateProductQuantity={this.updateProductQuantity} 
            {...this.state}
          />
          <Switch>
            <Route exact path="/">
              <Products {...this.state} />
            </Route>
            <Route path="/cart">
              <Cart {...this.state} updateProductQuantity={this.updateProductQuantity} />
            </Route>
            <Route
              path="/:id"
              component={(match) => {
                return (
                  <ProductDetail
                    addToCart={this.addToCart}
                    removeFromCart={this.removeFromCart}
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
