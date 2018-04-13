import React, { Component } from 'react';
import {postApi} from "../../lib/api/requestApi";

class CreateShopCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({name: e.target.value});
    }


    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name
        };
        postApi('/api/shop/article', data).then(res => {
            this.setState({
                name: ''
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
                    <input type="text" name="name" placeholder="Nom de la catégorie" value={this.state.name} onChange={this.handleChange}/>
                    <input type="submit" value="Créer la catégorie"/>
                </form>
            </div>
        );
    }
}

export default CreateShopCategory;