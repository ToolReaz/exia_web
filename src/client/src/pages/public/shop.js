import React, { Component } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateShopProduct from "../../components/bde/CreateShopProduct";
import CreateShopCategory from "../../components/bde/CreateShopCategory";

class Shop extends Component {

    render() {
        return (
            <div>
                <Header/>

                <div className="grid-container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Boutique</h1>
                        </div>
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
        );
    }
}

export default Shop;