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
    }

    componentDidMount() {
        console.log('lol');
        getApi('/user/account').then(res => {
            console.log(res);
            this.setState({account: res});
        }).catch(reason => {
            console.log(reason);
            this.setState({logged: false})
        });
    }

    render() {
        if (cookies.load('token') || this.state.logged) {
            return (
                <div>
                    <h1>Nom: {this.state.account.Nom}</h1>
                    <h1>Prenom: {this.state.account.Prenom}</h1>
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