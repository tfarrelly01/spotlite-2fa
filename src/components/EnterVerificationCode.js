import React, { Component } from 'react';

import '../css/LandingPage.css';

class EnterVerificationCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
        this.onChange = this.onChange.bind(this);
        this.onBlurEvent = this.onBlurEvent.bind(this);
        this.onCanSubmit = this.onCanSubmit.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.setError = this.setError.bind(this);
    }

    onChange(event) {
        let {error} = this.state;
        let targetValue = event.target.value;

        // Clear previous error message if user enters a character in field 
        if (error) {
            this.setError(null);
        }
        this.props.setVerificationCode(targetValue);
    
    }

    onBlurEvent(event) {
        const {generatedPin} = this.props;

        let targetValue = event.target.value;

        if (targetValue.length === 0) {
            this.setError('A Verification Code is required!');
        } else if (targetValue !== generatedPin) {
            this.setError('Your verification code is invalid. Please check it and try again.');
        } else {
            this.setError(null);
        }
        this.props.setVerificationCode(targetValue);
    }

    onCanSubmit() {
        let {error} = this.state;
        return error ? false : true;
    }

    onHandleSubmit() {
        let {generatedPin} = this.state;

        if (this.onCanSubmit()) {
            console.log("OK to Submit!!!"); 
            this.props.setVerificationCode(generatedPin);
        }
    }

    setError(error) {
        this.setState({
            error: error
        })
    }

    render() {
        let {phoneNumber, verificationCode} = this.props;
        let {error} = this.state;
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
                            className={error ? "error" : ""} 
                            type="text" 
                            id="code" 
                            name="verificationCode" 
                            placeholder="Verification Code"
                            value={verificationCode}
                            onChange={this.onChange}
                            onBlur={this.onBlurEvent}
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
                            onSubmit={this.onHandleSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EnterVerificationCode;