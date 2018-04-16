import React, { Component } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {getApi, postApi} from "../../lib/api/requestApi";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getApi('/api/shop/products').then(res => {
            let tmp = [];
            res.forEach(product => {
                tmp.push(product);
            });
            this.setState({products: tmp});
        }).catch(reason => {
            alert(reason);
        })
    }

    handleChange(e) {
        if (e.target.name === 'search') {
            this.setState({search: e.target.value});
        }
    }

    render() {
        let productsView = [];

        if (this.state.search !== '') {
            this.state.products.forEach(product => {
                if (product.Prix.toString().includes(this.state.search) || product.Nom.includes(this.state.search)) {
                    productsView.push(
                        <div className="col-4">
                            <h2>{product.Nom}</h2>
                            <p>{product.Description}</p>
                            <p>{product.Prix}</p>
                        </div>
                    );
                }
            });
        } else {
            this.state.products.forEach(product => {
                productsView.push(
                    <div className="col-4">
                        <h2>{product.Nom}</h2>
                        <p>{product.Description}</p>
                        <p>{product.Prix}</p>
                    </div>
                )
            });
        }
        return (
            <div>
                <Header/>

                <div className="grid-container">
                    <div className="row">
                        <div className="col-6">
                            <h1>Boutique</h1>
                        </div>
                        <div className="col-6">
                            <div>
                                <input type="text" name="search" placeholder="Filtrer" value={this.state.search} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    {productsView}
                </div>

                <Footer/>
            </div>
        );
    }
}

export default Shop;