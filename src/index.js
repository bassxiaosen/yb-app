import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom'
import './styles/index.css';
import App from './App';
import {Provider} from "react-redux"
import store from "./store"
import "./utils/ybapi.js"
ReactDOM.render(
    <Provider store={store}>
    <Router>
        <App/>
    </Router>
</Provider>, document.getElementById('root'));
