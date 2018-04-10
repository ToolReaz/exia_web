import React, { Component } from 'react';
import $ from 'jquery';

class Manifestation extends Component {

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
            isPublic: true,
            interval: 0
        };
    }

    getManifestation(id) {
        try {
            $.get('/api/event/' + id, res => {
                console.log(res);
                if (!res.error) {
                    this.setState({event: res.event});
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
                <p>Manif</p>
            </div>
        )
    }
}

export default Manifestation;