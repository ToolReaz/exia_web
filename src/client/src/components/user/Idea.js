import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class Idea extends Component {

    vote(type) {
        getApi('/api/idea/vote/' + type + this.props.values.ID.toString()).then(res => {
            type === 'for' ? this.props.values.Vote++ : this.props.values.Vote--;
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
                <a onClick={this.vote('against')}>Vote contre: {this.props.values.Vote}</a>
                <a onClick={this.vote('for')}>Vote pour: {this.props.values.Vote}</a>
            </div>
        )
    }
}

export default Idea;