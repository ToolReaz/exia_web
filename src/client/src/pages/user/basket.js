import React, { Component } from 'react';
import Header from "../../components/Header";
import {getApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

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
            this.setState({products: res});
        }).catch(reason => {
            console.error(reason);
        });
    }

    order(e) {
        e.preventDefault();
        getApi('/api/shop/order').then(res => {
            this.props.alert.error('Commande validée');
        }).catch(reason => {
            alert(reason);
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
                            <h2>{product.Article.Name}</h2>
                            <p>{product.Article.Description}</p>
                            <p>{product.Article.Price} €</p>
                            <p>{product.Quantity} €</p>
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
                            <div>
                                <button onClick={this.order}>Valider mes achats !</button>
                            </div>
                        </div>
                    </div>
                    <div className="row-flex">
                        {productsView}
                    </div>
                </div>
            );
        }
    }
}

export default withAlert(Basket);