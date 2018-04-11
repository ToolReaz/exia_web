import React, { Component } from 'react';
import $ from 'jquery';
import Idea from "../../components/user/Idea";

class IdeasPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            ideas: []
        };
    }


    getAllIdeas() {
        try {
            $.get('/api/idea', res => {
                if (res.error == null) {
                    let tmp = this.state.ideas;
                    res.ideas.forEach((idea) => {
                        tmp.push(idea);
                    });
                    this.setState({ideas: tmp});
                }
            }, "json");
        } catch (e) {
            console.log(e);
            this.setState({
                error: e
            });
        }
    }


    render() {
        let indents = [];
        indents[0] = (
            <div>
                <br/>
                <h1>Créer une idée</h1><br/>
                <form id="create-idea-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="title" placeholder="Titre" onChange={this.handleChange}/><br/>
                    <textarea name="text" placeholder="Text" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Envoyer"/>
                </form>
                <br/>
            </div>
        );
        indents[1] = (
            <div>
                <h1>Liste des idées</h1><br/>
            </div>
        );
        this.state.ideas.forEach((item) =>  {
            indents.push(
                <div className="row">
                    <Idea minimized={true} values={item} /><br/>
                </div>
            );
        });
        return indents;
    }
}

export default IdeasPage;