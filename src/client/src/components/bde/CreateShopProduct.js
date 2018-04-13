import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";

class CreateShopProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: '',
            description: '',
            price: 0,
            categories: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        getApi('/api/shop/category').then(res => {
            res.forEach(category => {
                this.setState({categories: this.state.categories.push(category)});
            })
        })
    }


    handleChange(e) {
        switch (e.target.name) {
            case 'name': this.setState({name: e.target.value});
                break;
            case 'description': this.setState({description: e.target.value});
                break;
            case 'price': this.setState({price: e.target.value});
                break;
            default:
                break;
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
        };
        postApi('/api/shop/article', data).then(res => {
            this.setState({
                name: '',
                description: '',
                price: 0
            });
            alert('Article ajouté !');
        }).catch(reason => {
            alert(reason);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Nom du produit" value={this.state.name} onChange={this.handleChange}/>
                    <textarea name="description" placeholder="Description du produit" value={this.state.description} onChange={this.handleChange}/>
                    <input type="integer" name="price" placeholder="Prix du produit" value={this.state.price} onChange={this.handleChange}/>
                    <input type="submit" value="Créer le produit"/>
                </form>
            </div>
        );
    }
}

export default CreateShopProduct;