import React, { Component } from 'react';
import {getApi, postApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

class ValidateIdea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            ideas: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectIdea = this.selectIdea.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();
        postApi('/api/idea/validate', {id: this.state.id}).then(res => {
            this.props.alert.success('Idée validée !');
        }).catch(reason => {
            this.props.alert.error('Impossible de valider l\'idée');
        })
    }

    selectIdea(e) {
        this.setState({
            id: this.state.ideas[e.target.value].ID,
            title: this.state.ideas[e.target.value].Title,
            description: this.state.ideas[e.target.value].Text
        });
    }

    componentDidMount() {
        getApi('/api/idea/invalidated').then(res => {
            if (res) {
                this.setState({ideas: res});
            }
        }).catch(reason => {
            this.props.alert.error('Impossible de charger les idées non validée')
        });
    }

    render() {

        if (this.state.ideas.length === 0) {
            return (
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            );
        } else {
            
            let options = [];
            if (this.state.ideas) {
                this.state.ideas.forEach((idea, index) => {
                    options.push(
                        <option value={index}>{idea.Title}</option>
                    );
                });
            }
            return (
                <div className="grid-container">
                    <div className="row">
                        <div className="col-12 center">
                            <select onChange={this.selectIdea} name="id">
                                {options}
                            </select>
                            <form id="validate-idea-form" onSubmit={this.handleSubmit}>
                                <input className="input-regular" disabled type="text" name="title" placeholder="Titre" value={this.state.title}/><br/>
                                <textarea className="textarea-regular" disabled name="description" placeholder="Text" value={this.state.description}/><br/>
                                <input className="btn-primary" type="submit" value="Valider"/>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withAlert(ValidateIdea);