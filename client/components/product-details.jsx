import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDetails = this.handleClickDetails.bind(this);
    this.state = {
      product: null
    };
  }

  handleClickDetails(e) {
    this.props.setView('catalog', {});
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error(err));
  }

  render() {
    const product = this.state.product;
    if (product) {
      const price = product.price.toString();
      return (
        <div>
          <nav className="nav nav-tabs">
            <button className="nav-item nav-link text-muted" onClick={this.handleClickDetails}> {'< back to catalog'}</button>
          </nav>

          <div className="card mb-3">
            <div className="row no-gutters">
              <img className="col-md-5"src={`${product.image}`} alt={`image of ${product.name}`} />
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-sub-title mb-2 text-muted">
                    {'$' + price.slice(0, -2) + '.' + price.slice(-2)}
                  </h6>
                  <p className="card-text">{product.shortDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <p>{product.longDescription}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
