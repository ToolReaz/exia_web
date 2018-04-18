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