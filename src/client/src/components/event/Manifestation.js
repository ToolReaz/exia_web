import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";

class Manifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID,
            subscribed: false
        };

        this.subscribe = this.subscribe.bind(this);
    }

    subscribe() {
        getApi('/api/manifestation/subscribe/' + this.state.id).then(res => {
            console.log(res);
            this.setState({subscribed: true});
        }).catch(reason => {
            console.log(reason);
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p><strong>{this.props.values.Nom}</strong></p>
                <p>Description: {this.props.values.Description}</p>
                <p>Date: {this.props.values.Date}</p>
                <p>Intreval: {this.props.values.Intervale}</p>
                <p>Prix: {this.props.values.Prix}</p>
                <button onClick={this.subscribe}>S'inscrire</button>
            </div>
        );
    }
}

export default Manifestation;