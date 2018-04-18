import React, { Component } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

class Index extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="relative">
                <img className="divImgIndex" src='https://www.cesi-alternance.fr/wp-content/uploads/2015/02/photo-1.jpg' alt="" />
                <div className="accueil">
                    <h1>Bienvenue sur le site du BDE</h1>
                    <p>Cesi eXia Strasbourg</p>
                </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Index;
