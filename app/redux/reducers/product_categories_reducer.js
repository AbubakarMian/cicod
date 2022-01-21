/* eslint-disable prettier/prettier */
import {
  IS_FETCHING_PRODUCTS_CATEGORY,
  IS_PRODUCT_CATEGORY_SUBMITTING,
  PRODUCT_CATEGORY_CREATED,
  PRODUCT_CATEGORY_CREATED_ERROR,
  PRODUCT_CATEGORY_FETCHED,
  PRODUCT_CATEGORY_FETCHED_MORE,
  PRODUCT_CATEGORY_UPDATED,
} from '../constants';
const initialState = {
  data: [],
  dropDown: [],
  totalPageCount: 0,
  isFetchingProducts: false,
  isSubmitting: false,
  error: '',
};
const product_categories_reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_PRODUCTS_CATEGORY:
      return {
        ...state,
        isFetchingProducts: true,
      };
    case PRODUCT_CATEGORY_FETCHED:
      console.log('cart3@@##$$$', action);
      let catArr = action.payload.data.map((x, key) => {
        return {label: x.name, value: x.id};
      });
      return {
        ...state,
        isFetchingProducts: false,
        data: action.payload.data,
        dropDown: catArr,
        totalPageCount: action.payload.totalPageCount,
      };

    case PRODUCT_CATEGORY_FETCHED_MORE:
      console.log('merhere@@##$$$', action);
      return {
        ...state,
        isFetchingProducts: false,
        data: [...state.data, ...action.payload.data],
        totalPageCount: action.payload.totalPageCount,
      };

    case IS_PRODUCT_CATEGORY_SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
      };

    case PRODUCT_CATEGORY_CREATED_ERROR:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };

    case PRODUCT_CATEGORY_CREATED:
      console.log('merhere@@##$$$', action);
      return {
        ...state,
        isSubmitting: false,
        data: [action.value, ...state.data],
        dropDown: [action.value, ...state.dropDown],
      };

    case PRODUCT_CATEGORY_UPDATED:
      console.log('merhere@@##$40$$', action);
      let newProducts = [];
      for (let index = 0; index < state.data.length - 1; index++) {
        let element = state.data[index];
        if (element.id == action.value.id) {
          element = action.value;
        }
        newProducts.push(element);
      }

       catArr =newProducts.map((x, key) => {
        return {label: x.name, value: x.id};
      });

      console.log('testnew#$', newProducts);

      return {
        ...state,
        isSubmitting: false,
        data: newProducts,
        dropDown:catArr
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

export default product_categories_reducer;
