import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {getProduct} from "../actions/getProduct";
import {getUser} from "../actions/getUser";
import {ProductView} from "./ProductView";

class Product extends Component
{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getProduct({url: `/api/product/${this.props.match.params.productId}`});
        this.props.getUser({url: '/user'});
    }

    render() {
        const {product} = this.props;
        console.log(product);
        return(
           <MuiThemeProvider>
               <ProductView
                   product={product.product}
               />
           </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    product: state.product,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    getProduct: (params) => {
        dispatch(getProduct(params));
    },
    getUser: (params) => {
        dispatch(getUser(params));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Product));