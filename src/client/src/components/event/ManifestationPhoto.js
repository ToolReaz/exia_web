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
            comments: [],
            likes: 0
        };
    }

    componentDidMount() {
        getApi('/api/photo/' + this.state.id.toString()).then(res => {
            console.log(res);
            this.setState({imagePath: res.photo.ImagePath, isPublic: res.photo.Public, comments: res.comments});
        }).catch(reason => {
            console.log(reason);
        });
        getApi('/api/photo/likes/' + this.state.id.toString()).then(res => {
            console.log(res);
            this.setState({likes: res});
        }).catch(reason => {
            console.log(reason);
        });
    }

    likePhoto() {
        getApi('/api/photo/like/' + this.state.id.toString()).then(res => {
            this.setState({likedByUser: true});
        }).catch(reason => {
            console.log(reason);
        });
    }

    dislikePhoto() {
        getApi('/api/photo/dislike/' + this.state.id.toString()).then(res => {
            this.setState({likedByUser: true});
        }).catch(reason => {
            console.log(reason);
        });
    }

    render() {
        let comments = [];
        this.state.comments.forEach((comment, index) => {
            comments.push(
                <div>
                    <PhotoComment key={index} values={comment}/>
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