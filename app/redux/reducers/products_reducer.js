import {
  
  IS_FETCHING_PRODUCTS,
  PRODUCT_FETCHED,
  PRODUCT_FETCHED_MORE
} from '../constants';
const initialState = {
  data: [],
  totalPageCount: 0,
  isFetchingProducts: false,
};
const products_reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_PRODUCTS:
      return {
        ...state,
        isFetchingProducts: true,
      };
    case PRODUCT_FETCHED:
      console.log('jo@@##$$$', action);
      return {
        ...state,
        isFetchingProducts: false,
        data: action.payload.data,
        totalPageCount: action.payload.totalPageCount,
      };

      case PRODUCT_FETCHED_MORE:
        console.log('merhere@@##$$$', action);
        return {
          ...state,
          isFetchingProducts: false,
          data: [...state.data, ...action.payload.data],
          totalPageCount: action.payload.totalPageCount,
        };

      break;
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
