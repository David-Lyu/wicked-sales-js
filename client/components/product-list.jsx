import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('./api/products')
      .then(responce => responce.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="row">
        <div className="row col-12 space-cards justify-content-center">
          {this.state.products.length ? this.state.products.map(product => {
            return (
              <ProductListItem key={product.productId} product={product} handleClick={this.props.setView}/>
            );
          }) : null}
        </div>
      </div>
    );
  }
}