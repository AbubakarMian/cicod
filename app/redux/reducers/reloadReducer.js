import { ORDER_RELOAD } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    order: false
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

        default:
            return state;
    }
}
export default reloadReducer;
