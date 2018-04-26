import React, { Component } from 'react';

import '../css/LandingPage.css';

class EnterVerificationCode extends Component {
    constructor(props) {
        super(props);

        this.onCanSubmit = this.onCanSubmit.bind(this);
    }

    onCanSubmit() {
        return this.props.onCanSubmit();
    }

    render() {
        let {name, verificationCode, phoneNumber, error} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <h3>Phone Number Verification</h3>
                </div>
                <div className="row App-intro">
                    We have sent a pin code in a text message to the number you have provided <strong>{phoneNumber}</strong>.
                    Please enter the pin code below. If you have not received a pin code you can request a new one. 
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="code">Verification Code</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type="text" 
                            id="code" 
                            name="verificationCode" 
                            placeholder="Verification Code"
                            value={verificationCode}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlurEvent}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <p className="hide-text">Error</p>
                    </div>
                    <div className="col-75">
                        <p className="error">{error}</p>
                    </div>
                </div>      

                <div className="row">
                    <div className="col-25">
                        <label className="hide-text" htmlFor=""></label>
                    </div>
                    <div className="col-75">
                        <input 
                            type="submit"
                            value="Verify"
                            disabled={!this.onCanSubmit()}
                            onClick={this.props.onHandleSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EnterVerificationCode;