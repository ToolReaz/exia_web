import React, { Component } from 'react';
import Idea from "../../components/event/Idea";
import {getApi} from "../../lib/api/requestApi";
import CreateIdea from "../../components/event/CreateIdea";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Manifestation from "../../components/event/Manifestation";
import * as cookies from "react-cookie";
import {Link} from "react-router-dom";

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
            this.setState({roles: res});
        }).catch(reason => {
            console.log(reason);
        });
    }


    getAllIdeas() {
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

    getAllManifestations() {
        getApi('/api/manifestation').then(res => {
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

        if (cookies.load('token')) {
            view.push(
                <div>
                    <h1 className="h1Event">Proposer une idée</h1>
                    <div className="grid-flex">
                        <CreateIdea/>
                    </div>
                </div>
            );


            this.state.ideas.forEach((idea, index) =>  {
                idea.roles = this.state.roles;
                ideas.push(
                    <Idea values={idea} />
                );
            });


            view.push(
                <div>
                    <h1 className="h1Event">Boite à idées</h1>
                    <div className="grid-flex">
                        {ideas}
                    </div>
                </div>
            );




            view.push(
                <h2 className="h1Event">Liste des manifestations</h2>
            );




            let manifs = [];
            this.state.manifestations.forEach((manifestation) =>  {
                if (Date.parse(manifestation.When.toString()) >= Date.now()) {
                    manifs.push(<Manifestation values={manifestation} />);
                }
            });

            view.push(
                <div>
                    <h2 className="center">Manifestations actuelles</h2>
                    <div className="grid-flex">
                        {manifs}
                    </div>
                </div>
            );






            let oldManifs = [];
            this.state.manifestations.forEach((manifestation) =>  {
                if (Date.parse(manifestation.When.toString()) < Date.now()) {
                    oldManifs.push(<Manifestation values={manifestation} />);
                }
            });

            view.push(
                <div>
                    <h2 className="center">Anciennes manifestations</h2>
                    <div className="grid-flex">
                        {oldManifs}
                    </div>
                </div>
            );
        } else {
            view.push(
                <div className="center">
                    <h1>Vous devez être connecté pour consulter les évenements !</h1>
                    <Link to="/user/connect">Se connecter</Link><br/>
                    <Link to="/user/register">S'inscrire</Link>
                </div>
            )
        }


        view.push(<Footer/>);
        return view;
    }
}

export default Event;
