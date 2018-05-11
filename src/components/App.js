import React, { Component } from 'react';
import spotLiteLogo from '../SPOTLITE-MASTER-LOGOS-01.png';
import '../css/App.css';
import LandingPage from './LandingPage';
import EnterVerificationCode from './EnterVerificationCode';
import VerificationSuccess from './VerificationSuccess';
import {validateEmail, validatePhoneNo} from '../utils/Validation';
import {postRequest, postApplicant} from '../utils/Common';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        eMail: '',
        selectedAddress: {},
        addressSelected: false,
        phoneNumber: '',
        pinGenerated: false,
        pinVerified: false,
        verificationCode: '',
generatedPin: '1234',
        error: null,
        errors: {
          name: true,
          eMail: true,
          phoneNumber: true,
        }
    }
    this.onChange = this.onChange.bind(this);
    this.onBlurEvent = this.onBlurEvent.bind(this);
    this.onEmailBlur = this.onEmailBlur.bind(this);
    this.onPhoneNoBlur = this.onPhoneNoBlur.bind(this);
    this.getData = this.getData.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onCanSubmit = this.onCanSubmit.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.setVerificationCode = this.setVerificationCode.bind(this);
    this.setError = this.setError.bind(this);
    this.setPhoneNumber = this.setPhoneNumber.bind(this);
    this.setAddress = this.setAddress.bind(this);
  }
  
  componentWillUpdate(nextProps, nextState) {
    let {eMail} = nextState;

    if (eMail !== undefined && eMail !== this.state.eMail) {
        if (eMail.length === 0) {
            this.updateState(null, 'eMail', eMail);
        } else {
          //validate the value we have
          validateEmail(eMail)
            .then(value => this.updateState(null, 'eMail', eMail))
            .catch(error => this.updateState(error, 'eMail', eMail)) 
        }
    }
  }

  onChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;

    // Clear previous error message if user enters a character in field 
    let error = this.state.error  ? null : this.state.error;
    
    this.updateState(error, targetName, targetValue);
  }

  onBlurEvent(event) {

    let targetName = event.target.name;
    let targetValue = event.target.value;
    let error;

    if (targetName === 'name') {
      if (targetValue.length === 0) {
        error = 'Your name is required';
      } else {
        error = null;
      }
    }

    if (targetName === 'verificationCode') {
      if (targetValue.length === 0) {
        error = 'A Verification Code is required!';
      } else {
        error = null;
      }
    }

    this.updateState(error, targetName, targetValue);
  }

  updateState (error, targetName, targetValue) {
    this.setState({
      ...this.state, 
      selectedAddress: {
        ...this.state.selectedAddress
      },
      error: error, 
      [targetName]: targetValue, 
      errors: {
        ...this.state.errors, 
        [targetName]: error ? true : false
      }
    });
  }

  setError(error) {
    this.setState({
      error
    });
  }

  setAddress(address) {
    this.setState({
      ...this.state, 
      addressSelected: true,
      selectedAddress: {
        ...this.state.selectedAddress,
        contactAddr1: address[0].addressLine1,
        contactAddr2: address[1].addressLine2,
        contactAddr3: address[2].addressLine3,
        contactCity: address[3].locality,
        contactState: address[4].province,
        contactPostCode: address[5].postalCode,
        contactCountry: address[6].country
      },
      errors: {
        ...this.state.errors
      },
    });

    console.log('this.state - App :', this.state);
  }

  setPhoneNumber(phoneNumber) {
    // Clear previous error message if user enters a character in field 
    let error = this.state.error  ? null : this.state.error;

    this.updateState(error, 'phoneNumber', phoneNumber)
  }

  onCanSubmit() {
    let {error, errors, addressSelected} = this.state;

    return error || Object.values(errors).indexOf(true) > -1 || !addressSelected
      ? false
      : true;
  }

  onHandleSubmit() {
    const {eMail} = this.state
    let {pinGenerated} = this.state;

    if (this.onCanSubmit()) {
        const URI = 'http://localhost:4090/home/applicant';
        const options = {applicantEmail: eMail};
        postApplicant(URI, options )
        .then((data) => {
          if (data.status === 'error') {
            this.setState({error: data.error});
          } else {
            console.log('data:', data); return data; 
            this.setState({pinGenerated: true});
          }
        })
        .catch(error => this.setState({error: error.message || error}));
    }     
    else {
      console.log("CANNOT Submit!!!");
      // generate error message - based on first flagged error. Ensure errors searched for are in form field order
    }
  }

  setVerificationCode(code) {
    this.setState({
      verificationCode: code
    });
  }
    
  onEmailBlur(event) {
    const emailAddress = event.target.value;
    const targetName = event.target.name;

    const URI = 'https://api.experianmarketingservices.com/sync/queryresult/EmailValidate/1.0/';
    const options = {
      Email: emailAddress, 
      Timeout: '5',
      Verbose: 'True'
    };

    if (emailAddress.length === 0) {
      this.updateState('An email address is required', targetName, emailAddress);
    } else {  
      validateEmail(emailAddress)
        .then((email) => {
          return this.getData(URI, options)
            .then((data) => {
              console.log('data:', data);
              if (data.Certainty === 'verified' || data.Certainty === 'unknown') {
                this.updateState(null, targetName, emailAddress);               
              } else {
                let error = `The email address has been classified as ${data.Certainty} (${data.VerboseOutput}). Please check and re-enter`;
                this.updateState(error, targetName, emailAddress);
              }
            })
            .catch(err=> err)
        })
        .catch(err => this.updateState(err, targetName, emailAddress)) 
    } 
  }

  onPhoneNoBlur(event) {
    const phoneNumber = event.target.value || '';
    const targetName = 'phoneNumber';

    const URI = 'https://api.experianmarketingservices.com/sync/queryresult/PhoneValidate/3.0/';
    const options = {
      Number: phoneNumber
    };

    if (phoneNumber.length === 0) {
      this.updateState('Telephone number is required', targetName, phoneNumber);
    } else {  
      validatePhoneNo(phoneNumber)
        .then((phone) => {
          return this.getData(URI, options)
            .then((data) => {
              if (data.ResultCode > 0) {
                this.updateState(null, targetName, phone);               
              } else {
                this.updateState('Telephone number not verified, please re-enter', targetName, phone);
              }
            })
            .catch(error => error)
        })
        .catch(error => this.updateState(error, targetName, phoneNumber)) 
    } 
  }

  getData(URI, options) {
    return new Promise( ( resolve, reject ) => {
      postRequest(URI, options)
        .then((response) => {console.log('getData response:', response); resolve(response)}) 
        .catch((err) => { console.log('getData err:', err); reject(err)});
    } );
  }

  render() {
    let {name, eMail, selectedAddress, addressSelected, phoneNumber, pinGenerated, generatedPin, pinVerified, verificationCode, error, errors} = this.state;
    return (
      <div className="App">  
        <header className="App-header">
          <img src={spotLiteLogo} className="App-logo" alt="logo" />
        </header>
    
        { !pinGenerated
          ?
            <LandingPage
              name={name}
              eMail={eMail}
              selectedAddress={selectedAddress}
              addressSelected={addressSelected}
              phoneNumber={phoneNumber}
              error={error}
              errors={errors}
              setError={this.setError}
              setPhoneNumber={this.setPhoneNumber}
              setAddress={this.setAddress}
              onEmailBlur={this.onEmailBlur}              
              onPhoneNoBlur={this.onPhoneNoBlur}
              onChange={this.onChange}
              onBlurEvent={this.onBlurEvent}
              onCanSubmit={this.onCanSubmit}
              onHandleSubmit={this.onHandleSubmit}      
            />
          : pinGenerated && !pinVerified
            ?
              <EnterVerificationCode 
                phoneNumber={phoneNumber}
                pinGenerated={pinGenerated}
            generatedPin={generatedPin}
                verificationCode={verificationCode}
                setVerificationCode={this.setVerificationCode}
              />
            :
            <VerificationSuccess 
              name={name}
            />
        }
      </div>
    );
  }
}

export default App;
