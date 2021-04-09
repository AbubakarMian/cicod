import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import cartReducer from '../reducers/cartReducer';
const rootReducer = combineReducers(
    { userReducer, cartReducer }
);
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer)

export default configureStore;