import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {

    static openNav() {
        var menu = document.getElementById("header-nav-container");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }

    render() {
        return (
            <header>
                <div className="header-content">
                    <div className="header-hamburger" onClick={Nav.openNav}>
                        <img src="btn-hamburger.png" alt=""/>
                    </div>
                    <div className="header-search desktop-only">
                        <input type="text" placeholder="Chercher"/>
                    </div>
                    <div className="header-logo">
                        <img src="logobde.png" alt="logo" draggable="false"/>
                    </div>
                    <div className="header-account desktop-only">
                        <Link to="/user/register">Inscription</Link>
                        <Link to="/user/connect">Connexion</Link>
                    </div>
                </div>
                <div id="header-nav-container" className='header-nav-container'>
                    <nav>
                        <div className="nav-item">
                            <Link to="/">Accueil</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/">L'équipe</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/">Evènements</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/">Boutique</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/admin">Admin</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/idee">Idee</Link>
                        </div>
                        <div className="nav-item mobile-only">
                            <Link to="/user/register">Inscription</Link>
                        </div>
                        <div className="nav-item mobile-only">
                            <Link to="/user/connect">Connexion</Link>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Nav;