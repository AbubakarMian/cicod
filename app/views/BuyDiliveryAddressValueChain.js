/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/BuyDiliveryAddressCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SET_USER,
  LOGOUT_USER,
  SET_DELIVERY_ADDRESS,
  ADD_DELIVERY_FEE_TO_COST,
} from '../redux/constants/index';
import {Container, Content, List, ListItem, Radio} from 'native-base';
import {Picker} from '@react-native-picker/picker';

import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';

const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class BuyDiliveryAddressValueChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFetch: false,
      spinner: false,
      is_selected_address: false,
      addressarr: [],
      delivery_type: this.props.route.params.type ?? '',
      countries_arr: [],
      states_arr: [],
      lgas_arr: [],
      country_id: 0,
      state_id: 0,
      lgas_id: 0,
      lgas_name: '',
      address: '',
      state_name: '',
      country_name: '',
      house_no: '',
      street: '',
      landmark: '',
    };
  }

  selectAddress(object) {
    this.setState({
      is_selected_address: !this.state.is_selected_address,
    });
    this.props.setDeliveryAddress({
      address: object.value,
      country_id: object.country_id,
      state_id: object.state_id,
      type: 'Delivery',
    });
    this.props.navigation.goBack();
  }

  componentDidMount() {
    console.log('ReousfCart@#', this.props.route.params);
    this.getCountryList();
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  getCountryList() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
        'Tenant-ID': this.props.route.params.item.seller_name
          .toLowerCase()
          .replace(/ /g, ''),
      },
    };
    console.log('postDate#2', postData, Constants.deliveryCountriesList);
    fetch(Constants.deliveryCountriesList, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJsonD#@', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          if (res.length == 0) {
            this.setState({countries_arr: [], hasFetch: true});
            console.log('Empty Country');
            Alert.alert('Info', 'Delivery is not set by supplier');

            return;
          }
          let countries_arr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          console.log('countries_arr  !!!!!!', countries_arr);
          this.setState({
            countries_arr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;

          Alert.alert('Error', message);
        }
      });
  }

  getStateList(url) {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
        'Tenant-ID': this.props.route.params.item.seller_name
          .toLowerCase()
          .replace(/ /g, ''),
      },
    };
    console.log('postDaFFRRE', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson states !!!!!!@@@@@@@', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let states_arr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          console.log('states_arr  name name name !!!!!!', states_arr);
          this.setState({
            states_arr: states_arr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  getLgaList(url) {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
        'Tenant-ID': this.props.route.params.item.seller_name.toLowerCase(),
      },
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJsoLg#@', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let lgas_arr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          console.log('lgas_arr  name name name !!!!!!', lgas_arr);
          this.setState({
            lgas_arr: lgas_arr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  onSelectCountry(item, index) {
    console.log('count#$', item, index);
    if (item == 0) {
      return;
    }
    this.setState({
      country_id: item,
      // country_name: item.label
    });
    let statesUrl = Constants.deliveryStateList + '?country_id=' + item;
    console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl);
    this.getStateList(statesUrl);
  }
  onSelectState(item) {
    console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    if (item == 0 || item == '') {
      return;
    }
    this.setState({
      state_id: item,
      //state_name: item.lable
    });
    let lgasUrl = Constants.deliveryLgaList + '?state_id=' + item;
    console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl);
    this.getLgaList(lgasUrl);
  }
  onSelectLgas(item) {
    console.log('jo#', item);
    this.setState({
      lgas_id: item,
      // lgas_name: item.lable,
    });
  }

  submitAddress() {
    if (this.state.countries_arr.length == 0 && this.state.hasFetch) {
      this.props.navigation.goBack();
      return;
    }
    if (this.state.country_id == 0) {
      Alert.alert('Error ', 'Country is required .');

      return;
    }
    if (this.state.state_id == 0) {
      Alert.alert('Error ', 'State is required.');

      return;
    }
    // if (condition) {

    // }
    if (this.state.address.trim() == '') {
      Alert.alert('Error ', 'Address is required');

      return;
    }

    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
        'Tenant-ID': this.props.route.params.item.seller_name
          .toLowerCase()
          .replace(/ /g, ''),
      },
    };
    const url =
      this.state.lgas_id == 0
        ? `${Constants.deliveryCost}?order_amount=${this.props.cart.total_price_with_tax}&country_id=${this.state.country_id}&state_id=${this.state.state_id}`
        : `${Constants.deliveryCost}?order_amount=${this.props.cart.total_price_with_tax}&country_id=${this.state.country_id}&state_id=${this.state.state_id}&lga_id=${this.state.lgas_id}`;
    console.log('poigt#', url, postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('amountDC#@', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          this.props.setDeliveryAddress({
            delivery_fee: responseJson.data,
            lga_id: this.state.lgas_id,
            country_id: this.state.country_id,
            state_id: this.state.state_id,
            address: this.state.address,
            type: 'Delivery',
          });

          this.props.addDeliveryToTotal(responseJson.data);

          this.props.navigation.navigate('CreateOrderValueChain');
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });

    // this.props.setDeliveryAddress({

    //     country_id: this.state.country_id,
    //     state_id: this.state.state_id,
    //     address: this.state.address,
    //     type: 'Delivery'
    // })
    // this.props.navigation.goBack();
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
          <ScrollView>
            <View>
              <NavBack
                title="DELIVERY ADDRESS"
                onClick={() => this.props.navigation.goBack()}
              />
              <View style={[{}, styles.addressContainer]}>
                <View style={[{marginTop: 10}, styles.mainFormView]}>
                  <View>
                    <View style={[{}, styles.formRow]}>
                      <View style={[{}, styles.formColumn]}>
                        <Picker
                          onValueChange={(itemValue, itemLabel, itemIndex) =>
                            this.onSelectCountry(itemValue, itemIndex)
                          }
                          selectedValue={this.state.country_id}>
                          <Picker.Item label="Select Country" value="" />
                          {this.state.countries_arr.map(elem => {
                            console.log('df#', elem);
                            return (
                              <Picker.Item
                                label={elem.label}
                                value={elem.value}
                              />
                            );
                          })}
                        </Picker>

                        {/* <DropDownPicker
                                                placeholder="Country *"
                                                items={this.state.countries_arr}
                                                autoScrollToDefaultValue={true}
                                                containerStyle={{ height: 50, width: width - 20, alignSelf: 'center' }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start',
                                                }}
                                                searchable={true}
                                                searchablePlaceholder="Search country"
                                                dropDownStyle={{zIndex:10000, height: 600, overflow:"scroll", backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectCountry(item)}
                                            /> */}
                      </View>
                    </View>
                    <View style={[{}, styles.formColumn]}>
                      <Picker
                        onValueChange={(itemValue, itemLabel, itemIndex) =>
                          this.onSelectState(itemValue)
                        }
                        selectedValue={this.state.state_id}>
                        <Picker.Item label="Select State" value="" />
                        {this.state.states_arr.map(elem => {
                          console.log('df#', elem);
                          return (
                            <Picker.Item
                              label={elem.label}
                              value={elem.value}
                            />
                          );
                        })}
                      </Picker>

                      {/* <DropDownPicker
                                        zIndex={1000}
                                        disabled={this.state.country_name==""?true:false}
                                            placeholder="States *"
                                            items={this.state.states_arr}
                                           

                                            containerStyle={{ height: 50, width: width - 20, alignSelf: 'center' }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            itemStyle={{
                                                justifyContent: 'flex-start',
                                            }}
                                            dropDownStyle={{zIndex:1, height: 180, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectState(item)}
                                        /> */}
                    </View>
                    <View style={[{}, styles.formColumn]}>
                      <Picker
                        onValueChange={(itemValue, itemLabel, itemIndex) =>
                          this.onSelectLgas(itemValue)
                        }
                        selectedValue={this.state.lgas_id}>
                        <Picker.Item label="Select LGA" value="" />
                        {this.state.lgas_arr.map(elem => {
                          console.log('df#', elem);
                          return (
                            <Picker.Item
                              label={elem.label}
                              value={elem.value}
                            />
                          );
                        })}
                      </Picker>

                      {/* <DropDownPicker
                                        zIndex={1000}
                                        disabled={this.state.country_name==""?true:false}
                                            placeholder="LGA"
                                           
                                            items={this.state.lgas_arr}

                                            containerStyle={{ height: 50, width: width - 20, alignSelf: 'center' }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            itemStyle={{
                                                justifyContent: 'flex-start',
                                            }}
                                            dropDownStyle={{ height: 180, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectLgas(item)}
                                        /> */}
                    </View>
                    <View style={[{marginHorizontal: 10}, styles.formColumn]}>
                      <TextInput
                        disabled={this.state.state_id == 0 ? true : false}
                        label="Address*"
                        style={{backgroundColor: 'transparent'}}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                        onChangeText={text => this.setState({address: text})}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.submitAddress()}
                style={[{marginTop: -20, zIndex: 0.001}, styles.redBtn]}>
                <Text style={{color: '#fff'}}>
                  {this.state.countries_arr.length == 0 && this.state.hasFetch
                    ? 'Go Back'
                    : 'Submit'}
                </Text>
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
    cart: state.cartReducer,
    user: state.userReducer,
    customer: state.customReducer,
    deliveryAddress: state.deliveryAddressReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setDeliveryAddress: value =>
      dispatch({type: SET_DELIVERY_ADDRESS, value: value}),
    addDeliveryToTotal: value =>
      dispatch({type: ADD_DELIVERY_FEE_TO_COST, value: value}),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyDiliveryAddressValueChain);
