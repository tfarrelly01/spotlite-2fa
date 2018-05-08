import React from 'react';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import '../css/LandingPage.css';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    }
  }

  render() {
    return (
        <div className="row">
            <div className="col-25">
                <label htmlFor="mphone">Phone Number</label>
            </div>
            <div className="col-75">
                <Phone
                    className="phone"
                    country="RU"
                    placeholder="Start typing a phone number"
                    value={ this.state.value }
                    onChange={ value => this.setState({ value }) }
                />
            </div>
        </div>
    );
  }
}

export default Example;