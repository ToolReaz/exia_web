import React, {Component} from "react";
import {getApi, postApi} from "../../lib/api/requestApi";

class CommentPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.id,
            comment: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'comment') {
            this.setState({comment: e.target.value});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            id: this.state.id,
            comment: this.state.comment
        };
        postApi('/api/photo/comment', data).then(res => {
            console.log(res);
            this.setState({comment: ''});
            alert('Commentaire ajouté !');
        }).catch(reason => {
            alert(reason);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="comment" placeholder="Commentaire" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}

export default CommentPhoto;