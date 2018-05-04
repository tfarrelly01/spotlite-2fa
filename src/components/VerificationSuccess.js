import React from 'react';

import '../css/LandingPage.css';

const VerificationSuccess = (props) => (
    <div className="container">
        <div className="row">
            <h3>Verification Completed</h3>
        </div>
        <div className="row App-intro">
            Thank you {props.name} for registering, the process is now complete. Please close this browser window.
        </div>
    </div>
);

export default VerificationSuccess;