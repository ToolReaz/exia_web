import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import cookies from "react-cookie";
import {postApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
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
            if (this.state.password === this.state.password_bis && /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(this.state.password)) {
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
        postApi('/user/register', data).then(res => {
            this.setState({
                username: '',
                password: '',
                password_bis: '',
                email: ''
            });
            document.getElementById("register-form").reset();
            this.setState({finished: true});
            this.props.alert.success('Inscription effectuée avec succès');
        }).catch(reason => {
            this.props.alert.error('Une erreur est survenue lors de l\'inscription');
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.checkValues()) {
            this.register();
        } else {
            this.props.alert.error('Erreur dans les données saisies !');
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
        if (cookies.load('token')) {
            return (<Redirect from="/user/register" to="/user/account" push/>);
        } else if (this.state.finished) {
            return (<Redirect from="/user/register" to="/user/connect" push/>);
        } else {
            return (
                <div className="conteneurform">
                    <form className="formsolo" id="register-form" onSubmit={this.handleSubmit}>
                        <legend>Inscrivez vous !</legend>
                        <fieldset>
                            <p>Prénom</p>
                            <input className="input-regular" type="text" name="firstname" placeholder="Prenom" required
                                   onChange={this.handleChange}/>
                            <p>Nom</p>
                            <input className="input-regular" type="text" name="lastname" pattern="^(?!.*[- ]{2,}.*)[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœA-Za-z- ]+$" placeholder="Nom" required
                                   onChange={this.handleChange}/>
                            <p>Adresse Email</p>
                            <input className="input-regular" type="mail" name="email" pattern="[A-Za-z0-9._+-]+@(via)?cesi.fr" placeholder="Email" required
                                   onChange={this.handleChange}/>
                            <p>Mot de passe</p>
                            <input className="input-regular" type="password" name="password" pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Mot de passe"
                                   required onChange={this.handleChange}/>
                            <p>Confirmez le mot de passe</p>
                            <input className="input-regular" type="password" name="password_bis" pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Retaper le mot de passe" required onChange={this.handleChange}/>
                            <input className="input-submit-regular" type="submit" value="Valider"/>
                            <div>
                                <Link className="liendeja" from="/user/register" to="/user/connect">Déjà inscrit ?</Link>
                            </div>
                        </fieldset>
                    </form>
                </div>
            )
        }
    }
}

export default withAlert(UserRegister);