import { PRODUCT_FILTERS,FORMAT_CURRENCY,RESET} from '../constants';
const initialState = {
    filters:[],
   
}
const productFilterReducer = (state = initialState, action) => {


    switch (action.type) {
        case PRODUCT_FILTERS:
console.log("reduxx@@##$$$",action)
            return {
                ...state,
                filters:[...action.value],
            }

            break;
        // case FORMAT_CURRENCY:

        // return get_formated_amount(action);
            // return {
            //     ...state,
            //     amount: amount,
            // }


        default:
            return state;
    }
}

export default productFilterReducer;
