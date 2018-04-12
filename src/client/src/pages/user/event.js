import React, { Component } from 'react';
import Idea from "../../components/user/Idea";
import {getApi} from "../../lib/api/requestApi";
import CreateIdea from "../../components/user/CreateIdea";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
        view.push(<Header/>);
        view.push(<CreateIdea/>);
        view.push(
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
        view.push(<Footer/>);
        return view;
    }
}

export default Event;