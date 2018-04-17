import React, {Component} from "react";
import Manifestation from "../../components/event/Manifestation";
import {getApi} from "../../lib/api/requestApi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

class ManifestationDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            manifestation: null
        };
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
            <div>
                <Header/>

                <div className="grid-container">
                    <h1>Hey !</h1>
                    <Manifestation fullPage={true} values={this.state.manifestation}/>
                </div>

                <Footer/>
            </div>

        )
    }
}

export default ManifestationDetails;