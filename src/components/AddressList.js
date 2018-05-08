import React, { Component } from 'react';
import '../css/LandingPage.css';
import Address from './Address';

import {getRequest} from '../utils/Common';

class AddressList extends Component {
    constructor(props) {
        super(props);
        this.onChangeEvt = this.onChangeEvt.bind(this);
    }

    onChangeEvt(event) {
        const targetValue = event.target.value;
        console.log('onChange Event fired!!!');
        console.log('event.target.value');
    }

    render() {
        let {addrSearchResults} = this.props;
       console.log('AddressList - addrSearchResults:::', addrSearchResults.results);

        return (
            <select className="form-control" onChange={this.onChangeEvt}>
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
                                onChangeEvt={this.onChangeEvt} 
                            />)
                    }
                )}
            </select>
        );
    }
}

export default AddressList;