import React, { Component } from 'react';
import '../css/LandingPage.css';
import {getNewPin} from '../utils/Common.js';

class EnterVerificationCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
            newPinSent: false,
            pinSentMessage: null,
            error: null
        }
        this.onChange = this.onChange.bind(this);
        this.generateNewPin = this.generateNewPin.bind(this);
        this.onCanSubmit = this.onCanSubmit.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.setError = this.setError.bind(this);
        this.setVerificationCode = this.setVerificationCode.bind(this);
    }

    onChange(event) {
        let {error} = this.state;
        let verificationCode = event.target.value;

        // Clear previous error message if user enters a character in field 
        if (error) {
            this.setError(null);
        }

        this.setVerificationCode(verificationCode);
    }

    generateNewPin() {
        // GET request to generate new pin
        // do I need to send in email address to check session relates to this applicant?
        // Probably dont need to do anything else

        console.log('Generate Pin Code FIRED!!!');
        const URI = 'http://localhost:4090/home/newpin';

        getNewPin(URI)
        .then(response => console.log('response:', response)) 
        .catch(err => console.log('err:', err));
    }

    onCanSubmit() {
        let {error} = this.state;

        return error ? false : true;
    }

    onHandleSubmit() { 
        console.log('onHandleSubmit FIRED!!!');
        if (this.onCanSubmit()) {
            // HERE we POST applicant details - i.e. update the database and set state
            this.props.setPinVerified();
        } 
    }

    setError(error) {
        this.setState({ 
            error
        })
    }

    setVerificationCode(verificationCode) {
        this.setState({ 
            verificationCode
        })
    }

    render() {
        let {phoneNumber} = this.props;
        let {verificationCode} = this.state;
        let {error} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <h3>Verify Your </h3>
                </div>
                <div className="row App-intro">
                    We have sent a verification code in a text message to the number you have provided <strong>{phoneNumber}</strong>.
                    Please enter the verification code we sent below. If you have not received a code you can <a href="#" 
                    onClick={this.generateNewPin}>request a new one</a>. 
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
                            onClick={this.onHandleSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EnterVerificationCode;