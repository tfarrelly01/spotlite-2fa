import React, { Component } from 'react';
import spotLiteLogo from '../SPOTLITE-MASTER-LOGOS-01.png';
import '../css/App.css';
import LandingPage from './LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">  
        <header className="App-header">
          <img src={spotLiteLogo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
            Please register and confirm your acceptance of our terms and conditions to
            commence the background checking process.
        </div>
    
        <LandingPage />

      </div>
    );
  }
}

export default App;
