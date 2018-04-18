import React, {Component} from "react";

class PhotoComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.values.Text
        };
    }

    render() {
        return (
            <div>
                <p>Message: {this.state.text}</p>
            </div>
        );
    }
}

export default PhotoComment;