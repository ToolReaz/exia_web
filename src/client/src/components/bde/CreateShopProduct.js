import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

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
        postApi('/api/shop/article', data).then(res => {
            this.setState({
                name: '',
                description: '',
                price: 0,
                category: ''
            });
            this.props.alert.success('Article crée avec succès');
        }).catch(reason => {
            this.props.alert.error('Impossible de créer le produit');
        });
    }

    render() {
        let catSelector = [];
        this.state.categories.forEach(cat => {
            catSelector.push(
                <option value={cat.Name}>{cat.Name}</option>
            );
        });
        return (
            <div className="grid-container">
                <div className="row">
                    <div className="col-12 center">
                        <form onSubmit={this.handleSubmit}>
                            <input className="input-regular" type="text" name="name" placeholder="Nom du produit" value={this.state.name} onChange={this.handleChange}/>
                            <textarea className="textarea-regular" name="description" placeholder="Description du produit" value={this.state.description} onChange={this.handleChange}/>
                            <input className="input-regular" type="integer" name="price" placeholder="Prix du produit" value={this.state.price} onChange={this.handleChange}/><br/>
                            <select name="category" onChange={this.handleChange}>
                                {catSelector}
                            </select><br/><br/>
                            <input className="btn-primary" type="submit" value="Créer le produit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert(CreateShopProduct);