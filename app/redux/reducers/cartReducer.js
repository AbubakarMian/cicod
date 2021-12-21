import {
  REMOVE_DELIVERY_FEE_TO_COST,
  ADD_DELIVERY_FEE_TO_COST,
  REMOVE_FROM_CART,
  ADD_TO_PRODUCT,
  REMOVE_PRODUCT_FORM_CART,
  CLEAR_ORDER,
  CLEAR_CART,
  UPDATE_CART,
} from '../constants';
const initialState = {
  cart: [],
  cart_detail: {
    total_price: 0.0,
    tax: 0,
    total_price_with_tax: 0.0,
    delivery_fee: 0.0,
    // total_price_with_tax_delivery:0,
    vat_amount: 0,
    vat_percent: 0,
    has_vat: false,
  },
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_PRODUCT:
      console.log('reopx');
      let product_found = false;
      let complete_state = state;
      let cart = state.cart;
      let i = 0;
      for (; i < cart.length; i++) {
        let item = cart[i];
        console.log('cart item -------------', cart[i]);
        if (item.id == action.value.id && !product_found) {
          // let updated_purchased_quantity = cart[i].purchased_quantity //+ 1
          // let updated_purchased_quantity = action.value.purchased_quantity //+ 1
          // cart[i].purchased_quantity = updated_purchased_quantity
          cart[i] = action.value;

          product_found = true;
          break;
        }
      }
      if (!product_found) {
        cart.push(action.value);
      }
      state = {...state, cart};
      complete_state = updateCart(state);
      return complete_state;

      break;

    case ADD_DELIVERY_FEE_TO_COST:
      // state.cart_detail.delivery_fee=action.value;
      // updateCart();
      // return {...state,delivery_fee:0}
      state.cart_detail.delivery_fee = action.value.delivery_fee;
      state = {...state};
      console.log('delStaas', state);
      complete_state = updateCart(state);

      return complete_state;

      break;
    case REMOVE_DELIVERY_FEE_TO_COST:
      state.cart_detail.delivery_fee = 0;
      // updateCart();
      // return {...state,delivery_fee:0}

      complete_state = updateCart(state);
      return complete_state;
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
            cart.splice(i, 1);
          }
        }
      }
      // updateCart();
      // return { ...state, cart };
      state = {...state, cart};
      complete_state = updateCart(state);
      return complete_state;
      break;

    case REMOVE_PRODUCT_FORM_CART:
      cart = state.cart;
      i = 0;
      for (; i < cart.length; i++) {
        if (i == action.value) {
          cart.splice(i, 1);
        }
      }
      // updateCart();
      // return { ...state, cart };
      state = {...state, cart};
      complete_state = updateCart(state);
      return complete_state;
      break;
    case CLEAR_ORDER:
      cart = state.cart;
      state.cart_detail.delivery_fee = 0;
      state.cart_detail = {
        total_price: 0,
        tax: 0,
        total_price_with_tax: 0,
        delivery_fee: 0,
        // total_price_with_tax_delivery:0,
        vat_amount: 0,
        vat_percent: 0,
        has_vat: false,
      };
      cart.splice(0);

      console.log('cart%$$', cart);

      // updateCart();
      // return { ...state, cart };
      state = {...state, cart};
      console.log('rt$#%$$', cart);
      complete_state = updateCart(state);
      console.log('ty$##', complete_state);
      return complete_state;
      // return {
      //   ...state,
      //   cart: [],
      //   cart_detail: {
      //     total_price: 0,
      //     tax: 0,
      //     total_price_with_tax: 0,
      //     delivery_fee: 0,
      //     // total_price_with_tax_delivery:0,
      //     vat_amount: 0,
      //     vat_percent: 0,
      //     has_vat: false,
      //   },
      // };
      break;
    case CLEAR_CART:
      console.log('io$##');
      let statex = {
        ...state,
        cart: [],
        cart_detail: {
          total_price: 0.0,
          tax: 0,
          total_price_with_tax: 0.0,
          delivery_fee: 0.0,
          // total_price_with_tax_delivery:0,
          vat_amount: 0,
          vat_percent: 0,
          has_vat: false,
        },
      };
      let complete_statex = updateCart(statex);
      return complete_statex;
    case UPDATE_CART:
      // updateCart();
      // return { state };
      complete_state = updateCart(state);
      return complete_state;
    default:
      return state;
  }
};
export default cartReducer;

function updateCart(complete_state) {
  let cart = complete_state.cart;
  let total_price = 0;
  let vat_amount = 0;
  let vat_percent = 0;
  let has_vat = false;
  for (let i = 0; i < cart.length; i++) {
    total_price = total_price + cart[i].purchased_quantity * cart[i].price;
    vat_amount =
      vat_amount +
      cart[i].purchased_quantity *
        (cart[i].vat_amount == null ? 0 : cart[i].vat_amount);
    vat_percent = cart[i].vat_percent; // amount is single percent cant be added multiple times
    has_vat = cart[i].has_vat; // amount is single percent cant be added multiple times
  }
  console.log('tessss@3', cart);
  total_price = parseFloat(total_price).toFixed(2);
  let tax = vat_amount; //parseFloat(total_price*0.075).toFixed(2);
  complete_state.cart_detail.total_price = total_price;
  complete_state.cart_detail.tax = tax;
  complete_state.cart_detail.total_price_with_tax =
    (
      parseFloat(total_price) +
      parseFloat(tax) +
      parseFloat(complete_state.cart_detail.delivery_fee)
    ).toFixed(2) + '';
  complete_state.cart_detail.vat_percent = vat_percent;
  complete_state.cart_detail.has_vat = has_vat;
  console.log('total_price', total_price);
  console.log('tax', tax);
  console.log(
    'total_price+tax###',
    complete_state.cart_detail.total_price_with_tax,
  );
  return complete_state;
}

function updateCartpre() {
  let cart = initialState.cart;
  let total_price = 0;
  let vat_amount = 0;
  let vat_percent = 0;
  let has_vat = false;
  for (let i = 0; i < cart.length; i++) {
    total_price = total_price + cart[i].purchased_quantity * cart[i].price;
    vat_amount =
      vat_amount +
      cart[i].purchased_quantity *
        (cart[i].vat_amount == null ? 0 : cart[i].vat_amount);
    vat_percent = cart[i].vat_percent; // amount is single percent cant be added multiple times
    has_vat = cart[i].has_vat; // amount is single percent cant be added multiple times
  }
  console.log('tessss@3', cart);
  total_price = parseFloat(total_price).toFixed(2);
  let tax = vat_amount; //parseFloat(total_price*0.075).toFixed(2);
  initialState.cart_detail.total_price = total_price;
  initialState.cart_detail.tax = tax;
  initialState.cart_detail.total_price_with_tax =
    (
      parseFloat(total_price) +
      parseFloat(tax) +
      parseFloat(initialState.cart_detail.delivery_fee)
    ).toFixed(2) + '';
  initialState.cart_detail.vat_percent = vat_percent;
  initialState.cart_detail.has_vat = has_vat;
  console.log('total_price', total_price);
  console.log('tax', tax);
  console.log(
    'total_price+tax###',
    initialState.cart_detail.total_price_with_tax,
  );
}
