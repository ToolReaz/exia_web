import React, { Component } from 'react';
import $ from 'jquery';
import Idea from "./Idea";

class IdeasPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            ideas: [],
            title: '',
            text: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.createIdea();
        /*
        if (this.checkValues()) {
            this.register();
        } else {
            alert('Erreur dans les données saisi !');
        }*/
    }


    handleChange(e) {
        e.preventDefault();
        switch (e.target.name) {
            case 'title': this.setState({title: e.target.value});
                break;
            case 'text': this.setState({text: e.target.value});
                break;
            default:
                break;
        }
    }


    createIdea() {
        let data = {
            title: this.state.title,
            text: this.state.text,
            token: Cookies.get('token') || null
        };
        try {
            $.post('/api/idea', data, res => {
                console.log(res);
                if (!res.error) {
                    this.setState({
                        title: '',
                        text: ''
                    });
                    //this.setState({ideas: this.state.ideas.push(res.idea)});
                    document.getElementById("create-idea-form").reset();
                }
            }, "json");
        } catch (e) {
            this.setState({
                error: e
            });
        }
    }


    componentDidMount() {
        this.getAllIdeas();
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