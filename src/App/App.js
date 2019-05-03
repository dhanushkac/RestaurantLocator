import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import orange from "@material-ui/core/colors/orange";

import { Provider } from "react-redux";

import "./App.css";
import Navigation from "./../components/Navigation/Navigation";
import Home from "./../components/Home/Home";

import store from "./../store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange["900"]
    },
    secondary: purple
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Navigation />
          <Home />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
