import React, { Component } from 'react';
import $ from 'jquery';

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            manifestations: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    getManifestations() {
        try {
            $.get('/api/event', res => {
                console.log(res);
                if (!res.error) {
                    res.events.forEach((event) => {
                        this.setState({events: this.state.events.append(event)});
                    });
                }
            }, "json");
        } catch (e) {
            this.setState({
                error: e
            });
        }
    }


    render() {
        return (
            <div>
                <h1>Events</h1>
            </div>
        )
    }
}

export default Event;