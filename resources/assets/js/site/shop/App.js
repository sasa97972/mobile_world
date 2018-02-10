import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import reducers from './reducers';

import Shop from './components/Shop';
import Product from './components/Product';
import {Cart} from './components/Cart';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            confirm: false,
            phone_number: "",
            complete: false,
            button: false
        };

        this.addProduct = this.addProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.completeOrder = this.completeOrder.bind(this);
        this.continueShop = this.continueShop.bind(this);
    }

    addProduct(id) {
        let settings = {
            url: "/cart",
            "async": true,
            "crossDomain": true,
            "method": "POST",
            "data": {
                product_id: id
            }
        };

        const success = axios(settings).then(response =>  {
            this.getProducts(true);
        });
    }

    deleteProduct(id) {
        let settings = {
            url: `/cart/${id}`,
            "async": true,
            "crossDomain": true,
            "method": "DELETE",
        };

        const success = axios(settings).then(response =>  {
            this.getProducts();
        });
    }

    getProducts(openModal = false) {
        let settings = {
            url: "/cart",
            "async": true,
            "crossDomain": true,
            "method": "GET",
        };

        const success = axios(settings).then(response =>  {
            this.setState({products: response.data}, () => {
                openModal && $(".cart__modal").fadeIn(500);
            });
        });
    }

    componentDidMount() {
        this.getProducts();
    }

    continueShop() {
        this.setState({complete: false});
        $(".cart__modal").fadeOut(500);
    }

    confirmOrder() {
        this.setState({confirm: !this.state.confirm});
    }

    changeNumber(event) {
        const value = event.target.value;
        if(value.search(/[^0-9\-\s+]/igm) !== -1) {
            alert("В телефоне могут содержаться только цифры!");
            return false;
        } else if(this.state.phone_number.length < 10) {
            this.setState({button: false});
        } else {
            this.setState({button: true});
        }
        this.setState({phone_number: value});
    }

    completeOrder() {
        if(this.state.phone_number.length < 10) {
            alert("Введите коректный телефон!");
            return false;
        }

        let settings = {
            url: "/order",
            async: true,
            crossDomain: true,
            method: "POST",
            data: {
                phone_number: this.state.phone_number,
            }
        };

        const success = axios(settings).then(response =>  {
            this.setState({phone_number: "", confirm: false, products: [], complete: true});
        });
    }

    render() {
        const {products, phone_number, confirm, complete, button} = this.state;
        return(
            <Provider store={store}>
                <Router>
                    <div>
                        <Cart
                            products={products}
                            continueShop={this.continueShop}
                            deleteProduct={this.deleteProduct}
                            confirm={confirm}
                            confirmOrder={this.confirmOrder}
                            number={phone_number}
                            changeNumber={this.changeNumber}
                            completeOrder={this.completeOrder}
                            complete={complete}
                            button={button}
                        />
                        <Route path="/shop/:category?" exact render={(props) => (
                            <Shop {...props} addProduct={this.addProduct}  />
                        )}/>
                        <Route path="/shop/product/:productId" exact render={(props) => (
                            <Product {...props} addProduct={this.addProduct}  />
                        )}/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;