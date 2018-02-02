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
            pages: null,
            search: ""
        };

        this.pagination = this.pagination.bind(this);
        this.changePage = this.changePage.bind(this);
        this.productSearch = this.productSearch.bind(this);
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
        let newProducts = products.slice(),
            pageProducts = newProducts.slice((currentPage-1)*perPage, currentPage*perPage),
            pages = Math.ceil(newProducts.length/perPage);
        this.setState({products: pageProducts, pages: pages});
    }

    productSearch(event) {
        const searchText = event.target.value;
        const {products} = this.props;
        this.setState({search: searchText, currentPage: 1}, () => {
            this.pagination(products.filter((product) => {
                return product.title.search(searchText) !== -1;
            }));
        });
    }

    changePage(page) {
        const {products} = this.props;
        this.setState({currentPage: page}, () => {
            this.pagination(products);
        });
        $("body, html").animate({scrollTop: $(".products").offset().top}, 1000);
    }

    render() {
        const {products, search, pages, currentPage} = this.state;
        return(
            <MuiThemeProvider>
                <Layout>
                    <SideBar/>
                    <Products
                        products={products}
                        search={search}
                        productSearch={this.productSearch}
                        pages={pages}
                        currentPage={currentPage}
                        changePage={this.changePage}
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