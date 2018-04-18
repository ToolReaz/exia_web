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
            name: (props.values) ? props.values.Name : 'erreur de chargement',
            description: (props.values) ? props.values.Description : 'erreur de chargement',
            date: (props.values) ? props.values.When : 'erreur de chargement',
            interval: (props.values) ? props.values.TimeSpan : 'erreur de chargement',
            price: (props.values) ? props.values.Price : 'erreur de chargement',
            subscribed: false,
            fullPage: !!(props.fullPage),
            photos: [],
            wasSubscriber: false
        };
    }


    subscribe() {
        getApi('/api/manifestation/subscribe/' + this.state.id.toString()).then(res => {
            alert('Inscription réussie !');
            console.log(res);
        }).catch(reason => {
            console.error(reason);
        });
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
            this.state.photos.forEach(photo => {
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
                    <button disabled={this.state.subscribed} onClick={this.subscribe}>S'inscrire</button>
                    {addPhoto}
                    {photos}
                </div>
            );


        } else {
            return (
                <div className="event">
                    <h2 className="eventTitle">{this.state.name}</h2>
                    <img className="eventImg" src="https://picsum.photos/300/200" alt="imadadaage"/>
                    <p>Description: {this.state.description}</p>
                    <div>
                        <span className="eventDate">Date: {this.state.date}</span>
                        <span className="eventInter">Intreval: {this.state.interval}</span>
                        <span className="eventPrix">Prix: {this.state.price}</span>
                    </div>
                    <button disabled={this.state.subscribed} onClick={this.subscribe}>S'inscrire</button>
                    <Link to={'/event/'+this.state.id}>Page détaillé</Link>
                </div>
            );
        }
    }
}

export default Manifestation;
