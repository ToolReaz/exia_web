import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/grid.css';
import './stylesheets/accueil.css';
import './stylesheets/event.css';
import './stylesheets/global.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,document.getElementById('root'));
registerServiceWorker();