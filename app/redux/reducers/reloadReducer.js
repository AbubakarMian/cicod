import { ORDER_RELOAD,PRODUCT_RELOAD,PRODUCT_CATEGORY_RELOAD,PRODUCT_CATEGORY_FILTER_RELOAD,CUSTOMER_RELOAD } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    order: false,
    product:false,
    customer:false,
    product_category:false,
    product_category_filter:false,
}
const reloadReducer = (state = initialState, action) =>  {
   console.log('data----------user',state);
     switch (action.type) {

        case ORDER_RELOAD:
            return {
                ...state,
                order: action.value.reload,
            }
            
            break;
        case PRODUCT_RELOAD:
        return {
            ...state,
            product: action.value.reload,
        }
        break;
        case CUSTOMER_RELOAD:
        return {
            ...state,
            customer: action.value.reload,
        }
        break;
        case PRODUCT_CATEGORY_RELOAD:
            return {
                ...state,
                product_category: action.value.reload,
            }
            break;
        case PRODUCT_CATEGORY_FILTER_RELOAD:
            return {
                ...state,
                product_category_filter: action.value.reload,
            }
            break;
        default:
            return state;
         
    }
    
}
export default reloadReducer;
