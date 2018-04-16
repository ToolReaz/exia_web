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
            roles: []
        };
    }


    getRole() {
        getApi('/user/roles').then(res => {
            console.log('ROLES:');
            console.log(res);
            this.setState({roles: res});
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
        let ideas = [];
        view.push(<Header/>);
        view.push(<CreateIdea/>);


        this.state.ideas.forEach((idea) =>  {
            idea.roles = this.state.roles;
            ideas.push(
                <div className="col-4">
                    <Idea values={idea} />
                </div>
            );
        });


        view.push(
            <div className="grid-container">
                <div className="row">
                    <h2 className="eventTitle">Liste des idées</h2>
                </div>
                <div className="row">
                    {ideas}
                </div>
            </div>
        );





        view.push(
            <div className="grid-container">
                <div className="row">
                    <h2>Liste des manifestations</h2>
                </div>
            </div>
        );





        let manifs = [];
        this.state.manifestations.forEach((manifestation) =>  {
            if (Date.parse(manifestation.Quand.toString()) >= Date.now()) {
                manifs.push(
                    <div className="col-4">
                        <Manifestation values={manifestation} />
                    </div>
                );
            }
        });

        view.push(
            <div className="grid-container">
                <div className="row">
                    <h2>Manifestations actuelles</h2>
                </div>
                <div className="row">
                    {manifs}
                </div>
            </div>
        );



        


        let oldManifs = [];
        this.state.manifestations.forEach((manifestation) =>  {
            if (Date.parse(manifestation.Quand.toString()) < Date.now()) {
                oldManifs.push(
                    <div className="col-4">
                        <Manifestation values={manifestation} />
                    </div>
                );
            }
        });

        view.push(
            <div className="grid-container">
                <div className="row">
                    <h2>Anciennes manifestations</h2>
                </div>
                <div className="row">
                    {oldManifs}
                </div>
            </div>
        );

        view.push(<Footer/>);
        return view;
    }
}

export default Event;