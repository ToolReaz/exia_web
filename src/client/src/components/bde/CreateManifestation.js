import React, { Component } from 'react';
import {postApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

class CreateManifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: '',
            description: '',
            date: '',
            interval: '',
            price: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        switch (e.target.name) {
            case 'name': this.setState({name: e.target.value});
            break;
            case 'description': this.setState({description: e.target.value});
            break;
            case 'date': this.setState({date: e.target.value});
                break;
            case 'interval': this.setState({interval: e.target.value});
                break;
            case 'price': this.setState({price: e.target.value});
                break;
            default:
                break;
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            interval: this.state.interval,
            price: this.state.price
        };
        postApi('/api/manifestation', data).then(res => {
            this.setState({
                name: '',
                description: '',
                date: '',
                interval: '',
                price: 0
            });
            this.props.alert.success('Manifestation ajoutée');
        }).catch(reason => {
            this.props.alert.error('Impossible de créer la manifestation');
        });
    }


    render() {
        return (
            <div className="grid-container">
                <div className="row">
                    <div className="col-12 center">
                        <form id="create-manifestation-form" onSubmit={this.handleSubmit}>
                            <input className="input-regular" type="text" name="name" placeholder="Nom" onChange={this.handleChange}/><br/>
                            <textarea className="textarea-regular" name="description" placeholder="Description" onChange={this.handleChange}/><br/>
                            <input className="input-regular" type="date" name="date" onChange={this.handleChange}/><br/>
                            <input className="input-regular" type="integer" name="interval" placeholder="Interval" onChange={this.handleChange}/><br/>
                            <input className="input-regular" type="integer" name="price" placeholder="Prix" onChange={this.handleChange}/><br/>
                            <input className="btn-primary" type="submit" value="Créer"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAlert(CreateManifestation);