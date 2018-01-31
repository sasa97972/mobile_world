import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {getProducts} from '../actions/getProducts';
import {Layout} from './BasicLayout';
import {SideBar} from './SideBar';
import {Products} from "./Products";

class Shop extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            load: false,
            url: '/api/products',
            sortBy: 'id',
            sort: 'asc',
            currentPage: 1,
            perPage: 10,
        };

        this.pagination = this.pagination.bind(this);
    }

    componentDidMount() {
        const {getProducts} = this.props;
        getProducts({url: this.state.url});
    }

    componentWillReceiveProps(nextProps) {
        this.pagination(nextProps.products);
    }

    pagination(products) {
        const {currentPage, perPage} = this.state;
        let pageProducts = products.splice((currentPage-1)*perPage, perPage);
        this.setState({products: pageProducts});
    }

    render() {
        const {products} = this.state;
        return(
            <MuiThemeProvider>
                <Layout>
                    <SideBar/>
                    <Products
                        products={products}
                    />
                </Layout>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products,
});

const mapDispatchToProps = dispatch => ({
    getProducts: (params) => {
        dispatch(getProducts(params));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Shop));