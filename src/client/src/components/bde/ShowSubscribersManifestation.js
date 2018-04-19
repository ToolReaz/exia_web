import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

class ShowSubscribersManifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            subscribers: 0,
            pdfUrl: '',
            csvUrl: '',
            manifestations: []
        };

        this.showSubscribersOf = this.showSubscribersOf.bind(this);
    }

    componentDidMount() {
        getApi('/api/manifestation').then(res => {
            let tmp = this.state.manifestations;
            res.forEach(manifestation => {
                tmp.push(manifestation);
            });
            this.setState({manifestations: tmp});
        }).catch(reason => {
            this.props.alert.error('Impossible de charger les inscrit à la manifestation');
        });
    }


    showSubscribersOf(e) {
        let id = e.target.value;
        getApi('/api/manifestation/subscribers/' + id).then(res => {
            this.setState({
                id: id,
                subscribers: res,
                pdfUrl: 'http://localhost:4000/api/manifestation/subscribers/pdf/' + id.toString(),
                csvUrl: 'http://localhost:4000/api/manifestation/subscribers/csv/' + id.toString(),
            });
        }).catch(reason => {
            this.props.alert.error('Impossible de charger les inscrits à la manifestation');
        });
    }


    render() {

        if (this.state.manifestations.length === 0) {
            return (
                <div id="preloader">
                    <div id="loader"></div>
                </div>
            );
        } else {

            let options = [];
            this.state.manifestations.forEach((manifestation, index) => {
                options.push(
                    <option key={index} value={manifestation.ID}>{manifestation.Name}</option>
                )
            });
            return (
                <div className="grid-container">
                    <div className="row">
                        <div className="col-12 center">
                            <select name="id" onChange={this.showSubscribersOf}>
                                {options}
                            </select><br/><br/>
                            <p><strong>Nombre d'inscrit: {this.state.subscribers}</strong></p><br/>
                            <a className="link" href={this.state.csvUrl} target="_blank"><strong>CSV</strong></a><br/>
                            <a className="link" href={this.state.pdfUrl} target="_blank"><strong>PDF</strong></a>
                            <br/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default withAlert(ShowSubscribersManifestation);