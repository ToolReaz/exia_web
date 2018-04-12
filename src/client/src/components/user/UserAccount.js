import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";
import cookies from 'react-cookie';
import {Redirect, Switch} from "react-router-dom";

class UserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {}
        };
    }

    componentDidMount() {
        console.log('lol');
        getApi('/user/account').then(res => {
            console.log(res);
            this.setState({account: res});
        }).catch(reason => {
            console.log(reason);
        });
    }

    render() {
        if (cookies.load('token'))  {
            return (
                <div>
                    <h1>Compte de: {this.state.account.Nom}</h1>
                </div>
            );
        } else {
            return (
                <Switch>
                    <Redirect from="/user/account" to="/user/connect" push />
                </Switch>
            )
        }
    }
}

export default UserAccount;