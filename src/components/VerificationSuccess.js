import React, { Component } from 'react';

import '../css/LandingPage.css';

class VerificationSuccess extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        name={name}
        phoneNumber={phoneNumber}
        eMail={eMail}
        generatedPin={generatedPin}
        verificationCode={verificationCode}
        let {name, phoneNumber, eMail, generatedPin, verificationCode, error} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <h3>Verification Completed</h3>
                </div>
                <div className="row App-intro">
T                   Thank you, the registration process is complete. 
                </div>
            </div>
        );
    }
}

export default VerificationSuccess;