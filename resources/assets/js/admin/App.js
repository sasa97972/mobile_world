import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {withRouter} from 'react-router'

import Dashboard from './components/Dashboard';
import DashboardMenu from './components/DashboardMenu';
import Categories from './components/Categories';
import CreateCategory from './components/CreateCategory';
import EditCategory from './components/EditCategory';
import Phones from './components/Phones';
import CreatePhone from './components/CreatePhone';
import EditPhone from './components/EditPhone';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import AddImages from './components/AddImages';
import Comments from './components/Comments';
import {Layout} from './components/BasicLayout';

const token = "verySecretToken";

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            token: "verySecretToken",
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <Router>
                <Layout>
                    <DashboardMenu/>
                    <Route path="/admin/" exact render={(props) => (
                        <Dashboard {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/categories" exact render={(props) => (
                        <Categories {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/categories/create" render={(props) => (
                        <CreateCategory {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/categories/edit/:categoryId" render={(props) => (
                        <EditCategory {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/phones" exact render={(props) => (
                        <Phones {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/phones/create" exact render={(props) => (
                        <CreatePhone {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/phones/edit/:phoneId" exact render={(props) => (
                        <EditPhone {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/products" exact render={(props) => (
                        <Products {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/products/create" exact render={(props) => (
                        <CreateProduct {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/images/:product_id" exact render={(props) => (
                        <AddImages {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/products/edit/:product_id" exact render={(props) => (
                        <EditProduct {...props} token={this.state.token}/>
                    )}/>
                    <Route path="/admin/comments" exact render={(props) => (
                        <Comments {...props} token={this.state.token}/>
                    )}/>
                </Layout>
            </Router>
        )
    }
}

export default App;