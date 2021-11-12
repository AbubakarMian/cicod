import React from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Touchable,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/OrderDetailCss';
import fontStyles from '../css/FontCss';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import NavBack from './Components/NavBack';
import {
  SET_USER,
  LOGOUT_USER,
  FORMAT_CURRENCY,
  SET_CURRENCY,
} from '../redux/constants/index';
import {Constants} from './Constant';
// import NumberFormat from 'react-number-format';
import {} from '../redux/reducers/currencyReducer';
import OrderDetailSection from './Components/Order/OrderDetailSection';
var {width, height} = Dimensions.get('window');

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      Spinner: false,
      order_id: 0,
      currency: '₦',
      selectedStartDate: null,
      calenderModal: false,
      cicod_order_id: '',
      delivery_type: '',
      delivery_amount: 0,
      payment_mode: '',
      order_status: '',
      payment_status: '',
      ticket_id: '',
      created_by: '',
      payment_date: '',
      pending_order_res: {},
      total_amount: 0,

      amount_paid_from_credit_limit: '',
      bodyOrder: {},
      data: {
        customer: {
          // name: '',
          // phone: '',
          // address: '',
          // email: '',
        },
      },
      item: [],
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    if (this.props.route.params.from == null) {
      this.props.navigation.replace('Home');
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  }
  componentDidMount() {
    this.get_order_detail();
  }

  pay = () => {
    let bodyOrder = this.state.bodyOrder;
    let payment_mode = bodyOrder.payment_mode;
    let amount_payable = 0;

    // console.log('CCCCCCCCCCCCCCCC',this.state.pending_order_res.data.balance_part_payment[0])
    // return;
    // if(this.state.pending_order_res.data.balance_part_payment.length == 0 ){
    //     amount_payable = this.state.bodyOrder.amount; // amount_payable not available,bodyOrder.amount
    // }
    // else{
    //     amount_payable = this.state.pending_order_res.data.balance_part_payment[0].amount; // amount_payable not available,bodyOrder.amount
    // }
    //let order_id = order_id; // this.props.route.params.id
    console.log('#$$getr', this.props.route.params.seller);
    this.props.navigation.replace('MakePayment', {
      heading: 'supplier',
      item: this.props.route.params.seller,
      bodyOrder,
      payment_mode,
      amount_payable: this.state.bodyOrder.amount,
      pending_order_res: this.state.pending_order_res,
    });
  };
  get_order_detail() {
    let url;
    let order_id;
    // if (this.props.route.params.heading == "SUPPLIERS") {
    //
    order_id = this.props.route.params.order_id;
    url = `${Constants.viewSellerOrder}?id=${this.props.route.params.seller_Id}&orderId=${order_id}&&expand=customer,customerOrderItems`;
    // }else{
    //     order_id=this.props.route.params.id
    //     url=Constants.orderslist + '/' + order_id
    // }
    console.log('newurl@', url);
    this.setState({Spinner: true, order_id: order_id});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          Spinner: false,
        });
        console.log(
          '~~~~~~~~~~@@@@....@@@@@@@@@@@@@data data data res res res ',
          Constants.orderslist + '/' + order_id,
          responseJson.data,
        );
        if (responseJson.status === 'success' || responseJson.success) {
          if (responseJson.message == 'Order not found') {
            // this.props.navigation.goBack();
            Alert.alert('Message', responseJson.message);
            return;
          }

          this.setState({
            data: responseJson.data,
            total_amount: responseJson.data.amount,
            item: responseJson.data.customerOrderItems,
            payment_mode: responseJson.data.payment_mode,
            order_status: responseJson.data.order_status,
            payment_status: responseJson.data.payment_status,
            currency: responseJson.data.currency,
            pending_order_res: responseJson,
            delivery_amount: responseJson.data.delivery_amount,
            delivery_type: responseJson.data.delivery_type,
            bodyOrder: {
              customer_name: responseJson.data.customer.customer_name,
              customer_phone: responseJson.data.customer.customer_phone, //this.state.customer_phone,//required
              customer_email: responseJson.data.customer.customer_email, //this.state.customer_email,
              products: responseJson.data.customer.customerOrderItems, //[]
              delivery_type: responseJson.data.delivery_type, //dilevery_type,?? 'PICKUP'
              delivery_address:
                responseJson.data.customer.customer_address ?? '',
              payment_mode: responseJson.data.payment_mode, //required
              amount: responseJson.data.amount, //required
              country_id: responseJson.data.customer.country_id,
              state_id: responseJson.data.customer.state_id,
              lga_id: responseJson.data.customer.lga_id,
              note: responseJson.data.note ?? '',
              // discount_amount: responseJson.data.discount_amount,
              // discount_percent: responseJson.data.discount_percent,
              accept_multiple_part_payment: responseJson.data.is_part_payment,
            },
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  ReciptResend() {
    //https://com.cicodsaasstaging.com/com/api/orders/957?action=send_receipt
    this.setState({Spinner: true});
    console.log('rrrrrrrrrrrrr', this.props.route.params.id);
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    let reciptUrl;
    if (this.props.route.params.heading == 'SUPPLIERS') {
      //
      //order_id=this.props.route.params.order_id;
      reciptUrl = `${Constants.viewSellerOrder}?id=${this.props.route.params.seller_Id}&orderId=${this.state.order_id}&&expand=customer,customerOrderItems`;
    } else {
      // order_id=this.props.route.params.id
      reciptUrl = Constants.orderslist + '/' + this.state.order_id;
    }

    fetch(reciptUrl, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          Spinner: false,
        });
        console.log('data data data res res res ', responseJson);
        if (responseJson.status === 'success') {
          console.log('data data data res res res ', responseJson);
          Alert.alert('Success', responseJson.message);
          // this.props.navigation.navigate('DrawerNavigation')
        } else {
          // let message = JSON.stringify(responseJson.error.message)
          Alert.alert('Error', responseJson.message);
        }
      });
  }
  render() {
    // if (this.state.order_id != this.props.route.params.id){
    //         this.get_order_detail(this.props.route.params.id)
    // }
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.Spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <View
            style={{
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <NavBack
              title="ORDER DETAIL"
              onClick={() =>
                this.props.route.params.from == null
                  ? this.props.navigation.navigate('Supplier')
                  : this.props.navigation.goBack()
              }
            />
          </View>

          <ScrollView>
            <OrderDetailSection
              delivery_type={this.state.delivery_type}
              delivery_amount={this.state.delivery_amount}
              pay={this.pay}
              total_amount={this.state.total_amount}
              currency={this.state.currency}
              data={this.state.item}
              amount_paid_from_credit_limit={
                this.state.data.amount_paid_from_credit_limit
              }
              delivery_address={this.state.data.delivery_address}
              ticket_id={this.state.data.ticket_id}
              payment_status={this.state.data.payment_status}
              order_status={this.state.order_status}
              payment_mode={this.state.payment_mode}
              customer_email={this.state.data.customer.customer_email}
              customer_address={this.state.data.customer.customer_address}
              customer_phone={this.state.data.customer.customer_phone}
              order_id={this.state.data.order_id}
              resendRecipt={this.ReciptResend}
              customer_name={this.state.data.customer.customer_name}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setCurrency: value => dispatch({type: SET_CURRENCY, value: value}),
    formateCurrency: value => dispatch({type: FORMAT_CURRENCY, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
