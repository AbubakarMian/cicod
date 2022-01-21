/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userReducer from '../reducers/userReducer';
import tabBarReducer from '../reducers/tabBarReducer';
import cartReducer from '../reducers/cartReducer';
import customReducer from '../reducers/customerReducer';
import orderNotesReducer from '../reducers/orderNotesReducer';
import orderDiscountReducer from '../reducers/orderDiscountReducer';
import deliveryAddressReducer from '../reducers/deliveryAddressReducer';
import supplierReducer from '../reducers/supplierReducer';
import currencyReducer from '../reducers/currencyReducer';
import reloadReducer from '../reducers/reloadReducer';
import productFilterReducer from "../reducers/productFilterReducer";
import barcodeReducer from '../reducers/barcodeReducer';
import cartChainReducer from '../reducers/cartChainReducer';
import products_reducer from '../reducers/products_reducer';
import product_categories_reducer from '../reducers/product_categories_reducer';

import reduxThunk from "redux-thunk";
const rootReducer = combineReducers({
      userReducer, 
      cartReducer , 
      customReducer, 
      orderNotesReducer,
      orderDiscountReducer,
      deliveryAddressReducer,
      tabBarReducer,
      supplierReducer,
      currencyReducer,
      reloadReducer,
      productFilterReducer,
      barcodeReducer,
      cartChainReducer,
      products_reducer,
      product_categories_reducer,
    });
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer,{},compose(applyMiddleware(reduxThunk)))

export default configureStore;