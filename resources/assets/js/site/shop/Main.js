import React, { Component } from 'react';
import {render} from 'react-dom';
import App from './App'

if (document.getElementById('shop-root')) {
    render(
        <App/>,
        document.getElementById('shop-root')
    );
}
