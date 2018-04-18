import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";
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
        view.push(<Header/>);

        if (cookies.load('token')) {


            let manifs = [];
            this.state.manifestations.forEach((manifestation, index) =>  {
                if (Date.parse(manifestation.When.toString()) >= Date.now()) {
                    manifs.push(<Manifestation currentEvent={true} key={index} values={manifestation} />);
                }
            });

            view.push(
                <div>
                    <div className="titre">
                        <h2>Manifestations à venir</h2>
                    </div>
                    <div className="grid-flex">
                        {manifs}
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

        view.push(
            <div className="divboutoneventpast">
                <Link className="boutonafondblanc" to="/oldevents">Voir les événements passés</Link>
            </div>
        );

        view.push(
            <div className="titremilieupage">
                <h2>La boite à idées</h2>
                <h3>C'est encore mieux des idées venant de vous !</h3>
                <div className="boutontitre">
                    <Link to="/ideabox" className="boutonafondrouge">Proposer une idée d'événement !</Link>
                </div>
            </div>
        );


        view.push(<Footer/>);
        return view;
    }
}

export default Event;
