/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Touchable,
  ScrollView,
} from 'react-native';
import {Text, TextInput, Alert} from 'react-native-paper';
import styles from '../css/MoreCss';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';
import {Constants} from '../views/Constant';
import {
  SET_USER,
  LOGOUT_USER,
  CLEAR_ORDER_CHAIN,
  RESET,
  RESET_DELIVERY,
  REMOVE_DELIVERY_FEE_TO_COST,
  CLEAR_CART,
} from '../redux/constants/index';
import {event} from 'react-native-reanimated';

var {width, height} = Dimensions.get('window');

class PaymentWeb extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      order_id: 0,
      timer: 3,
      server_url: 'https://com.cicodsaasstaging.com/webshop/payment',
      order: null,
      part_payment_status: '',
      interval_id: 0,
    };
  }

  async check(order) {
    //  while(this._isMounted){
    this.get_order_detail(); //return;
    console.log('timer while', this.state.order);
    // let a = await this.performTimeConsumingTask();
    if (this.state.order != null) {
      console.log('payment order if');
      console.log('order.payment_status', order.payment_status);

      if (
        order.payment_status == 'PAID' ||
        order.payment_status == this.state.part_payment_status ||
        order.payment_status == 'cancelled'
      ) {
        // if(order.payment_status != 'PENDING' || this.state.order.payment_status == 'cancelled'){
        this._isMounted = false;
        // this.props.navigation.navigate('Order');
        // this.props.navigation.navigate('OrderDetail', { id:this.state.order_id })

        try {
          // setInterval(() => {
          this.props.navigation.navigate('PaymentSuccess', {
            data: this.state.order,
          });
          // }, 50000);
        } catch (error) {
          console.log('interval error', error);
        }

        // break;
      }
    }
    //  if(this.timer > 1000){
    //     this._isMounted = false;
    // }
    // let t = this.state.timer + 3
    // this.setState({
    //     timer:t
    // })
    //  }
    return;
  }

  performTimeConsumingTask = async () => {
    let time = this.state.timer * 1000;
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, time),
    );
  };

  async get_order_detail() {
    //  console.log(' webthis.props.route.params.data web',this.props.route.params)
    //  return
    let order_id = this.props.route.params.data.id;
    if (this.state.order_id != order_id) {
      this.setState({
        order_id: order_id,
      });
    }

    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };

    let url = Constants.orderslist + '/' + order_id;
    console.log(
      '---- body params list @@@@@@!!!!!!!!!!!!!!',
      this.props.route.params,
    );
    console.log('*****************order url detail ', url);
    console.log('order postData ', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          'order response response Json responseJson responseJson!!!!!!!!!!!',
          responseJson,
        );

        if (responseJson.status.toUpperCase() === 'SUCCESS') {
          let data = responseJson.data;
          if (this.state.order == null) {
            let check_status = 'PART PAYMENT';
            if (data.payment_status == 'PART PAYMENT') {
              check_status = '';
            }
            this.setState({
              order: data,
              part_payment_status: check_status,
            });
          }
          // return data
          else if (data.payment_status != this.state.order.payment_status) {
            clearInterval(this.state.interval_id);
            this.setState({
              order: data,
            });
            this.check(data);
          }
        } else {
          // this.setState({ spinner: false })
          let message = responseJson.message;
          console.log('some error', responseJson);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }
  async componentWillUnmount() {
    clearInterval(this.state.interval_id);
    this._isMounted = false;
    console.log('componentWillUnmount');
  }

  componentDidMount() {
    this.props.emptyOrder();
    this.props.removeDeliveryCost();
    // this.props.removeDeliveryCost
  }
  render() {
    // if(this.state.order_id != this.props.route.params.data.id){
    //     console.log('AAAAAAAAAAAAAA',this.state.order_id)
    //     console.log('BBBBBBBBBBBBBB',this.props.route.params.data.id)
    //     this.setState({
    //         order_id:this.props.route.params.data.id
    //     })
    //     let interval_id = setInterval(() => {
    //         this.get_order_detail();
    //         // this.props.navigation.navigate('PaymentSuccess', { data:this.state.order})
    //     }, 3000);
    //     this.setState({
    //         interval_id:interval_id
    //     })
    // }
    console.log('AAAAAAAAAAAAAA', this.state.order_id);
    console.log('BBBBBBBBBBBBBB', this.props.route.params.data);
    console.log(
      '*************',
      Constants.orderslist + '/' + this.state.order_id,
    );
    // this.check();
    console.log(
      'payment web rrrrrrrrrrrrrrrrr',
      this.props.route.params.payment_link,
    );
    return (
      <>
        <Spinner visible={this.state.spinner} />
        <WebView
          onLoadStart={() => {}}
          onLoadEnd={() => {
            this.setState({spinner: false});
          }}
          onNavigationStateChange={({url, canGoBack}) => {
            if (
              this.state.server_url +
                '?paymentStatus=success&orderId=' +
                this.props.route.params.data.cicod_order_id ==
                url ||
              this.state.server_url +
                '?paymentStatus=success&orderId=' +
                this.props.route.params.data.order_id ==
                url
            ) {
              //success
              console.log('successs');
              if (this.props.route.params.heading == 'supplier') {
                //if supplier
                this.props.navigation.replace('PaymentSuccess', {
                  heading: 'supplier',
                  seller_id: this.props.route.params.seller_id,
                  order_id:
                    this.props.route.params.data.cicod_order_id ||
                    this.props.route.params.data.order_id,
                });
              } else {
                this.props.navigation.replace('PaymentSuccess', {
                  heading: 'buyer',
                  order_id: this.props.route.params.data.id,
                });
              }
            } else if (
              this.state.server_url +
                '?paymentStatus=fail&orderId=' +
                this.props.route.params.data.cicod_order_id ==
                url ||
              this.state.server_url +
                '?paymentStatus=fail&orderId=' +
                this.props.route.params.data.order_id ==
                url
            ) {
              if (this.props.route.params.heading == 'supplier') {
                this.props.navigation.replace('OrderDetailValueChain', {
                  order_id: this.props.route.params.data.cicod_order_id,
                  seller_Id: this.props.route.params.seller_id,
                  heading: 'SUPPLIERS',
                });
              } else {
                this.props.navigation.replace('OrderDetail', {
                  id: this.props.route.params.data.id,
                });
              }
              //failed
            } else {
              let explodeArr = [];
              explodeArr = url.split('?');
              console.log('ecff13', explodeArr);
              if (explodeArr.length > 1) {
                if (explodeArr[1].includes('cancelled')) {
                  console.log('cancelld');
                  if (this.props.route.params.heading == 'supplier') {
                    this.props.navigation.replace('OrderDetailValueChain', {
                      order_id: this.props.route.params.data.cicod_order_id,
                      seller_Id: this.props.route.params.seller_id,
                      heading: 'SUPPLIERS',
                    });
                  } else {
                    this.props.navigation.replace('OrderDetail_pending', {
                      id: this.props.route.params.data.id,
                    });
                  }
                }
                //_that.props.route.params.heading=="supplier"?_that.props.navigation.navigate('OrderDetailValueChain', { order_id:_that.props.route.params.order_id,seller_Id:_that.props.route.params.seller_id,heading:"SUPPLIERS" }):_that.props.navigation.navigate('OrderDetail', { id:order.id })
              }
              // this.props.navigation.goBack()
              console.log('noting');
              // if (this.props.route.params.heading=="supplier") {
              //     //if supplier
              //     this.props.navigation.navigate('PaymentSuccess', { heading:"supplier",seller_id:this.props.route.params.seller_id, order_id:this.props.route.params.data.cicod_order_id||this.props.route.params.data.order_id})

              // } else {
              //     this.props.navigation.navigate('PaymentSuccess', { heading:"buyer", order_id:this.props.route.params.data.id})

              // }
            }
            console.log('#@@@$$###Onnaoff', url);
          }}
          source={{uri: this.props.route.params.payment_link}}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    clearCart: () => dispatch({type: CLEAR_CART}),
    removeDeliveryCost: () => dispatch({type: REMOVE_DELIVERY_FEE_TO_COST}),
    resetDelivery: () => dispatch({type: RESET_DELIVERY}),
    resetDeliveryAddress: () => dispatch({type: RESET}),
    emptyOrder: () => dispatch({type: CLEAR_ORDER_CHAIN}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWeb);
