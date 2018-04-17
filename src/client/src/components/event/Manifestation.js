import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";
import {Link} from "react-router-dom";

class Manifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: (props.match) ? props.match.params.id : null,
            name: (props.values) ? props.values.id : null,
            description: (props.values) ? props.values.description : null,
            date: (props.values) ? props.values.date : null,
            interval: (props.values) ? props.values.interval : null,
            price: (props.values) ? props.values.price : null,
            subscribed: false,
            fullPage: !!(props.fullPage),
        };

        this.subscribe = this.subscribe.bind(this);
    }

    subscribe() {
        getApi('/api/manifestation/subscribe/' + this.state.id).then(res => {
            alert('Vous êtes inscrit !');
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
                    <h2><strong>Page détaillé de: {this.state.name}</strong></h2>
                    <p>Description: {this.state.description}</p>
                    <p>Date: {this.state.date}</p>
                    <p>Intreval: {this.state.interval}</p>
                    <p>Prix: {this.state.price}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p><strong>{this.state.name}</strong></p>
                    <p>Description: {this.state.description}</p>
                    <p>Date: {this.state.date}</p>
                    <p>Intreval: {this.state.interval}</p>
                    <p>Prix: {this.state.price}</p>
                    <Link to={'/event/'+this.state.id}>Page détaillé</Link>
                    <button disabled={this.state.subscribed} onClick={this.subscribe}>S'inscrire</button>
                </div>
            );
        }
    }
}

export default Manifestation;