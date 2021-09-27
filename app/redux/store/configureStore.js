import { createStore, combineReducers } from 'redux';
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
      barcodeReducer
    });
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer)

export default configureStore;