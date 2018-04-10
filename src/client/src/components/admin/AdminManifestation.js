import React, { Component } from 'react';
import $ from 'jquery';

class AdminManifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            event: {},
            name: '',
            description: '',
            imagePath: '',
            date: '',
            price: 0,
            interval: 0,
            free: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    checkValues() {
        if (this.state.name && this.state.description && this.state.imagePath && this.state.date && this.state.price && this.state.interval && this.state.free) {
            this.register();
            return true;
        } else {
            return false;
        }
    }


    createManifestation() {
        let data = {
            name: this.state.name,
            description: this.state.description,
            imagePath: this.state.imagePath,
            date: this.state.date,
            price: this.state.price,
            interval: this.state.interval,
            free: this.state.free
        };
        try {
            $.post('/api/manifestation', data, res => {
                console.log(res);
                if (!res.error) {
                    this.setState({
                        name: '',
                        description: '',
                        imagePath: '',
                        date: '',
                        price: 0,
                        interval: 0,
                        free: true
                    });
                    document.getElementById("create-manif-form").reset();
                }
            }, "json");
        } catch (e) {
            this.setState({
                error: e
            });
        }
    }


    handleChange(e) {
        e.preventDefault();
        switch (e.target.name) {
            case 'name': this.setState({name: e.target.value});
                break;
            case 'description': this.setState({description: e.target.value});
                break;
            case 'imagePath': this.setState({imagePath: e.target.value});
                break;
            case 'date': this.setState({date: e.target.value});
                break;
            case 'interval': this.setState({interval: e.target.value});
                break;
            case 'price': this.setState({price: e.target.value});
                break;
            case 'free': this.setState({free: e.target.checked});
                break;
            default:
                break;
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.createManifestation();
    }


    render() {
        return (
            <div>
                <h2>Edit Manifestation</h2>
                <form id="create-manif-form">
                    <input type="text" name="name" placeholder="Nom" onChange={this.handleChange}/><br/>
                    <input type="text" name="description" placeholder="Description" onChange={this.handleChange}/><br/>
                    <input type="text" name="imagePath" placeholder="Chemin image" onChange={this.handleChange}/><br/>
                    <input type="date" name="date" placeholder="Date" onChange={this.handleChange}/><br/>
                    <input type="integer" name="interval" placeholder="Intervale" onChange={this.handleChange}/><br/>
                    <input type="integer" name="price" placeholder="Prix" onChange={this.handleChange}/><br/>
                    <input type="checkbox" name="free" checked={this.state.free} onChange={this.handleChange}/><br/>
                </form>
            </div>
        )
    }
}

export default AdminManifestation;