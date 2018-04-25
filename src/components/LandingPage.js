import React, { Component } from 'react';

import {validateEmail} from '../utils/Validation';
import '../css/LandingPage.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.onCanSubmit = this.onCanSubmit.bind(this);
    }

    onCanSubmit() {
        return this.props.onCanSubmit();
    }

    render() {
        let {name, eMail, addrSearch, phoneNumber, error} = this.props;
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
                                type="email" 
                                id="email" 
                                name="eMail" 
                                placeholder="Your email address.."
                                value={eMail}
                                onChange={this.props.onChange}
                                onBlur={this.props.onBlurEvent}
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
                                onChange={this.props.onChange}
                                onBlur={this.props.onBlurEvent}
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
                                value="Register"
                                disabled={!this.onCanSubmit()}
                                onClick={this.props.onHandleSubmit}
                            />
                        </div>
                    </div>
            </div>
        );
    }
}

export default LandingPage;