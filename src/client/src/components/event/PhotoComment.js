import React, {Component} from "react";

class PhotoComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
        };
    }

    render() {
        return (
            <div>
                <p>Titre: {this.state.title}</p>
                <p>Message: {this.state.text}</p>
            </div>
        );
    }
}

export default PhotoComment;