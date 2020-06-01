import React from 'react';

export default function Header(props) {
  return (
    <header className="row d-flex align-items-center bg-dark text-white">
      <div className="d-flex justify-content-center">
        <i className="fas fa-leaf text-success">
          <i className="fas fa-lightbulb h2 offset-sm-1 text-warning"></i>
        </i>
      </div>
      <h1 className="col-sm-7">Lamp and Plant Store</h1>
      <div onClick={() => { props.setView('cart', {}); }} className="d-flex align-items-center offset-sm-1 col-sm-2 justify-content-center pointer">
        <h6>{props.cartItemCount + ' items'}</h6>
        <i className="fas fa-shopping-cart h3"></i>
      </div>
    </header>
  );
}
