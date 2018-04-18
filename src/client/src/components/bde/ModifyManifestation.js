import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

class ModifyManifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: 0,
            name: '',
            description: '',
            date: '',
            interval: '',
            imagePath: '',
            price: 0,
            manifestations: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectManifestation = this.selectManifestation.bind(this);
    }

    componentDidMount() {
        getApi('/api/manifestation').then(res => {
            let tmp = this.state.manifestations;
            res.forEach(manifestation => {
                tmp.push(manifestation);
            });
            this.setState({manifestations: tmp});
        }).catch(reason => {
            this.props.alert.error('Impossible de charger les manifestations existantes');
        });
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
            case 'imagePath': this.setState({imagePath: e.target.value});
                break;
            default:
                break;
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let data = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            imagePath: this.state.imagePath,
            interval: this.state.interval,
            price: this.state.price
        };
        postApi('/api/manifestation/update', data).then(res => {
            this.setState({
                name: '',
                description: '',
                date: '',
                interval: '',
                price: 0,
                imagePath: ''
            });
            this.props.alert.success('Manifestation modifiée');
        }).catch(reason => {
            this.props.alert.error('Impossible de publier la manifestation');
        });
    }


    selectManifestation(e) {
        this.setState({
            id: this.state.manifestations[e.target.value].ID,
            name: this.state.manifestations[e.target.value].Name,
            description: this.state.manifestations[e.target.value].Description,
            date: this.state.manifestations[e.target.value].When,
            imagePath: this.state.manifestations[e.target.value].ImagePath,
            interval: this.state.manifestations[e.target.value].TimeSpan,
            price: this.state.manifestations[e.target.value].Price
        });
    }


    render() {

        if (this.state.manifestations.length === 0) {
            return (
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            );
        } else {

            let options = [];
            this.state.manifestations.forEach((manifestation, index) => {
                options.push(
                    <option key={index} value={index}>{manifestation.Name}</option>
                )
            });
            return (
                <div>
                    <select name="id" onChange={this.selectManifestation}>
                        {options}
                    </select>
                    <form id="create-manifestation-form" onSubmit={this.handleSubmit}>
                        <input type="text" name="name" placeholder="Nom" value={this.state.name}
                               onChange={this.handleChange}/><br/>
                        <textarea name="description" placeholder="Description" value={this.state.description}
                                  onChange={this.handleChange}/><br/>
                        <input type="text" name="date" value={this.state.date} onChange={this.handleChange}/><br/>
                        <input type="integer" name="interval" placeholder="Interval" value={this.state.interval}
                               onChange={this.handleChange}/><br/>
                        <input type="text" name="imagePath" placeholder="Url image" value={this.state.imagePath}
                               onChange={this.handleChange}/><br/>
                        <input type="integer" name="price" placeholder="Prix" value={this.state.price}
                               onChange={this.handleChange}/><br/>
                        <input type="submit" value="Modifier"/>
                    </form>
                    <br/>
                </div>
            )
        }
    }
}

export default withAlert(ModifyManifestation);