import React, { Component } from 'react';
import {postApi} from "../../lib/api/requestApi";

class CreateShopCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            catName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        if (e.target.name === 'catName') {
            this.setState({catName: e.target.value});
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        postApi('/api/shop/category', {name: this.state.catName}).then(res => {
            this.setState({
                catName: ''
            });
            alert('Categorie ajouté !');
        }).catch(reason => {
            alert(reason);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="catName" placeholder="Nom de la catégorie" value={this.state.catName} onChange={this.handleChange}/>
                    <input type="submit" value="Créer la catégorie"/>
                </form>
            </div>
        );
    }
}

export default CreateShopCategory;