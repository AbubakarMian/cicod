/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */

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
} from '../constants';

export const getProducts = (url, isLoadMore = false, next=f=>f,failed=f=>f,updateFromCart=f=>f) => {
  console.log('me###uelr', url, isLoadMore);
  return async dispatch => {
    dispatch({
      type: IS_FETCHING_PRODUCTS,
    });

    try {
      const {access_token} = await getAsyncData();
      console.log('accessTokedn##', access_token);

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
              type: isLoadMore ? PRODUCT_FETCHED_MORE : PRODUCT_FETCHED,
              payload: {
                data: responseJson.data,
                totalPageCount: responseJson.pages,
              },
            });
            next()
          } else if (responseJson.status == 401) {
            dispatch({
              type: IS_FETCHING_PRODUCTS_ERROR,
              payload: "LOGOUT",
            });
            next();
          } else {
            let message = responseJson.message;
            console.log("eror#@",responseJson)
            dispatch({
              type: IS_FETCHING_PRODUCTS_ERROR,
              payload: message,
            });
            next()
            // Alert.alert('Error', message);
          }
        })
        .catch(error => {
          console.log('error@er#', error);
          dispatch({
            type: IS_FETCHING_PRODUCTS_ERROR,
            payload: error.message,
          });
          failed()
        });
    } catch (error) {}
  };
};

export const createORUpdateProduct = (url,body, type,next) => {
  return async dispatch => {
    dispatch({
      type: IS_PRODUCT_SUBMITTING,
    });

    const {access_token} = await getAsyncData();
    console.log('accessTokedn##', access_token);
    let postData = {
      method: type == 'create' ? 'POST' : 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: access_token,
      },
      body:body
    };

    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('create$#', responseJson);
        if (responseJson.status === 'success') {
          if (type == 'create') {
            dispatch({
              type: PRODUCT_CREATED,
              payload: responseJson.data.product,
            });
          } else {
            dispatch({
              type: PRODUCT_UPDATED,
              payload: responseJson.data.product,
            });
            // this.props.navigation.navigate('Products', {seller_id: 0});
            //this.props.navigation.goBack();
          }
          next();
        } else if (responseJson.status == 401) {
          // this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          dispatch({
            type: PRODUCT_CREATED_ERROR,
            payload: message,
          });
        }
      })
      .catch(error => {
        console.log('server ror', error);
        dispatch({
          type: PRODUCT_CREATED_ERROR,
          payload: 'error',
        });
      });
  };
};
