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
            approved: props.values.Approved,
            voted: false,
            userVote: null
        };
        this.voteFor = this.voteFor.bind(this);
        this.voteAgainst = this.voteAgainst.bind(this);
        this.hasVoted = this.hasVoted.bind(this);
        this.getVotes = this.getVotes.bind(this);
    }

    getVotes() {
        console.log('dede');
        getApi('/api/idea/votes/' + this.state.id).then(res => {
            this.setState({votes: res});
        }).catch(reason => {
            console.log(reason);
        })
    }

    hasVoted() {
        getApi('/api/idea/hasvoted/' + this.state.id).then(res => {
            console.log(res);
            if (res.Voted) {
                this.setState({voted: true, userVote: res.Vote});
            }
        }).catch(reason => {
            console.log(reason);
        })
    }

    componentDidMount() {
        this.getVotes();
        this.hasVoted();
    }

    voteAgainst() {
        getApi('/api/idea/vote/against/' + this.state.id.toString()).then(res => {
            this.getVotes();
            this.hasVoted();
        }).catch(reason => {
            console.log(reason.toString());
        });
    }

    voteFor() {
        getApi('/api/idea/vote/for/' + this.state.id.toString()).then(res => {
            this.getVotes();
            this.hasVoted();
        }).catch(reason => {
            console.log(reason.toString());
        });
    }


    render() {
        let votesCount = [];
        if (this.state.voted) {
            if (this.state.userVote === true) {
                votesCount.push(
                    <div>
                        <button disabled>+</button>
                        <p style={{'color': 'green'}}>{this.state.votes}</p>
                        <button disabled>-</button>
                    </div>

                );
            } else if (this.state.userVote === false && this.state.userVote != null) {
                votesCount.push(
                    <div>
                        <button disabled>+</button>
                        <p style={{'color': 'red'}}>{this.state.votes}</p>
                        <button disabled>-</button>
                    </div>
                );
            }
        } else {
            votesCount.push(
                <div>
                    <button onClick={this.voteFor}>+</button>
                    <p style={{'color': 'black'}}>{this.state.votes}</p>
                    <button onClick={this.voteAgainst}>-</button>
                </div>
        );
        }
        return (
                <div className="event">
                    <h2 className="eventTitle">Nom: {this.state.title}</h2>
                    <img className="eventImg" src="https://picsum.photos/300/200" alt="afd"/>
                    <div className="eventInfos">
                        <p className="eventDate">Soumis le: {this.state.submit_date}</p>
                        <p>Texte: {this.state.text}</p>
                        <p>Approuvé: {(this.state.approved)?("OUI"):("NON")}</p>
                    </div>
                    <div className="eventVote">
                        {votesCount}
                    </div>
                    <a>Lire</a>
                </div>
        );
    }
}

export default Idea;