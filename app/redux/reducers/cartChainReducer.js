import {
  REMOVE_DELIVERY_FEE_TO_COST,
  ADD_DELIVERY_FEE_TO_COST,
  REMOVE_FROM_CART,
  ADD_TO_PRODUCT_CHAIN,
  REMOVE_PRODUCT_FORM_CART,
  CLEAR_CART,
  UPDATE_CART,
  CLEAR_ORDER_CHAIN,
  REMOVE_FROM_CART_CHAIN,
  REMOVE_PRODUCT_FORM_CART_CHAIN,
} from '../constants';
const initialState = {
  cart: [],
  currency: '₦',
  cart_detail: {
    total_price: 0,
    tax: 0,
    total_price_with_tax: 0.0,
    delivery_fee: 0.0,
    // total_price_with_tax_delivery:0,
    vat_amount: 0,
    vat_percent: 0,
    has_vat: false,
  },
};
const cartChainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_PRODUCT_CHAIN:
      console.log('reopx');
      let product_found = false;
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

      let total_price = 0;
      let vat_amount = 0;
      let vat_percent = 0;
      let has_vat = false;
      let total_price_with_tax = 0;
      for (let i = 0; i < cart.length; i++) {
        console.log('ouids$', cart[i].purchased_quantity,"on#@@",cart[i]);
        total_price = total_price + cart[i].purchased_quantity * cart[i].price;
        vat_amount =
          vat_amount +
          cart[i].purchased_quantity *
            (cart[i].vat_amount == null ? 0 : cart[i].vat_amount);
        vat_percent = cart[i].vat_percent; // amount is single percent cant be added multiple times
        has_vat = cart[i].has_vat; // amount is single percent cant be added multiple times
      }
      //  console.log("rfew@3",cart)
      total_price = parseFloat(total_price).toFixed(2);
      let tax = vat_amount; //parseFloat(total_price*0.075).toFixed(2);
      total_price_with_tax = (
        parseFloat(total_price) + parseFloat(tax)
      ).toFixed(2);
      console.log('rr#@e', total_price_with_tax, total_price);
      // updateCart();
      return {
        ...state,
        currency: cart[0].currency,
        cart,
        cart_detail: {
          total_price,
          total_price_with_tax,
          tax,
          has_vat,
          vat_percent,
          vat_amount,
        },
      };

      break;

    case ADD_DELIVERY_FEE_TO_COST:
      // console.log("feeReu#",action.value,initialState.cart_detail.total_price_with_tax)
      const total =
        parseFloat(state.cart_detail.total_price_with_tax) +
        parseFloat(action.value);

      // initialState.cart_detail.total_price_with_tax+=parseFloat(action.value)
      return {
        ...state,
        cart_detail: {
          ...state.cart_detail,
          delivery_fee: action.value,
          total_price_with_tax: total,
        },
      };
      break;
    case REMOVE_DELIVERY_FEE_TO_COST:
      // updateCart();
      // initialState.cart_detail.total_price_with_tax+=parseFloat(action.value)
      return {
        ...state,
        cart_detail: {
          ...state.cart_detail,
          total_price_with_tax:
            state.cart_detail.total_price_with_tax -
            state.cart_detail.delivery_fee,
          delivery_fee: 0,
        },
      };

      break;
    case REMOVE_FROM_CART_CHAIN:
      cart = state.cart;
      i = 0;
      for (; i < cart.length; i++) {
        if (cart[i].id == action.value.id) {
            let updated_purchased_quantity = cart[i].purchased_quantity;
        //    let updated_purchased_quantity = cart[i].purchased_quantity - 1;
          if (cart[i].purchased_quantity > 0) {
            cart[i].purchased_quantity = updated_purchased_quantity;
          }
          if (cart[i].purchased_quantity == 0) {
            cart.splice(i, 1);
          }
        }
      }

      let total_price_r = 0;
      let vat_amount_r = 0;
      let vat_percent_r = 0;
      let has_vat_r = false;
      let total_price_with_tax_r = 0;
      let tax_r = 0;

      for (let i = 0; i < cart.length; i++) {
        console.log('prodqy$', cart[i].purchased_quantity,"po@#",cart[i]);
        total_price_r =
          total_price_r + cart[i].purchased_quantity * cart[i].price;
        vat_amount_r =
          vat_amount_r +
          cart[i].purchased_quantity *
            (cart[i].vat_amount == null ? 0 : cart[i].vat_amount);
        vat_percent_r = cart[i].vat_percent; // amount is single percent cant be added multiple times
        has_vat_r = cart[i].has_vat; // amount is single percent cant be added multiple times
        console.log('loe#$', total_price_r);
      }
      //  console.log("rfew@3",cart)
      total_price_r = parseFloat(total_price_r).toFixed(2);
      tax_r = vat_amount_r; //parseFloat(total_price*0.075).toFixed(2);
      total_price_with_tax_r = (
        parseFloat(total_price_r) + parseFloat(tax_r)
      ).toFixed(2);
      console.log('remov#$#@e', total_price_with_tax_r, total_price_r);
      // updateCart();
      return {
        ...state,
        cart,
        cart_detail: {
          total_price: total_price_r,
          total_price_with_tax: total_price_with_tax_r,
          tax: tax_r,
          has_vat: has_vat_r,
          vat_percent: vat_percent_r,
          vat_amount: vat_amount_r,
        },
      };

      break;

    case REMOVE_PRODUCT_FORM_CART_CHAIN:
      cart = state.cart;
      i = 0;
      for (; i < cart.length; i++) {
        if (i == action.value) {
          cart.splice(i, 1);
        }
      }
      let total_price_rp = 0;
      let vat_amount_rp = 0;
      let vat_percent_rp = 0;
      let has_vat_rp = false;
      let total_price_with_tax_rp = 0;
      let tax_rp = 0;

      for (let i = 0; i < cart.length; i++) {
        console.log(
          'prodqy$',
          cart[i].purchased_quantity,
          'min_order',
          cart[i],
        );
        total_price_rp =
          total_price_rp + cart[i].purchased_quantity * cart[i].price;
        vat_amount_rp =
          vat_amount_rp +
          cart[i].purchased_quantity *
            (cart[i].vat_amount == null ? 0 : cart[i].vat_amount);
        vat_percent_rp = cart[i].vat_percent; // amount is single percent cant be added multiple times
        has_vat_rp = cart[i].has_vat; // amount is single percent cant be added multiple times
        console.log('loe#$', total_price_rp);
      }
      //  console.log("rfew@3",cart)
      total_price_rp = parseFloat(total_price_rp).toFixed(2);
      tax_rp = vat_amount_rp; //parseFloat(total_price*0.075).toFixed(2);
      total_price_with_tax_rp = (
        parseFloat(total_price_rp) + parseFloat(tax_rp)
      ).toFixed(2);
      console.log('remov#$#@e', total_price_with_tax_rp, total_price_rp);
      // updateCart();
      return {
        ...state,
        cart,
        cart_detail: {
          total_price: total_price_rp,
          total_price_with_tax: total_price_with_tax_rp,
          tax: tax_rp,
          has_vat: has_vat_rp,
          vat_percent: vat_percent_rp,
          vat_amount: vat_amount_rp,
        },
      };

      break;
    case CLEAR_ORDER_CHAIN:
      cart = state.cart;
      // state.cart_detail.delivery_fee=0;
      // state.cart_detail={
      //     total_price:0,
      //     tax:0,
      //     total_price_with_tax:0,
      //     delivery_fee:0,
      //    // total_price_with_tax_delivery:0,
      //     vat_amount:0,
      //     vat_percent:0,
      //     has_vat:false,
      // }
      cart.splice(0);

      //     let total_price_rpc = 0;
      //     let vat_amount_rpc = 0;
      //     let vat_percent_rpc = 0;
      //     let has_vat_rpc = false;
      //     let total_price_with_tax_rpc=0;
      //     let tax_rpc=0

      //     for(let i=0;i<cart.length;i++){
      //         console.log("prodqy$",cart[i].purchased_quantity)
      //         total_price_rpc = total_price_rpc + (cart[i].purchased_quantity * cart[i].price);
      //         vat_amount_rpc = vat_amount_rpc + (cart[i].purchased_quantity *(cart[i].vat_amount==null?0:cart[i].vat_amount));
      //         vat_percent_rpc = cart[i].vat_percent; // amount is single percent cant be added multiple times
      //         has_vat_rpc = cart[i].has_vat; // amount is single percent cant be added multiple times
      //         console.log("loe#$",total_price_rpc)
      //     }
      //   //  console.log("rfew@3",cart)
      //     total_price_rpc = parseFloat(total_price_rpc).toFixed(2);
      //     tax_rpc = vat_amount_rpc;//parseFloat(total_price*0.075).toFixed(2);
      //     total_price_with_tax_rpc = (parseFloat(total_price_rpc)+parseFloat(tax_rpc)).toFixed(2)
      // console.log("remov#$#@e",total_price_with_tax_rpc,total_price_rpc)
      // updateCart();
      return {
        ...state,
        currency: '₦',
        cart,
        cart_detail: {
          total_price: 0,
          tax: 0,
          total_price_with_tax: 0,
          delivery_fee: 0,
          // total_price_with_tax_delivery:0,
          vat_amount: 0,
          vat_percent: 0,
          has_vat: false,
        },
      };

      break;
    case CLEAR_CART:
      return {...state, currency: '₦', cart: [], cart_detail: {}};
    case UPDATE_CART:
      updateCart();
      return {state};
    default:
      return state;
  }
};
export default cartChainReducer;

function updateCart() {
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
  initialState.cart_detail.total_price_with_tax = (
    parseFloat(total_price) +
    parseFloat(tax) +
    parseFloat(initialState.cart_detail.delivery_fee)
  ).toFixed(2);
  initialState.cart_detail.vat_percent = vat_percent;
  initialState.cart_detail.has_vat = has_vat;
  console.log('total_price', total_price);
  console.log('tax', tax);
  console.log(
    'total_price+tax###',
    initialState.cart_detail.total_price_with_tax,
  );
}
