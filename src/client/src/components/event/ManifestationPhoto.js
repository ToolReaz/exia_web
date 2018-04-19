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
            userLike: null,
            isAdmin: false
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
        getApi('/user/roles').then(res => {
            if (res.includes('R_BDE') || res.includes('R_EXIA')) {
                this.setState({isAdmin: true});
            }
        }).catch(reason => {
            console.error(reason);
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

        console.log(this.state.isAdmin);

        let likeBtn = [];
        if (this.state.likedByUser) {
            likeBtn.push(<div><button onClick={this.dislikePhoto}>Dislike</button></div>);
        } else {
            likeBtn.push(<div><button onClick={this.likePhoto}>Like</button></div>);
        }

        let reportBtn = [];
        if (this.state.isAdmin) {
            reportBtn.push(<div><button onClick={this.report}>Signaler cette photo</button></div>)
        }

        return (
            <div className="row">
                <div className="col-2">
                    <img src={this.state.imagePath} alt={'image'+this.state.id.toString()}/>
                </div>
                <div className="col-8 commentaire scrollbar">
                    <h3>{this.state.title}</h3>
                    <p>Chemin: {this.state.imagePath}</p>
                    {reportBtn}
                    <p>Commentaires</p>
                    <div>{comments}</div>
                    <CommentPhoto key={this.state.id} id={this.state.id}/>
                </div>
                <div className="col-1">
                    <p>Nombre de like: {this.state.likes}</p>
                    {likeBtn}
                </div>
            </div>
        );
    }
}

export default ManifestationPhoto;