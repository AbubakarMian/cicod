import { REMOVE_FROM_CART, ADD_TO_PRODUCT } from '../constants';
const initialState = {
    cart: []
};
// const initialState = {
//     cart: [],
//     total: 0,
// }
const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_PRODUCT:
            let product_found = false;
            let cart = state.cart;
            state.cart.map((item, index) => {
                console.log('item item item', item);
                console.log('index index index', index);

                if (item.id == action.value.id) {
                    item.purchased_quantity = +1
                    product_found = true;
                }

            });
            if (!product_found) {
                cart.push(action.value)
            }
            console.log('my action.value ', action.value);
            console.log('my cart ', cart);
            return { ...state, cart };

            break;
        case REMOVE_FROM_CART:

            // let product_found = false;
            // let cart = state.cart;
            state.cart.map((item, index) => {
                console.log('item item item', item);
                console.log('index index index', index);

                if (item.id == action.value.id) {
                    item.purchased_quantity = +1
                    product_found = true;
                }

            });
            if (!product_found) {
                cart.push(action.value)
            }
            console.log('my action.value ', action.value);
            console.log('my cart ', cart);
            return { ...state, cart };
            break;

            // case REMOVE_CART:

            // let product_found = false;
            // let cart = state.cart;
            // state.cart.map((item, index) => {
            //     console.log('item item item', item);
            //     console.log('index index index', index);

            //     if (item.id == action.value.id) {
            //         item.purchased_quantity = +1
            //         product_found = true;
            //     }

            // });
            // if (!product_found) {
            //     cart.push(action.value)
            // }
            // console.log('my action.value ', action.value);
            // console.log('my cart ', cart);
            // return { ...state, cart };
            // break;

        default:
            return state;
    }
}
export default cartReducer;
