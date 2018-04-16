import React, { Component } from 'react';
import {Link} from "react-router-dom";
import * as cookies from "react-cookie";

class Nav extends Component {

    render() {
        let account = [];
        if (cookies.load('token')) {
            account.push(
                <div className="nav-links-right">
                    <p className="s"><input name="search" id="search" type="search"/></p>
                    <Link to="/user/account">Mon compte</Link>
                </div>
            )
        } else {
            account.push(
                <div className="nav-links-right">
                    <p className="s"><input name="search" id="search" type="search"/></p>
                    <Link to="/user/connect">Connexion</Link>
                    <Link to="/user/register">Inscription</Link>
                </div>
            )
        }
        return (
            <nav>
                <div className="nav">
                    <div className="nav-btn">
                        <label htmlFor="nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <input type="checkbox" id="nav-check"/>
                    <div className="nav-links">
                        <Link to="/" >Accueil</Link>
                        <Link to="/team" >L'équipe</Link>
                        <Link to="/event" >Evènements</Link>
                        <Link to="/shop" >Boutique</Link>
                        <Link to="/user/connect" className="caché">Connexion</Link>
                        <Link to="/user/register" className="caché">Inscription</Link>
                        <form className="caché" id="form">
                            <input id="searchid" type="search" placeholder="Que cherchez vous ?"/>
                            <button id="boutonsearchid">C'est parti !</button>
                        </form>
                    </div>
                    {account}
                </div>
            </nav>
        );
    }
}

export default Nav;