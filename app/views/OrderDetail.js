/* eslint-disable prettier/prettier */
import React from 'react';
import { 
  BackHandler,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Modal as OtherModal,
} from 'react-native';

import OTPTextInput from 'react-native-otp-textinput';
import {Text,  Modal} from 'react-native-paper';
import styles from '../css/OrderDetailCss';

import Header from '../views/Header';

import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import {
  SET_USER,
  LOGOUT_USER,
  FORMAT_CURRENCY,
  SET_CURRENCY,
  CLEAR_ORDER,
  SET_CUSTOMER,
} from '../redux/constants/index';
import {Constants} from './Constant';

import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
var {width} = Dimensions.get('window');

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      Spinner: false,
      tokenModal: false,
      moreModal: false,
      tokenModalSuccess: false,
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
      delivery_amount: 0,
      currency: '',
      datcode: '',
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
    if (this.props.route.params.from == null || typeof this.props.route.params.from =='undefined') {
      this.props.emptyOrder();
      let user_data = {};
      this.props.setCustomer(user_data);
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  }
  componentDidMount() {
    this.props.emptyOrder();

    console.log("this.props.route.params.from",this.props.route.params.from)
  }

  updateDeliveryStatus() {
    if (this.state.datcode.length < 4) {
      Alert.alert('Please enter token');
      return;
    }
    this.setState({Spinner: true});
    console.log('$%%ty', this.state.datcode);
    let body = {
      code: this.state.datcode,
    };
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify(body),
    };
    fetch(Constants.updateDeliveryStaus, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          Spinner: false,
        });

        console.log('tokensent$###$l', responseJson.data);
        if (responseJson.data.status == 200) {
          this.setState({tokenModalSuccess: true,tokenModal:false});
        } else if (responseJson.data.status == 400) {
          Alert.alert('Info', responseJson.data.message);
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.data.message;
          this.setState({tokenModalSuccess: true,tokenModal:false});
        }
      })
      .catch(e => {
        //let message = responseJson.message;
        Alert.alert('Error', "Error in updating");
      });
  }

  get_order_detail(order_id) {
    this.setState({
      Spinner: true,
      order_id: order_id,
      tokenModal: false,
      tokenModalSuccess: false,
    });
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
            delivery_amount: responseJson.data.delivery_amount,
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
          Alert.alert('Success',"Your reciept has been sent successfully.");
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
                  ? this.props.navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    })
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
            {this.state.order_status == 'PAID' && (
              <TouchableOpacity
                onPress={() => this.setState({moreModal: true})}
                style={[
                  {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  },
                ]}>
                <Icon name="ellipsis-h" color={'#929497'} size={20} />
              </TouchableOpacity>
            )}

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
                            : this.state.order_status == 'DELIVERED'
                            ? '#DAF8EC'
                            : this.state.order_status == 'PICKED'
                            ? '#DAF8EC'
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
                      style={[styles.separator, highlighted && {marginLeft: 0}]}
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

              {this.state.delivery_type == 'DELIVERY' ? (
                <View>
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
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                      }}>
                      Sub Total:{' '}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                      }}>
                      <NumberFormat
                        decimalScale={2}
                        renderText={(value, props) => (
                          <Text {...props}>{value}</Text>
                        )}
                        value={this.state.total_amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={this.state.currency}
                      />
                      {/*                                     
                                {currency+ total_amount} */}
                      {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                    </Text>
                  </View>
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
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                      }}>
                      Delivery Fee:{' '}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                      }}>
                      <NumberFormat
                        decimalScale={2}
                        renderText={(value, props) => (
                          <Text {...props}>{value}</Text>
                        )}
                        value={this.state.delivery_amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={this.state.currency}
                      />
                      {/*                                     
                                {currency+ total_amount} */}
                      {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                    </Text>
                  </View>

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
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                      }}>
                      Total:{' '}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                        fontSize: 15,
                        fontFamily: 'Open Sans',
                      }}>
                      <NumberFormat
                        decimalScale={2}
                        renderText={(value, props) => (
                          <Text {...props}>{value}</Text>
                        )}
                        value={
                          parseFloat(this.state.total_amount) +
                          parseFloat(this.state.delivery_amount)
                        }
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={this.state.currency}
                      />
                      {/*                                     
                                {currency+ total_amount} */}
                      {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                    </Text>
                  </View>
                </View>
              ) : (
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
                    {' '}
                    {this.state.currency + ' ' + this.state.total_amount}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          <OtherModal
            visible={this.state.moreModal}
            onRequestClose={() => this.setState({moreModal: false})}
            transparent={true}>
            <TouchableOpacity onPress={() => this.setState({moreModal: false})}>
              <View style={[{}, styles.modalBackGround]}>
                <TouchableWithoutFeedback>
                  <View style={styles.suspendModal}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/mark.png')}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({tokenModal: true, moreModal: false})
                        }
                        style={[{marginLeft: 7}, styles.suspendTouch]}>
                        <Text style={{color: '#808080'}}>
                          Mark as{' '}
                          {this.state.delivery_type == 'DELIVERY'
                            ? 'delivered'
                            : 'pickup'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* <View style={{marginTop:5}} /> */}
                    {/* <TouchableOpacity
                                onPress={() => this.setState({suspendModal:false})}
                                style={[{}, styles.suspendTouch]}>
                                <Image source={require('../images/redCross.png')} style={[{width:20,height:20}, styles.banImage]} />
                                <Text style={{}}> Cancel</Text>
                            </TouchableOpacity> */}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </OtherModal>

          <Modal
            visible={this.state.tokenModal}
            onDismiss={() => this.setState({tokenModal: false})}>
            {console.log(this.props.user)}
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              <View style={{alignItems: 'flex-start', paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  <Text
                    style={{
                      color: '#2F2E7C',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Delivery Acceptance Token
                  </Text>
                </View>
                <Text style={{color: '#4D4D4D', marginBottom: 20}}>
                  Enter token provided by customer
                </Text>
                <Text
                  style={{
                    color: '#4D4D4D',
                    fontWeight: 'bold',
                    marginBottom: 20,
                  }}>
                  Token
                </Text>
                <View style={{alignSelf: 'center', marginBottom: 30}}>
                  <OTPTextInput
                    inputCount={4}
                    containerStyle={{
                      // width: '10%',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                    handleTextChange={e => this.setState({datcode: e})}
                    textInputStyle={{
                      justifyContent: 'center',
                      width: 50,
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#B1272C',
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 40,
                    borderRadius: 100,
                    width: width - 80,
                    marginBottom: 16,
                  }}
                  onPress={() => {
                    this.updateDeliveryStatus();
                  }}>
                  <Text style={{color: '#fff'}}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    paddingVertical: 15,
                    padding: 30,
                    borderRadius: 100,
                    borderWidth: 1,
                    width: width - 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#E6E6E6',
                  }}
                  onPress={() => this.setState({tokenModal: false})}>
                  <Text style={{color: '#E6E6E6', paddingHorizontal: 10}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={this.state.tokenModalSuccess}
            onDismiss={() => this.setState({tokenModalSuccess: false})}>
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              <View style={{alignItems: 'center', paddingHorizontal: 20}}>
                <View
                  style={{
                    borderColor: '#DAF8EC',
                    borderWidth: 20,
                    borderRadius: 100,
                  }}>
                  <Image
                    style={{height: width / 4, width: width / 4}}
                    source={require('../images/greenTick.png')}
                  />
                </View>

                <Text
                  style={{
                    color: '#4D4D4D',
                    fontWeight: 'bold',
                    marginBottom: 20,
                  }}>
                  Token Confirmed
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    paddingVertical: 15,
                    padding: 30,
                    borderRadius: 100,
                    borderWidth: 1,
                    width: width - 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#E6E6E6',
                  }}
                  onPress={() => {
                    this.get_order_detail(this.props.route.params.id);
                  }}>
                  <Text style={{color: '#E6E6E6', paddingHorizontal: 10}}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    emptyOrder: () => dispatch({type: CLEAR_ORDER}),
    setCustomer: value => dispatch({type: SET_CUSTOMER, value: value}),
    setCurrency: value => dispatch({type: SET_CURRENCY, value: value}),
    formateCurrency: value => dispatch({type: FORMAT_CURRENCY, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
