import React, { Component } from 'react';
import $ from 'jquery';

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
            <div>
                <form id="register-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="firstname" placeholder="Prenom" onChange={this.handleChange}/>
                    <input type="text" name="lastname" placeholder="Nom" onChange={this.handleChange}/>
                    <input type="mail" name="email" placeholder="Email" onChange={this.handleChange}/>
                    <input type="text" name="password" placeholder="Mot de passe" onChange={this.handleChange}/>
                    <input type="text" name="password_bis" placeholder="Retaper le mot de passe" onChange={this.handleChange}/>
                    <input type="submit" value="Valider"/>
                </form>
            </div>
        )
    }
}

export default UserRegister;