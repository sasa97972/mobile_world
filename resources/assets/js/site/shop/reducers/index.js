import { combineReducers } from 'redux';

import products from './products';
import product from './product';
import user from './user';

export default combineReducers({
    products,
    product,
    user
});