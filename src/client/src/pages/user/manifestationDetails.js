import React, {Component} from "react";
import Manifestation from "../../components/event/Manifestation";
import {getApi} from "../../lib/api/requestApi";

class ManifestationDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.values.ID,
            manifestation: null
        };

        this.subscribe = this.subscribe.bind(this);
    }

    componentDidMount() {
        getApi('/api/idea/get/' + this.state.id).then(res => {
            this.setState({manifestation: res});
        }).catch(reason => {
            alert(reason);
        })
    }

    render() {
        return (
            <div className="grid-container">
                <Manifestation fullPage={true} values={this.state.manifestation}/>
            </div>
        )
    }
}

export default ManifestationDetails;