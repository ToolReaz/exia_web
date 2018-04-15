import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";

class ValidateIdea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            date: '',
            imagePath: '',
            ideas: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectIdea = this.selectIdea.bind(this);
    }

    getAllIdeas() {
        getApi('/api/idea').then(res => {
            let tmp = this.state.ideas;
            res.forEach(idea => {
                tmp.push(idea);
            });
            this.setState({ideas: tmp});
        }).catch(reason => {
            console.log(reason);
        });
    }

    componentDidMount() {
        this.getAllIdeas();
    }

    handleChange(e) {
        e.preventDefault();
        switch (e.target.name) {
            case 'title': this.setState({description: e.target.value});
                break;
            case 'description': this.setState({description: e.target.value});
                break;
            case 'date': this.setState({date: e.target.value});
                break;
            case 'imagePath': this.setState({imagePath: e.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        let data = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            imagePath: this.state.imagePath
        };
        postApi('/api/manifestation', data).then(res => {
            alert('Idée validée !');
        }).catch(reason => {
            alert(reason);
        })
    }

    selectIdea(e) {
        this.setState({
            id: this.state.ideas[e.target.value].ID,
            title: this.state.ideas[e.target.value].Titre,
            description: this.state.ideas[e.target.value].Texte
        });
    }

    render() {
        let options = [];
        this.state.ideas.forEach((idea, index) => {
            options.push(
                <option value={index}>{idea.Titre}</option>
            )
        });
        return (
            <div>
                <select onChange={this.selectIdea} name="id">
                    {options}
                </select>
                <form id="validate-idea-form" onSubmit={this.handleSubmit}>
                    <input disabled type="text" name="title" placeholder="Titre" value={this.state.title} onChange={this.handleChange}/><br/>
                    <textarea name="description" placeholder="Text" value={this.state.description} onChange={this.handleChange}/><br/>
                    <input type="date" name="date" onChange={this.handleChange}/><br/>
                    <input type="text" name="imagePath" placeholder="Lien image" value={this.state.imagePath || ''} onChange={this.handleChange}/><br/>
                    <input type="submit" value="Envoyer"/>
                </form>
            </div>
        );
    }
}

export default ValidateIdea;