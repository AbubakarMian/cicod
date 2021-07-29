import { ORDER_RELOAD,PRODUCT_RELOAD } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    order: false,
    product:false,
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
        default:
            return state;
         
    }
    
}
export default reloadReducer;
