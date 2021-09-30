import { SET_USER, LOGOUT_USER } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    kciInfo:null,
    id: 0,
    tenantId:"",
    firstname: 'Guest',
    lastname: 'Guest',
    email: 'guest@mail.com',
    phone: '080000000',
    avatar: '',
    access_token: 'EvcGFyZWl0LWFwcC1hZG1pbjo4NmRmMjZkMi01NjE1LTRiOTAtYTBjYy1jMDM5OWJiasdYAnHYzYNCg=='
}
const userReducer = (state = initialState, action) =>  {
   console.log('data----------user',action);
     switch (action.type) {

        case SET_USER:
            AsyncStorage.setItem('User',JSON.stringify({
               
                id: action.value.id,
                firstname: action.value.firstname,
                lastname: action.value.lastname,
                email: action.value.email,
                phone:action.value.phone,
                access_token: action.value.access_token,
                kciInfo:action.value.kciInfo,
                tenantId:action.value.tenantId
            }));
            return {
                ...state,
                id: action.value.id,
                firstname: action.value.firstname,
                lastname: action.value.lastname,
                email: action.value.email,
                phone:action.value.phone,
                access_token: action.value.access_token,
                kciInfo:action.value.kciInfo,
                tenantId:action.value.tenantId
            }
            
            break;
        case LOGOUT_USER:
            AsyncStorage.removeItem("User")
            return {
                ...state,
                id: 0,
                firstname: 'Guest',
                lastname: 'Guest',
                email: 'guest@mail.com',
                phoneno:'080000000',
                access_token: 'guestAccessToken',
                kciInfo:null,
                tenantId:"",
            }
            break;

        default:
            return state;
    }
}
export default userReducer;
