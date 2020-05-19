import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(name, creditCard, shippingAddress) {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        creditCard,
        shippingAddress
      })
    };
    fetch('/api/orders', request)
      .then(results => results.json())
      .then(data => this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      }));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <div className="container">
        <Header setView={this.setView} cartItemCount={this.state.cart.length}/>
        { (this.state.view.name === 'catalog' && <ProductList setView={this.setView}/>) ||
        (this.state.view.name === 'details' && <ProductDetails setView={this.setView}
          productId={this.state.view.params}
          addToCart={this.addToCart}/>) ||
        (this.state.view.name === 'cart' && <CartSummary
          setView={this.setView} cart={this.state.cart}/>) ||
        (this.state.view.name === 'order' && <CheckoutForm placeOrder={this.placeOrder}
          setView={this.setView} cart={this.state.cart}/>)
        }
      </div>
    );
  }
}
