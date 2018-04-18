import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

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
            console.log(res);
            res.forEach(manifestation => {
                tmp.push(manifestation);
            });
            this.setState({manifestations: tmp});
        }).catch(reason => {
            console.log(reason);
        });
    }


    showSubscribersOf(e) {
        let id = e.target.value;
        getApi('/api/manifestation/subscribers/' + id).then(res => {
            console.log(res);
            this.setState({
                id: id,
                subscribers: res,
                pdfUrl: 'http://localhost:4000/api/manifestation/subscribers/pdf/' + id.toString(),
                csvUrl: 'http://localhost:4000/api/manifestation/subscribers/csv/' + id.toString(),
            });
        }).catch(reason => {
            console.log(reason);
        });
    }


    render() {
        let options = [];
        this.state.manifestations.forEach((manifestation, index) => {
            options.push(
                <option key={index} value={manifestation.ID}>{manifestation.Name}</option>
            )
        });
        return (
            <div>
                <select name="id" onChange={this.showSubscribersOf}>
                    {options}
                </select>
                <p><strong>Nombre d'inscrit: {this.state.subscribers}</strong></p>
                <a href={this.state.csvUrl} target="_blank"><strong>CSV</strong></a><br/>
                <a href={this.state.pdfUrl} target="_blank"><strong>PDF</strong></a>
                <br/>
            </div>
        )
    }
}

export default ShowSubscribersManifestation;