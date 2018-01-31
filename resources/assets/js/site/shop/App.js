import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import reducers from './reducers';

import Shop from './components/Shop';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <Provider store={store}>
                <Router>
                        <Route path="/shop" exact render={(props) => (
                            <Shop {...props} />
                        )}/>
                </Router>
            </Provider>
        )
    }
}

export default App;