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
            likes: 0,
            likedByUser: false,
            userLike: null
        };

        this.likePhoto = this.likePhoto.bind(this);
        this.dislikePhoto = this.dislikePhoto.bind(this);
    }

    componentDidMount() {
        getApi('/api/photo/' + this.state.id.toString()).then(res => {
            this.setState({imagePath: res.photo.ImagePath, isPublic: res.photo.Public, comments: res.comments});
        }).catch(reason => {
            console.log(reason);
        });
        getApi('/api/photo/likes/' + this.state.id.toString()).then(res => {
            this.setState({likes: res});
        }).catch(reason => {
            console.log(reason);
        });
        getApi('/api/photo/hasliked/' + this.state.id.toString()).then(res => {
            this.setState({likedByUser: res});
        }).catch(reason => {
            console.log(reason);
        });
    }

    likePhoto() {
        getApi('/api/photo/like/' + this.state.id.toString()).then(res => {
            alert('Photo like !');
            this.setState({userLike: true});
        }).catch(reason => {
            console.log(reason);
        });
    }

    dislikePhoto() {
        getApi('/api/photo/dislike/' + this.state.id.toString()).then(res => {
            alert('Photo délike !');
            this.setState({userLike: false});
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
            );
        });


        let likeBtn = [];
        if (this.state.likedByUser) {
            likeBtn.push(<button onClick={this.dislikePhoto}>Dislike</button>);
        } else {
            likeBtn.push(<button onClick={this.likePhoto}>Like</button>);
        }


        return (
            <div>
                <p>Titre: {this.state.title}</p>
                <p>Chemin: {this.state.imagePath}</p>
                {likeBtn}
                <p>Nombre de like: {this.state.likes}</p>
                <img src={this.state.imagePath} alt={'image'+this.state.id.toString()}/>
                <CommentPhoto key={this.state.id} id={this.state.id}/>
                <p>Commentaires</p>
                <div>{comments}</div>
            </div>
        );
    }
}

export default ManifestationPhoto;