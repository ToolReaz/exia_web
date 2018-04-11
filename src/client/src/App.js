import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import UserRegister from "./components/user/UserRegister";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import UserConnect from "./components/user/UserConnect";
import Admin from "./pages/admin";
import IdeasPage from "./pages/user/IdeasPage";
import Index from "./pages";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/user/register" component={UserRegister} />
                <Route path="/user/connect" component={UserConnect} />
                <Route path="/admin" component={Admin} />
                <Route path="/idee" component={IdeasPage} />
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default App;
