import React from 'react'
import { View, ImageBackground, ScrollView, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
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
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categoryarr: [],
      createdby_arr: [],
      paymentmode_arr: [],
      category_name: '',
      spinner: false,
      date: '',
      type: '',
      isDatePickerVisible: false,
      setDatePickerVisibility: false
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
          let createdby_arr = res.map((x, key) => { return { label: x.created_by, value: x.created_by } });
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
    filters.push({ key: 'createdBy', value: text });
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

  setDate(date = null, type = null) {

    this.setState({
      type: type
    })
    let filters = this.state.filters;
    if (type == 'order') {
      filters.push({ key: 'date_created', value: date });
    }
    if (type == 'payment') {

      filters.push({ key: 'payment_status_date', value: date });
    }
    console.log('filters !!!!!!!!!!!!!!', filters);
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      filters: filters
    })


  }
  hideDatePicker() {
    console.log(' visibility !!!!!!!!!!!!!');
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible
    })
  }
  deliveryType(value) {
    let filters = this.state.filters;
    filters.push({ key: 'delivery_type', value: value })
    this.setState({
      filters: filters
    })
  }

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
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              date={new Date()}
              onConfirm={(date) => this.setDate(date, this.state.type)}
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
                  onPress={() => this.setDate(null, 'order')}
                >
                  <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginRight: 10, padding: 10, marginVertical: 10 }}>
                    <Image
                      source={require('../images/calenderIcon.png')}
                    />
                    <Text style={{ marginLeft: 10, color: '#aaa' }}>DD-MM-YY</Text>
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
                  onPress={() => this.setDate(null, 'payment')}
                >

                  <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginLeft: 10, padding: 10, marginVertical: 10 }}>
                    <Image
                      source={require('../images/calenderIcon.png')}
                    />
                    <Text style={{ marginLeft: 10, color: '#aaa' }}>DD-MM-YY</Text>
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
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>
                <TextInput
                  label="Order Channel"
                  style={{ backgroundColor: 'transparent', }}
                  width={width - 50}
                  alignSelf={'center'}
                  color={'#000'}
                />
                <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
                  <Icon
                    size={30}

                    name="caret-down"
                    color={'#707070'}
                  />
                </View>
              </View>

              {this.state.paymentmode_arr.length < 1 ? null :
                <DropDownPicker
                  items={this.state.paymentmode_arr}
                  containerStyle={{ height: 50, width: width - 25, marginTop: 15, }}
                  style={{ backgroundColor: '#fff' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  placeholder="Created By"
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
                  onChangeItem={item => this.onCreatedByText(item.value)}
                />}
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Order')}
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
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
