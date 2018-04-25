import React, { Component } from 'react';
import spotLiteLogo from '../SPOTLITE-MASTER-LOGOS-01.png';
import '../css/App.css';
import LandingPage from './LandingPage';
import {validateEmail, validatePhoneNo} from '../utils/Validation';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        eMail: '',
        addrSearch: '',
        phoneNumber: '',
        error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onBlurEvent = this.onBlurEvent.bind(this);
    this.setError = this.setError.bind(this);
    this.onCanSubmit = this.onCanSubmit.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

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

  onChange(event) {
      // console.log('onChange FIRED!!!');
      let targetName = event.target.name;
      let targetValue = event.target.value;

      // Clear previous error message if user enters a character in field 
      let error = this.state.error || targetValue.length === 0 ? null : this.state.error;

      this.setState({
        [targetName] : targetValue,
        error: error
      });
  }

  onBlurEvent(event) {
      const {name, eMail, addrSearch, phoneNumber} = this.state;

      let targetName = event.target.name;
      console.log("onBlurEvent - Field::", event.target.name);
      if (targetName === 'name') {
          if (name.length === 0) this.setError('Your name is required');
          else this.setError(null);
      }

      if (targetName === 'eMail') {
          validateEmail(eMail)
              .then(eMail => this.setError(null))
              .catch(error => this.setError(error)) 
      }

      if (targetName === 'phoneNumber') {
          if (phoneNumber.length === 0) {
            this.setError('Your mobile number is required');
          }
          else {
            validatePhoneNo(phoneNumber)
            .then(phoneNumber => this.setError(null))
            .catch(error => this.setError(error)) 
          }
      }   
          
      if (targetName === 'addrSearch') {
          if (addrSearch.length === 0) this.setError('Your address is required');
          else this.setError(null);
      }
  }

  setError (error) {
      this.setState({
          error: error
      });
      console.log('error::', error);
  }

  onCanSubmit() {
    let {name, eMail, addrSearch, phoneNumber, error} = this.state;
    console.log("onCanSubmit FIRED !!!");

    return !error && name.length > 0 && eMail.length > 0 && addrSearch.length > 0 && phoneNumber.length > 0
        ? true
        : false;
  }

  onHandleSubmit() {
  //      let {name, eMail, addrSearch, phoneNumber, error} = this.state;
      console.log("onHandleSubmit FIRED !!!");
      if (this.onCanSubmit()) 
          console.log("OK to Submit!!!");    
      else
          console.log("CANNOT Submit!!!");
  }

  render() {
    let {name, eMail, addrSearch, phoneNumber, error} = this.state;
    return (
      <div className="App">  
        <header className="App-header">
          <img src={spotLiteLogo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
            Please register and confirm your acceptance of our terms and conditions to
            commence the background checking process.
        </div>
    
        <LandingPage
          name={name}
          eMail={eMail}
          addrSearch={addrSearch}
          phoneNumber={phoneNumber}
          error={error}
          onChange={this.onChange}
          onBlurEvent={this.onBlurEvent}
          setError={this.setError}
          onCanSubmit={this.onCanSubmit}
          onHandleSubmit={this.onHandleSubmit}      
        />
      </div>
    );
  }
}

export default App;
