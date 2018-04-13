import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class Idea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voteFor: props.values.VotePour,
            voteAgainst: props.values.VoteContre,
            id: props.values.ID
        };

        this.vote = this.vote.bind(this);
    }

    getVotes() {
        getApi('/api/idea/votes/' + this.state.id).then(res => {
            this.setState({voteFor: res.votesFor, voteAgainst: res.votesAgainst});
        }).catch(reason => {
            console.log(reason);
        })
    }

    componentDidMount() {
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


    render() {
        return (
            <div>
                <h3>Nom: {this.props.values.Titre}</h3>
                <p>Soumis le: {this.props.values.Soumis_le}</p>
                <p>Texte: {this.props.values.Texte}</p>
                <p>S'inscrire: {this.props.values.Texte}</p>
                <button id="against" onClick={this.vote}>Vote contre: {this.state.voteAgainst}</button>
                <button id="for" onClick={this.vote}>Vote pour: {this.state.voteFor}</button>
            </div>
        )
    }
}

export default Idea;