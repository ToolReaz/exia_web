import React, { Component } from 'react';
import $ from 'jquery';

class Idea extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    checkValues() {
        if (this.state.email && this.state.password) {
            this.register();
            return true;
        } else {
            return false;
        }
    }


    register() {
        let data = {
            password: this.state.password,
            email: this.state.email
        };
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
            this.register();
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
        }
    }


    render() {
        return (
            <div>
                <form id="connect-form" onSubmit={this.handleSubmit}>
                    <input type="mail" name="email" placeholder="Email" onChange={this.handleChange}/>
                    <input type="text" name="password" placeholder="Mot de passe" onChange={this.handleChange}/>
                    <input type="submit" value="Valider"/>
                </form>
            </div>
        )
    }
}

export default Idea;