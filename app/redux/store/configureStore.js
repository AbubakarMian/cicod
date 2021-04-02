import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
const rootReducer = combineReducers(
    { userReducer }
);
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer)

export default configureStore;