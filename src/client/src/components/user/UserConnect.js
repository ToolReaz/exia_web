import React, { Component } from 'react';
import $ from 'jquery';
import {getApi, postApi} from '../../lib/api/requestApi';

class UserConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    checkValues() {
        if (this.state.email && this.state.password) {
            this.connect();
            return true;
        } else {
            return false;
        }
    }


    connect() {
        let data = {
            password: this.state.password,
            email: this.state.email
        };
        /*
        postApi('/user/connect', data).then(response => {
            console.log('R'+response);
        }).catch(error => {
            console.log('E'+error);
        });
        */
        try {
            $.post('/user/connect', data, res => {
                console.log(res);
                if (!res.error) {
                    this.setState({
                        username: '',
                        password: '',
                        password_bis: '',
                        email: ''
                    });
                    document.getElementById("connect-form").reset();
                }
            }, "json");
        } catch (e) {
            this.setState({
                error: e
            });
        }

    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.checkValues()) {
            this.connect();
        } else {
            alert('Erreur dans les données saisi !');
        }
    }


    handleChange(e) {
        e.preventDefault();
        switch (e.target.name) {
            case 'email': this.setState({email: e.target.value});
                break;
            case 'password': this.setState({password: e.target.value});
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <div className="grid-container">
                <div className="row">
                    <div className="col-6">
                        <form id="connect-form" onSubmit={this.handleSubmit}><br/>
                            <input className="input-regular" type="mail" name="email" placeholder="Email" onChange={this.handleChange}/><br/><br/>
                            <input className="input-regular" type="text" name="password" placeholder="Mot de passe" onChange={this.handleChange}/><br/><br/>
                            <input className="input-submit-regular" type="submit" value="Connexion"/><br/><br/>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default UserConnect;