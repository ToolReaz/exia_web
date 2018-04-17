import React, {Component} from "react";
import Manifestation from "../../components/event/Manifestation";
import {getApi} from "../../lib/api/requestApi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

class ManifestationPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            imagePath: ''
        };
    }

    componentDidMount() {
        getApi('/api/manifestation/' + this.state.id.toString()).then(res => {
            console.log('hey');
            console.log(res);
            this.setState({manifestation: res});
        }).catch(reason => {
            alert(reason);
        })
    }

    render() {
        return (
            <div>
                <img src="" alt=""/>
            </div>

        )
    }
}

export default ManifestationPhoto;