import { SET_USER, LOGOUT_USER } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    id: 0,
    firstname: 'Guest',
    lastname: 'Guest',
    email: 'guest@mail.com',
    phone: '080000000',
    access_token: 'EvcGFyZWl0LWFwcC1hZG1pbjo4NmRmMjZkMi01NjE1LTRiOTAtYTBjYy1jMDM5OWJiasdYAnHYzYNCg=='
}
const userReducer = (state = initialState, action) =>  {
   
     switch (action.type) {

        case SET_USER:
            AsyncStorage.setItem('User',JSON.stringify(state));
           
           
            return {
                ...state,
                id: action.value.id,
                firstname: action.value.firstname,
                lastname: action.value.lastname,
                email: action.value.email,
                phone:action.value.phone,
                access_token: action.value.access_token,
            }
            
            break;
        case LOGOUT_USER:

            return {
                ...state,
                id: 0,
                firstname: 'Guest',
                lastname: 'Guest',
                email: 'guest@mail.com',
                phoneno:'080000000',
                access_token: 'guestAccessToken',
               
            }
            break;

        default:
            return state;
    }
}
export default userReducer;
