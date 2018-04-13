import React, { Component } from 'react';

class SearchBarShop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange(e) {
        if (e.target.name === 'search') {

        }
    }

    render() {
        return (
            <div>
                <p>lol</p>
            </div>
        );
    }
}

export default SearchBarShop;