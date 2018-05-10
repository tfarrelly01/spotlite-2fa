import React, { Component } from 'react';
import '../css/LandingPage.css';
import Address from './Address';

 const AddressList = (props) => {
    let {addrSearchResults} = props;

    return (
        <select className="address-list" name="addressLink" onChange={props.onChangeEvt} size={addrSearchResults.results.length + 1}>
            <option value="">
                Select one...
            </option>
            {
                addrSearchResults.results.map( (address) => {
                    return (
                        <Address 
                            key={address.format} 
                            format={address.format}
                            suggestion={address.suggestion} 
                        />)
                }
            )}
        </select>
    );
}

export default AddressList;