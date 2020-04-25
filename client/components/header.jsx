import React from 'react';

export default function Header(props) {
  return (
    <header className="row d-flex align-items-center bg-dark text-white">
      <i className="fas fa-dollar-sign h2 offset-sm-1"></i>
      <h1 className="col-sm-7">Wicked Sales</h1>
      <div className="d-flex align-items-center offset-sm-1 col-sm-2 justify-content-center">
        <h6>{props.cartItemCount + ' items'}</h6>
        <i className="fas fa-shopping-cart h3"></i>
      </div>
    </header>
  );
}
