import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {getProducts} from '../actions/getProducts';
import {changeSort} from '../actions/changeSort';
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
            sortBy: 'created_at',
            sort: 'asc',
            currentPage: 1,
            perPage: "10",
            pages: null,
            search: "",
            isSearch: false,
            filter: [],
            price: {}
        };

        this.pagination = this.pagination.bind(this);
        this.changePage = this.changePage.bind(this);
        this.productSearch = this.productSearch.bind(this);
        this.changeSortBy = this.changeSortBy.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.changePerPage = this.changePerPage.bind(this);
        this.checkCategories = this.checkCategories.bind(this);
        this.getFilterData = this.getFilterData.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.checkPhones = this.checkPhones.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.applyCategory = this.applyCategory.bind(this);
    }

    componentWillMount() {
        const {getProducts} = this.props;
        getProducts({url: this.state.url}).then(() => {
            this.applyFilter(this.props.products.slice());
        });
        this.getFilterData();
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
        this.setState({search: searchText, currentPage: 1, isSearch: !!searchText}, () => {
            this.applyFilter();
        });
    }

    changePage(page) {
        this.setState({currentPage: page}, () => {
            this.applyFilter();
        });
        $("body, html").animate({scrollTop: $(".products").offset().top}, 1000);
    }

    changeSortBy(event, index, value) {
        const {changeSort} = this.props;
        this.setState({sortBy: value}, () => {
            changeSort({sort: this.state.sort, sortBy: this.state.sortBy})
        });
    }

    changeSort(event, index, value) {
        const {changeSort} = this.props;
        this.setState({sort: value}, () => {
            changeSort({sort: this.state.sort, sortBy: this.state.sortBy})
        });
    }

    changePerPage(event, index, value) {
        this.setState({perPage: value}, () => {
            this.pagination(this.getProducts())
        });
    }

    checkCategories(name) {
        const filter = this.state.filter.slice();
        const category = filter[0].categories.find(category => category.name === name);
        category.check = !category.check;
        this.setState({filter: filter}, () => {
            this.applyFilter();
        });
    }

    checkPhones(selectedOptions) {
        const filter = this.state.filter.slice();

        filter[1].phones.map((phone) => {
            phone.check = selectedOptions.search(phone.id) !== -1;
        });
        filter[1].phonesSelected = selectedOptions;
        
        this.setState({filter: filter}, () => {
            this.applyFilter();
        });
    }

    changePrice(value) {
        const filter = this.state.filter.slice();
        filter[2].price = value;

        this.setState({filter: filter}, () => {
            this.applyFilter();
        });
    }

    getFilterData() {
        let settings = {
            async: true,
            crossDomain: true,
            method: "GET",
            url: "/api/filter",
        };

        axios(settings).then(response => {
            this.buildFilter(response.data);
        });
    };

    buildFilter(filterData) {
        const filter = [];
        filter.push({
            filterName: "categories",
            filterSearch: "name",
            categories: filterData.categories.map((category) => ({
                name: category.name,
                check: false,
                alias: category.alias
            }))
        });
        filter.push({
            filterName: "phones",
            filterSearch: "model",
            phones: filterData.phones.map((phone) => ({
                id: phone.id,
                name: phone.name,
                model: phone.model,
                check: false,
            })),
            phonesSelect: filterData.phones.map((phone) => ({
                    value: phone.id,
                    label: `${phone.name} ${phone.model}`
            })),
            phonesSelected: ""
        });

        filter.push({
            type: "number",
            filterName: "price",
            filterSearch: "price",
            price: {
                max: filterData.price.max,
                min:filterData.price.min
            }
        });

        this.setState({filter: filter, price: {max: filterData.price.max, min:filterData.price.min}}, () => {
            if(this.props.match.params.category) {
                this.applyCategory(this.props.match.params.category);
            }
        });
    };

    applyCategory(categoryName) {
        let filter = this.state.filter.slice();
        let category = filter[0].categories.find(category => {console.log(category.name, categoryName); return(category.alias.toLowerCase() === categoryName.toLowerCase())});
        category.check = true;
        this.setState({filter: filter}, () => {
            this.applyFilter();
        })
    }

    applyFilter(products = this.getProducts()) {
        const filter = this.state.filter;

        let filteredProducts = [];
        let productForFilter = [];
        filter.map((filter) => {
            productForFilter = filteredProducts.length ?
                    filteredProducts.splice(0, filteredProducts.length)
                :
                    products.splice(0, products.length);
            if(filter.type === "number") {
                productForFilter.map((product, index, arr) => {
                    if (filter[filter.filterName].min <= product[filter.filterSearch] && product[filter.filterSearch] <= filter[filter.filterName].max) {
                        filteredProducts.push(arr.slice(index, index+1)[0]);
                    }
                });
            } else {
                if(!filter[filter.filterName].find(i => i.check)) {
                    filteredProducts = productForFilter.slice();
                } else {
                    filter[filter.filterName].map((item) => {
                        productForFilter.map((product, index, arr) => {
                            if(Array.isArray(product[filter.filterName])) {
                                product[filter.filterName].map((phone) => {
                                    if((phone[filter.filterSearch] === item[filter.filterSearch]) && item.check) {
                                        filteredProducts.push(arr.splice(index, 1, {})[0]);
                                    }
                                })
                            } else if ((item[filter.filterSearch] === product[filter.filterSearch]) && item.check) {
                                filteredProducts.push(arr.splice(index, 1, {})[0]);
                            }
                        })
                    })
                }
            }
        });

        this.pagination(filteredProducts);
    }

    getProducts(products = this.props.products.slice()) {
        return this.state.isSearch ?
            products.filter((product) => {
                return product.title.search(this.state.search) !== -1;
            })
            :
            products;
    }

    render() {
        const {products, search, pages, currentPage, sortBy, sort,
            perPage, filter, price} = this.state;
        const {addProduct} = this.props;
        return(
            <MuiThemeProvider>
                <Layout>
                    <SideBar
                        checkCategories={this.checkCategories}
                        filter={filter}
                        checkPhones={this.checkPhones}
                        price={price}
                        changePrice={this.changePrice}
                    />
                    <Products
                        products={products}
                        search={search}
                        productSearch={this.productSearch}
                        pages={pages}
                        currentPage={currentPage}
                        changePage={this.changePage}
                        sortBy={sortBy}
                        changeSortBy={this.changeSortBy}
                        changeSort={this.changeSort}
                        sort={sort}
                        changePerPage={this.changePerPage}
                        perPage={perPage}
                        addProduct={addProduct}
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
        return dispatch(getProducts(params));
    },
    changeSort: (params) => {
        dispatch(changeSort(params));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Shop));