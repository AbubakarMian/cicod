import { SET_CURRENCY,RESET} from '../constants';
const initialState = {
    currency:'Initital val'
}
const currencyReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_CURRENCY:

            return {
                ...state,
                currency: action.value.currency,
            }

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
export default currencyReducer;
