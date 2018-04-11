import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import UserRegister from "./components/user/UserRegister";
import Home from "./components/Home";
import Nav from "./components/Nav";
import UserConnect from "./components/user/UserConnect";
import Admin from "./components/admin/Admin";
import IdeasPage from "./components/IdeasPage";

class App extends Component {
  render() {
    return (
        <CookiesProvider>
            <div className="App">
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/user/register" component={UserRegister} />
                    <Route path="/user/connect" component={UserConnect} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/idee" component={IdeasPage} />
                </Switch>
            </div>
        </CookiesProvider>
    );
  }
}

export default App;
