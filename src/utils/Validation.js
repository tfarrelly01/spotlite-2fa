const REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEXP_PHONE = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/


export function validateEmail( email ){
	return new Promise( ( resolve, reject ) => {
		REGEXP_EMAIL.test( String(email).toLowerCase() ) ? resolve(email) : reject(`Unexpected email address format`);
	} );
}

export function validatePhoneNo( phoneNumber ){
	return new Promise( ( resolve, reject ) => {
		REGEXP_PHONE.test( String(phoneNumber)) ? resolve(phoneNumber) : reject(`Unexpected phone number format`);
	} );
}

/*
export function validateEmail(email) {
	return REGEXP_EMAIL.test(String(email).toLowerCase());
}

export function validatePhoneNo(phoneNumber) {
	return REGEXP_PHONE.test(String(phoneNumber));
}
*/