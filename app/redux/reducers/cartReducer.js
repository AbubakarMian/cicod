import { REMOVE_FROM_CART, ADD_TO_PRODUCT, REMOVE_PRODUCT_FORM_CART,CLEAR_ORDER ,UPDATE_CART} from '../constants';
const initialState = {
    cart: [],
    cart_detail:{
        total_price:0,
        tax:0,
        total_price_with_tax:0,
        vat_amount:0,
        vat_percent:0,
        has_vat:false,
    }
};
const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_PRODUCT:
            let product_found = false;
            let cart = state.cart;
            let i = 0;
            for (; i < cart.length; i++) {
                let item = cart[i];
                console.log('cart item -------------',cart[i]);
                if (item.id == action.value.id && !product_found) {
                    let updated_purchased_quantity = cart[i].purchased_quantity + 1
                    cart[i].purchased_quantity = updated_purchased_quantity
                    product_found = true;
                    break;
                }
            }
            if (!product_found) {
                cart.push(action.value)
            }
            updateCart();
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
                        cart.splice(i,1);
                    }
                }
            }
            updateCart();
            return { ...state, cart };
            break;

        case REMOVE_PRODUCT_FORM_CART:
            cart = state.cart;
            i = 0;
            for (; i < cart.length; i++) {
                if (i == action.value) {                   
                    cart.splice(i,1);
                }
            }
            updateCart();
            return { ...state, cart };
            break;
        case CLEAR_ORDER:
            cart = state.cart;
            cart.splice(0);
           
            updateCart();
            return { ...state, cart };
            break;
        case UPDATE_CART:
            updateCart();
            return { state };
        default:
            return state;
    }    
}
export default cartReducer;

function updateCart (){
    let cart= initialState.cart;
    let total_price = 0;
    let vat_amount = 0;
    let vat_percent = 0;
    let has_vat = false;
    for(let i=0;i<cart.length;i++){
        total_price = total_price + (cart[i].purchased_quantity * cart[i].price);
        vat_amount = vat_amount + (cart[i].purchased_quantity *cart[i].vat_amount);
        vat_percent = cart[i].vat_percent; // amount is single percent cant be added multiple times
        has_vat = cart[i].has_vat; // amount is single percent cant be added multiple times

    }
    total_price = parseFloat(total_price).toFixed(2);
    let tax = vat_amount;//parseFloat(total_price*0.075).toFixed(2);
    initialState.cart_detail.total_price = total_price;
    initialState.cart_detail.tax = tax;
    initialState.cart_detail.total_price_with_tax = (parseFloat(total_price)+parseFloat(tax)).toFixed(2);
    initialState.cart_detail.vat_percent = vat_percent;
    initialState.cart_detail.has_vat = has_vat;
    console.log('total_price',total_price)
    console.log('tax',tax)
    console.log('total_price+tax',(initialState.cart_detail.total_price_with_tax))
}