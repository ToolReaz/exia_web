import React, { Component } from 'react';

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            manifestations: []
        };
    }


    render() {
        return (
            <div>
                <h1>Evènements</h1>
            </div>
        )
    }
}

export default Event;