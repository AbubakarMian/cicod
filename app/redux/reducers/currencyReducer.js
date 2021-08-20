import { SET_CURRENCY,FORMAT_CURRENCY,RESET} from '../constants';
const initialState = {
    currency:'Initital val',
    amount:'0'
}
const currencyReducer = (state = initialState, action) => {


    switch (action.type) {
        case SET_CURRENCY:

            update_state(action.value.currency);

            return {
                ...state,
                currency: action.value.currency,
            }

            break;
        // case FORMAT_CURRENCY:

        // return get_formated_amount(action);
            // return {
            //     ...state,
            //     amount: amount,
            // }

            break;
            case RESET:{
                return{
                    ...state,
                    currency:'N'
                }
            }

        default:
            return state;
    }
}

function update_state(currency){
    initialState.currency = currency
}

export function get_formated_amount(amount){
    amount = amount +'';
    console.log('ám amount',amount)
    amount = initialState.currency+amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return amount;
}
export default currencyReducer;
