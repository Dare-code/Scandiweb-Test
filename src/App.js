import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Products from "./components/products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./components/productdetails";
import Cart from "./components/cart";
import { ShouldUpdateQuantity } from "./utils/helper";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filtered: [],
      cart: [],
      currency: false,
      categoryName: "all",
    };
    this.addToCart = this.addToCartHandler.bind(this);
    this.removeFromCart = this.removeFromCartHandler.bind(this);
    this.updateProductQuantity = this.updateProductQuantityHandler.bind(this);
    this.setCategory = this.setCategoryHandler.bind(this);
    this.setCurrency = this.setCurrencyHandler.bind(this);
  }

  setCurrencyHandler(currency) {
    this.setState({
      currency: currency,
    });
  }

  addToCartHandler(product) {
    if (product.inStock === false) {
      console.warn("the product is out of stock. please choose another one");
      return;
    }
    const shouldUpdateIndex = ShouldUpdateQuantity(this.state.cart, product);

    if (shouldUpdateIndex >= 0) {
      this.updateProductQuantity(
        shouldUpdateIndex,
        this.state.cart[shouldUpdateIndex].quantity + 1
      );
      return;
    }
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

  updateProductQuantityHandler(index, quantity) {
    const _cart = [...this.state.cart];
    _cart.map((product, i) => {
      if (i === index) {
        product.quantity = quantity;
      }
      return true;
    });

    this.setState({
      ...this.state,
      cart: _cart,
    });
  }

  removeFromCartHandler(index) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((product, i) => {
        return i !== index;
      }),
    });
  }

  setCategoryHandler = (name) => {
    this.setState({
      ...this.state,
      categoryName: name,
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            setCategory={this.setCategory}
            setCurrency={this.setCurrency}
            removeFromCart={this.removeFromCart}
            updateProductQuantity={this.updateProductQuantity}
            {...this.state}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(match) => (
                <Products
                  key={match.location.key}
                  {...this.state}
                  addToCart={this.addToCart}
                />
              )}
            />
            <Route path="/cart">
              <Cart
                removeFromCart={this.removeFromCart}
                {...this.state}
                updateProductQuantity={this.updateProductQuantity}
              />
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
