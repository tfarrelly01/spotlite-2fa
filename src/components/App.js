import React, { Component } from 'react';
import spotLiteLogo from '../SPOTLITE-MASTER-LOGOS-01.png';
import '../css/App.css';
import LandingPage from './LandingPage';
import EnterVerificationCode from './EnterVerificationCode';
import {validateEmail, validatePhoneNo} from '../utils/Validation';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        eMail: '',
        addrSearch: '',
        phoneNumber: '',
        generatedPin: '',
        verificationCode: '',
        error: null,
        errors: {
          name: true,
          eMail: true,
          addrSearch: true,
          phoneNumber: true,
          verificationCode: false,
        }
    }
    this.onChange = this.onChange.bind(this);
    this.onBlurEvent = this.onBlurEvent.bind(this);
    this.setError = this.setError.bind(this);
    this.onCanSubmit = this.onCanSubmit.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  /*
  componentWillUpdate(nextProps, nextState) {
    //      super.componentWillUpdate(nextProps, nextState );
      let {eMail} = nextState;
  
      if (eMail !== undefined && eMail !== this.state.eMail) {
          if (eMail.length === 0) {
              this.setError(null);
          } else {
              //validate the value we have
              validateEmail(eMail)
              .then(eMail => this.setError(null))
              .catch(error => this.setError(error))
          }
      }
  }
  */
  
  componentWillUpdate(nextProps, nextState) {
    //      super.componentWillUpdate(nextProps, nextState );
      let {eMail} = nextState;
  
      if (eMail !== undefined && eMail !== this.state.eMail) {
          if (eMail.length === 0) {
              this.setError(null, 'eMail', eMail);
          } else {
            //validate the value we have
            if (!validateEmail(eMail)) {
              this.setError('Unexpected email format', 'eMail', eMail);
            } else {
              this.setError(null, 'eMail', eMail);
            }
/*
              validateEmail(eMail)
              .then(eMail => this.setError(null, 'eMail', eMail))
              .catch(error => this.setError(error, 'eMail', eMail))
*/
          }
      }
  }

  onChange(event) {
      console.log('onChange FIRED!!!');
      let targetName = event.target.name;
      let targetValue = event.target.value;

      // Clear previous error message if user enters a character in field 
      let error = this.state.error  ? null : this.state.error;
      let errorFound = this.state.error ? true : false;
      
      this.setState({
        ...this.state, 
        [targetName]: targetValue, 
        error: error, 
        errors: {
          ...this.state.errors, 
          [targetName]: errorFound
        }
      });
  }

  onBlurEvent(event) {
      // const {name, eMail, addrSearch, phoneNumber, generatedPin, verificationCode, errors} = this.state;

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

      if (targetName === 'eMail') {
        if (targetValue.length === 0) {
          error = 'An email address is required'; 
        } else {
          if (!validateEmail(targetValue)) {
            error = 'Unexpected email format';
          } else {
            error = null;
          }
        /*
          validateEmail(eMail)
              .then(eMail => error = this.setError(null))
              .catch(error => error = this.setError(error)) 
        */
        }
      }

      if (targetName === 'phoneNumber') {
          if (targetValue.length === 0) {
            error = 'Telephone number is required';
          } else {
            if (!validatePhoneNo(targetValue)) {
              error = 'Unexpected phone number format';
            } else {
              error = null;
            }
            /*
            validatePhoneNo(phoneNumber)
            .then(phoneNumber => error = this.setError(null))
            .catch(error => error = this.setError(error)) 
            */
          }
      }   
          
      if (targetName === 'addrSearch') {
          if (targetValue.length === 0) {
            error = 'Your address is required';
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

      let errorFound = error ? true : false;

      this.setState({
        ...this.state, 
        error: error, 
        [targetName]: targetValue, 
        errors: 
        {
          ...this.state.errors, 
          [targetName]: errorFound
        }
      });
  }

  setError (error, targetName, targetValue) {
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

  onCanSubmit() {
    let {error, errors} = this.state;

    console.log('this.state::', this.state);
    return error || Object.values(errors).indexOf(true) > -1
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
      else
          console.log("CANNOT Submit!!!");
  }

  render() {
    let {name, eMail, addrSearch, phoneNumber, generatedPin, verificationCode, error, errors} = this.state;
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
              addrSearch={addrSearch}
              phoneNumber={phoneNumber}
              error={error}
              errors={errors}
              onChange={this.onChange}
              onBlurEvent={this.onBlurEvent}
              onCanSubmit={this.onCanSubmit}
              onHandleSubmit={this.onHandleSubmit}      
            />
          :
            <EnterVerificationCode 
              phoneNumber={phoneNumber}
              verificationCode={verificationCode}
              error={error}
              errors={errors}
              onChange={this.onChange}
              onBlurEvent={this.onBlurEvent}
              onCanSubmit={this.onCanSubmit}
              onHandleSubmit={this.onHandleSubmit}        
            />
        }
      </div>
    );
  }
}

export default App;
