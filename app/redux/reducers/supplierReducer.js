import { SET_SUPPLIER } from '../constants';
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

        default:
            return state;
    }
}
export default supplierReducer;
