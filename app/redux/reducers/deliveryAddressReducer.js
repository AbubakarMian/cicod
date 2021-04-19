import { SET_DELIVERY_ADDRESS } from '../constants';
const initialState = {
    address: 'PICKUP',
    type: '',
}
const deliveryAddressReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_DELIVERY_ADDRESS:

            return {
                ...state,
                address: action.value.address,
                type: action.value.type,
            }

            break;

        default:
            return state;
    }
}
export default deliveryAddressReducer;
