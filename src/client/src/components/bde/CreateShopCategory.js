import React, { Component } from 'react';
import {postApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

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
            this.props.alert.success('Categorie ajoutée');
        }).catch(reason => {
            this.props.alert.error('Impossible de créer la catégorie');
        });
    }

    render() {
        return (
            <div className="grid-container">
                <div className="row">
                    <div className="col-12 center">
                        <form onSubmit={this.handleSubmit}>
                            <input className="input-regular" type="text" name="catName" placeholder="Nom de la catégorie" value={this.state.catName} onChange={this.handleChange}/><br/>
                            <input className="btn-primary" type="submit" value="Créer la catégorie"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert(CreateShopCategory);