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
const rootReducer = combineReducers({
      userReducer, 
      cartReducer , 
      customReducer, 
      orderNotesReducer,
      orderDiscountReducer,
      deliveryAddressReducer,
      tabBarReducer,
      supplierReducer,
      currencyReducer
    });
// const rootReducer = () => combineReducers(
//     { count: reducer })

const configureStore = createStore(rootReducer)

export default configureStore;