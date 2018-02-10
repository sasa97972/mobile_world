import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {getProduct} from "../actions/getProduct";
import {getUser} from "../actions/getUser";
import {ProductView} from "./ProductView";
import {Comments} from "./Comments";

class Product extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            parent_id: null,
            comment: "",
            parent_name: "",
            button: false,
            currentPage: 1,
            perPage: 5,
            pages: null,
            comments: []
        };

        this.handleInput = this.handleInput.bind(this);
        this.createComment = this.createComment.bind(this);
        this.parentComment = this.parentComment.bind(this);
        this.discardReply = this.discardReply.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.getProduct({url: `/api/product/${this.props.match.params.productId}`});
        this.props.getUser({url: '/user'});
    }

    handleInput(e) {
        const value = e.target.value;
        value ? this.setState({button: true}) : this.setState({button: false});
        this.setState({comment: value});
    }

    parentComment(id, name) {
        this.setState({parent_id: id, parent_name: name});
    }

    discardReply() {
        this.setState({parent_id: null, parent_name: ""});
    }

    changePage(page) {
        this.setState({currentPage: page}, () => {
            this.pagination();
        });
    }

    componentWillReceiveProps(nextProps) {
        nextProps.product.comments && this.pagination(nextProps.product.comments.slice());
    }

    pagination(comments = this.props.product.comments.slice()) {
        const {currentPage, perPage} = this.state;
        let pageComments = comments.slice((currentPage-1)*perPage, currentPage*perPage),
            pages = Math.ceil(comments.length/perPage);
        this.setState({comments: pageComments, pages: pages});
    }

    createComment() {
        let settings = {
            url: "/comments",
            "async": true,
            "crossDomain": true,
            "method": "post",
            "data": {
                comment: this.state.comment,
                parent_id: this.state.parent_id,
                product_id: this.props.product.product.id
            }
        };

        const success = axios(settings).then(response =>  {
            this.setState({comment: "", parent_id: null, parent_name: "", button: false});
            this.props.getProduct({url: `/api/product/${this.props.match.params.productId}`});
        });
    }

    deleteComment(id) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "DELETE",
            "headers": {
                token: this.props.token
            },
            "url": `/comments/${id}`,
        };

        axios(settings).then(response => {
            this.props.getProduct({url: `/api/product/${this.props.match.params.productId}`});
        });
    }

    render() {
        const {product, user, addProduct} = this.props;
        const {comment, button, parent_name, currentPage, pages, comments} = this.state;
        return(
           <MuiThemeProvider>
               <div>
                   <ProductView
                       product={product.product}
                       addProduct={addProduct}
                   />
                   <Comments
                       comments={comments}
                       comment={comment}
                       handleInput={this.handleInput}
                       createComment={this.createComment}
                       parentComment={this.parentComment}
                       button={button}
                       parent_name={parent_name}
                       discardReply={this.discardReply}
                       appUser={user}
                       deleteComment={this.deleteComment}
                       currentPage={currentPage}
                       pages={pages}
                       changePage={this.changePage}
                   />
               </div>
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