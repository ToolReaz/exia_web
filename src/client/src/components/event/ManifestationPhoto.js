import React, {Component} from "react";
import CommentPhoto from "./CommentPhoto";
import {getApi} from "../../lib/api/requestApi";
import PhotoComment from "./PhotoComment";

class ManifestationPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID,
            imagePath: '',
            title: '',
            comments: []
        };
    }

    componentDidMount() {
        getApi('/api/photo/' + this.state.id.toString()).then(res => {
            console.log(res);
            this.setState({imagePath: res.ImagePath, title: res.Title});
        }).catch(reason => {
            console.log(reason);
        });
    }

    render() {
        let comments = [];
        this.state.comments.forEach((comment) => {
            comments.push(
                <div>
                    <PhotoComment values={comment}/>
                </div>
            )
        });
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