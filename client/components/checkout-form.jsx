import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.state = {
      userName: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  handleSubmit(e) {
    const formInput = this.state;
    e.preventDefault();
    this.props.placeOrder(formInput.userName, formInput.creditCard, formInput.shippingAddress);
    this.setState({
      userName: '',
      creditCard: '',
      shippingAddress: ''
    });
    this.props.setView('catalog', {});
  }

  handleNameChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  handleCreditCardChange(e) {
    this.setState({
      creditCard: e.target.value
    });
  }

  handleShippingAddressChange(e) {
    this.setState({
      shippingAddress: e.target.value
    });
  }

  render() {
    let totalCost = 0;
    this.props.cart.forEach(cartItem => {
      totalCost += parseInt(cartItem.price);
    });
    totalCost = totalCost.toString();
    totalCost = '$' + totalCost.slice(0, -2) + '.' + totalCost.slice(-2);
    return (
      <div>
        <h1 className="row">My Cart</h1>
        <h6 className="row text-muted">Order Total: {totalCost}</h6>
        <form onSubmit={this.handleSubmit}>
          <label className="form-group row">
            Name
            <input onChange={this.handleNameChange} type="text" value={this.state.userName}
              className="form-control"/>
          </label>
          <label className="form-group row">
            Credit Card
            <input onChange={this.handleCreditCardChange} type="number"
              value={this.state.creditCard} className="form-control"/>
          </label>
          <label className="form-group row">
            Shipping Address
            <textarea onChange={this.handleShippingAddressChange}
              value={this.state.shippingAddress} cols="3" rows="3" className="form-control"/>
          </label>
          <div className="d-flex justify-content-between align-items-end">
            <p onClick={this.handleClick} className="pointer text-muted">
              {'<-- Continue Shopping'}
            </p>
            <button className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
