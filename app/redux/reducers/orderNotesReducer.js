import { RESET, SET_NOTES } from '../constants';
const initialState = {
    notes: '',
}
const orderNotesReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_NOTES:

            return {
                ...state,
                notes: action.value.notes,
            }
            case RESET:
                return {
                    ...state,
                    notes:''
                }

            break;

        default:
            return state;
    }
}
export default orderNotesReducer;
