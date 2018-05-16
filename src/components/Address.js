import React from 'react';
import '../css/LandingPage.css';

const Address = (props) => (
	<option key={props.format} value={props.format}>
		{props.suggestion}
	</option>

);

export default Address;