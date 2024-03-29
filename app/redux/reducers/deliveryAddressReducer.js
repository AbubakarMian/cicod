import { SET_DELIVERY_ADDRESS,RESET } from '../constants';
const initialState = {
    country_id:0,
    state_id:0,
    address: '',
    lga_id:0,
    type: 'PICKUP',
    same_as_delivery:false,
    selected_address_id:0,
    address:"",
    delivery_fee:0
}
const deliveryAddressReducer = (state = initialState, action) => {
console.log('redcer 111 ',action);

    switch (action.type) {

        case SET_DELIVERY_ADDRESS:

            return {
                ...state,
                address: action.value.address,
                type: action.value.type,
                country_id: action.value.country_id,
                lga_id:action.value.lga_id,
                state_id: action.value.state_id,
                delivery_fee:action.value.delivery_fee,
                same_as_delivery:action.value.same_as_delivery,
                selected_address_id:action.value.selected_address_id
            }

            break;
            case RESET:{
                return{
                    ...state,
                    country_id:0,
                    state_id:0,
                    address: '',
                    delivery_fee:0,
                    lga_id:0,
                    type: 'PICKUP',
                }
            }
            break;
        default:
            return state;
    }
}
export default deliveryAddressReducer;
