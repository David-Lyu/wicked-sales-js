import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(results => results.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId })
    };
    fetch('/api/cart', request)
      .then(results => results.json())
      .then(data => {
        const newCart = this.state.cart.concat(data);
        return this.setState({ cart: newCart });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <div className="container">
        <Header cartItemCount={this.state.cart.length}/>
        {this.state.view.name === 'catalog'
          ? <ProductList setView={this.setView}/>
          : (
            <ProductDetails setView={this.setView}
              productId={this.state.view.params}
              addToCart={this.addToCart}/>
          )
        }
      </div>
    );
  }
}
