import React, {Component} from "react";
import {getApi} from "../../lib/api/requestApi";
import {Link} from "react-router-dom";

class Manifestation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: (props.match) ? props.match.params.ID : null,
            name: (props.values) ? props.values.Nom : null,
            description: (props.values) ? props.values.Description : null,
            date: (props.values) ? props.values.Quand : null,
            interval: (props.values) ? props.values.Intervale : null,
            price: (props.values) ? props.values.Prix : null,
            subscribed: false,
            fullPage: !!(props.fullPage),
            photos: [],
            wasSubscriber: false
        };

    }


    getPhotos() {
        getApi('/api/photos/' + this.state.id).then(res => {
            let tmp = [];
            res.forEach(photo => {
                tmp.push(photo);
            });
            this.setState({photos: tmp});
        }).catch(reason => {
            alert(reason);
        })
    }



    componentDidMount() {

    }

    render() {
        if (this.state.fullPage) {
            this.getPhotos();
            let photos = [];
            this.state.photos.forEach((photo, index) => {
                photos.push(
                    <div>
                        <p>Photo n°{index}</p>
                        <img src={photo.Chemin_Image} alt={'photo'+index.toString()}/>
                    </div>
                );
            });
            return (
                <div>
                    <h2><strong>Page détaillé de: {this.state.name}</strong></h2>
                    <p>Description: {this.state.description}</p>
                    <p>Date: {this.state.date}</p>
                    <p>Intreval: {this.state.interval}</p>
                    <p>Prix: {this.state.price}</p>
                    {}
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