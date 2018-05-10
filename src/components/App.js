import React, { Component } from 'react';
import spotLiteLogo from '../SPOTLITE-MASTER-LOGOS-01.png';
import '../css/App.css';
import LandingPage from './LandingPage';
import EnterVerificationCode from './EnterVerificationCode';
import VerificationSuccess from './VerificationSuccess';
import Example from './Example';
import {validateEmail, validatePhoneNo} from '../utils/Validation';
import {postRequest} from '../utils/Common';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        eMail: '',
        selectedAddress: {},
        addressSelected: false,
        phoneNumber: '',
        generatedPin: '',
        verificationCode: '',
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
      error: error, 
      [targetName]: targetValue, 
      errors: 
      {
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
   //   let {generatedPin} = this.state;
      console.log("onHandleSubmit FIRED !!!");
    if (this.onCanSubmit()) {
      console.log("OK to Submit!!!"); 
      this.setState({
        generatedPin: '1234'
      });
    }     
    else {
      console.log("CANNOT Submit!!!");
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
    let {name, eMail, selectedAddress, phoneNumber, generatedPin, verificationCode, error, errors} = this.state;
    return (
      <div className="App">  
        <header className="App-header">
          <img src={spotLiteLogo} className="App-logo" alt="logo" />
        </header>
    
        { generatedPin.length === 0
          ?
            <LandingPage
              name={name}
              eMail={eMail}
              selectedAddress={selectedAddress}
              phoneNumber={phoneNumber}
              error={error}
              errors={errors}
              setError={this.setError}
              setPhoneNumber={this.setPhoneNumber}
              onEmailBlur={this.onEmailBlur}              
              onPhoneNoBlur={this.onPhoneNoBlur}
              onChange={this.onChange}
              onBlurEvent={this.onBlurEvent}
              onCanSubmit={this.onCanSubmit}
              onHandleSubmit={this.onHandleSubmit}      
            />
          : verificationCode.length === 0 || verificationCode !== generatedPin
            ?
              <EnterVerificationCode 
                phoneNumber={phoneNumber}
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
