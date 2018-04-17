import React, { Component } from 'react';
import {postApi} from "../../lib/api/requestApi";

class CreateIdea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: '',
            manifName: '',
            manifDescription: '',
            manifImagePath: '',
            manifDate: null,
            manifInterval: 0,
            manifPrice: 0
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
            case 'manifName': this.setState({manifName: e.target.value});
                break;
            case 'manifDescription': this.setState({manifDescription: e.target.value});
                break;
            case 'manifImagePath': this.setState({manifImagePath: e.target.value});
                break;
            case 'manifInterval': this.setState({manifInterval: e.target.value});
                break;
            case 'manifPrice': this.setState({manifPrice: e.target.value});
                break;
            case 'manifDate': this.setState({manifDate: e.target.value});
                break;
            default:
                break;
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            text: this.state.text,
            manifName: this.state.manifName,
            manifDescription: this.state.manifDescription,
            manifImagePath: this.state.manifImagePath,
            manifInterval: this.state.manifInterval,
            manifPrice: this.state.manifPrice,
            manifDate: this.state.manifDate
        };
        postApi('/api/idea', data).then(res => {
            this.setState({
                name: '',
                text: '',
                manifName: '',
                manifDescription: '',
                manifImagePath: '',
                manifDate: null,
                manifInterval: 0,
                manifPrice: 0
            });
            console.log('Idée crée !');
        }).catch(reason => {
            console.log(reason);
        });
    }


    render() {
        return (
            <div>
                <br/>
                <h1>Créer une idée</h1><br/>
                <form id="create-idea-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Nom" value={this.state.name} onChange={this.handleChange}/><br/>
                    <textarea name="text" placeholder="Text" value={this.state.text} onChange={this.handleChange}/><br/>
                    <p>Manifestation liée:</p>
                    <input type="text" placeholder="Nom" name="manifName" value={this.state.manifName} onChange={this.handleChange}/>
                    <textarea name="manifDescription" placeholder="Description" value={this.state.manifDescription} onChange={this.handleChange}/><br/>
                    <input type="text" placeholder="Lien image" name="manifImagePath" value={this.state.manifImagePath} onChange={this.handleChange}/>
                    <input type="date" name="manifDate" onChange={this.handleChange}/>
                    <input type="integer" placeholder="Intervale" name="manifInterval" value={this.state.manifInterval} onChange={this.handleChange}/>
                    <input type="integer" placeholder="Prix" name="manifPrice" value={this.state.manifPrice} onChange={this.handleChange}/>
                    <input type="submit" value="Envoyer"/>
                </form>
                <br/>
            </div>
        )
    }
}

export default CreateIdea;