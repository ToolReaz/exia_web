import React, { Component } from 'react';
import Header from "../../components/Header";
import {getApi} from "../../lib/api/requestApi";
import AddToCart from "../../components/shop/AddToCart";
import {Link} from "react-router-dom";
import * as cookies from "react-cookie";
import {withAlert} from "react-alert";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            top3: [],
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.order = this.order.bind(this);
    }

    componentDidMount() {
        getApi('/api/shop/products').then(res => {
            let tmp = [];
            res.forEach(product => {
                tmp.push(product);
            });
            this.setState({products: tmp});
        }).catch(reason => {
            this.props.alert.error('Impossible de récupérer les produits');
        });
        getApi('/api/shop/top3').then(res => {
            console.log(res);
            this.setState({top3: res});
        }).catch(reason => {
            this.props.alert.error('Impossible de récupérer le top 3 des ventes');
        });
    }

    handleChange(e) {
        if (e.target.name === 'search') {
            this.setState({search: e.target.value});
        }
    }

    order(e) {
        e.preventDefault();
        getApi('/api/shop/order').then(res => {
            this.props.alert.success('Commande validée');
        }).catch(reason => {
            alert(reason);
        })
    }

    render() {
        if (this.state.products.length === 0 || this.state.top3.length === 0) {
            return (
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            );
        } else {

            let productsView = [];

            if (this.state.search !== '') {
                this.state.products.forEach((product, index) => {
                    if (product.Price.toString().toLowerCase().includes(this.state.search.toLowerCase()) || product.Name.toString().toLowerCase().includes(this.state.search.toLowerCase())) {
                        productsView.push(
                            <div key={index} className="col-4">
                                <h2>{product.Name}</h2>
                                <p>{product.Description}</p>
                                <p>{product.Price} €</p>
                                <AddToCart value={product.ID}/>
                            </div>
                        );
                    }
                });
            } else {
                this.state.products.forEach((product, index) => {
                    productsView.push(
                        <div key={index} className="col-4">
                            <h2>{product.Name}</h2>
                            <p>{product.Description}</p>
                            <p>{product.Price} €</p>
                            <AddToCart value={product.ID}/>
                        </div>
                    )
                });
            }


            let top3 = [];
            this.state.top3.forEach((article, index) => {
                top3.push(<div key={index} className="col-4">
                    <h2>{article.Name}</h2>
                    <p>{article.Description}</p>
                    <p>{article.Price} €</p>
                    <AddToCart value={article.ID}/>
                </div>)
            });

            let basketLink = [];
            if (cookies.load('token')) {
                basketLink.push(<Link to="/shop/basket">Mon panier</Link>);
            }

            return (
                <div>
                    <Header/>

                    <div className="page-container">
                        <div className="row">
                            <div className="titre">
                                <h1>Boutique</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                            {basketLink}
                        </div>
                        <div className="col-4">
                            <div>
                                <button onClick={this.order}>Valider mes achats !</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <input type="text" name="search" placeholder="Filtrer" value={this.state.search}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        </div>
                        <div>
                            <h2>Top 3 des ventes</h2>
                            {top3}
                        </div>
                        <div>
                            <h2>Autres produits</h2>
                            {productsView}
                        </div>
                    </div>

                </div>
            );
        }
    }
}

export default withAlert(Shop);