import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class Idea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vote: 0,
            id: props.values.ID
        };

        this.vote = this.vote.bind(this);
    }

    vote(e) {
        console.log('/api/idea/vote/' + e.target.id + '/' + this.state.id.toString());
        getApi('/api/idea/vote/' + e.target.id + '/' + this.state.id.toString()).then(res => {
            e.target.id === 'for' ? this.setState({vote: this.state.vote++}) : this.setState({vote: this.state.vote--})
        }).catch(reason => {
            console.log(reason);
        })
    }


    render() {
        return (
            <div>
                <h3>Nom: {this.props.values.Titre}</h3>
                <p>Soumis le: {this.props.values.Soumis_le}</p>
                <p>Texte: {this.props.values.Texte}</p>
                <button id="against" onClick={this.vote}>Vote contre: {this.state.vote}</button>
                <button id="for" onClick={this.vote}>Vote pour: {this.state.vote}</button>
            </div>
        )
    }
}

export default Idea;