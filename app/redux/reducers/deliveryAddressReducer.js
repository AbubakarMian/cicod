import { SET_DELIVERY_ADDRESS } from '../constants';
const initialState = {
    address: '',
}
const deliveryAddressReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_DELIVERY_ADDRESS:

            return {
                ...state,
                address: action.value.address,
            }

            break;

        default:
            return state;
    }
}
export default deliveryAddressReducer;
