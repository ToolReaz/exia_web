import React, { Component } from 'react';
import CreateManifestation from "../../components/bde/CreateManifestation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class Bde extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="grid-container">
                    <h1>Bde</h1>
                    <CreateManifestation/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Bde;
