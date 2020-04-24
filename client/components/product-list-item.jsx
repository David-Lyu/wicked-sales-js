import React from 'react';

export default function ProductListItem(props) {
  if (props.products.length <= 0) {
    return null;
  }
  const productsArray = props.products.map((product, index) => {
    let formatPrice = '$';
    const stringPrice = product.price.toString();
    for (let i = 0; i < stringPrice.length; i++) {
      if (i === stringPrice.length - 2) {
        formatPrice += '.' + stringPrice[i];
      } else {
        (
          formatPrice += stringPrice[i]
        );
      }
    }
    return (
      <div className="card col-3" key={product.productId}>
        <img src={product.image} className="card-img-top" alt={`picture of ${product.name}`}/>
        < div className = "card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-sub-title mb-2 text-muted">{formatPrice}</h6>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    );
  });

  return (productsArray);
}
