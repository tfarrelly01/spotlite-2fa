import React, { Component } from 'react';
import spotLiteLogo from '../SPOTLITE-MASTER-LOGOS-01.png';
import '../css/App.css';
import LandingPage from './LandingPage';
import EnterVerificationCode from './EnterVerificationCode';
import VerificationSuccess from './VerificationSuccess';
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
        }
    }
    this.onChange = this.onChange.bind(this);
    this.onBlurEvent = this.onBlurEvent.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onCanSubmit = this.onCanSubmit.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.setVerificationCode = this.setVerificationCode.bind(this);
  }

  /*
  componentWillUpdate(nextProps, nextState) {
    //      super.componentWillUpdate(nextProps, nextState );
      let {eMail} = nextState;
  
      if (eMail !== undefined && eMail !== this.state.eMail) {
          if (eMail.length === 0) {
              this.updateState(null);
          } else {
              //validate the value we have
              validateEmail(eMail)
              .then(eMail => this.updateState(null))
              .catch(error => this.updateState(error))
          }
      }
  }
  */
  
  componentWillUpdate(nextProps, nextState) {
    //      super.componentWillUpdate(nextProps, nextState );
    let {eMail} = nextState;

    if (eMail !== undefined && eMail !== this.state.eMail) {
        if (eMail.length === 0) {
            this.updateState(null, 'eMail', eMail);
        } else {
          //validate the value we have
          if (!validateEmail(eMail)) {
            this.updateState('Unexpected email format', 'eMail', eMail);
          } else {
            this.updateState(null, 'eMail', eMail);
          }
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
            .then(eMail => error = this.updateState(null))
            .catch(error => error = this.updateState(error)) 
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
        .then(phoneNumber => error = this.updateState(null))
        .catch(error => error = this.updateState(error)) 
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

  onCanSubmit() {
    let {error, errors} = this.state;

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
    else {
        console.log("CANNOT Submit!!!");
    }
  }

  setVerificationCode(code) {
    this.setState({
      verificationCode: code
    });
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
          : verificationCode.length === 0 || verificationCode !== generatedPin
            ?
              <EnterVerificationCode 
                phoneNumber={phoneNumber}
                generatedPin={generatedPin}
                verificationCode={verificationCode}
                setVerificationCode={this.setVerificationCode}
              />
            :
            <VerificationSuccess />
        }
      </div>
    );
  }
}

export default App;
