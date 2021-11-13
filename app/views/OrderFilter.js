import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/Filter.Css';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SET_USER, LOGOUT_USER, ORDER_RELOAD} from '../redux/constants/index';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from '../views/Constant';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class OrderFilter extends React.Component {
  constructor(props) {
    super(props);
    let backup_orderchannel_arr = [
      {label: 'All', value: ''},
      {label: 'pending', value: 'pending'},
      {label: 'PAID', value: 'paid'},
      {label: 'PART PAYMENT', value: 'PART PAYMENT'},
      {label: 'PAID FROM CREDIT', value: 'ACCOUNT'},
    ];
    this.state = {
      data: [],
      filters: [],
      createdby_arr: [],
      backup_createdby_arr: [],
      backup_paymentmode_arr: [],
      paymentmode_arr: [],
      // orderchannel_arr: [{'all':'All'},{'pending':'PENDING'}],
      backup_orderchannel_arr: backup_orderchannel_arr,
      orderchannel_arr: backup_orderchannel_arr,
      category_name: '',
      spinner: false,
      orderdate: 'YY-MM-DD',
      paymentdate: 'YY-MM-DD',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      modal_date_type: '',
      active_list: '',
    };
  }
  componentDidMount() {
    this.orderList();
  }

  orderList() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.orderslist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        // console.log('response json @@@@@@@@@@@@!!!!!!!!!!!!!!!!!', responseJson);
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          // let createdby_arr = res.map((x, key) => { return { label: x.created_by ?? '', value: x.created_by ?? '' } });
          // let paymentmode_arr = res.map((x, key) => { return { label: x.payment_mode, value: x.payment_mode } });
          let createdby_arr = [];
          let paymentmode_arr = [];

          for (let i = 0; i < res.length; i++) {
            let created_by = {
              label: res[i].created_by ?? '',
              value: res[i].created_by ?? '',
            };
            let payment_mode = {
              label: res[i].payment_mode,
              value: res[i].payment_mode,
            };
            createdby_arr = this.upsert_list_dropdown(
              createdby_arr,
              created_by,
            );
            paymentmode_arr = this.upsert_list_dropdown(
              paymentmode_arr,
              payment_mode,
            );
          }

          // console.log('createdby_arr createdby_arr !!!!!!', createdby_arr);
          // console.log('paymentmode_arr paymentmode_arr !!!!!!', paymentmode_arr);
          this.setState({
            createdby_arr: createdby_arr,
            paymentmode_arr: paymentmode_arr,
            backup_createdby_arr: createdby_arr,
            backup_paymentmode_arr: paymentmode_arr,
          });

          // this.props.navigation.navigate('DrawerNavigation')
        } else {
          let message = JSON.stringify(responseJson.message);
          Alert.alert('Error', message);
        }
      });
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  upsert(array, item) {
    // (1)
    let foundindex = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key == item.key) {
        foundindex = i;
        break;
      }
    }
    if (foundindex == -1) {
      array.push(item);
    } else {
      array[foundindex].value = item.value;
    }
    return array;
  }

  upsert_list_dropdown(array, item) {
    // (1)
    let foundindex = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].label == item.label) {
        foundindex = i;
        break;
      }
    }
    if (foundindex == -1) {
      array.push(item);
    } else {
      array[foundindex].value = item.value;
    }
    return array;
  }

  upsert_filters(item) {
    // (1)
    let array = this.state.filters;
    array = this.upsert(array, item);
    this.setState({
      filters: array,
    });
  }
  onorderChannelText(text) {
    this.upsert_filters({key: 'orderChannel', value: text});
    // let filters = this.state.filters;
    // filters.push({ key: 'orderChannel', value: text });
    // this.setState({
    //   filters: filters
    // })
  }
  onQuantityText(text) {
    this.upsert_filters({key: 'quantity', value: text});
    // let filters = this.state.filters;
    // filters.push({ key: 'quantity', value: text });
    // this.setState({
    //   filters: filters
    // })
  }

  onCreatedByText(text) {
    this.upsert_filters({key: 'created_by', value: text});
    // let filters = 'Freezer'; //this.state.filters;
    // filters.push({ key: 'createdBy', value: text });
    // this.setState({
    //   filters: filters
    // })
  }
  onPaymentmodeText(text) {
    this.upsert_filters({key: 'payment_mode', value: text});
    // let filters = 'Freezer'; //this.state.filters;
    // filters.push({ key: 'payment_mode', value: text });
    // this.setState({
    //   filters: filters
    // })
  }
  orderStatus(text) {
    console.log('@@@@@@@@@@@', text);
    this.setState({active_list: text});
    // this.upsert_filters({ key: 'is_active', value: text })
    this.upsert_filters({key: 'order_status', value: text});
    // let filters = this.state.filters;
    // filters.push({ key: 'is_active', value: value })
    // this.setState({
    //   filters: filters
    // })
  }
  applyFilter = () => {
    console.log('this.state.filters', this.state.filters);
    console.log('user user user', this.props.user.access_token);
    let filters = this.state.filters;
    this.setState({
      filters: [],
    });
    //   this.props.setScreenReload({
    //     reload:true
    // })
    this.props.navigation.navigate('Order', {filters: filters});
  };

  // datePickerFun = () => {

  //   // let filters = this.state.filters;
  //   // filters.push({ key: 'create_time', value: date });
  //   this.setState({
  //     isDatePickerVisible: !this.state.isDatePickerVisible
  //   })
  // }
  onDateChange(date) {
    () =>
      this.setState({
        selectedStartDate: date,
      });
  }
  setDate = date => {
    this.setState({
      isDatePickerVisible: false,
      // filters: filters
    });

    console.log('date', date);
    console.log('this.state.modal_date_type', this.state.modal_date_type);

    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    var timestamp = date.getTime();

    // let newdate = day + "/" + month + "/" + year;
    // let newdate = year + "/" + month + "/" + day;

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    let newdate = year + '-' + month + '-' + day;

    // let sendDate = year + "/" + month + "/" + day;
    // var timestamp = Date.parse(new Date(sendDate));

    let filters = this.state.filters;
    if (this.state.modal_date_type == 'order') {
      this.upsert_filters({key: 'order_date', value: newdate});
      // filters.push({ key: 'date_created', value: newdate });
      this.setState({
        orderdate: newdate,
      });
    }
    if (this.state.modal_date_type == 'payment') {
      this.upsert_filters({key: 'payment_date', value: newdate});
      // filters.push({ key: 'payment_status_date', value: newdate });
      this.setState({
        paymentdate: newdate,
      });
    }
    console.log('filters !!!!!!!!!!!!!!', filters);
  };
  hideDatePicker() {
    console.log(' visibility !!!!!!!!!!!!!');
    this.setState({
      isDatePickerVisible: false,
    });
  }
  deliveryType(value) {
    let filters = this.state.filters;
    filters.push({key: 'delivery_type', value: value});
    this.setState({
      filters: filters,
    });
  }
  clear_filter() {
    console.log('11111111111', this.state.filters);
    this.setState({
      data: [],
      filters: [],
      createdby_arr: [], //this.state.backup_createdby_arr,
      paymentmode_arr: [], //this.state.paymentmode_arr,
      // orderchannel_arr: [{'all':'All'},{'pending':'PENDING'}],
      orderchannel_arr: [],
      category_name: '',
      spinner: false,
      orderdate: 'YY-MM-DD',
      paymentdate: 'YY-MM-DD',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      modal_date_type: '',
      active_list: '',
    });
    let _that = this;
    setTimeout(() => {
      _that.setState({
        createdby_arr: _that.state.backup_createdby_arr,
        paymentmode_arr: _that.state.backup_paymentmode_arr,
        orderchannel_arr: _that.state.backup_orderchannel_arr,
      });
    }, 300);
    console.log('22222222222', this.state.filters);
  }
  render() {
    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <ScrollView>
            <View>
              <Spinner
                visible={this.state.spinner}
                textContent={'Please Wait...'}
                textStyle={{color: '#fff'}}
                color={'#fff'}
              />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                date={new Date()}
                onConfirm={this.setDate}
                onCancel={this.hideDatePicker}
              />
              <View style={[{}, styles.mainRow]}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="#929497" />
                  </TouchableOpacity>
                  <Text
                    style={[
                      {
                        color: '#2F2E7C',
                        fontWeight: 'bold',
                        marginHorizontal: 10,
                      },
                    ]}>
                    FILTER
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    {
                      color: '#929497',
                      fontWeight: 'bold',
                      position: 'absolute',
                      right: 10,
                      top: 15,
                    },
                  ]}
                  onPress={() => this.clear_filter()}>
                  <Text style={[{color: '#929497', fontWeight: 'bold'}]}>
                    Clear Filter
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }]}>Status</Text> */}
              {/* <View>
              <ScrollView
                horizontal={true}
                style={{}}
              >
                <View style={[{  }, styles.mainRow]}>
                  <View style={[{ }]}>
                    <TouchableOpacity
                      onPress={() => this.orderStatus('')}
                    >
                      <Text style={[{marginRight:5, color: this.state.active_list==''? '#000' : '#929497', borderRadius: 50, backgroundColor:this.state.active_list==''?'#fff': '#E6E6E6', paddingHorizontal: 5 }]}>All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.orderStatus('pending')}
                    >
                      <Text style={[{marginRight:5, color: this.state.active_list=='pending'? '#000' :'#929497', borderRadius: 50, backgroundColor: this.state.active_list=='pending'?'#fff': '#E6E6E6', paddingHorizontal: 5 }]}>PENDING </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.orderStatus('paid')}
                    >
                      <Text style={[{marginRight:5, color: this.state.active_list=='paid'? '#000' :'#929497', borderRadius: 50, backgroundColor: this.state.active_list=='paid'?'#fff': '#E6E6E6', paddingHorizontal: 5 }]}>PAID </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.orderStatus('PART PAYMENT')}
                    >
                      <Text style={[{marginRight:5, color:this.state.active_list=='PART PAYMENT'? '#000' : '#929497', borderRadius: 50, backgroundColor: this.state.active_list=='PART PAYMENT'?'#fff': '#E6E6E6', paddingHorizontal: 5 }]}>PART PAYMENT </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.orderStatus('ACCOUNT')}>
                     
                      <Text style={[{ color:this.state.active_list=='ACCOUNT'? '#000' : '#929497', borderRadius: 50, backgroundColor: this.state.active_list=='ACCOUNT'?'#fff': '#E6E6E6', paddingHorizontal: 5 }]}>PAID FROM CREDIT </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View> */}
              <View style={[{flexDirection: 'row'}]}>
                <View style={[{flex: 1, paddingVertical: 10}]}>
                  <Text style={{color: '#929497', fontWeight: 'bold'}}>
                    Order Date
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        isDatePickerVisible: true,
                        modal_date_type: 'order',
                      })
                    }>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        marginRight: 10,
                        padding: 10,
                        marginVertical: 10,
                      }}>
                      <Image
                        style={{height: 15, width: 15}}
                        source={require('../images/calenderIcon.png')}
                      />
                      <Text style={{marginLeft: 10, color: '#aaa'}}>
                        {this.state.orderdate}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', right: 20, bottom: 10}}>
                      <Icon size={30} name="caret-down" color={'#707070'} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[{flex: 1, paddingVertical: 10}]}>
                  <Text
                    style={{
                      color: '#929497',
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Payment Date
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        isDatePickerVisible: true,
                        modal_date_type: 'payment',
                      })
                    }>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        marginLeft: 10,
                        padding: 10,
                        marginVertical: 10,
                      }}>
                      <Image
                        style={{height: 15, width: 15, alignSelf: 'center'}}
                        source={require('../images/calenderIcon.png')}
                      />
                      <Text style={{marginLeft: 10, color: '#aaa'}}>
                        {this.state.paymentdate}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', right: 20, bottom: 10}}>
                      <Icon size={30} name="caret-down" color={'#707070'} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={[
                  {
                    color: '#929497',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 10,
                  },
                ]}>
                Delivery Type
              </Text>
              <View style={{}}>
                <View style={[{paddingRight: 20}, styles.mainRow]}>
                  <View style={[{marginRight: 10}]}>
                    <TouchableOpacity
                      onPress={() => this.deliveryType('PICKUP')}>
                      <Text
                        style={[
                          {
                            color: '#929497',
                            borderRadius: 50,
                            backgroundColor: '#E6E6E6',
                            paddingHorizontal: 5,
                          },
                        ]}>
                        PICKUP
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.deliveryType('DELIVERY')}>
                      <Text
                        style={[
                          {
                            color: '#929497',
                            borderRadius: 50,
                            backgroundColor: '#E6E6E6',
                            paddingHorizontal: 5,
                          },
                        ]}>
                        DELIVERY
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <View style={{ width: width - 20, backgroundColor: '#fff',paddingBottom:120,borderRadius:10,marginTop:30 }}> */}
              {this.state.orderchannel_arr.length < 1 ? null : (
                <DropDownPicker
                  scrollViewProps={{
                    persistentScrollbar: true,
                  }}
                  dropDownDirection="AUTO"
                  bottomOffset={200}
                  items={this.state.orderchannel_arr}
                  // items={
                  //   [
                  //     {'label':'All','value':''},
                  //     {'label':'pending','value':'pending'},
                  //     {'label':'PAID','value':'paid'},
                  //     {'label':'PART PAYMENT','value':'PART PAYMENT'},
                  //     {'label':'PAID FROM CREDIT','value':'ACCOUNT'},
                  //   ]
                  // }
                  //{this.state.orderchannel_arr}
                  containerStyle={{
                    height: 50,
                    width: width - 25,
                    marginTop: 15,
                  }}
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  placeholder="Order channel"
                  dropDownStyle={{
                    height: 120,
                    backgroundColor: '#fff',
                    zIndex: 0.999,
                    marginBottom: 10,
                  }}
                  labelStyle={{color: '#A9A9A9'}}
                  onChangeItem={item => this.orderStatus(item.value)}
                />
              )}

              {this.state.paymentmode_arr.length < 1 ? null : (
                <DropDownPicker
                  scrollViewProps={{
                    persistentScrollbar: true,
                  }}
                  dropDownDirection="AUTO"
                  bottomOffset={200}
                  items={this.state.paymentmode_arr}
                  autoScrollToDefaultValue={true}
                  containerStyle={{
                    height: 50,
                    width: width - 25,
                    marginTop: 15,
                  }}
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  placeholder="Payment Mode"
                  dropDownStyle={{
                    height: 120,
                    backgroundColor: '#fff',
                    zIndex: 0.999,
                  }}
                  labelStyle={{color: '#A9A9A9'}}
                  onChangeItem={item => this.onCreatedByText(item.value ?? '')}
                  //
                />
              )}
              {this.state.createdby_arr.length < 1 ? null : (
                <DropDownPicker
                  scrollViewProps={{
                    persistentScrollbar: true,
                  }}
                  dropDownDirection="AUTO"
                  bottomOffset={200}
                  items={this.state.createdby_arr}
                  autoScrollToDefaultValue={true}
                  containerStyle={{
                    height: 50,
                    width: width - 25,
                    marginTop: 15,
                  }}
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  placeholder="Created By"
                  dropDownStyle={{
                    height: 120,
                    backgroundColor: '#fff',
                    zIndex: 0.999,
                  }}
                  labelStyle={{color: '#A9A9A9'}}
                  onChangeItem={item => this.onCreatedByText(item.value ?? '')}
                  //
                />
              )}

              <TouchableOpacity
                onPress={() => this.applyFilter()}
                style={{
                  width: width / 1.5,
                  alignSelf: 'center',
                  zIndex: -0.9999,
                  backgroundColor: '#B1272C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderRadius: 50,
                  marginTop: 10,
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Apply</Text>
              </TouchableOpacity>
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
    reload: state.reloadReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setScreenReload: value => dispatch({type: ORDER_RELOAD, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderFilter);
