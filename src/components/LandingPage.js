import React, { Component } from 'react';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import InputAddrSearchTerm from './InputAddrSearchTerm';
import AddressList from './AddressList';
import AddressCard from './AddressCard';
import '../css/LandingPage.css';

import {getRequest} from '../utils/Common';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addrSearchTerm: '',
            addrSearchResults: {
                count: 0,
                results: []
            },
            addressLink: '' 
        }
        this.onChangeEvt = this.onChangeEvt.bind(this);
        this.onCanSubmit = this.onCanSubmit.bind(this);
        this.onPhoneNoChange = this.onPhoneNoChange.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.addrSearchTerm && nextState.addrSearchTerm !== this.state.addrSearchTerm) {
            this.loadData(nextState.addrSearchTerm);
        }
        if (nextState.addressLink && nextState.addressLink !== this.state.addressLink) {
            this.loadAddress(nextState.addressLink);
        }
    }

    loadData (searchTerm) {
        const URI = `https://api.edq.com/capture/address/v2/search?query=${searchTerm}&country=GBR&take=100`;
        
        getRequest(URI)
            .then( response => {
                this.setState({
                    addrSearchResults: response
                });
            })
            .catch(err => err);
    }

    loadAddress (searchTerm) {
        const URI = `${searchTerm}`;
        getRequest(URI)
            .then( (response) => {
                if (!response.message) {
                    this.props.setAddress(response.address);    
                    this.setState({
                        ...this.state,
                        addrSearchTerm: '',
                        addrSearchResults: {
                            ...this.state.addrSearchResults,
                            count: 0,
                            results: []
                        },
                        addressLink: ''
                    });
                } else {
                    // error - i.e. response.message 
                }
            })
            .catch(err => err);
    }

    onChangeEvt(event) {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        this.props.setError(null);

        if (targetName === 'addrSearchTerm') {
            this.props.resetAddrState();
        }

        this.setState({
            [targetName]: targetValue
        })
    }

    onPhoneNoChange(phoneNumber) {
        this.props.setPhoneNumber(phoneNumber);
    }

    onCanSubmit() {
        return this.props.onCanSubmit();
    }

    render() {
        const {surname, middleName, forename, eMail, addressSelected, phoneNumber, error, errors, contactAddr1, contactAddr2, contactAddr3, contactCity, contactPostCode, contactState} = this.props;
        const {addrSearchTerm, addrSearchResults} = this.state;

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
{/*
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
*/}
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="name">Surname</label>
                    </div>
                    <div className="col-75">
                        <input 
                            className={errors.surname ? "error" : ""}
                            type="text" 
                            id="surname" 
                            name="surname" 
                            placeholder="Your surname"
                            value={surname}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlurEvent}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="name">Middle Names</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type="text" 
                            id="middleName" 
                            name="middleName" 
                            placeholder="Any middle names"
                            value={middleName}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlurEvent}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="name">Forename</label>
                    </div>
                    <div className="col-75">
                        <input 
                            className={errors.forename ? "error" : ""}
                            type="text" 
                            id="forename" 
                            name="forename" 
                            placeholder="Your forename"
                            value={forename}
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
                            placeholder="Your email address"
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
                />
                {
                    addressSelected
                    ?
                        <AddressCard
                            contactAddr1={contactAddr1} 
                            contactAddr2={contactAddr2} 
                            contactAddr3={contactAddr3} 
                            contactCity={contactCity} 
                            contactState={contactState} 
                            contactPostCode={contactPostCode}               
                        />
                    :
                        addrSearchResults && addrSearchResults.count > 0
                        ?
                            <AddressList 
                                addrSearchResults={addrSearchResults}
                                onChangeEvt={this.onChangeEvt}
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