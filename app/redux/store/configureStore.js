import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import cartReducer from '../reducers/cartReducer';
import customReducer from '../reducers/customerReducer';
import orderNotesReducer from '../reducers/orderNotesReducer';
import orderDiscountReducer from '../reducers/orderDiscountReducer';
const rootReducer = combineReducers(
    { userReducer, cartReducer , customReducer, orderNotesReducer,orderDiscountReducer}
);
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer)

export default configureStore;