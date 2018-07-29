import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import BottomNavigation from './components/BottomNavigation'

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Blockchain Learning Group's Certification Registry</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <BottomNavigation/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
