import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import cartReducer from '../reducers/cartReducer';
import customReducer from '../reducers/customerReducer';
const rootReducer = combineReducers(
    { userReducer, cartReducer , customReducer}
);
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer)

export default configureStore;