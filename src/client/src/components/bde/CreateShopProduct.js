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
            category: '',
            categories: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        getApi('/api/shop/category').then(res => {
            let tmp = [];
            res.forEach(category => {
                tmp.push(category);
            });
            this.setState({categories: tmp});
        }).catch(reason => {
            alert(reason);
        });
    }


    handleChange(e) {
        switch (e.target.name) {
            case 'name': this.setState({name: e.target.value});
                break;
            case 'description': this.setState({description: e.target.value});
                break;
            case 'price': this.setState({price: e.target.value});
                break;
            case 'category': this.setState({category: e.target.value});
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
            price: this.state.price,
            category: this.state.category
        };
        console.log(this.state.category);
        postApi('/api/shop/article', data).then(res => {
            this.setState({
                name: '',
                description: '',
                price: 0,
                category: ''
            });
            alert('Article ajouté !');
        }).catch(reason => {
            alert(reason);
        });
    }

    render() {
        let catSelector = [];
        this.state.categories.forEach(cat => {
            catSelector.push(
                <option value={cat.Nom}>{cat.Nom}</option>
            );
        });
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Nom du produit" value={this.state.name} onChange={this.handleChange}/>
                    <textarea name="description" placeholder="Description du produit" value={this.state.description} onChange={this.handleChange}/>
                    <input type="integer" name="price" placeholder="Prix du produit" value={this.state.price} onChange={this.handleChange}/>
                    <select name="category" onChange={this.handleChange}>
                        {catSelector}
                    </select>
                    <input type="submit" value="Créer le produit"/>
                </form>
            </div>
        );
    }
}

export default CreateShopProduct;