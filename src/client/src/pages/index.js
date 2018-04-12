import React, { Component } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

class Index extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div>
                    <h1>Home Page</h1>
                    <p>test</p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Index;