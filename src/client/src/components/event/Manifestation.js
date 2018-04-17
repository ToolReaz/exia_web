import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";

class Manifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID,
            subscribed: false,
            fullPage: props.fullPage || false
        };

        this.subscribe = this.subscribe.bind(this);
    }

    subscribe() {
        getApi('/api/manifestation/subscribe/' + this.state.id).then(res => {
            alert('Vous êtes inscrit !')
            this.setState({subscribed: true});
        }).catch(reason => {
            alert(reason);
        })
    }

    componentDidMount() {

    }

    render() {
        if (this.state.fullPage) {
            return (
                <div>
                    <h2><strong>Page détaillé de: {this.props.values.Nom}</strong></h2>
                    <p>Description: {this.props.values.Description}</p>
                    <p>Date: {this.props.values.Date}</p>
                    <p>Intreval: {this.props.values.Intervale}</p>
                    <p>Prix: {this.props.values.Prix}</p>
                    <button disabled={this.state.subscribed} onClick={this.subscribe}>S'inscrire</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p><strong>{this.props.values.Nom}</strong></p>
                    <p>Description: {this.props.values.Description}</p>
                    <p>Date: {this.props.values.Date}</p>
                    <p>Intreval: {this.props.values.Intervale}</p>
                    <p>Prix: {this.props.values.Prix}</p>
                    <button disabled={this.state.subscribed} onClick={this.subscribe}>S'inscrire</button>
                </div>
            );
        }
    }
}

export default Manifestation;