import { RESET, SET_SUPPLIER } from '../constants';
const initialState = {
    id: 0,
    name: '',
}
 const supplierReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_SUPPLIER:
            return {
                ...state,
                id: action.value.id,
                name: action.value.name,
            }

            break;
        case RESET:
            return {
            ...state,
            id: 0,
            name: '',
        }

        default:
            return state;
    }
}
export default supplierReducer;
