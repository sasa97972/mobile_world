import React, { Component } from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DashboardMenu from './components/DashboardMenu';
import Categories from './components/Categories';
import {Layout} from './components/BasicLayout';

const token = "verySecretToken";

if (document.getElementById('root')) {
    render(
        <Router>
            <Layout>
                <DashboardMenu/>
                <Route path="/admin/" exact render={(props) => (
                    <Dashboard {...props} token={token}/>
                )}/>
                <Route path="/admin/categories" exact render={(props) => (
                    <Categories {...props} token={token}/>
                )}/>
            </Layout>
        </Router>,
        document.getElementById('root')
    );
}
