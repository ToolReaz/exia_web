import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {

    render() {
        return (
            <div>
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
                        <img src="logobde.png" alt="Logo"/>
                    </div>
                    <div className="nav-item">
                        <Link to="/user/register">Inscription</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/user/register">Connexion</Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;