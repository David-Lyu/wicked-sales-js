import React from 'react';

export default class Disclaimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acknowledgeIsClicked: false
    };
  }

  // handleModalLoad(e) {
  //   e.
  // }

  render() {

    return (
      <div onLoad={this.handleModalLoad} className="modal">
        <div className="innerModal">
          <h1>DisClaimer:</h1>
          <p>
              This site is a demo site and is and will not be used for commercial purposes and cannot make any real purchases
            <br></br> By checking this box you acknowledge that this site is for demo purposes and that you cannot make any
              real purchases and will not put any real information when asked for it.
          </p>
          <input type="checkbox" required/>
          <button type="button"></button>
        </div>
      </div>
    );
  }
}
