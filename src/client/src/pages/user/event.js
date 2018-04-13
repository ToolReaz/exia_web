import React, { Component } from 'react';
import Idea from "../../components/event/Idea";
import {getApi} from "../../lib/api/requestApi";
import CreateIdea from "../../components/event/CreateIdea";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Manifestation from "../../components/event/Manifestation";

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            ideas: [],
            manifestations: [],
            role: ''
        };
    }


    getRole() {
        getApi('/user/role').then(res => {
            console.log('ROLES:');
            console.log(res);
            this.setState({role: res});
        }).catch(reason => {
            alert(reason);
        });
    }


    getAllIdeas() {
        getApi('/api/idea').then(res => {
            console.log('Idea:');
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

    getAllManifestations() {
        getApi('/api/manifestation').then(res => {
            console.log('Manif');
            console.log(res);
            let tmp = this.state.manifestations;
            res.forEach(idea => {
                tmp.push(idea);
            });
            this.setState({manifestations: tmp});
        }).catch(reason => {
            console.log(reason);
        });
    }

    componentDidMount() {
        this.getRole();
        this.getAllIdeas();
        this.getAllManifestations();
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
            idea.role = this.state.role;
            view.push(
                <div className="row">
                    <Idea values={idea} /><br/>
                </div>
            );
        });
        view.push(
            <div>
                <h2>Liste des manifestations</h2><br/>
            </div>
        );
        this.state.manifestations.forEach((manifestation) =>  {
            view.push(
                <div className="row">
                    <Manifestation values={manifestation} /><br/>
                </div>
            );
        });
        view.push(<Footer/>);
        return view;
    }
}

export default Event;