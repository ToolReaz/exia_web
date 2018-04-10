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
                        <Link to="/user/register">Inscription</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/user/connect">Connexion</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/admin">Admin</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/idee">Idee</Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;