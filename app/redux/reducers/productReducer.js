// import { REMOVE_PRODUCT, ADD_PRODUCT } from '../constants';
// const initialState = {
//     id: 0,
//     name: '',
//     quantity: 0,
//     purchased_quantity: 0,
//     price: 0,
// }
// const userReducer = (state = initialState, action) => {

//     switch (action.type) {

//         case ADD_PRODUCT:

//             return {
//                 ...state,
//                 id: action.value.id,
//                 name: action.value.name,
//                 quantity: action.value.quantity,
//                 purchased_quantity: action.value.purchased_quantity,
//                 price: action.value.price,
//             }

//             break;
//         case REMOVE_PRODUCT:

//             return {
//                 ...state,
//                 id: 0,
//                 name: '',
//                 quantity: 0,
//                 purchased_quantity: 0,
//                 price: 0,

//             }
//             break;

//         default:
//             return state;
//     }
// }
// export default userReducer;
