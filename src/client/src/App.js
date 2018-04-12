import React, { Component } from 'react';
import './stylesheets/index.css';
import {Route, Switch} from "react-router-dom";
import UserRegister from "./components/user/UserRegister";
import UserConnect from "./components/user/UserConnect";
import Admin from "./pages/admin";
import Event from "./pages/user/event";
import Index from "./pages";
import Team from "./pages/team";
import Account from "./pages/account";

class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/user/register" component={UserRegister} />
            <Route path="/user/connect" component={UserConnect} />
            <Route path="/admin" component={Admin} />
            <Route path="/event" component={Event} />
            <Route path="/team" component={Team} />
            <Route path="/user/account" component={Account} />
        </Switch>
    );
  }
}

export default App;