import React, { Component } from 'react';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import InputAddrSearchTerm from './InputAddrSearchTerm';
import AddressList from './AddressList';
import '../css/LandingPage.css';

import {getRequest} from '../utils/Common';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addrSearchTerm: '',
            addrSearchResults: {},

        }
        this.onChangeEvt = this.onChangeEvt.bind(this);
        this.onBlurEvt = this.onBlurEvt.bind(this);
        this.onCanSubmit = this.onCanSubmit.bind(this);
        this.onPhoneNoChange = this.onPhoneNoChange.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.addrSearchTerm && nextState.addrSearchTerm !== this.state.addrSearchTerm) {
            this.loadData(nextState.addrSearchTerm);
        }
    }

    loadData (searchTerm) {
        console.log('Load Addresses FIRED!!!');
        console.log('Search Term:', searchTerm);

        const URI = `https://api.edq.com/capture/address/v2/search?query=${searchTerm}&country=GBR&take=100
        &Auth-Token=81837610-8308-42d3-8288-41785455ebe3`;
        
        getRequest(URI)
            .then( response => {
                this.setState({
                    addrSearchResults: response
                });
            })
            .catch( err => alert( err ) );
    }

    onChangeEvt(event) {
        const targetName= event.target.name;
        const targetValue = event.target.value;

        this.props.setError(null);

        this.setState({
            addrSearchTerm: targetValue
        })
    }

    onBlurEvt(event) {
        // Check that the email address is in the correct format 
        // email address format ok - GET request to Experian API
        // if address not found / recognided - Warning

        // Mobile Phone Number - GET request to Experian API. 
        // if address doesnt not pass the check 
        // invalid telephone format (ERROR) ere we need to check format
        // before GET request
        // Address not found / recognised - Warning 
        const targetValue = event.target.value;

        this.setState({
            addrSearchTerm: targetValue
        })
    }

    onPhoneNoChange(phoneNumber) {
        this.props.setPhoneNumber(phoneNumber);
    }

    onCanSubmit() {
        return this.props.onCanSubmit();
    }

    render() {
        let {name, eMail, phoneNumber, error, errors} = this.props;
        let {addrSearchTerm, addrSearchResults} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <h3>Register</h3>
                </div>
                <div className="row App-intro">
                    Please register and confirm your acceptance of our terms and conditions to
                    commence the background checking process.
                </div>
                <br />
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input 
                            className={errors.name ? "error" : ""}
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Your name..."
                            value={name}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlurEvent}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div className="col-75">
                        <input                                    
                            className={errors.eMail ? "error" : ""}
                            type="email" 
                            id="email" 
                            name="eMail" 
                            placeholder="Your email address.."
                            value={eMail}
                            onChange={this.props.onChange}
                            onBlur={this.props.onEmailBlur}
                        />
                    </div>
                </div>
                {/*
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="mphone">Phone Number</label>
                    </div>
                    <div className="col-75">
                        <input                                   
                            className={errors.phoneNumber ? "error" : ""}
                            type="tel" 
                            id="mphone" 
                            name="phoneNumber" 
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlurEvent}
                        />
                    </div>
                </div>
                */}

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="mphone">Phone Number</label>
                    </div>
                    <div className="col-75">
                        <Phone
                            className={errors.phoneNumber ? "phone error" : "phone"}
                            type="tel"
                            country="GB"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={this.onPhoneNoChange}
                            onBlur={this.props.onPhoneNoBlur}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <p className="hide-text">Message</p>
                    </div>
                    <div className="col-75">
                        <p className="message">
                            We will send a Verification Code to this number via SMS (or voice message).
                        </p>
                    </div>
                </div>

                <InputAddrSearchTerm 
                    addrSearchTerm={addrSearchTerm} 
                    onChangeEvt={this.onChangeEvt}
                    onBlurEvt={this.onBlurEvt}
                />
                {
                    addrSearchResults && addrSearchResults.count > 0
                    ?
                        <AddressList 
                            addrSearchResults={addrSearchResults}
                        />
                    :
                        null
                }

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
                            value="Register"
                            disabled={!this.onCanSubmit()}
                            onClick={this.props.onHandleSubmit}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <p className="hide-text">Message</p>
                    </div>
                    <div className="col-75">
                        <p className="message">
                            By clicking on the Register button to use our services you agree to be bound by the terms of use.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;