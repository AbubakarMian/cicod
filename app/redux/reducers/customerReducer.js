/* eslint-disable prettier/prettier */
import {
  CUSTOMER_CREATED,
  CUSTOMER_FETCHED,
  CUSTOMER_FETCHED_MORE,
  CUSTOMER_UPDATED,
  FETCHING_CUSTOMER_ERROR,
  IS_FETCHING_CUSTOMER,
  RESET,
  RESET_DELIVERY,
  SET_CUSTOMER,
} from '../constants';
const initialState = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  country: '',
  state: '',
  lga: '',
  address: '',
  detail: null,
  data: [],
  isFetching: false,
  isSubmitting: false,
  totalPageCount: 0,
};
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER:
      return {
        ...state,
        id: action.value.customer_id,
        name: action.value.customer_name,
        email: action.value.customer_email,
        phone: action.value.customer_phone,
        country: action.value.customer_country,
        state: action.value.customer_state,
        lga: action.value.customer_lga,
        address: action.value.customer_address,
        detail: action.value.detail,
      };

    case RESET_DELIVERY:
      return {
        ...state,
        id: 0,
        name: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        lga: '',
        address: '',
      };
    case IS_FETCHING_CUSTOMER:
      return {
        ...state,
        isFetching: true,
        error: '',
      };

    case CUSTOMER_FETCHED:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        totalPageCount: action.payload.totalPageCount,
      };

    case CUSTOMER_FETCHED_MORE:
      console.log('merhere@@##$$$', action);
      return {
        ...state,
        isFetching: false,
        data: [...state.data, ...action.payload.data],
        totalPageCount: action.payload.totalPageCount,
      };

      case CUSTOMER_CREATED:
        console.log('merhere@@##$$$', action);
        return {
          ...state,
          isSubmitting: false,
          data: [action.value, ...state.data],
        };


        case CUSTOMER_UPDATED:
        console.log('merhere@@##$40$$', action);
        let newCustomers=[];
for (let index = 0; index < state.data.length-1; index++) {
  let element = state.data[index];
  if (element.id==action.value.id) {
    element=action.value;
  }
newCustomers.push(element)

  
}

console.log("testnew#$",newCustomers)

        return {
          ...state,
          isSubmitting: false,
          data: newCustomers,
        };

    case FETCHING_CUSTOMER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default customerReducer;
