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
        getApi('/api/manifestation/' + this.state.id.toString()).then(res => {
            this.setState({manifestation: res});
        }).catch(reason => {
            alert(reason);
        })
    }

    render() {
        if (this.state.manifestation) {
            return (
                <div>
                    <Header/>

                    <div className="grid-container">
                        <h1>Hey !</h1>
                        <Manifestation currentEvent={(Date.parse(this.state.manifestation.When.toString()) >= Date.now())} fullPage={true} id={this.state.id} values={this.state.manifestation}/>
                    </div>

                    <Footer/>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Chargement ...</h1>
                </div>
            );
        }
    }
}

export default ManifestationDetails;