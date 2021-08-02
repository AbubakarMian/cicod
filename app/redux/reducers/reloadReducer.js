import { ORDER_RELOAD,PRODUCT_RELOAD,PRODUCT_CATEGORY_RELOAD } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    order: false,
    product:false,
    product_category:false,
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
            case PRODUCT_CATEGORY_RELOAD:
                return {
                    ...state,
                    product_category: action.value.reload,
                }
                break;
        default:
            return state;
         
    }
    
}
export default reloadReducer;
