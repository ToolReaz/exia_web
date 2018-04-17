import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";
import {Link} from "react-router-dom";
import AddPhoto from "./AddPhoto";
import ManifestationPhoto from "./ManifestationPhoto";

class Manifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: (props.values) ? props.id : null,
            name: (props.values) ? props.values.Nom : 'erreur de chargement',
            description: (props.values) ? props.values.Description : 'erreur de chargement',
            date: (props.values) ? props.values.Quand : 'erreur de chargement',
            interval: (props.values) ? props.values.Intervale : 'erreur de chargement',
            price: (props.values) ? props.values.Prix : 'erreur de chargement',
            subscribed: false,
            fullPage: !!(props.fullPage),
            photos: [],
            wasSubscriber: false
        };
    }


    getPhotos() {
        getApi('/api/photos/' + this.state.id.toString()).then(res => {
            let tmp = [];
            console.log(res);
            res.forEach(photo => {
                tmp.push(photo);
            });
            this.setState({photos: tmp});
        }).catch(reason => {
            console.log(reason);
        });
    }



    componentDidMount() {
        if (this.state.fullPage) {
            // Get all photos of the manifestation
            this.getPhotos();
        }
    }


    render() {
        if (this.state.fullPage) {

            let photos = [];
            // Create a photo component for each of them
            this.state.photos.forEach((photo) => {
                photos.push(
                    // The ManifestationPhoto module manage itself the comments
                    <ManifestationPhoto values={photo}/>
                );
            });

            // Show or not the button to add photo if the user was subscribed to the manifestation
            let addPhoto = [];
            if (this.state.wasSubscriber || true) {
                addPhoto.push(<AddPhoto values={this.state.id}/>);
            }


            // Finaly render the page
            return (
                <div>
                    <h2><strong>Page détaillé de: {this.state.name}</strong></h2>
                    <p>Description: {this.state.description}</p>
                    <p>Date: {this.state.date}</p>
                    <p>Intreval: {this.state.interval}</p>
                    <p>Prix: {this.state.price}</p>
                    {addPhoto}
                    {photos}
                </div>
            );


        } else {
            return (
                <div>
                    <p><strong>{this.state.name}</strong></p>
                    <p>Description: {this.state.description}</p>
                    <p>Date: {this.state.date}</p>
                    <p>Intreval: {this.state.interval}</p>
                    <p>Prix: {this.state.price}</p>
                    <Link to={'/event/'+this.state.id}>Page détaillé</Link>
                    <button disabled={this.state.subscribed} onClick={this.subscribe}>S'inscrire</button>
                </div>
            );
        }
    }
}

export default Manifestation;