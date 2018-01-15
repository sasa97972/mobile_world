import React, { Component } from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DashboardMenu from './components/DashboardMenu';
import Categories from './components/Categories';
import CreateCategory from './components/CreateCategory';
import EditCategory from './components/EditCategory';
import Phones from './components/Phones';
import CreatePhone from './components/CreatePhone';
import EditPhone from './components/EditPhone';
import Products from './components/Products';
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
                <Route path="/admin/categories/create" render={(props) => (
                    <CreateCategory {...props} token={token}/>
                )}/>
                <Route path="/admin/categories/edit/:categoryId" render={(props) => (
                    <EditCategory {...props} token={token}/>
                )}/>
                <Route path="/admin/phones" exact render={(props) => (
                    <Phones {...props} token={token}/>
                )}/>
                <Route path="/admin/phones/create" exact render={(props) => (
                    <CreatePhone {...props} token={token}/>
                )}/>
                <Route path="/admin/phones/edit/:phoneId" exact render={(props) => (
                    <EditPhone {...props} token={token}/>
                )}/>
                <Route path="/admin/products" exact render={(props) => (
                    <Products {...props} token={token}/>
                )}/>
            </Layout>
        </Router>,
        document.getElementById('root')
    );
}
