import React, { Component } from 'react';

import {validateEmail} from '../utils/Validation';
import '../css/LandingPage.css';

class Test extends Component {
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
        this.setError = this.setError.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this);
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
    //    let error = this.state.error;
        let error = this.state.error || targetValue.length === 0 ? null : this.state.error;
    //    error || targetValue.length === 0 ? error = null : error;

        console.log("targetName:", targetName);
        console.log("targetValue:", targetValue);

        this.setState({
          [targetName] : targetValue,
          error: error
        });
    }

    setError (error) {
        this.setState({
            error: error
        });
        console.log('error::', error);
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
                            placeholder="Your name.."
                            value={name}
                            onChange={this.onChange}
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

                        />
                    </div>
                </div>

                <form>
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
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor=""></label>
                        </div>
                        <div className="col-75">
                            <input type="submit" value="Search"/>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col-25 hide-text">
                        <p>Error</p>
                    </div>
                    <div className="col-75">
                        <p className="error">{error}</p>
                    </div>
                </div>
                <hr />

                <form>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="addr1">Address (Line 1)</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="addr1" name="addrline1" placeholder="First line of your address.."/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="addr2">Line 2 (Optional)</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="addr2" name="addrline2" placeholder="Second line of your address.."/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="tcity">Town / City</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="tcity" name="towncity" placeholder="Town / City"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="state">County / State</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="state" name="statecounty" placeholder="County / State"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="pcode">Post Code / Zip</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="pcode" name="pcodezip" placeholder="Post Code / Zip"/>
                        </div>
                    </div>

                    <br />

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
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor=""></label>
                        </div>
                        <div className="col-75">
                            <input type="submit" value="Send Verification Code"/>
                        </div>
                    </div>
                </form>
            </div>
    );
  }
}

export default Test;