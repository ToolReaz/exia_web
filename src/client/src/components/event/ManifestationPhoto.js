import React, {Component} from "react";
import CommentPhoto from "./CommentPhoto";
import {getApi} from "../../lib/api/requestApi";

class ManifestationPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID_Photos,
            imagePath: '',
            title: '',
            comments: []
        };
    }

    componentDidMount() {
        getApi('/api/photo/' + this.state.id.toString()).then(res => {
            console.log(res);
            this.setState({imagePath: res.Chemin_Image, title: res.Titre});
        }).catch(reason => {
            console.log(reason);
        });
    }

    render() {
        return (
            <div>
                <p>Titre: {this.state.title}</p>
                <p>Chemin: {this.state.imagePath}</p>
                <CommentPhoto id={this.state.id}/>
            </div>
        );
    }
}

export default ManifestationPhoto;