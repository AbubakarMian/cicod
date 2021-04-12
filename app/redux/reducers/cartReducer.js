import { REMOVE_FROM_CART, ADD_TO_PRODUCT, REMOVE_PRODUCT_FORM_CART } from '../constants';
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
            console.log('-----------------------------------------------------------------');
            let i = 0;
            for (; i < cart.length; i++) {
                let item = cart[i];
                // console.log('cartReducer item adddddddd', item);

                if (item.id == action.value.id && !product_found) {
                    let updated_purchased_quantity = cart[i].purchased_quantity + 1
                    console.log('action.value.id action.value.id quantity', cart[i].purchased_quantity)
                    console.log('item.id item.id', item.id)
                    cart[i].purchased_quantity = updated_purchased_quantity
                    product_found = true;
                    console.log('upfates quantity', cart[i].purchased_quantity)
                    break;
                }
            }
            // console.log('check action.value ', action.value);
            // console.log('check i ', i);
            if (!product_found) {
                cart.push(action.value)
            }
            // console.log('my action.value ', action.value);
            // console.log('my cart ', cart);
            return { ...state, cart };

            break;
        case REMOVE_FROM_CART:
            cart = state.cart;
            i = 0;
            for (; i < cart.length; i++) {
                if (cart[i].id == action.value.id) {

                    let updated_purchased_quantity = cart[i].purchased_quantity - 1;
                    if (cart[i].purchased_quantity > 0) {

                        cart[i].purchased_quantity = updated_purchased_quantity;

                    }
                    if (cart[i].purchased_quantity == 0) {
                        cart.splice(i);
                    }
                }

            }

            console.log('my action.value remove ', action.value);
            console.log('my cart remove ', cart);
            return { ...state, cart };
            break;

        case REMOVE_PRODUCT_FORM_CART:

            // let product_found = false;
            cart = state.cart;
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

        default:
            return state;
    }
}
export default cartReducer;
