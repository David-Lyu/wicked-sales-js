import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  if (props.cart.length) {
    let itemTotal = 0;
    const GetAllCartItems = props.cart.map(cartItem => {
      itemTotal += props.price;
      return <CartSummaryItem key={props.productId} cartItem={cartItem}/>;
    });
    return (
      <div>
        <nav className="nav nav-tabs">
          <button className="nav-item nav-link text-muted" onClick={() => { this.props.handleClickDetails('catalog', {}); }}>
            {'< back to catalog'}
          </button>
        </nav>
        <h1>My Cart</h1>
        <GetAllCartItems/>
        <h1>Item Total: {itemTotal}</h1>
      </div>
    );
  } else {
    return <div>Cart is Empty</div>;
  }
}
