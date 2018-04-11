import React, { Component } from 'react';
import Idea from "../../components/user/Idea";
import {getApi} from "../../lib/api/requestApi";
import CreateIdea from "../../components/user/CreateIdea";

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            ideas: []
        };
    }


    getAllIdeas() {
        getApi('/api/idea').then(res => {
            console.log(res);
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


    render() {
        let view = [];
        view[0] = (<CreateIdea/>);
        view[1] = (
            <div>
                <h1>Liste des idées</h1><br/>
            </div>
        );
        this.state.ideas.forEach((idea) =>  {
            view.push(
                <div className="row">
                    <Idea values={idea} /><br/>
                </div>
            );
        });
        return view;
    }
}

export default Event;