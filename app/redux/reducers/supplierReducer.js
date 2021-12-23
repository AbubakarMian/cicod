import { RESET, SET_SUPPLIER } from '../constants';
const initialState = {
    id: 0,
    name: '',
    detail:null
}
 const supplierReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_SUPPLIER:
            return {
                ...state,
                detail:action.value.detail,
                id: action.value.id,
                name: action.value.name,
            }

            break;
        case RESET:
            return {
            ...state,
            id: 0,
            name: '',
            detail:null
        }

        default:
            return state;
    }
}
export default supplierReducer;
