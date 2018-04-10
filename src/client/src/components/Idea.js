import React, { Component } from 'react';

class Idea extends Component {

    render() {
        if (this.props.minimized) {
            return (
                <div>
                    <h3>Nom: {this.props.values.Titre}</h3>
                    <p>Soumis le: {this.props.values.Soumis_le}</p>
                    <p>Texte: {this.props.values.Texte}</p>
                </div>
            )
        }
    }
}

export default Idea;