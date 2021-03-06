import React, { Component } from 'react';
import {postApi} from '../../lib/api/requestApi';
import {Link, Redirect, Switch} from "react-router-dom";
import cookies from 'react-cookie';
import { withAlert } from "react-alert";

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
        postApi('/user/connect', data).then(response => {
            this.setState({
                email: '',
                password: ''
            });
        }).catch(error => {
            console.log('E'+error);
        });
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
        if (cookies.load('token')) {
            this.props.alert.success("Connexion réussie !");
            return (
                <Switch>
                    <Redirect from="/user/connect" to="/user/account" push />
                </Switch>
            )
        } else {
            return (
                <div className="conteneurform">
                    <form className="formsolo" id="connect-form" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Connectez vous !</legend>
                            <p>Adresse Email</p>
                            <input className="input-regular" type="mail" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                            <p>Mot de passe</p>
                            <input className="input-regular" type="password" name="password"  placeholder="Mot de passe" value={this.state.password} onChange={this.handleChange}/>
                            <input className="input-submit-regular" type="submit" value="Connexion"/>
                            <div>
                                <Link className="liendeja" from="/user/connect" to="/user/register">Pas encore inscrit ?</Link>
                            </div>
                        </fieldset>
                    </form>
                </div>
            )
        }
    }
}

export default withAlert(UserConnect);