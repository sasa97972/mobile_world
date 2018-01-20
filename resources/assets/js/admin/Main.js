import React, { Component } from 'react';
import {render} from 'react-dom';
import App from './App'

if (document.getElementById('root')) {
    render(
        <App/>,
        document.getElementById('root')
    );
}
