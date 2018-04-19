import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";
import Idea from "../../components/event/Idea";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateIdea from "../../components/event/CreateIdea";
import {withAlert} from "react-alert";

class IdeaBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ideas: []
        };
    }


    componentDidMount() {
        getApi('/api/idea').then(res => {
            this.setState({ideas: res});
        }).catch(reason => {
            this.props.alert.error(reason);
        });
    }

    render() {

        if (this.state.ideas.length === 0) {
            return (
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            );
        } else {

            let view = [];
            let ideas = [];

            this.state.ideas.forEach((idea, index) => {
                idea.roles = this.state.roles;
                ideas.push(
                    <Idea key={index} values={idea}/>
                );
            });

            view.push(<Header/>);

            let inset = [];

            inset.push(
                <div>
                    <div className="row">
                        <div className="titre">
                            <h2>Boite à idées</h2>
                        </div>
                    </div>
                    <div className="row-flex">
                        {ideas}
                    </div>
                </div>
            );

            inset.push(
                <div>
                    <div className="row">
                        <div className="titre">
                            <h2>Proposer une idée</h2>
                        </div>
                    </div>
                    <div className="grid-flex">
                        <CreateIdea/>
                    </div>
                </div>
            );

            view.push(
                <div className="page-container">
                    {inset}
                </div>
            );

            view.push(<Footer/>);


            return view;
        }
    }
}

export default withAlert(IdeaBox);