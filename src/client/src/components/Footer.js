import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="footer-distributed">

                <div className="footer-left">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>2 Allée des Foulons</span> 67380 Lingolsheim</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p>
                            <a href="mailto:bde-strasbourg.exia.cesi@viacesi.fr">bde-strasbourg.exia.cesi[at]viacesi.fr</a>
                        </p>
                    </div>

                </div>

                <div className="footer-center">

                    <img className="logobderond" src="logobderond.png" alt="Logo bde"/>

                        <h2 className="titrefooter"> BDE eXia Cesi Strasbourg</h2>

                        <a className="mentionslegales" href="" target="_blank">Mentions légales</a>

                </div>
                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>Retrouvez nous sur les réseaux !</span>
                        N'hésitez pas à nous ajouter sur les différents réseaux sociaux pour suivre les dernières
                        actualités !
                    </p>

                    <div className="footer-icons">

                        <a href="https://www.facebook.com/BdeExiaStrasbourg/?ref=br_rs" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/bdeexiastrg?lang=fr" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/school/561843/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        <a href=""><i className="fab fa-snapchat"></i></a>

                    </div>

                </div>

            </footer>
        );
    }
}

export default Footer;