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
import {
  SET_USER,
  LOGOUT_USER,
  FORMAT_CURRENCY,
  SET_CURRENCY,
} from '../redux/constants/index';
import {Constants} from './Constant';

import {get_formated_amount} from '../redux/reducers/currencyReducer';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
var {width, height} = Dimensions.get('window');

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      Spinner: false,
      order_id: 0,
      selectedStartDate: null,
      calenderModal: false,
      cicod_order_id: '',
      delivery_type: '',
      payment_mode: '',
      order_status: '',
      payment_status: '',
      ticket_id: '',
      created_by: '',
      payment_date: '',
      total_amount: 0,
      currency: '',
      amount_paid_from_credit_limit: '',
      data: {
        customer: {
          name: '',
          phone: '',
          address: '',
          email: '',
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
    // this.props.navigation.goBack(null);
    if (this.props.route.params.from == null) {
      this.props.navigation.replace('Home');
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  }
  componentDidMount() {}
  get_order_detail(order_id) {
    this.setState({Spinner: true, order_id: order_id});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.orderslist + '/' + order_id, postData)
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
        console.log(
          'data data data res res res  order detail',
          responseJson.data,
        );
        if (responseJson.status === 'success') {
          if (responseJson.message == 'Order not found') {
            // this.props.navigation.goBack();
            Alert.alert('Message', responseJson.message);
            return;
          }
          let total_ammount = 0;
          let product_items = responseJson.data.items;

          for (let i = 0; product_items.length > i; i++) {
            total_ammount =
              total_ammount +
              product_items[i].price * product_items[i].quantity;
          }
          // total_ammount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")
          this.setState({
            data: responseJson.data,
            cicod_order_id: responseJson.data.cicod_order_id,
            delivery_type: responseJson.data.delivery_type,
            payment_mode: responseJson.data.payment_mode,
            order_status: responseJson.data.order_status,
            payment_status: responseJson.data.payment_status,
            ticket_id: responseJson.data.ticket_id,
            created_by: responseJson.data.created_by,
            payment_date: responseJson.data.payment_date,
            currency: responseJson.data.currency,
            item: product_items,
            total_amount: total_ammount,
            amount_paid_from_credit_limit:
              responseJson.data.amount_paid_from_credit_limit,
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
    let reciptUrl = Constants.orderslist + '/' + this.state.order_id;

    fetch(reciptUrl, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          Spinner: false,
        });
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
    if (this.state.order_id != this.props.route.params.id) {
      this.get_order_detail(this.props.route.params.id);
    }
    return (
      <Scaffold style={{flex: 1}}>
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
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
              width: '100%',
            }}>
            <NavBack
              title="ORDER DETAIL"
              onClick={() =>
                this.props.route.params.from == null
                  ? this.props.navigation.navigate('Buyers')
                  : this.props.navigation.goBack()
              }
            />
          </View>
          <ScrollView>
            <View style={[{}, styles.textInputView]}>
              <Text style={{color: '#aaa'}}>CICOD Order ID</Text>
              <Text style={{fontWeight: 'bold'}}>
                {this.state.data.cicod_order_id}
              </Text>
              <TouchableOpacity
                onPress={() => this.ReciptResend()}
                style={[{}, styles.btnContinuueView]}>
                <Text style={{color: '#FFFFFF'}}>Send receipt</Text>
              </TouchableOpacity>
            </View>
            <View style={[{}, styles.detailMainView]}>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Customer Name
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.customer.name ?? ''}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Phone Number
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.customer.phone ?? 0}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Delivery Type
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.delivery_type ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Order Channel
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    Order Channel
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Customer Address
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.customer.address ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Email Address
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{fontSize: 12}, styles.detailColumn2text]}>
                    {this.state.data.customer.email ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Payment Mode
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.payment_mode ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Order Status
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text
                    style={[
                      {
                        backgroundColor:
                          this.state.order_status == 'PENDING'
                            ? '#FFF3DB'
                            : this.state.order_status == 'CANCELLED'
                            ? '#D8D8D8'
                            : this.state.order_status == 'PAID'
                            ? '#DAF8EC'
                            : this.state.order_status == 'PART PAYMENT'
                            ? '#E6E6E6'
                            : null,
                      },
                      styles.orderStatusText,
                    ]}>
                    {this.state.order_status}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Payment Status
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{color: '#FDB72B'}, styles.orderStatusText]}>
                    {this.state.data.payment_status ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>Ticket Id</Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.ticket_id ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>Created By</Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.created_by ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Payment Due Date
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.payment_date ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{}, styles.detailColumn1text]}>
                    Delivery Address
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.delivery_address ?? '--'}
                  </Text>
                </View>
              </View>
              <View style={({}, styles.detailRow)}>
                <View style={[{}, styles.detailColumn1]}>
                  <Text style={[{fontSize: 11}, styles.detailColumn1text]}>
                    Amount Paid From Credit Limit
                  </Text>
                </View>
                <View style={[{}, styles.detailColumn2]}>
                  <Text style={[{}, styles.detailColumn2text]}>
                    {this.state.data.amount_paid_from_credit_limit ?? '--'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[{}, styles.detailMainView]}>
              <View
                style={[
                  {
                    alignSelf: 'flex-start',
                    borderBottomWidth: 0.25,
                    paddingBottom: 10,
                    width: width - 20,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                    flexDirection: 'row',
                  },
                ]}>
                <Image
                  style={{height: 40, width: 30}}
                  source={require('../images/Order/invoice.png')}
                />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Text style={[{}, styles.detailInvoiceGraytext]}>
                    Invoice Number:
                  </Text>
                  <Text
                    style={[
                      {fontWeight: 'bold'},
                      styles.detailInvoiceDarkGraytext,
                    ]}>
                    PCIN {this.state.data.cicod_order_id}
                  </Text>
                </View>
              </View>
              <FlatList
                data={this.state.item}
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View
                      style={[style.separator, highlighted && {marginLeft: 0}]}
                    />
                  ))
                }
                renderItem={({item, index, separators}) => (
                  <View style={({}, styles.invoiceRow)}>
                    <View style={{flexDirection: 'column', width: width - 50}}>
                      <Text style={[{}, styles.detailInvoiceLable]}>
                        {item.name}
                      </Text>
                      {/* <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text> */}
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#929497',
                            }}>
                            Unit Price:{' '}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#929497',
                              marginRight: 20,
                            }}>
                            {item.price}{' '}
                          </Text>
                        </View>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#929497',
                            }}>
                            QTY:{' '}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#929497',
                              marginRight: width / 4,
                            }}>
                            {item.quantity}{' '}
                          </Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Text
                            style={{
                              position: 'absolute',
                              right: 20,
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#929497',
                              textAlign: 'right',
                              alignSelf: 'flex-end',
                            }}>
                            {this.state.currency +
                              ' ' +
                              item.quantity * item.price}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#4E4D4D',
                    fontSize: 17,
                    fontFamily: 'Open Sans',
                  }}>
                  Total:{' '}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#4E4D4D',
                    fontSize: 17,
                    fontFamily: 'Open Sans',
                  }}>
                  {this.state.currency +
                    get_formated_amount(this.state.total_amount)}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Scaffold>
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
