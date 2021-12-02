import React from 'react';
import {
  View,
  ImageBackground,
  Modal,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  SafeAreaView,
  ActivityIndicator,
  Modal as OtherModal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/CustomerDeatailCss';
import fontStyles from '../css/FontCss';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER} from '../redux/constants/index';
import {Constants} from '../views/Constant';

const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
class InvoiceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      calenderModal: false,
      products: [],
      moreModal: false,
      spinner: false,
      data: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  componentDidMount() {
    let id = this.props.route.params.invoice_id;
    console.log('jop$%%', this.props.route.params);
    this.getInvoice();
  }

  calculateDiscount() {
    let discount_amount = 0;
    let amount = this.state.data.amount.replace(/,/g, '');
    if (this.state.data.discount_fixed > 0) {
      discount_amount =
        parseFloat(amount) - parseFloat(this.state.data.discount_fixed);
    } else if (this.state.data.discount_percent > 0) {
      discount_amount =
        parseFloat(this.state.data.discount_percent) * parseFloat(amount);
    }

    return parseFloat(discount_amount);
  }

  calculateTaxAmount() {
    let tax_amount = 0.0;
    let amount = this.state.data.amount.replace(/,/g, '');
    if (this.state.data.tax > 0) {
      tax_amount = parseFloat(this.state.data.tax) * parseFloat(amount);
    }

    return parseFloat(tax_amount);
  }

  displayAmount() {
    let amount = this.state.data.amount.replace(/,/g, '');

    return parseFloat(amount);
  }

  markPaid() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log(
      'maiRT$%%',
      Constants.quickInvoice +
        '/' +
        this.props.route.params.invoice_id +
        '?action=mark_paid',
    );
    fetch(
      Constants.quickInvoice +
        '/' +
        this.props.route.params.invoice_id +
        '?action=mark_paid',
      postData,
    )
      .then(response => response.json())
      .then(async responseJson => {
        console.log('d900$%%', responseJson, 'sa%');
        this.setState({
          spinner: false,
        });

        if (responseJson.status === 'success') {
          Alert.alert('Info', 'Successfully marked as paid');
          this.setState({
            moreModal: false,
          });
          // this.props.navigation.navigate('DrawerNavigation')
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Error !!!', error);
      });
  }
  getInvoice() {
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log(
      'url$%%',
      Constants.quickInvoice + '/' + this.props.route.params.invoice_id,
    );
    fetch(
      Constants.quickInvoice + '/' + this.props.route.params.invoice_id,
      postData,
    )
      .then(response => response.json())
      .then(async responseJson => {
        console.log('d900$%%', responseJson, 'sa%', responseJson.data.products);
        this.setState({
          spinner: false,
        });

        if (responseJson.status === 'success') {
          this.setState({
            data: responseJson.data,
            products: responseJson.data.products,
          });
          // this.props.navigation.navigate('DrawerNavigation')
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Error !!!', error);
      });
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <Scaffold style={{flex: 1}}>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />

          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />

          {this.state.data ? (
            <ScrollView style={{paddingBottom: 50}}>
              <View style={{alignSelf: 'flex-start'}}>
                <NavBack
                  title={this.state.data.invoice_no}
                  onClick={() => this.props.navigation.goBack()}
                />
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  width: width - 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View style={[{borderRadius: 10}, styles.mainContentView]}>
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
                  <View style={[{}, styles.mainContentUserImageView]}>
                    <Image
                      style={{width: 40, height: 40}}
                      width={40}
                      height={40}
                      source={require('../images/customer/usericon.png')}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        {textAlign: 'center', color: '#4E4D4D'},
                        fontStyles.bold18,
                      ]}>
                      {this.props.currency.currency}
                      {this.state.data.amount}
                    </Text>
                    <View
                      style={[
                        {justifyContent: 'center'},
                        styles.mainContentUserInfoView,
                      ]}>
                      <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                        Due Date:{' '}
                      </Text>
                      <Text style={[{color: '#929497'}, fontStyles.normal13]}>
                        {this.state.data.date_sent}
                      </Text>
                    </View>

                    <View style={[{}, styles.detailColumn2]}>
                      <Text
                        style={[
                          {
                            backgroundColor:
                              this.state.data.status == 'PENDING'
                                ? '#FFF3DB'
                                : this.state.data.status == 'CANCELLED'
                                ? '#FFF4F4'
                                : this.state.data.status == 'PAID'
                                ? '#DAF8EC'
                                : this.state.data.status == 'PART PAYMENT'
                                ? '#E6E6E6'
                                : null,
                            color:
                              this.state.data.status == 'PENDING'
                                ? '#FDB72B'
                                : this.state.data.status == 'CANCELLED'
                                ? '#B1272C'
                                : this.state.data.status == 'PAID'
                                ? '#26C281'
                                : this.state.data.status == 'PART PAYMENT'
                                ? '#929497'
                                : null,
                          },
                          styles.orderStatusText,
                        ]}>
                        {this.state.data.status}
                      </Text>
                    </View>

                    <View
                      style={[
                        {
                          borderTopColor: '#E6E6E6',
                          borderTopWidth: 2,
                          marginTop: 10,
                          paddingTop: 10,
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        },
                        styles.mainContentUserInfoView,
                      ]}>
                      <View>
                        <Text style={[{color: '#929497', fontSize: 10}]}>
                          Customer Name
                        </Text>
                        <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                          {this.state.data.customer_name}
                        </Text>
                      </View>

                      <View>
                        <Text style={[{color: '#929497', fontSize: 10}]}>
                          Phone Number
                        </Text>
                        <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                          {this.state.data.customer_phone}
                        </Text>
                      </View>
                    </View>

                    <View style={[{}]}>
                      <Text style={[{color: '#929497', fontSize: 10}]}>
                        Email
                      </Text>
                      <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                        {this.state.data.customer_email}
                      </Text>
                    </View>
                    {/* 
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: 30,
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: '#929497', marginRight: 10}}>
                        More Details
                      </Text>
                      <Icon
                        name={
                          this.state.toggleMore
                            ? 'long-arrow-right'
                            : 'long-arrow-right'
                        }
                        size={20}
                        color={'#B1272C'}
                      />
                    </TouchableOpacity> */}
                  </View>
                  <View></View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#fff',
                  width: width - 10,
                  alignSelf: 'center',
                  //   justifyContent: 'center',
                  //   alignItems: 'center',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: '#929497'}}>Product/Service</Text>
                <View
                  style={{
                    borderTopColor: '#E6E6E6',
                    borderTopWidth: 2,
                    marginTop: 5,
                  }}
                />

                <View style={{marginTop: 10, padding: 10}}>
                  <FlatList
                    data={this.state.products}
                    ItemSeparatorComponent={
                      Platform.OS !== 'android' &&
                      (({highlighted}) => (
                        <View
                          style={[
                            style.separator,
                            highlighted && {marginLeft: 0},
                          ]}
                        />
                      ))
                    }
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index, separators}) => (
                      <View
                        style={[
                          {
                            width: '100%',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            flex: 1,
                            borderBottomColor: '#E6E6E6',
                            borderBottomWidth: 0.25,
                            paddingBottom: 10,
                            marginTop: 10,
                          },
                        ]}>
                        <View
                          style={[
                            styles.OrderDetailDataCOntainerRow,
                            {
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              flexDirection: 'row',
                              width: width - 40,
                            },
                          ]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#4E4D4D',
                                fontSize: 14,
                                fontWeight: 'bold',
                              }}>
                              {item.name}
                            </Text>
                          </View>

                          <Text
                            style={{
                              color: '#4E4D4D',
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}>
                            {this.props.currency.currency}
                            {item.unit_price * item.quantity}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.OrderDetailDataCOntainerRow,
                            {
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              flexDirection: 'row',
                              width: width - 40,
                              marginTop: 10,
                            },
                          ]}>
                          <Text style={{color: '#929497', fontSize: 12}}>
                            {item.quantity} x {this.props.currency.currency}{' '}
                            {item.unit_price}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>

                <View style={{marginTop: 30}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}>
                    <Text>Subtotal:</Text>

                    <Text>
                      {this.props.currency.currency}
                      {this.state.data.amount}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                      marginTop: 10,
                    }}>
                    <Text>VAT(7.5%):</Text>

                    <Text>
                      {this.props.currency.currency}
                      {this.calculateTaxAmount()}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                      marginTop: 10,
                    }}>
                    <Text>Discount:</Text>

                    <Text>
                      {this.props.currency.currency}
                      {this.calculateDiscount()}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                      marginTop: 10,
                    }}>
                    <Text>Total:</Text>

                    <Text style={{fontWeight: 'bold'}}>
                      {this.props.currency.currency}
                      {this.displayAmount() +
                        this.calculateTaxAmount() -
                        this.calculateDiscount()}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderTopColor: '#E6E6E6',
                      borderTopWidth: 2,
                      marginTop: 5,
                      paddingVertical: 10,
                    }}
                  />
                  <Text style={{fontWeight: 'bold'}}>Note:</Text>
                  <Text>{this.state.data.remark}</Text>
                </View>
              </View>

              <OtherModal
                visible={this.state.moreModal}
                onRequestClose={() => this.setState({moreModal: false})}
                transparent={true}>
                <TouchableOpacity
                  onPress={() => this.setState({moreModal: false})}>
                  <View style={[{}, styles.modalBackGround]}>
                    <TouchableWithoutFeedback>
                      <View style={styles.suspendModal}>
                        <View
                          style={{alignItems: 'center', flexDirection: 'row'}}>
                          <Image
                            style={{height: 20, width: 20}}
                            source={require('../images/mark.png')}
                          />
                          <TouchableOpacity
                            onPress={() => this.markPaid()}
                            style={[{marginLeft: 7}, styles.suspendTouch]}>
                            <Text style={{color: '#808080'}}>Mark as paid</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableOpacity>
              </OtherModal>
            </ScrollView>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#2F2E7C" />
              <Text>Loading...</Text>
            </View>
          )}
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);
