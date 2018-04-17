import React, {Component} from "react";
import {getApi, postApi} from "../../lib/api/requestApi";

class AddPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.id,
            imagePath: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'imagePath') {
            this.setState({imagePath: e.target.value});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            id: this.state.id,
            imagePath: this.state.imagePath
        };
        postApi('/api/photo', data).then(res => {
            console.log(res);
            this.setState({imagePath: ''});
            alert('Image ajoutée !');
        }).catch(reason => {
            alert(reason);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="imagePath" placeholder="Url image" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}

export default AddPhoto;