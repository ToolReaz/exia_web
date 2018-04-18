import React, { Component } from 'react';
import CreateManifestation from "../../components/bde/CreateManifestation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateShopCategory from "../../components/bde/CreateShopCategory";
import CreateShopProduct from "../../components/bde/CreateShopProduct";
import ValidateIdea from "../../components/bde/ValidateIdea";
import ModifyManifestation from "../../components/bde/ModifyManifestation";
import ShowSubscribersManifestation from "../../components/bde/ShowSubscribersManifestation";

class Bde extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="page-container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Bde</h1>
                            <hr/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <h2>Valider une idée</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <ValidateIdea/>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <h2>Modifier une manifestation</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <ModifyManifestation/>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <h2>Liste des inscrits</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <ShowSubscribersManifestation/>
                    </div>




                    <div className="row">
                        <div className="col-12">
                            <h2>Créer une manifestation</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <CreateManifestation/>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <h2>Ajouter une catégorie</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <CreateShopCategory/>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <h2>Ajouter un article</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <CreateShopProduct/>
                    </div>


                </div>
                <Footer/>
            </div>
        )
    }
}

export default Bde;
