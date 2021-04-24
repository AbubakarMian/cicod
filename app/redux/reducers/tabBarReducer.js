import { UpdateTabbar } from '../constants';

const initialState = {
    tab_name: 'dashboard',
}
const tabBarReducer = (state = initialState, action) => {

    switch (action.type) {

        case UpdateTabbar:

            return {
                ...state,
                tab_name: action.value.tab_name,
            }
            break;
        default:
            return state;
    }
}
export default tabBarReducer;
