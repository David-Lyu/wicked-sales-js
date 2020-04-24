import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
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

  render() {
    return (
      <div className="container">
        <Header/>
        {this.state.view.name === 'catalog'
          ? <ProductList setView={this.setView}/>
          : <ProductDetails setView={this.setView} productId={this.state.view.params}/>
        }
      </div>
    );
  }
}
