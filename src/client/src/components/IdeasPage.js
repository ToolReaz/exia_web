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