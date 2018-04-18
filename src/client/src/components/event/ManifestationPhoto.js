import React, {Component} from "react";
import CommentPhoto from "./CommentPhoto";
import {getApi} from "../../lib/api/requestApi";
import PhotoComment from "./PhotoComment";

class ManifestationPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID_Photo,
            imagePath: '',
            isPublic: true,
            comments: []
        };
    }

    componentDidMount() {
        getApi('/api/photo/' + this.state.id.toString()).then(res => {
            console.log(res);
            this.setState({imagePath: res.ImagePath, isPublic: res.Public, comments: res.comments});
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
                <img src={this.state.imagePath} alt={'image'+this.state.id.toString()}/>
                <CommentPhoto id={this.state.id}/>
                <p>Commentaires</p>
                <div>{comments}</div>
            </div>
        );
    }
}

export default ManifestationPhoto;