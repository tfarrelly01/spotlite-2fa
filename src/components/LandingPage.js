import React, { Component } from 'react';
import '../css/LandingPage.css';

class Test extends Component {
  render() {
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
                        name="fullname" 
                        placeholder="Your name.."
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className="col-75">
                    <input type="email" id="email" name="email" placeholder="Your email address.."/>
                </div>
            </div>

            <form>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="addrsearch">Search Address</label>
                    </div>
                    <div className="col-75">
                        <input type="search" id="addrsearch" name="addresslookup" placeholder="Enter Post Code or Street Name"/>
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

            <br /> 
            <hr />
            <br />            

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
                        <input type="tel" id="mphone" name="mobilephone" placeholder="Enter your mobile phone number"></input>
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