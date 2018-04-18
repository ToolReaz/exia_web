import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class Idea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            votes: 0,
            id: props.values.ID,
            roles: props.values.roles,
            title: props.values.Title,
            text: props.values.Text,
            submit_date: props.values.SubmitOn,
            approved: props.values.Approved
        };
        this.voteFor = this.voteFor.bind(this);
        this.voteAgainst = this.voteAgainst.bind(this);
        this.validateIdea = this.validateIdea.bind(this);
    }

    getVotes() {
        getApi('/api/idea/votes/' + this.state.id).then(res => {
            this.setState({votes: res});
        }).catch(reason => {
            console.log(reason);
        })
    }

    componentDidMount() {
        this.getVotes();
    }

    voteAgainst() {
        getApi('/api/idea/vote/against' + this.state.id.toString()).then(res => {
            this.getVotes();
        }).catch(reason => {
            console.log(reason.toString());
        });
    }

    voteFor() {
        getApi('/api/idea/vote/for' + this.state.id.toString()).then(res => {
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
                    <h2 className="event2Title">Nom: {this.state.title}</h2>
                    <img className="eventImg" src="https://picsum.photos/300/200" alt="afd"/>
                    <p className="eventDate">Soumis le: {this.state.submit_date}</p>
                    <p>Texte: {this.state.text}</p>
                    <p>Approuvé: {(this.state.approved)?("OUI"):("NON")}</p>
                    <div className="event2Vote">
                        <button id="against" onClick={this.voteFor}>+</button>
                        <p>{this.state.votes}</p>
                        <button id="for" onClick={this.voteAgainst}>-</button>
                    </div>
                    <a>Lire</a>
                </div>
        );
    }
}

export default Idea;