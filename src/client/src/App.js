import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import UserRegister from "./components/user/UserRegister";
import Home from "./components/Home";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Nav />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user/register" component={UserRegister} />
          </Switch>
      </div>
    );
  }
}

export default App;
