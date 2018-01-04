import React, { Component } from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Example from './components/Example';

render(
    <Router>
        <Route path="/admin/" component={Example} />
    </Router>,
    document.getElementById('example')
);