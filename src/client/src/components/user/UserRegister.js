import React, { Component } from 'react';
import $ from 'jquery';
import {Link} from "react-router-dom";

class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password_bis: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    checkValues() {
        if (this.state.firstname && this.state.lastname && this.state.email && this.state.password && this.state.password_bis) {
            if (this.state.password === this.state.password_bis && /^.*([A-Z].*\d|\d.*[A-Z]).*$/.test(this.state.password)) {
                this.register();
                return true;
            }
        } else {
            return false;
        }
    }


    register() {
        let data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            password_bis: this.state.password_bis,
            email: this.state.email
        };
        try {
            $.post('/user/register', data, res => {
                console.log(res);
                if (res.status === 'success') {
                    this.setState({
                        username: '',
                        password: '',
                        password_bis: '',
                        email: ''
                    });
                    document.getElementById("register-form").reset();
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
            this.register();
        } else {
            alert('Erreur dans les données saisi !');
        }
    }


    handleChange(e) {
        e.preventDefault();
        switch (e.target.name) {
            case 'firstname': this.setState({firstname: e.target.value});
                break;
            case 'lastname': this.setState({lastname: e.target.value});
                break;
            case 'email': this.setState({email: e.target.value});
                break;
            case 'password': this.setState({password: e.target.value});
                break;
            case 'password_bis': this.setState({password_bis: e.target.value});
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <div className="grid-container">
                        <form id="register-form" onSubmit={this.handleSubmit}>
                            <legend>Inscrivez vous !</legend>
                            <fieldset>
                                <p>Prénom</p>
                                <input className="input-regular" type="text" name="firstname" placeholder="Prenom" onChange={this.handleChange}/>
                                <p>Nom</p>
                                <input className="input-regular" type="text" name="lastname" placeholder="Nom" onChange={this.handleChange}/>
                                <p>Adresse Email</p>
                                <input className="input-regular" type="mail" name="email" placeholder="Email" onChange={this.handleChange}/>
                                <p>Mot de passe</p>
                                <input className="input-regular" type="text" name="password" placeholder="Mot de passe" onChange={this.handleChange}/>
                                <p>Confirmez le mot de passe</p>
                                <input className="input-regular" type="text" name="password_bis" placeholder="Retaper le mot de passe" onChange={this.handleChange}/>
                                <input className="input-submit-regular" type="submit" value="Valider"/>
                                <div>
                                    <Link from="/user/register" to="/user/connect">Déjà inscrit ?</Link>
                                </div>
                            </fieldset>
                        </form>
            </div>
        )
    }
}

export default UserRegister;