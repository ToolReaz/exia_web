import React, { Component } from 'react';
import $ from 'jquery';
import Idea from "./Idea";

class IdeasPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            ideas: []
        };
    }

    componentDidMount() {
        this.getAllIdeas();
    }


    getAllIdeas() {
        try {
            $.get('/idea', res => {
                console.log(res);
                if (!res.error) {
                    res.ideas.forEach((idea) => {
                        this.setState({ideas: this.state.ideas.push(idea)});
                    });
                }
            }, "json");
        } catch (e) {
            this.setState({
                error: e
            });
        }
    }


    render() {
        let indents = [];
        indents.push(
            <div>
                <h1>Liste des idées</h1>
            </div>
        );
        this.state.ideas.map((item, index) =>  {
            indents.push(
                <div className="row">
                    <p>Idée n° {index}</p>
                    <Idea values={item} />
                </div>
            )
        });
        return indents;
    }
}

export default IdeasPage;