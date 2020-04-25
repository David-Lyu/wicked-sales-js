import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  if (props.cart.length) {
    let itemTotal = 0;
    const getAllCartItems = props.cart.map(cartItem => {
      itemTotal += parseInt(cartItem.price);
      return <CartSummaryItem key={cartItem.cartItemId} cartItem={cartItem}/>;
    });
    itemTotal = itemTotal.toString();
    itemTotal = '$' + itemTotal.slice(0, -2) + '.' + itemTotal.slice(-2);
    return (
      <div>
        <nav className="nav nav-tabs">
          <button className="nav-item nav-link text-muted" onClick={() => { props.setView('catalog', {}); }}>
            {'< back to catalog'}
          </button>
        </nav>
        <h1>My Cart</h1>
        {getAllCartItems}
        <h1>Item Total: {itemTotal}</h1>
      </div>
    );
  } else {
    return <div>Cart is Empty</div>;
  }
}
