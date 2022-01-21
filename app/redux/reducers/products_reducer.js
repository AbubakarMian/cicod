/* eslint-disable prettier/prettier */
import {
  IS_FETCHING_PRODUCTS,
  IS_PRODUCT_SUBMITTING,
  PRODUCT_CREATED,
  PRODUCT_CREATED_ERROR,
  PRODUCT_FETCHED,
  PRODUCT_FETCHED_MORE,
  PRODUCT_UPDATED,
  UPDATE_PRODUCT_FROM_CART,
} from '../constants';
const initialState = {
  data: [],
  totalPageCount: 0,
  isFetchingProducts: false,
  isSubmitting: false,
  error: '',
};
const products_reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_PRODUCTS:
      return {
        ...state,
        isFetchingProducts: true,
        error: '',
      };
    case PRODUCT_FETCHED:
      console.log('jo@@##$$$', action);
      return {
        ...state,
        isFetchingProducts: false,
        data: action.payload.data,
        totalPageCount: action.payload.totalPageCount,
      };

    case UPDATE_PRODUCT_FROM_CART:
      console.log('kio#$3', action);
      return {
        ...state,
        //  isFetchingProducts: false,
        data: action.value,
        //  totalPageCount: action.payload.totalPageCount,
      };

    case PRODUCT_FETCHED_MORE:
      console.log('merhere@@##$$$', action);
      return {
        ...state,
        isFetchingProducts: false,
        data: [...state.data, ...action.payload.data],
        totalPageCount: action.payload.totalPageCount,
      };

    case IS_PRODUCT_SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
      };

    case PRODUCT_CREATED_ERROR:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };

    case PRODUCT_CREATED:
      console.log('merhere@@##$$$', action);
      return {
        ...state,
        isSubmitting: false,
        data: [action.payload, ...state.data],
      };

    case PRODUCT_UPDATED:
      console.log('merhere@@##$40$$', action);
      let newProducts = [];
      for (let index = 0; index < state.data.length - 1; index++) {
        let element = state.data[index];
        if (element.id == action.payload.id) {
          element = action.payload;
        }
        newProducts.push(element);
      }

      console.log('testnew#$', newProducts);

      return {
        ...state,
        isSubmitting: false,
        data: newProducts,
      };

    // case FORMAT_CURRENCY:

    // return get_formated_amount(action);
    // return {
    //     ...state,
    //     amount: amount,
    // }

    default:
      return state;
  }
};

export default products_reducer;
