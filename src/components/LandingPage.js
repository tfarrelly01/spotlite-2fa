import React, { Component } from 'react';

import {validateEmail} from '../utils/Validation';
import '../css/LandingPage.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            eMail: '',
            addrSearch: '',
            phoneNumber: '',
            error: null
        }
        this.onChange = this.onChange.bind(this);
        this.onBlurEvent = this.onBlurEvent.bind(this);
        this.setError = this.setError.bind(this);
        this.onCanSubmit = this.onCanSubmit.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
  //      super.componentWillUpdate(nextProps, nextState );
   console.log('componentWillUpdate FIRED !!!');
        var {eMail} = nextState;
    
        if (eMail !== undefined && eMail !== this.state.eMail) {
          if (eMail.length === 0) {
            this.setError(null);
          } else {
            //validate the value we have
            validateEmail(eMail)
            .then(eMail => this.setError(null))
            .catch(error => this.setError(error))
          }
        }
      }

    onChange(event) {
        // console.log('onChange FIRED!!!');
        let targetName = event.target.name;
        let targetValue = event.target.value;
    
        // Clear previous error message if user enters a character in field 
        let error = this.state.error || targetValue.length === 0 ? null : this.state.error;

        this.setState({
          [targetName] : targetValue,
          error: error
        });
    }

    onBlurEvent(event) {
        const {name, eMail, addrSearch, phoneNumber} = this.state;

        let targetName = event.target.name;
        console.log("onBlurEvent - Field::", event.target.name);
        if (targetName === 'name') {
            if (name.length === 0) this.setError('Your name is required');
            else this.setError(null);
        }

        if (targetName === 'eMail') {
            validateEmail(eMail)
                .then(eMail => this.setError(null))
                .catch(error => this.setError(error)) 
        }

        if (targetName === 'phoneNumber') {
            if (phoneNumber.length === 0) this.setError('Your mobile number is required');
            else this.setError(null);
        }   
             
        if (targetName === 'addrSearch') {
            if (addrSearch.length === 0) this.setError('Your address is required');
            else this.setError(null);
        }
    }

    setError (error) {
        this.setState({
            error: error
        });
        console.log('error::', error);
    }

    onCanSubmit() {
        let {name, eMail, addrSearch, phoneNumber, error} = this.state;
        console.log("onCanSubmit FIRED !!!");

        return !error && name.length > 0 && eMail.length > 0 && addrSearch.length > 0 && phoneNumber.length > 0
            ? true
            : false;
    }

    onHandleSubmit() {
  //      let {name, eMail, addrSearch, phoneNumber, error} = this.state;
        console.log("onHandleSubmit FIRED !!!");
        if (this.onCanSubmit()) 
            console.log("OK to Submit!!!");    
        else
            console.log("CANNOT Submit!!!");
    }

    render() {
        let {name, eMail, addrSearch, phoneNumber, error} = this.state;
        return (
            <div className="container">

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Your name..."
                                value={name}
                                onChange={this.onChange}
                                onBlur={this.onBlurEvent}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="email" 
                                id="email" 
                                name="eMail" 
                                placeholder="Your email address.."
                                value={eMail}
                                onChange={this.onChange}
                                onBlur={this.onBlurEvent}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="mphone">Mobile Phone Number</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="tel" 
                                id="mphone" 
                                name="phoneNumber" 
                                placeholder="Enter your mobile phone number"
                                value={phoneNumber}
                                onChange={this.onChange}
                                onBlur={this.onBlurEvent}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="addrsearch">Search Address</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="search" 
                                id="addrsearch" 
                                name="addrSearch" 
                                placeholder="Enter Post Code or Street Name"
                                value={addrSearch}
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
                                value="Register"
                                disabled={!this.onCanSubmit()}
                                onClick={this.onHandleSubmit}
                            />
                        </div>
                    </div>
            </div>
        );
    }
}

export default LandingPage;