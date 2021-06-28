import { SET_DELIVERY_ADDRESS,RESET } from '../constants';
const initialState = {
    country_id:0,
    state_id:0,
    address: '',
    type: 'PICKUP',
}
const deliveryAddressReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_DELIVERY_ADDRESS:

            return {
                ...state,
                address: action.value.address,
                type: action.value.type,
                country_id: action.value.country_id,
                state_id: action.value.state_id,
            }

            break;
            case RESET:{
                return{
                    ...state,
                    country_id:0,
                    state_id:0,
                    address: '',
                    type: 'PICKUP',
                }
            }

        default:
            return state;
    }
}
export default deliveryAddressReducer;
