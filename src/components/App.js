import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Container from "./Container";

injectTapEventPlugin();
class App extends Component {

  render() {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Container/>
    </MuiThemeProvider>
    );
  }
}

export default App;
