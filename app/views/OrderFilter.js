import React from 'react'
import { View, ImageBackground, ScrollView, Dimensions, Image, Alert, Platform, TouchableOpacity, } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import styles from '../css/Filter.Css';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class OrderFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categoryarr: [],
      createdby_arr: [],
      paymentmode_arr: [],
      orderchannel_arr: [],
      category_name: '',
      spinner: false,
      orderdate: 'DD-MM-YY',
      paymentdate: 'DD-MM-YY',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      modal_date_type:''
    };
  }
  componentDidMount() {
    this.orderList();
  }

  orderList() {
    this.setState({ spinner: true })
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
        this.setState({ spinner: false });
        console.log('response json @@@@@@@@@@@@!!!!!!!!!!!!!!!!!', responseJson);
        if (responseJson.status === 'success') {

          let res = responseJson.data;
          let createdby_arr = res.map((x, key) => { return { label: x.created_by ?? '', value: x.created_by ?? '' } });
          let paymentmode_arr = res.map((x, key) => { return { label: x.payment_mode, value: x.payment_mode } });
          console.log('createdby_arr createdby_arr !!!!!!', createdby_arr);
          console.log('paymentmode_arr paymentmode_arr !!!!!!', paymentmode_arr);
          this.setState({
            createdby_arr: createdby_arr,
            paymentmode_arr: paymentmode_arr,
          });
          // this.props.navigation.navigate('DrawerNavigation')
        } else {
          let message = JSON.stringify(responseJson.message)
          Alert.alert('Error', message)
        }

      })

  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg)
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  onorderChannelText(text) {
    let filters = this.state.filters;
    filters.push({ key: 'orderChannel', value: text });
    this.setState({
      filters: filters
    })
  }
  onQuantityText(text) {
    let filters = this.state.filters;
    filters.push({ key: 'quantity', value: text });
    this.setState({
      filters: filters
    })
  }

  onCreatedByText(text) {
    let filters = 'Freezer'; //this.state.filters;
    filters.push({ key: 'createdBy', value: text });
    this.setState({
      filters: filters
    })
  }
  onPaymentmodeText(text) {
    let filters = 'Freezer'; //this.state.filters;
    filters.push({ key: 'payment_mode', value: text });
    this.setState({
      filters: filters
    })
  }
  activeSet(value) {
    let filters = this.state.filters;
    filters.push({ key: 'is_active', value: value })
    this.setState({
      filters: filters
    })
  }
  applyFilter = () => {
    console.log('this.state.filters', this.state.filters);

    this.props.navigation.navigate('Order', { filters: this.state.filters });
  }

  // datePickerFun = () => {

  //   // let filters = this.state.filters;
  //   // filters.push({ key: 'create_time', value: date });
  //   this.setState({
  //     isDatePickerVisible: !this.state.isDatePickerVisible
  //   })
  // }
  onDateChange(date) {
    () => this.setState({
        selectedStartDate: date,
    });
}
  setDate(date) {

    console.log('date',date)
    console.log('this.state.modal_date_type',this.state.modal_date_type)
  

    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    
    var timestamp = date.getTime();    

    // let newdate = day + "/" + month + "/" + year;
    let newdate = year + "/" + month + "/" + day;

    // let sendDate = year + "/" + month + "/" + day;
    // var timestamp = Date.parse(new Date(sendDate));  

    let filters = this.state.filters;
    if (this.state.modal_date_type == 'order') {
      filters.push({ key: 'date_created', value: newdate });
      this.setState({
        orderdate: newdate,
      })
    }
    if (this.state.modal_date_type == 'payment') {

      filters.push({ key: 'payment_status_date', value: newdate });
      this.setState({
        paymentdate: newdate,
      })
    }
    console.log('filters !!!!!!!!!!!!!!', filters);
    this.setState({
      isDatePickerVisible: false,
      filters: filters
    })


  }
  hideDatePicker() {
    console.log(' visibility !!!!!!!!!!!!!');
    this.setState({
      isDatePickerVisible: false
    })
  }
  deliveryType(value) {
    let filters = this.state.filters;
    filters.push({ key: 'delivery_type', value: value })
    this.setState({
      filters: filters
    })
  }
  // setDate = (date) => {
  //   var month = date.getUTCMonth() + 1; //months from 1-12
  //   var day = date.getUTCDate();
  //   var year = date.getUTCFullYear();
    
  //   var timestamp = date.getTime();    

  //   let newdate = day + "/" + month + "/" + year;

  //   // filters.push({ key: 'create_time', value: date });
  //   this.setState({
  //     isDatePickerVisible: !this.state.isDatePickerVisible,
  //     date: newdate,
  //   })

  //   let sendDate = year + "/" + month + "/" + day;
  //   var timestamp = Date.parse(new Date(sendDate));   
  //   console.log(sendDate + " is: " + timestamp);
  //   let url = Constants.dashboard+'?start_date='+timestamp ;
  //   console.log('url !!!!!!!!!!!!!!!!!!!!!!!!!!!!', url)
  //   this.getDashboardData(url);

  // }
  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View>

            <Spinner
              visible={this.state.spinner}
              textContent={'Please Wait...'}
              textStyle={{ color: '#fff' }}
              color={'#fff'}
            />
            <DateTimePickerModal
              // isVisible={this.state.isDatePickerVisible}
         
              // onCancel={this.hideDatePicker}
                   isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    date={new Date()}
                    onConfirm={(date)=>this.setDate(date)}
                    onCancel={this.hideDatePicker}
            />
            <View style={[{}, styles.mainRow]}>
              <View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon name="arrow-left" size={25} color="#929497" />
                </TouchableOpacity>

                <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>
              </View>
              <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20, top: 20 }]}>Clear Filter</Text>
            </View>
            <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }]}>Status</Text>
            <View>
              <ScrollView
                horizontal={true}
                style={{ paddingHorizontal: 40 }}
              >
                <View style={[{ paddingRight: 20 }, styles.mainRow]}>
                  <View style={[{ marginRight: 10 }]}>
                    <TouchableOpacity
                      onPress={() => this.activeSet('All')}
                    >
                      <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.activeSet('PENDING')}
                    >
                      <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>PENDING </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.activeSet('PAID')}
                    >
                      <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>PAID </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.activeSet('PART PAYMENT')}
                    >
                      <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>PART PAYMENT </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[{}]}>
                    <TouchableOpacity
                      onPress={() => this.activeSet('PAID FROM CREDIT')}>
                      <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>PAID FROM CREDIT </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[{ flex: 1, paddingVertical: 10 }]}>
                <Text style={{ color: '#929497', fontWeight: 'bold' }}>Order Date</Text>
                <TouchableOpacity
                  onPress={() => this.setState({isDatePickerVisible:true, modal_date_type:'order'})}
                >
                  <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginRight: 10, padding: 10, marginVertical: 10 }}>
                    <Image
                      style={{ height: 15, width: 15 }}
                      source={require('../images/calenderIcon.png')}
                    />
                    <Text style={{ marginLeft: 10, color: '#aaa' }}>{this.state.orderdate}</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 20, bottom: 10 }}>
                    <Icon
                      size={30}

                      name="caret-down"
                      color={'#707070'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[{ flex: 1, paddingVertical: 10 }]}>
                <Text style={{ color: '#929497', fontWeight: 'bold', marginLeft: 10 }}>Payment Date</Text>
                <TouchableOpacity
                  onPress={() => this.setState({isDatePickerVisible:true,modal_date_type:'payment'})} 
                >

                  <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginLeft: 10, padding: 10, marginVertical: 10 }}>
                    <Image
                    style={{height:15,width:15,alignSelf:'center'}}
                      source={require('../images/calenderIcon.png')}
                    />
                    <Text style={{ marginLeft: 10, color: '#aaa' }}>{this.state.paymentdate}</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 20, bottom: 10 }}>
                    <Icon
                      size={30}

                      name="caret-down"
                      color={'#707070'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 15, marginVertical: 10 }]}>Delivery Type</Text>
            <View>
              <View style={[{ paddingRight: 20 }, styles.mainRow]}>
                <View style={[{ marginRight: 10 }]}>
                  <TouchableOpacity
                    onPress={() => this.deliveryType('PICKUP')}>
                    <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>PICKUP</Text>
                  </TouchableOpacity>
                </View>
                <View style={[{}]}>
                  <TouchableOpacity
                    onPress={() => this.deliveryType('DELIVERY')}>
                    <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>DELIVERY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ width: width - 20, backgroundColor: '#fff', paddingVertical: 10, marginTop: 20 }}>
              {/* {this.state.orderchannel_arr.length < 1 ? null : */}
              <DropDownPicker
                items={this.state.orderchannel_arr}
                containerStyle={{ height: 50, width: width - 25, marginTop: 15, }}
                style={{ backgroundColor: '#fff' }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Order channel"
                dropDownStyle={{ backgroundColor: '#fff', zIndex: 0.999, marginBottom: 10 }}
                onChangeItem={item => this.onorderChannelText(item.value)}
              />
              {/* } */}

              {this.state.paymentmode_arr.length < 1 ? null :
                <DropDownPicker
                  items={this.state.paymentmode_arr}
                  containerStyle={{ height: 50, width: width - 25, marginTop: 15, }}
                  style={{ backgroundColor: '#fff' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  placeholder="Payment Mode"
                  dropDownStyle={{ backgroundColor: '#fff', zIndex: 0.999, marginBottom: 10 }}
                  onChangeItem={item => this.onPaymentmodeText(item.value)}
                />}
              {this.state.createdby_arr.length < 1 ? null :
                <DropDownPicker
                  items={this.state.createdby_arr}
                  autoScrollToDefaultValue={true}
                  containerStyle={{ height: 50, width: width - 20, marginTop: 15 }}
                  style={{ backgroundColor: '#fff' }}
                  itemStyle={{
                    justifyContent: 'flex-start', zIndex: 0.99
                  }}
                  placeholder="Created By"
                  dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingBottom: 20 }}
                  labelStyle={{ color: '#A9A9A9' }}
                  onChangeItem={item => this.onCreatedByText(item.value ?? '')}
                />}
            </View>
            <TouchableOpacity
              onPress={() => this.applyFilter()}
              style={{ width: width / 1.5, alignSelf: 'center', zIndex: -0.9999, backgroundColor: '#B1272C', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 50, marginTop: 10 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
};
function mapDispatchToProps(dispatch) {
  return {
    setUser: (value) => dispatch({ type: SET_USER, value: value }),
    logoutUser: () => dispatch({ type: LOGOUT_USER })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderFilter)
