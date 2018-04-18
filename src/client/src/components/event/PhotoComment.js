import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";

class PhotoComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID,
            text: props.values.Text,
            isPublic: props.values.Public,
            isAdmin: props.isAdmin
        };
        this.report = this.report.bind(this);
    }

    report() {
        getApi('/api/photo/comment/report/' + this.state.id.toString()).then(res => {
            alert('Commentaire signalé !');
            this.setState({isPublic: false});
        }).catch(reason => {
            console.log(reason);
        });
    }

    render() {
        let reportBtn = [];
        if (this.state.isAdmin) {
            reportBtn.push(<button onClick={this.report}>Signaler ce commentaire</button>)
        }
        return (
            <div>
                {(this.state.isPublic)?<p>Message: {this.state.text}</p>:<p>Message: Ce message à été signalé !</p>}
                {reportBtn}
            </div>
        );
    }
}

export default PhotoComment;