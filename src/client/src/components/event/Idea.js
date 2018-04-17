import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class Idea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voteFor: props.values.voteFor,
            voteAgainst: props.values.voteAgainst,
            id: props.values.ID,
            roles: props.values.roles
        };
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
        return (
                <div className="event2">
                    <h2 className="event2Title">Nom: {this.props.values.Titre}</h2>
                    <img className="eventImg" src="https://picsum.photos/300/200" alt="image"/>
                    <p className="eventDate">Soumis le: {this.props.values.Soumis_le}</p>
                    <p>Texte: {this.props.values.Texte}</p>
                    <a>Lire</a>
                    <div className="event2Vote">
                        <button id="against" onClick={this.vote}>Vote contre: {this.state.voteAgainst}</button>
                        <button id="for" onClick={this.vote}>Vote pour: {this.state.voteFor}</button>
                    </div>
                </div>
        );
    }
}

export default Idea;