import React, { Component } from 'react';
import AdminManifestation from "../../components/admin/AdminManifestation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class Index extends Component {

    render() {
        return (
            <div>
                <Header/>
                <h1>Admin Page</h1>
                <AdminManifestation/>
                <Footer/>
            </div>
        )
    }
}

export default Index;