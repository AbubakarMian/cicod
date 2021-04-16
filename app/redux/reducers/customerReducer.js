import { SET_CUSTOMER } from '../constants';
const initialState = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    lga: '',
}
const customerReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_CUSTOMER:

            return {
                ...state,
                id: action.value.customer_id,
                name: action.value.customer_name,
                email: action.value.customer_email,
                phone: action.value.customer_phone,
                country: action.value.customer_country,
                state: action.value.customer_state,
                lga: action.value.customer_lga,
            }

            break;

        default:
            return state;
    }
}
export default customerReducer;
