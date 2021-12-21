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
import styles from '../css/PayByCashCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
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
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class PayByCash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      order_detail: null,
      payment_link: null,
      order_id: 0,
      amount_returned: '',
      amount: 0,
      cashCollected: '',
      spinner: false,
    };
  }
  componentDidMount() {
    // this.get_order_detail();
  }

  get_order_detail() {
    this.setState({spinner: true});
    let order_id = this.state.data.id;

    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };

    // let order_id = this.props.route.params.data.id;
    let url = Constants.orderslist + '/' + order_id;
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
          responseJson.status,
        );
        console.log(
          'order response pay by cashresponse Json responseJson responseJson!!!!!!!!!!!',
          responseJson,
        );
        this.setState({spinner: false});
        if (
          responseJson.status == 'success' ||
          responseJson.status == 'SUCCESS'
        ) {
          let data = responseJson.data;
          data.payment_status = 'success';
          data.order_id = order_id;
          this.props.navigation.navigate('PaymentSuccess', {
            data: responseJson.data,
            order_id: responseJson.data.id,
          });

          // this.props.navigation.navigate('OrderDetail', { id: this.responseJson.data.id ,data:responseJson.data})
          // let payment_link = responseJson.data.payment_link
          // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
        } else {
          this.setState({spinner: false});
          let message = responseJson.message;
          console.log('some error', responseJson);
        }
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }
  async makePaymentFun(payment_mode) {
    if (await this.state.spinner) {
      return;
    }
    await this.setState({spinner: true});
    // this.get_order_detail();
    let bodyOrder = this.props.route.params.bodyOrder;
    // console.log("@@@@@@@@@@@!!!!!!!!!!!~~~~~~~~~~",bodyOrder)
    // bodyOrder.payment_mode = payment_mode;
    // console.log("$$$$$$$$$$$$$$$$$$$",bodyOrder.payment_mode)

    let postData =this.props.route.params.new_order?{
      method:'POST', // POST
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
     body: JSON.stringify(bodyOrder)
    
    } : {
      method: "GET", // POST
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    
    };
    // let order_id = this.props.route.params.order_id;

    // let url =
    //   Constants.orderslist + '/' + order_id + '?action=make_cash_payment';
    // console.log('*****************#########33333333333', url);
    console.log(this.props.user);
    // console.log("*****************#########33333333333",Constants.orderslist+'/'+order_id+'?action=make_cash_payment')
    // console.log('222222222222 makePaymentFun body params list @@@@@@!!!!!!!!!!!!!!', postData);

    fetch(this.props.route.params.new_order?Constants.orderslist: Constants.orderslist + '/' + this.props.route.params.order_id + '?action=make_cash_payment', postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        console.log('**************all response  ', responseJson);
        if (responseJson.status === 'success' ||
        responseJson.status == 'SUCCESS') {
          console.log(
            '&&&&&&&&&&&&&&&&&&&&& responseJson.data',
            responseJson.data,
          );

          Alert.alert("Success","Cash Payment Successfull",[{
            text:"Ok",
            onPress:()=>{
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }
          }])


          
            // this.props.navigation.navigate('PaymentSuccess', {
            //   data: responseJson.data,
            //   order_id: responseJson.data.id,
            // });
          

          
          // this.setState({data:responseJson.data})
          // this.get_order_detail();
          // this.props.navigation.navigate('PaymentSuccess', { data:responseJson.status})
          // this.get_order_detail(responseJson.data.id);
          // let payment_link = responseJson.data.payment_link
          // this.payment_response(responseJson, 'PaymentWeb', { payment_link: payment_link, data: responseJson.data });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log('Api call error', error);
      });
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  async amountRecieved(recieved, actual) {
    let amount_returned = recieved - actual;
    console.log('recieved', recieved);
    if (
      recieved == '' ||
      recieved.split('.').length > 2 ||
      recieved.includes(',') ||
      recieved.includes('-') ||
      recieved.includes(' ') ||
      recieved.includes('..')
    ) {
      recieved = '';
      amount_returned = '';
    }

    await this.setState({
      cashCollected: recieved,
      amount_returned: amount_returned + '',
    });
  }

  getChange() {
    if (this.state.amount_returned == 'NaN') {
      this.setState({
        amount_returned: '0',
      });
      return '0';
    }
    if (this.state.amount_returned < 0) {
      return '0';
    }
    return this.state.amount_returned;
  }

  press_done(order) {
    let cashCollected = parseFloat(this.state.cashCollected);
    console.log('###########!~~~~~~~~~~', cashCollected);
    console.log('cashCollected) < 0 ', cashCollected < order.amount);
    console.log("this.getChange() == ''", this.getChange() == '');
    console.log("cashCollected == ''", cashCollected);
    if (this.state.cashCollected == '' || cashCollected < order.amount) {
      Alert.alert('Alert', 'Insufficient Cash Collection');
      return;
    }

    // console.log('~~~~~~~~~~~~~~~', this.props.route.params.data);
    // if(this.props.route.params.pending_order_res != undefined){
    // console.log('in if this.props.route.params.data.id',this.props.route.params.pending_order_res.data.id)
    // this.props.navigation.navigate('PaymentSuccess',{data:this.props.route.params.pending_order_res.data})
    // return;
    
    // }


    this.makePaymentFun(this.props.route.params.payment_mode);
    // console.log('EEEEEEEEEEEEEE', this.props.route.params.data.id);
    // let order_id = this.props.route.params.data.id;
    // console.log(order_id);
    // this.props.navigation.navigate('PaymentSuccess',{data:this.props.route.params.data,order_id})
    return;
    // this.makePaymentFun(this.props.route.params.payment_mode);
  }
  payByCash(props) {
    let _that = props._that;
    let params = _that.props.route.params;
    console.log('params', params);
    let order_detail = {
      amount: params.amount_payable,
    };
    console.log('order_detail', order_detail);
    order_detail = order_detail;
    return (
      <View>
        <ScrollView>
          <View style={[{}, styles.contentContainer]}>
            <Image source={require('../images/payByCash.png')} />
            <Text style={[{}, styles.collectText]}>Collect the sum of</Text>
            <Text style={[{}, styles.payText]}>
              {_that.props.currency.currency + ' ' + order_detail.amount}
            </Text>
            <Text style={[{}, styles.cashText]}>in cash</Text>
          </View>
          <View style={[{}, styles.inputContainer]}>
            <View style={[{}, styles.inputView]}>
              <TextInput
                label={'Cash Collected (' + _that.props.currency.currency + ')'}
                style={{backgroundColor: 'transparent'}}
                width={width - 50}
                alignSelf={'center'}
                color={'#000'}
                keyboardType={'numeric'}
                onChangeText={recieved =>
                  _that.amountRecieved(recieved, order_detail.amount)
                }
                value={_that.state.cashCollected}
              />
            </View>
            <View style={[{}, styles.inputView]}>
              <TextInput
                label={'Change (' + _that.props.currency.currency + ')'}
                style={{backgroundColor: 'transparent'}}
                width={width - 50}
                alignSelf={'center'}
                // color={'red'}
                editable={false}
                // keyboardType={'numeric'}
                value={_that.getChange() > 0 ? _that.getChange() : ''}
              />
            </View>
            <TouchableOpacity
              style={[{}, styles.touchView]}
              onPress={() => _that.press_done(order_detail)}>
              <Text style={[{}, styles.touchText]}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <View style={[{}, styles.backHeaderRowView]}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="#929497" />
            </TouchableOpacity>
            <View style={[{}, styles.backHeadingView]}>
              <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
            </View>
          </View>
          <this.payByCash _that={this} />
        </View>
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
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    emptyOrder: () => dispatch({type: CLEAR_ORDER}),
    cartReducer: value => dispatch({type: ADD_TO_PRODUCT, value: value}),
    removeFromCart: value => dispatch({type: REMOVE_FROM_CART, value: value}),
    removeProductFromCart: value =>
      dispatch({type: REMOVE_PRODUCT_FORM_CART, value: value}),
    setDeliveryAddress: value =>
      dispatch({type: SET_DELIVERY_ADDRESS, value: value}),
    setCustomer: value => dispatch({type: SET_CUSTOMER, value: value}),
    setSupplier: value => dispatch({type: SET_SUPPLIER, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PayByCash);
