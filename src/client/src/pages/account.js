import React, { Component } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserAccount from "../components/user/UserAccount";

class Account extends Component {

    render() {
        return (
            <div>
                <Header/>
                <UserAccount/>
                <Footer/>
            </div>
        );
    }
}

export default Account;