import React from 'react';
import '../css/LandingPage.css';

const InputAddrSearchTerm = props => (
	<div className="row">
		<div className="col-25">
			<label htmlFor="addrsearchterm">Search Address</label>
		</div>
		<div className="col-75">
			<input
				type="search" 
				id="addrsearchTerm" 
				name="addrSearchTerm" 
				placeholder="Enter Post Code or Street Name"
				value={props.addrSearchTerm}
				onChange={props.onChangeEvt}
				onBlur={props.onBlurEvt}
			/>
		</div>
  </div>
);

export default InputAddrSearchTerm;
