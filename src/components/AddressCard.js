import React from 'react';

import '../css/LandingPage.css';

const AddressCard = (props) => (
    <div>
        <div className="row">
            <div className="col-25">
                <label htmlFor="addrline1">Address Line 1</label>
            </div>
            <div className="col-75">
                <input
                    type="text" 
                    id="addrline1" 
                    name="contactAddr1" 
                    readOnly={true}
                    defaultValue={props.contactAddr1}
                />
            </div>
        </div>
        
        <div className="row">
            <div className="col-25">
                <label htmlFor="addrline2">Address Line 2</label>
            </div>
            <div className="col-75">
                <input
                    type="text" 
                    id="addrline2" 
                    name="contactAddr2" 
                    readOnly={true}
                    defaultValue={props.contactAddr2}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-25">
                <label htmlFor="addrline3">Address Line 3</label>
            </div>
            <div className="col-75">
                <input
                    type="text" 
                    id="addrline3" 
                    name="contactAddr3" 
                    readOnly={true}
                    defaultValue={props.contactAddr3}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-25">
                <label htmlFor="city">Town / City</label>
            </div>
            <div className="col-75">
                <input
                    type="text" 
                    id="city" 
                    name="contactCity" 
                    readOnly={true}
                    defaultValue={props.contactCity}
                />
            </div>
        </div>

        <div className="row">            
            <div className="col-25">
                <label htmlFor="state">State / Province / Region</label>
            </div>
            <div className="col-75">
                <input
                    type="text" 
                    id="state" 
                    name="contactState" 
                    readOnly={true}
                    defaultValue={props.contactState}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-25">
                <label htmlFor="postcode">Zip / Postal Code</label>
            </div>
            <div className="col-75">
                <input
                    type="text" 
                    id="postcode" 
                    name="contactPostCode" 
                    readOnly={true}
                    defaultValue={props.contactPostCode}
                />
            </div>
        </div>
    </div>
);

export default AddressCard;