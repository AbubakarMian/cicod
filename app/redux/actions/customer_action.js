/* eslint-disable prettier/prettier */
import {getAsyncData} from '../../helpers';
import {
  IS_FETCHING_PRODUCTS,
  PRODUCT_FETCHED,
  IS_FETCHING_PRODUCTS_ERROR,
  PRODUCT_FETCHED_MORE,
  IS_PRODUCT_SUBMITTING,
  PRODUCT_CREATED_ERROR,
  PRODUCT_CREATED,
  PRODUCT_UPDATED,
  IS_FETCHING_CUSTOMER,
  CUSTOMER_FETCHED_MORE,
  CUSTOMER_FETCHED,
  FETCHING_CUSTOMER_ERROR,
} from '../constants';




export const getCustomers = (url, isLoadMore = false, next,failed) => {
    console.log('me###uelr', url, isLoadMore);
    return async dispatch => {
      dispatch({
        type: IS_FETCHING_CUSTOMER,
      });
  
      try {
        const {access_token} = await getAsyncData();
        console.log('foie#$##', access_token);
  
        let postData = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: access_token,
          },
        };
  
        fetch(url, postData)
          .then(response => response.json())
          .then(async responseJson => {
            console.log(
              '~~~~~~~~~~~~~~~~~~responseJson.responseJson responseJson responseJson @@@@@@@',
              responseJson,
            );
            // console.log('responseJson.postData', postData);
  
            if (
              responseJson.status === 'success' ||
              responseJson.success === true
            ) {
              dispatch({
                type: isLoadMore ? CUSTOMER_FETCHED_MORE : CUSTOMER_FETCHED,
                payload: {
                  data: responseJson.data,
                  totalPageCount: responseJson.pages,
                },
              });
            } else if (responseJson.status == 401) {
              next();
            } else {
              let message = responseJson.message;
              // Alert.alert('Error', message);
            }
          })
          .catch(error => {
            console.log('error', error);
            failed();
            dispatch({
              type: FETCHING_CUSTOMER_ERROR,
              payload: error.message,
            });
          });
      } catch (error) {
          console.log("r$$ero",error)
      }
    };
  };