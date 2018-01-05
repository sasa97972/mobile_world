import React, { Component } from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DashboardMenu from './components/DashboardMenu';
import {Layout} from './components/BasicLayout';

if (document.getElementById('root')) {
    render(
        <Router>
            <Layout>
                <DashboardMenu/>
                <Route path="/admin/" exact component={Dashboard} />
                <Route path="/admin/categories" component={Dashboard}/>
            </Layout>
        </Router>,
        document.getElementById('root')
    );
}
