import React, { Component } from 'react';
import {getApi} from "../../lib/api/requestApi";
import {withAlert} from "react-alert";

class AddToCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleID: props.value
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        getApi('/api/shop/addtocart/' + this.state.articleID.toString()).then(res => {
            this.props.alert.success('Article ajouté au panier');
        }).catch(reason => {
            this.props.alert.error('Impossible d\'ajouter l\'article au panier');
        });
    }

    render() {
        return (
            <div>
                <button className="shop-article-btn" onClick={this.handleClick}>Ajouter au panier</button>
            </div>
        );
    }
}

export default withAlert(AddToCart);