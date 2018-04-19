import React, { Component } from 'react';
import Header from "../../components/Header";
import {getApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";
import Footer from "../../components/Footer";

class Basket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null
        };

        this.order = this.order.bind(this);
    }

    componentDidMount() {
        getApi('/api/shop/basket').then(res => {
            console.log(res);
            if (res.length !== 0) {
                this.setState({products: res});
            } else {
                this.setState({products: null});
            }
        }).catch(reason => {
            this.props.alert.error('Impossible de récupérer le panier');
        });
    }

    order(e) {
        e.preventDefault();
        getApi('/api/shop/order').then(res => {
            this.props.alert.success('Commande validée');
            this.setState({products: null});
        }).catch(reason => {
            this.props.alert.error('Impossible de valider la commande');
        })
    }

    render() {
        if (this.state.products === null) {
            return (
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            );
        } else {
            let productsView = [];
            if (this.state.products.length === 0) {
                productsView.push(<div><p>Aucun article sélectionné !</p></div>)
            } else {
                this.state.products.forEach((product, index) => {
                    console.log(product);
                    productsView.push(
                        <div key={index} className="shop-article">
                            <p className="shop-article-title">{product.Product.Name}</p>
                            <p className="shop-article-description">Description: {product.Product.Description}</p>
                            <p className="shop-article-price">Prix: {product.Product.Price} €</p>
                            <p className="shop-article-quantity">Quantité: {product.Quantity}</p>
                        </div>
                    )
                });
            }

            return (
                <div>
                    <Header/>

                    <div className="page-container">
                        <div className="row">
                            <div className="titre">
                                <h1>Panier</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 center">
                                <button className="btn-primary" onClick={this.order}>Valider mes achats !</button>
                            </div>
                        </div>
                        <div className="row-flex">
                            {productsView}
                        </div>
                    </div>

                    <Footer/>
                </div>
            );
        }
    }
}

export default withAlert(Basket);