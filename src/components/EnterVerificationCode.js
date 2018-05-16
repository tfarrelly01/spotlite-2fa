import React, { Component } from 'react';
import '../css/LandingPage.css';
import {postApplicant, getNewPin} from '../utils/Common.js';

class EnterVerificationCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
            message: null,
            error: null
        }
        this.onChange = this.onChange.bind(this);
        this.generateNewPin = this.generateNewPin.bind(this);
        this.onCanSubmit = this.onCanSubmit.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.setError = this.setError.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.setVerificationCode = this.setVerificationCode.bind(this);
    }

    onChange(event) {
        let {error, message} = this.state;
        let verificationCode = event.target.value;

        // Clear previous error message or message if user enters a character in field 
        if (error) {
            this.setError(null);
        }
        if (message) {
            this.setMessage(null);
        }
        this.setVerificationCode(verificationCode);
    }

    generateNewPin() {
        const {error, message} = this.state;
        const URI = 'http://localhost:4090/home/newpin';
        // Clear previous error message or message if user enters a character in field 
        if (error) {
            this.setError(null);
        }
        if (message) {
            this.setMessage(null);
        }   
        getNewPin(URI)
        .then((response) => {
            if (response.status === 'error') {
                throw response.error
            } else {
console.log('response:', response);
                this.setMessage('New verification code sent, please check your phone'); 
            }
        }) 
        .catch(error => this.setError(error = error.message || error));
    }

    onCanSubmit() {
        let {error} = this.state;

        return error ? false : true;
    }

    onHandleSubmit() { 
        const {verificationCode} = this.state;
        const {surname, middleName, forename, eMail, phoneNumber, selectedAddress} = this.props;
        if (this.onCanSubmit()) {
            const URI = 'http://localhost:4090/home/verify';

            // Need to consider hashing the pin code 
            const options = {
                ContactSurname: surname,
                ContactMiddleName: middleName,
                ContactForename: forename,
                ContactEmail: eMail,
                ContactPhone: phoneNumber,
                ContactAddr1: selectedAddress.contactAddr1,
                ContactAddr2: selectedAddress.contactAddr2,
                ContactAddr3: selectedAddress.contactAddr3,
                ContactCity: selectedAddress.contactCity,
                ContactState: selectedAddress.contactState,
                ContactPostCode: selectedAddress.contactPostCode,
                pinCode: verificationCode 
            };

            postApplicant(URI, options )
            .then((data) => {
                if (data.status === 'error') {
                    throw data.error
                } else {
                    this.props.setPinVerified();
                }
            })
            .catch(error => this.setError(error = error.message || error));
        } 
    }

    setError(error) {
        this.setState({ 
            error
        })
    }

    setMessage(message) {
        this.setState({ 
            message
        })
    }

    setVerificationCode(verificationCode) {
        this.setState({ 
            verificationCode
        })
    }

    render() {
        let {phoneNumber} = this.props;
        let {verificationCode, error, message} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <h3>Verify your phone number</h3>
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
                        <p className="error message">{error}</p>
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