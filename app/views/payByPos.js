/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/PayByPosCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import Scaffold from './Components/Scaffold';
import {CLEAR_ORDER, SET_USER} from '../redux/constants';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class PayByPOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_detail: null,
      payment_link: null,
      order_id: this.props.route.params.order_id ?? 0,
    };
  }

  press_confirm() {
  
    if (this.props.route.params.heading == 'supplier') {
      this.props.navigation.navigate('OrderDetailValueChain', {
        order_id: this.props.route.params.order_id,
        seller_Id: this.props.route.params.seller_id,
        heading: 'SUPPLIERS',
      });
    } else {
      this.props.navigation.navigate('OrderDetail', {id: this.state.order_id});
    }
    // let payment_link = this.state.payment_link;

    // console.log('param',this.props.route.params.payment_link);
    // if (this.props.route.params.payment_link == null) {
    //     Alert.alert('payment error','Payment link not found')
    // }
    // else {
    //    this.props.navigation.navigate('OrderDetail',{id:this.state.order_id})

    //     // this.props.navigation.navigate('PaymentWeb', { payment_link: this.props.route.params.payment_link,data:this.state.order_detail });
    // }
  }

  get_order_detail() {
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log('~~~~~~~~~~~~~~~', this.props.route.params);
    let order_id = this.props.route.params.order_id;
    console.log('%%%%%%%%%%%%', order_id);
    const url =
      this.props.route.params.heading == 'supplier'
        ? `
        ${Constants.viewSellerOrder}?id=${this.props.route.params.seller_id}&orderId=${this.props.route.params.data.cicod_order_id}&expand=customer,customerOrderItems`
        : Constants.orderslist + '/' + order_id;

    //let url = Constants.orderslist + '/' + order_id
    console.log(
      '---- body params list @@@@@@!!!!!!!!!!!!!!',
      this.props.route.params,
    );
    console.log('order url detail ', url);
    console.log('order postData ', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(
          'order response response Json responseJson responseJson!!!!!!!!!!!',
          responseJson,
        );
        if (responseJson.status === 'success' || responseJson.success) {
          let data = responseJson.data;
          this.setState({
            spinner: false,
            order_detail: data,
            order_id: this.props.route.params.order_id,
          });
          // let payment_link = responseJson.data.payment_link
          // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
        } else {
          this.setState({spinner: false});
          let message = responseJson.message;
          console.log('some error', responseJson);
        }
      });
    // .catch((error) => {
    //     // this.setState({ spinner: false })
    //     console.log("Api call error", error);
    //     // Alert.alert("Error","Oops!!! Error in server");
    // });
  }

  pay(_that) {
    _that = _that._that;
    let params = _that.props.route.params;
    let amount_payable = params.amount_payable;
    let order = {};
    console.log('_that.state.order_detail', _that.state.order_detail);
    console.log('params.order_id', params.order_id);
    console.log('_that.state.order_id', _that.state.order_id);
    if (
      _that.state.order_detail == null ||
      params.order_id != _that.state.order_id
    ) {
      order = _that.get_order_detail();
      return null;
    }
    order = _that.state.order_detail;
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={_that.props.navigation} />
        <View style={[{}, styles.backHeaderRowView]}>
          <TouchableOpacity onPress={() => _that.props.navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="#929497" />
          </TouchableOpacity>
          <View style={[{}, styles.backHeadingView]}>
            <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
          </View>
        </View>
        <View>
          <ScrollView>
            <View style={[{}, styles.contentContainer]}>
              <Text style={{fontSize:10,alignSelf:"center",paddingHorizontal:10,marginBottom:10}}>
              if you have a CICOD Enabled payment card device (POS), enter the CICOD order ID and click confirm after a successful payment.
                </Text>
              <Image
                style={{height: 60, width: 40}}
                source={require('../images/pos-terminal.png')}
              />
              <Text style={[{}, styles.collectText]}>Collect the sum of</Text>
              <Text style={[{}, styles.payText]}>
                {_that.props.currency.currency + ' ' + amount_payable}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[{}, styles.cashText]}>for CICOD ORDER ID </Text>
                <Text style={[{fontWeight: 'bold'}, styles.cashText]}>
                  {' '}
                  {order.cicod_order_id}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[{backgroundColor: '#E6E6E6'}, styles.touchView]}
                  onPress={() => _that.props.navigation.goBack()}>
                  <Text style={{color: '#4E4D4D'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => _that.press_confirm()}
                  style={[{backgroundColor: '#B1272C'}, styles.touchView]}>
                  <Text style={{color: '#fff'}}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Scaffold>
        <this.pay _that={this} />
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    customer: state.customReducer,
    cart: state.cartReducer,
    notes: state.orderNotesReducer,
    deliveryAddress: state.deliveryAddressReducer,
    orderDiscountReducer: state.orderDiscountReducer,
    supplier: state.supplierReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PayByPOS);
