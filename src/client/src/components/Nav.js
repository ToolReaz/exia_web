import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {

    render() {
        return (
            <nav>
                <div className="grid-container">
                    <div className="row">
                        <div className="col-1">
                            <Link to="/" className="col-12">Accueil</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/equipe" className="col-12">L'équipe</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/event" className="col-12">Evènements</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/shop" className="col-12">Boutique</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/user/connect" className="col-12">Connexion</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/user/register" className="col-12">Inscription</Link>
                        </div>
                        <div className="col-2">
                            <img src="logobde.png"/>
                        </div>
                        <div className="col-2">
                            <input/>
                        </div>

                        <div id="id01" className="grp-modal">
                            <div className="grp-modal-content">
                                <header className="grp-container grp-teal">
                                    <h2><Link to="/user/connect" className="col-12">Connextion</Link></h2>
                                </header>
                            </div>
                        </div>

                        <div id="id02" className="grp-modal">
                            <div className="grp-modal-content">
                                <header className="grp-container grp-teal">
                                    <h2><Link to="/user/register" className="col-12">Inscription</Link></h2>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;