import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";

class AddToCart extends Component {

    constructor(props) {
        super(props);
        console.log(props.value);
        this.state = {
            articleID: props.value
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        getApi('/api/shop/addtocart/' + this.state.articleID.toString()).then(res => {
            alert('Article ajouté au panier !');
        }).catch(reason => {
            alert(reason);
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Ajouter au panier</button>
            </div>
        );
    }
}

export default AddToCart;