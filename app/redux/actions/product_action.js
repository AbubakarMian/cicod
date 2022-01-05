import {getAsyncData} from '../../helpers';
import {
  IS_FETCHING_PRODUCTS,
  PRODUCT_FETCHED,
  PRODUCT_FETCHED_MORE,
  IS_PRODUCT_SUBMITTING
} from '../constants';

export const getProducts = (url, isLoadMore = false, next) => {
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
          } else if (responseJson.status == 401) {
            next();
            this.unauthorizedLogout();
          } else {
            let message = responseJson.message;
            // Alert.alert('Error', message);
          }
        })
        .catch(error => {
          console.log('error', error);
          dispatch({
            type: IS_FETCHING_PRODUCTS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {}
  };
};


export const createORUpdateProduct=(url,type,postData)=>{
    return async dispatch => {

        dispatch({
            type:IS_PRODUCT_SUBMITTING
        })
    fetch(url, postData)
    .then(response => response.json())
    .then(async responseJson => {
      
      if (responseJson.status === 'success') {
        
      
        if (type == 'create') {
         dispatch({
type:PRODUCT_CREATED,
data
         })
          
        } else {
          Alert.alert('SUCCESS', "Product Updated Successfully!",[
            {
              text:"OK",
              onPress:()=>{
                if (this.props.route.params.heading=="BUYERS") {
                  this.props.navigation.navigate('BuyersProducts', {items:this.props.route.params.items,heading:this.props.route.params.heading})
                } else {
                this.props.navigation.navigate('Products', {seller_id: 1})
                  
                }

              }
            }
          ]);
          // this.props.navigation.navigate('Products', {seller_id: 0});
          //this.props.navigation.goBack();
        }
      } else if (responseJson.status == 401) {
        this.unauthorizedLogout();
      } else {
        let message = responseJson.message;
        console.log('Error send req', responseJson);
        Alert.alert('Error', message);
      }
    })
    .catch(error => {
      this.setState({spinner: false});
      console.log('Api call error', error);
    });
}
}
