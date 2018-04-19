import React, {Component} from "react";
import {postApi} from "../../lib/api/requestApi";

class CommentPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
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
            this.setState({comment: ''});
            alert('Commentaire ajouté !');
        }).catch(reason => {
            console.error(reason);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea className="inputcom" name="comment" placeholder="Commentaire" value={this.state.comment} onChange={this.handleChange}/><br/><br/>
                    <input type="submit" value="Commenter"/><br/>
                </form>
            </div>
        );
    }
}

export default CommentPhoto;