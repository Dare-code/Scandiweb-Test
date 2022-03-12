import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Products from "./components/products";
import { categories } from "./query/query";
import { client } from "./index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductDetail from "./components/productDetail";
import Cart from "./components/Cart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filtered: [],
      cart: [],
    };
    this.addToCart = this.addToCartHandler.bind(this);
    this.filterProducts = this.filterProductsHandler.bind(this);
  }
 
  addToCartHandler(product) {
    this.setState({
      ...this.state,
      cart: [...this.state.cart, {
        ...product,
        count: 1
      }]
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
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar filterProducts={this.filterProducts} {...this.state} />
          <Switch>
            <Route exact path="/">
              <p className="title">Category Name</p>
              <Products data={this.state.filtered} />
            </Route>
            <Route path="/cart">
              <Cart {...this.state} />
            </Route>
            <Route path="/:id" component={(match) => {
              return <ProductDetail addToCart={this.addToCart} {...match} {...this.state} />
            }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
