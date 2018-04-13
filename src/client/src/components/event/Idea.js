import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class Idea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voteFor: props.values.VotePour,
            voteAgainst: props.values.VoteContre,
            id: props.values.ID,
            roles: props.values.roles
        };
        console.log(props.values);

        this.vote = this.vote.bind(this);
        this.validateIdea = this.validateIdea.bind(this);
    }

    getVotes() {
        getApi('/api/idea/votes/' + this.state.id).then(res => {
            this.setState({voteFor: res.votesFor, voteAgainst: res.votesAgainst});
        }).catch(reason => {
            console.log(reason);
        })
    }

    componentDidMount() {
        console.log(this.props.values);
        this.getVotes();
    }

    vote(e) {
        let type = e.target.id;
        getApi('/api/idea/vote/' + type + '/' + this.state.id.toString()).then(res => {
            this.getVotes();
        }).catch(reason => {
            console.log(reason.toString());
        });
    }

    validateIdea(e) {
        getApi('/api/manifestation/validate/' + this.state.id).then(res => {
            alert('Manifestation valider !');
        }).catch(reason => {
            alert(reason);
        })
    }


    render() {
        let view = [];
        view.push(
            <div className="col-3">
                <div className="event">
                    <h2>Nom: {this.props.values.Titre}</h2>
                    <p>Soumis le: {this.props.values.Soumis_le}</p>
                    <p>Texte: {this.props.values.Texte}</p>
                    <button id="against" onClick={this.vote}>Vote contre: {this.state.voteAgainst}</button>
                    <button id="for" onClick={this.vote}>Vote pour: {this.state.voteFor}</button>
                </div>
            </div>
        );
        if (!this.state.roles.includes('R_BDE')) {
            view.push(
                <button onClick={this.validateIdea}>Valider l'idée</button>
            )
        }
        return view;
    }
}

export default Idea;