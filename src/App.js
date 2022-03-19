import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Products from "./components/products";
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
      categoryName: 'all'
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
      if (cartProduct.id === product.id) {
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

  setCategoryHandler = (name) => {
    this.setState({
      ...this.state,
      categoryName: name
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            setCategory={this.setCategory}
            setCurrency={this.setCurrency}
            updateProductQuantity={this.updateProductQuantity}
            {...this.state}
          />
          <Switch>
            <Route exact path="/" render={match => <Products key={match.location.key} {...this.state} />} />
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
