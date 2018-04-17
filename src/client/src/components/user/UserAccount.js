import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";
import cookies from 'react-cookie';
import {Redirect, Switch} from "react-router-dom";

class UserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            logged: true
        };

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        getApi('/user/account').then(res => {
            this.setState({account: res});
        }).catch(reason => {
            console.log(reason);
            this.setState({logged: false})
        });
    }

    logOut(e) {
        e.preventDefault();
        getApi('/user/disconnect').then(res => {
            console.log(res);
            this.setState({logged: false});
        }).catch(reason => {
            alert(reason.toString());
        })
    }

    render() {
        if (cookies.load('token') || this.state.logged) {
            return (
                <div>
                    <h1>Nom: {this.state.account.LastName}</h1>
                    <h1>Prenom: {this.state.account.FirstName}</h1>
                    <button onClick={this.logOut}>Déconnexion</button>
                </div>
            );
        } else {
            return (
                <Switch>
                    <Redirect to="/user/connect" push />
                </Switch>
            )
        }
    }
}

export default UserAccount;