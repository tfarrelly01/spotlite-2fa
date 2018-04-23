import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import LandingPage from './LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotlite Logo Here</h1>
        </header>
        <div className="App-intro">
          <h2>Register</h2>
          <p>
            Please register and confirm your acceptance of our terms and conditions to
            commence the background checking process.
          </p>
        </div>
    
        <LandingPage />

      </div>
    );
  }
}

export default App;
