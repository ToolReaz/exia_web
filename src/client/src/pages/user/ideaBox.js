import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";
import Idea from "../../components/event/Idea";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateIdea from "../../components/event/CreateIdea";

class IdeaBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ideas: []
        };
    }


    componentDidMount() {
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

    render() {

        let view = [];
        let ideas = [];

        this.state.ideas.forEach((idea, index) =>  {
            idea.roles = this.state.roles;
            ideas.push(
                <Idea values={idea} />
            );
        });

        view.push(<Header/>);

        view.push(
            <div>
                <h1 className="h1Event">Boite à idées</h1>
                <div className="grid-flex">
                    {ideas}
                </div>
            </div>
        );

        view.push(
            <div>
                <h1 className="h1Event">Proposer une idée</h1>
                <div className="grid-flex">
                    <CreateIdea/>
                </div>
            </div>
        );

        view.push(<Footer/>);


        return view;
    }
}

export default IdeaBox;