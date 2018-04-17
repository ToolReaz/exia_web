import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import UserRegister from "./components/user/UserRegister";
import UserConnect from "./components/user/UserConnect";
import Admin from "./pages/admin";
import Event from "./pages/user/event";
import ManifestationDetails from "./pages/user/manifestationDetails";
import Index from "./pages";
import Team from "./pages/team";
import Account from "./pages/account";
import Bde from "./pages/bde/bde";
import Shop from "./pages/public/shop";

class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/user/register" component={UserRegister} />
            <Route path="/user/connect" component={UserConnect} />
            <Route path="/user/account" component={Account} />
            <Route path="/admin" component={Admin} />
            <Route path="/event/:id" component={ManifestationDetails} />
            <Route path="/events" component={Event} />
            <Route path="/team" component={Team} />
            <Route path="/bde" component={Bde} />
            <Route path="/shop" component={Shop} />
        </Switch>
    );
  }
}

export default App;