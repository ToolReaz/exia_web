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
            res.content.forEach(idea => {
                tmp.push(idea);
            }).catch(reason => {
                console.log(reason);
            });
            this.setState({ideas: tmp});
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
        this.state.ideas.forEach((item) =>  {
            view.push(
                <div className="row">
                    <Idea minimized={true} values={item} /><br/>
                </div>
            );
        });
        return view;
    }
}

export default Event;