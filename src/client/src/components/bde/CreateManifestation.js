import React, { Component } from 'react';
import {postApi} from "../../lib/api/requestApi";

class CreateManifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: '',
            text: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        e.preventDefault();
        switch (e.target.name) {
            case 'text': this.setState({text: e.target.value});
            break;
            case 'name': this.setState({name: e.target.value});
            break;
            default:
                break;
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        postApi('/api/idea', {name: this.state.name, text: this.state.text}).then(res => {
            console.log(res);
        }).catch(reason => {
            console.log(reason);
        });
    }


    render() {
        return (
            <div>
                <br/>
                <h1>Créer une Manifestation</h1><br/>
                <form id="create-manifestation-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Nom" onChange={this.handleChange}/><br/>
                    <textarea name="text" placeholder="Text" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Envoyer"/>
                </form>
                <br/>
            </div>
        )
    }
}

export default CreateManifestation;