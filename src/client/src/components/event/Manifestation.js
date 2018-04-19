import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";
import {Link} from "react-router-dom";
import AddPhoto from "./AddPhoto";
import ManifestationPhoto from "./ManifestationPhoto";

class Manifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: (props.values) ? props.values.ID : null,
            name: (props.values) ? props.values.Name : 'erreur de chargement',
            description: (props.values) ? props.values.Description : 'erreur de chargement',
            date: (props.values) ? props.values.When : 'erreur de chargement',
            interval: (props.values) ? props.values.TimeSpan : 'erreur de chargement',
            price: (props.values) ? props.values.Price : 'erreur de chargement',
            subscribed: false,
            fullPage: !!(props.fullPage),
            photos: [],
            isSubscribed: false,
            currentEvent: props.currentEvent
        };

        this.subscribe = this.subscribe.bind(this);
        this.isSubscribed = this.isSubscribed.bind(this);
        this.getPhotos = this.getPhotos.bind(this);
    }

    subscribe() {
        getApi('/api/manifestation/subscribe/' + this.state.id.toString()).then(res => {
            alert('Inscription validée !');
            this.setState({subscribed: true});
        }).catch(reason => {
            console.error(reason);
        });
    }

    isSubscribed() {
        getApi('/api/manifestation/issubscribed/' + this.state.id.toString()).then(res => {
            this.setState({isSubscribed: res});
        }).catch(reason => {
            console.error(reason);
        });
    }

    getPhotos() {
        getApi('/api/photos/' + this.state.id.toString()).then(res => {
            this.setState({photos: res});
        }).catch(reason => {
            console.error(reason);
        });
    }


    componentDidMount() {
        if (this.state.fullPage) {
            // Get all photos of the manifestation
            this.getPhotos();
            this.isSubscribed();
        }
    }


    render() {
        let subscribeBtn = [];

        if (this.state.currentEvent) {
            if (this.state.isSubscribed) {
                subscribeBtn.push(<button className="eventSubBtn" disabled onClick={this.subscribe}>Déja inscrit !</button>);
            } else {
                subscribeBtn.push(<button className="eventSubBtn" onClick={this.subscribe}>S'inscrire</button>);
            }
        }





        // If display in full page
        if (this.state.fullPage) {

            let photos = [];
            // Create a photo component for each of them
            this.state.photos.forEach(photo => {
                photos.push(
                    // The ManifestationPhoto module manage itself the comments
                    <ManifestationPhoto values={photo}/>
                );
            });


            let addPhoto = [];
            if (this.state.isSubscribed) {
                addPhoto.push(<AddPhoto values={this.state.id}/>);
            }


            return (
                <div>
                    <h2><strong>Page détaillé de: {this.state.name}</strong></h2>
                    <p>Description: {this.state.description}</p>
                    <p>Date: {this.state.date}</p>
                    <p>Intreval: {this.state.interval}</p>
                    <p>Prix: {this.state.price}</p>
                    {subscribeBtn}
                    {addPhoto}
                    {photos}
                </div>
            );





        } else {
            return (
                <div className="event">
                    <h2 className="eventTitle">{this.state.name}</h2>
                    <img className="eventImg" src="https://picsum.photos/300/200" alt="imadadaage"/>
                    <p className="eventDescription">Description: {this.state.description}</p>
                    <div className="eventInfos">
                        <p className="eventDate">Date: {this.state.date}</p>
                        <p className="eventInterval">Intreval: {this.state.interval}</p>
                        <p className="eventPrice">Prix: {this.state.price}</p>
                        {subscribeBtn}
                        <Link className="eventDetailsBtn" to={'/event/'+this.state.id}>Page détaillé</Link>
                    </div>
                </div>
            );
        }
    }
}

export default Manifestation;
