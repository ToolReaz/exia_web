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
                        <div className="titre">
                            <h1>Bde</h1>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <h2 className="sub-title">Valider une idée</h2>
                        </div>
                    </div>
                    <div className="row">
                        <ValidateIdea/>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <h2 className="sub-title">Modifier une manifestation</h2>
                        </div>
                    </div>
                    <div className="row">
                        <ModifyManifestation/>
                    </div>



                    <div className="row">
                        <div className="col-12">
                            <h2 className="sub-title">Liste des inscrits</h2>
                        </div>
                    </div>
                    <div className="row">
                        <ShowSubscribersManifestation/>
                    </div>




                    <div className="row">
                        <div className="col-12">
                            <h2 className="sub-title">Créer une manifestation</h2>
                        </div>
                    </div>
                    <div className="row">
                        <CreateManifestation/>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <h2 className="sub-title">Ajouter une catégorie</h2>
                        </div>
                    </div>
                    <div className="row">
                        <CreateShopCategory/>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <h2 className="sub-title">Ajouter un article</h2>
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
