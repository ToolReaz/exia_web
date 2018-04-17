import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";

class ValidateIdea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            ideas: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectIdea = this.selectIdea.bind(this);
    }

    componentDidMount() {
        getApi('/api/idea/invalidated').then(res => {
            let tmp = [];
            console.log(res);
            res.forEach(idea => {
                tmp.push(idea);
            });
            this.setState({ideas: tmp});
        }).catch(reason => {
            console.log(reason);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        postApi('/api/idea/validate', {id: this.state.id}).then(res => {
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
                    <input disabled type="text" name="title" placeholder="Titre" value={this.state.title}/><br/>
                    <textarea disabled name="description" placeholder="Text" value={this.state.description}/><br/>
                    <input type="submit" value="Valider"/>
                </form>
            </div>
        );
    }
}

export default ValidateIdea;