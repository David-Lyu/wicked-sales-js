import React from 'react';

export default function CartSummaryItem(props) {
  const formatPrice = '$' + props.price.slice(0, -2) + '.' + props.price.slice(-2);
  return (
    <div className="card col-3">
      <img src={props.product.image} className="card-img-top" alt={`picture of ${props.product.name}`} />
      < div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <h6 className="card-sub-title mb-2 text-muted">{formatPrice}</h6>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}
