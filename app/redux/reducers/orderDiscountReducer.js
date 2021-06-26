import { RESET, SET_DISCOUNT } from '../constants';
const initialState = {
    discount_amount: '',
    discount_type: '',
}
const orderDiscountReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_DISCOUNT:

            return {
                ...state,
                discount_amount: action.value.discount_amount,
                discount_type: action.value.discount_type,
            }

            break;
            case RESET:
                return {
                    ...state,
                    discount_amount: '',
                    discount_type: '',
                }
    
                break;

        default:
            return state;
    }
}
export default orderDiscountReducer;
