import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";

class PhotoComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID,
            text: props.values.Text,
            isPublic: props.values.Public,
            isAdmin: false
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

    componentDidMount() {
        getApi('/user/roles').then(res => {
            if (res.includes('R_BDE') || res.includes('R_EXIA')) {
                this.setState({isAdmin: true});
            }
        }).catch(reason => {
            console.error(reason);
        });
    }

    render() {
        let reportBtn = [];
        if (this.state.isAdmin && this.state.isPublic) {
            reportBtn.push(<button className="photo-comment-report" onClick={this.report}>Signaler ce commentaire</button>)
        }
        return (
            <div className="photo-comment">
                {reportBtn}
                {(this.state.isPublic)?<p className="photo-comment-message">Message: {this.state.text}</p>:<p className="photo-comment-message-reported">Message: Ce message à été signalé !</p>}
            </div>
        );
    }
}

export default PhotoComment;