/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Alert,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import styles from '../css/AddNewCustomerCss';
import fontStyles from '../css/FontCss';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER, CUSTOMER_RELOAD} from '../redux/constants/index';
import {Constants} from '../views/Constant';
import {Text, TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
import CategoryDropdown from './Components/CategoryDropdown';
import DropDownModal from './Components/DropDownModal';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class AddNewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmModal: false,
      complainModal: true,
      spinner: false,
      countries_arr: [],
      states_arr: [],
      lgas_arr: [],
      lgas_id: 0,
      delivery_lgas_id: 0,
      state_id: 0,
      delivery_state_id: 0,
      country_id: 0,
      delivery_country_id: 0,
      delivery_country_name: '',
      delivery_state_name: '',
      delivery_lga_name: '',
      stateDeliveryModal: false,
      lgaDeliveryModal: false,
      countryDeliveryModal: false,
      delivery_house_no: '',
      delivery_street: '',
      delivery_landmark: '',
      is_default: false,
      isFreeDelivery: false,
      isFreeVAT: false,
      is_same_as_customer: true,
      first_name: '',
      last_name: '',
      customer_code: '',
      phone_number: '',
      house_no: '',
      street: '',
      landmark: '',
      email: '',
      country_name: '',
      state_name: '',
      lgas_name: '',
      countryModal: false,
      stateModal: false,
      regionModal: false,
    };
  }

  componentDidMount() {
    this.getCountryList();
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  ceateCustomer() {
    if (
      // this.props.route.params &&
      // this.props.route.params.from == 'invoice' &&
      this.state.email == ''
    ) {
      Alert.alert('Warning', 'Email is required');
      return;
    }

    if (this.state.first_name === '' && this.state.last_name === '') {
      Alert.alert('Warning', 'First name and Last Name are required');
      return;
    } else if (
      this.state.country_id === '' &&
      this.state.delivery_country_id === '' &&
      this.state.delivery_state_id === ''
    ) {
      // && this.state.state_id === ''
      Alert.alert('Warning', 'Country and State are required');
      return;
    } else if (
      this.state.house_no == '' &&
      this.state.delivery_house_no == ''
    ) {
      Alert.alert('Warning', 'House No required');
      return;
    }

    if (this.state.lgas_id == 0 || this.state.lgas_id == '') {
      Alert.alert('Warning', 'Region is required');
      return;
    }
    this.setState({spinner: true});
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify({
        username: this.state.username, //cicodsandbox@yopmail.com
        password: this.state.password, //Sandbox@123
        tenantId: this.state.tenantId, //sandbox
        first_name: this.state.first_name, // required
        last_name: this.state.last_name, // required
        email: this.state.email,
        phone: this.state.phone_number,
        country_id: this.state.country_id, // required
        state_id: this.state.state_id, // required state_id
        lga_id: this.state.lgas_id,
        house_no: this.state.house_no,
        street: this.state.street,
        landmark: this.state.landmark,
        enable_free_vat: this.state.isFreeVAT, // boolean
        enable_free_delivery: this.state.isFreeDelivery, // boolean
      }),
    };

    console.log('body sent  == ', postData);
    fetch(Constants.customerlist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(' create customer response !!!!!!!!!!!', responseJson);

        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          // Alert.alert('MESSAGE', responseJson.message);
          let customer_id = responseJson.data.id;
          this.setState({
            spinner: false,
            countries_arr: [],
            states_arr: [],
            lgas_arr: [],
            lgas_id: 0,
            delivery_lgas_id: 0,
            state_id: 0,
            delivery_state_id: 0,
            country_id: 0,
            delivery_country_id: 0,
            delivery_house_no: '',
            delivery_street: '',
            delivery_landmark: '',
            is_default: false,
            isFreeDelivery: false,
            isFreeVAT: false,
            first_name: '',
            last_name: '',
            customer_code: '',
            phone_number: '',
            house_no: '',
            street: '',
            landmark: '',
            email: '',
            country_name: '',
            state_name: '',
            lgas_name: '',
          });
          this.createCustomerDelivery(customer_id);
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Error !!!', error);
        this.setState({
          spinner: false,
        });
      });
  }

  createCustomerDelivery(customer_id) {
    this.setState({spinner: true});
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify({
        customer_id: customer_id,
        country_id: this.state.delivery_country_id ?? this.state.country_id,
        state_id: this.state.delivery_state_id, // ?? this.state.state_id,
        lga_id: this.state.delivery_lgas_id ?? this.state.lgas_id,
        house_no: this.state.delivery_house_no ?? this.state.house_no,
        street: this.state.delivery_street ?? this.state.street,
        landmark: this.state.delivery_landmark ?? this.state.landmark,
        is_default: this.state.is_default,
      }),
    };
    fetch(Constants.customerdelivery, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(' delivery customer response!!!!!!!!!!!', responseJson);
        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          console.log('fropm$#', this.props.route.params);
          Alert.alert('SUCCESS', 'Customer Created Successfully', [
            {
              text: 'OK',
              onPress: () => {
                if (
                  this.props.route.params &&
                  this.props.route.params.from == 'create_order'
                ) {
                  //redirect to create order screen
                  this.props.setScreenReload({
                    reload: true,
                  });
                  this.props.navigation.navigate('AddCustomer', {
                    newCustomer: true,
                  });
                } else {
                  this.props.setScreenReload({
                    reload: true,
                  });
                  this.props.navigation.navigate('Customer');
                }
              },
            },
          ]);
        } else {
          let message = JSON.stringify(responseJson.status);
          Alert.alert('Error', message);
          this.refs.PopUp.setModal(true, responseJson.status);
        }
      })
      .catch(error => {
        console.log('Error !!!', error);
        this.setState({
          spinner: false,
        });
      });
  }
  getCountryList() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.countrieslist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let countries_arr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          console.log('countries_arr  !!!!!!', countries_arr);
          this.setState({
            countries_arr: countries_arr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Error !!!', error);
        this.setState({
          spinner: false,
        });
      });
  }

  getStateList(url) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~');
    this.setState({spinner: true});
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
      })
      .catch(error => {
        console.log('Error !!!', error);
        this.setState({
          spinner: false,
        });
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
      },
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson states !!!!!!@@@@@@@', responseJson);
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
      })
      .catch(error => {
        console.log('Error !!!', error);
        this.setState({
          spinner: false,
        });
      });
  }

  onSelectCountry = item => {
    console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      spinner: true,
      country_id: item.value,
      country_name: item.label,
      setCountry: true,
      countryModal: false,
      setStates: false,
      setRegion: false,
      state_name: '',
      lgas_name: '',
      state_id: 0,
      lga_id: 0,
    });

    console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);

    let statesUrl = Constants.stateslist + '?country_id=' + item.value;
    console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl);
    this.getStateList(statesUrl);
  };
  onSelectState = item => {
    console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      spinner: true,
      state_id: item.value,
      state_name: item.label,
      setStates: false,
      stateModal: false,
      lgas_name: '',
      lga_id: 0,
    });
    let lgasUrl = Constants.lgaslist + '?state_id=' + item.value;
    console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl);
    this.getLgaList(lgasUrl);
  };
  onSelectLgas = item => {
    this.setState({
      lgas_id: item,
    });
    this.setState({
      spinner: true,
      lgas_id: item.value,
      lgas_name: item.label,
      setRegion: false,
      regionModal: false,
    });
    this.setState({spinner: false});
  };
  onDeliverySelectCountry = item => {
    console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      delivery_country_id: item.value,
      delivery_country_name: item.label,
      countryDeliveryModal: false,
      delivery_state_name: '',
      delivery_state_id: 0,
      delivery_lgas_id: 0,
      delivery_lga_name: '',
    });
    let statesUrl = Constants.stateslist + '?country_id=' + item.value;
    console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl);
    this.getStateList(statesUrl);
  };
  onDeliverySelectState = item => {
    console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      delivery_state_id: item.value,
      stateDeliveryModal: false,
      delivery_state_name: item.label,
      delivery_lgas_id: 0,
      delivery_lga_name: '',
    });
    let lgasUrl = Constants.lgaslist + '?state_id=' + item.value;
    console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl);
    this.getLgaList(lgasUrl);
  };
  onDeliverySelectLgas = item => {
    this.setState({
      lgaDeliveryModal: false,
      delivery_lgas_id: item.value,
      delivery_lga_name: item.label,
    });
  };
  get_state() {
    if (this.state.country_name != '') {
      this.setState({stateModal: true});
    } else {
      Alert.alert('Warning!', 'Select Country first');
    }
  }
  get_region() {
    if (this.state.state_name == '') {
      Alert.alert('Warning', 'Select State first');
    } else {
      this.setState({regionModal: true});
    }
  }
  // customerlist
  render() {
    // console.log('countries_arr countries_arr countries_arr', this.state.countries_arr)
    return (
      <Scaffold>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          // style={{marginBottom: 150}}
          enableOnAndroid={true}
          scrollEnabled={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}>
          <View style={[{}, styles.mainView]}>
            <Header navigation={this.props.navigation} />
            <Spinner
              visible={this.state.spinner}
              textContent={'Please Wait...'}
              textStyle={{color: '#fff'}}
              color={'#fff'}
            />
            <View style={[{}, styles.backRowView]}>
              <NavBack
                title="ADD NEW CUSTOMER"
                onClick={() => this.props.navigation.goBack()}
              />
            </View>
            <ScrollView>
              <View>
                <View style={[{}, styles.mainFormView]}>
                  <TextInput
                    label="First Name*"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({first_name: text})}
                    value={this.state.first_name}
                  />
                  <TextInput
                    label="Last Name*"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({last_name: text})}
                    value={this.state.last_name}
                  />
                  <TextInput
                    label="Customer Code"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({customer_code: text})}
                    value={this.state.customer_code}
                  />
                  <TextInput
                    keyboardType="email-address"
                    label={`Email${
                      this.props.route.params &&
                      this.props.route.params.from == 'invoice'
                        ? '*'
                        : '*'
                    }`}
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <TextInput
                        keyboardType="numeric"
                        onChangeText={text =>
                          this.setState({phone_number: text})
                        }
                        label="Phone Number"
                        style={{backgroundColor: 'transparent'}}
                        width={width / 2 - 20}
                        alignSelf={'center'}
                        color={'#000'}
                        value={this.state.phone_number}
                      />
                    </View>
                    <View style={{flex: 1, marginHorizontal: 5}}>
                      <TextInput
                        onChangeText={text => this.setState({house_no: text})}
                        label="House No."
                        style={{backgroundColor: 'transparent'}}
                        width={width / 2 - 20}
                        alignSelf={'center'}
                        color={'#000'}
                        value={this.state.house_no}
                      />
                    </View>
                  </View>
                  <TextInput
                    label="Street"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({street: text})}
                    value={this.state.street}
                  />
                  <TextInput
                    label="Landmark"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({landmark: text})}
                    value={this.state.landmark}
                  />
                  <View style={[{}, styles.formRow]}>
                    <View
                      style={[
                        {alignItems: 'center', paddingTop: 10, marginRight: 3},
                        styles.formColumn,
                      ]}>
                      <CategoryDropdown
                        containerStyle={{flex: 1}}
                        title={
                          this.state.country_name == ''
                            ? 'Select Country *'
                            : this.state.country_name
                        }
                        onPress={() => this.setState({countryModal: true})}
                      />
                      {/* <TouchableOpacity
                      onPress={() => this.setState({countryModal: true})}
                      style={{padding: 10}}>
                      {this.state.country_name == '' ? (
                        <Text style={{color: '#929497'}}>Country *</Text>
                      ) : (
                        <Text style={{color: '#929497'}}>
                          {this.state.country_name}
                        </Text>
                      )}
                    </TouchableOpacity> */}
                      {/* {this.state.countries_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.countries_arr}
                                            containerStyle={{ height: 50, width: width / 2 - 10, }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            itemStyle={{
                                                justifyContent: 'flex-start',
                                            }}
                                            placeholder="Country *"
                                            dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectCountry(item.value)}  //this.onSelectCountry(item.value)}


                                        />
                                        } */}
                    </View>
                    <View
                      style={[
                        {
                          alignItems: 'center',
                          paddingTop: 10,
                          marginLeft: 3,
                          flex: 1,
                        },
                        styles.formColumn,
                      ]}>
                      <CategoryDropdown
                        containerStyle={{flex: 1}}
                        title={
                          this.state.state_name == ''
                            ? 'State *'
                            : this.state.state_name
                        }
                        onPress={() => this.get_state()}
                      />
                      {/* <TouchableOpacity
                      onPress={() => this.get_state()}
                      style={{padding: 10}}>
                      {this.state.state_name == '' ? (
                        <Text style={{color: '#929497'}}>State *</Text>
                      ) : (
                        <Text style={{color: '#929497'}}>
                          {this.state.state_name}
                        </Text>
                      )}
                    </TouchableOpacity> */}
                      {/* {this.state.states_arr.length < 1 ? null : */}
                      {/* <DropDownPicker
                                            items={this.state.states_arr}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.999
                                            }}
                                            placeholder="States *"
                                            containerStyle={{ height: 50, width: width / 2 - 10, }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onDeliverySelectState(item.value)}
                                        /> */}
                      {/* } */}
                    </View>
                  </View>
                  <View style={[{marginTop: 10}, styles.formRow]}>
                    {/* <View style={[{ alignItems: 'center', paddingTop: 10,width:width/2 }]}> */}
                    {/* <TextInput
                                        placeholder="LGA*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" /> */}
                    {/* {this.state.lgas_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.lgas_arr}
                                            placeholder="LGA *"
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999999 }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            
                                            labelStyle={{ color: '#A9A9A9' }}
                                            containerStyle={{ height: 50, width: width / 2 - 10, }}
                                            dropDownStyle={{ zIndex: 99999999, height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectLgas(item.value)}
                                        />} */}

                    <CategoryDropdown
                      containerStyle={{flex: 1}}
                      title={
                        this.state.lgas_name == ''
                          ? 'Region *'
                          : this.state.lgas_name
                      }
                      onPress={() => this.get_region()}
                    />

                    {/* </View> */}
                    {/* <View style={[{}, styles.formColumn]}>

                                </View> */}
                  </View>
                  <View style={[{zIndex: -0.99999}, styles.formRow]}>
                    <View style={[{zIndex: -0.99999}, styles.formColumn]}>
                      <CheckBox
                        style={[{width: width / 2}, styles.cheBox]}
                        onClick={() => {
                          this.setState({
                            isFreeDelivery: !this.state.isFreeDelivery,
                          });
                        }}
                        isChecked={this.state.isFreeDelivery}
                        rightText={'Enable Free Delivery'}
                        rightTextStyle={[
                          {color: '#4E4D4D'},
                          fontStyles.normal13,
                        ]}
                        checkBoxColor={'#929497'}
                      />
                    </View>
                    <View style={[{}, styles.formColumn]}>
                      <CheckBox
                        style={[
                          {width: width / 2, zIndex: -99999},
                          styles.cheBox,
                        ]}
                        onClick={() => {
                          this.setState({
                            isFreeVAT: !this.state.isFreeVAT,
                          });
                        }}
                        size={2}
                        isChecked={this.state.isFreeVAT}
                        rightText={'Enable VAT Exemption'}
                        rightTextStyle={[
                          {color: '#4E4D4D'},
                          fontStyles.normal13,
                        ]}
                        checkBoxColor={'#929497'}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    {marginTop: 10, marginBottom: 20},
                    styles.mainFormView,
                  ]}>
                  <Text style={{color: '#929497', fontWeight: 'bold'}}>
                    Delivery Address
                  </Text>

                  <View>
                    <CheckBox
                      style={[{width: width}, styles.cheBox]}
                      onClick={() => {
                        this.setState({
                          is_same_as_customer: !this.state.is_same_as_customer,
                        });
                      }}
                      size={2}
                      isChecked={this.state.is_same_as_customer}
                      rightText={'Same as customer’s address'}
                      rightTextStyle={[{color: '#4E4D4D'}, fontStyles.normal13]}
                      checkBoxColor={'#929497'}
                    />
                  </View>
                  {this.state.is_same_as_customer == false ? (
                    <View>
                      <TextInput
                        label="House No.*"
                        style={{backgroundColor: 'transparent'}}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                        onChangeText={text =>
                          this.setState({delivery_house_no: text})
                        }
                      />
                      <TextInput
                        label="Street*"
                        style={{backgroundColor: 'transparent'}}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                        onChangeText={text =>
                          this.setState({delivery_street: text})
                        }
                      />
                      <TextInput
                        label="Landmark"
                        style={{backgroundColor: 'transparent'}}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                        onChangeText={text =>
                          this.setState({delivery_landmark: text})
                        }
                      />
                      <View style={[{}, styles.formRow]}>
                        <View style={[{}, styles.formColumn]}>
                          {this.state.countries_arr.length < 1 ? null : (
                            <CategoryDropdown
                              containerStyle={{flex: 1}}
                              title={
                                this.state.delivery_country_name == ''
                                  ? 'Select Country *'
                                  : this.state.delivery_country_name
                              }
                              onPress={() =>
                                this.setState({countryDeliveryModal: true})
                              }
                            />
                          )}
                        </View>
                      </View>
                      <View style={[{}, styles.formRow]}>
                        <View style={[{}, styles.formColumn]}>
                          {this.state.states_arr.length < 1 ? null : (
                            <CategoryDropdown
                              containerStyle={{flex: 1}}
                              title={
                                this.state.delivery_state_name == ''
                                  ? 'Select State *'
                                  : this.state.delivery_state_name
                              }
                              onPress={() =>
                                this.setState({stateDeliveryModal: true})
                              }
                            />
                          )}
                        </View>
                        <View style={[{}, styles.formColumn]}>
                          {this.state.lgas_arr.length < 1 ? null : (
                            <CategoryDropdown
                              containerStyle={{flex: 1}}
                              title={
                                this.state.delivery_lga_name == ''
                                  ? 'Select Region *'
                                  : this.state.delivery_lga_name
                              }
                              onPress={() =>
                                this.setState({lgaDeliveryModal: true})
                              }
                            />
                          )}
                        </View>
                      </View>
                      <View>
                        <CheckBox
                          style={[{width: width}, styles.cheBox]}
                          onClick={() => {
                            this.setState({
                              is_default: !this.state.is_default,
                            });
                          }}
                          size={2}
                          isChecked={this.state.is_default}
                          rightText={'Set as default'}
                          rightTextStyle={[
                            {color: '#4E4D4D'},
                            fontStyles.normal13,
                          ]}
                          checkBoxColor={'#929497'}
                        />
                      </View>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => this.ceateCustomer()}
                    style={[{}, styles.redTouchView]}>
                    <Text style={{color: '#fff'}}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <DropDownModal
              title="Choose Country"
              selected={this.state.country_id}
              itemFull={true}
              showdropDownModal={this.state.countryModal}
              handleClose={() => this.setState({countryModal: false})}
              onSelected={this.onSelectCountry}
              data={this.state.countries_arr}
            />

            <DropDownModal
              title="Choose Delivery Country"
              selected={this.state.delivery_country_id}
              itemFull={true}
              showdropDownModal={this.state.countryDeliveryModal}
              handleClose={() => this.setState({countryDeliveryModal: false})}
              onSelected={this.onDeliverySelectCountry}
              data={this.state.countries_arr}
            />

            <DropDownModal
              title="Choose State"
              selected={this.state.state_id}
              itemFull={true}
              showdropDownModal={this.state.stateModal}
              handleClose={() => this.setState({stateModal: false})}
              onSelected={this.onSelectState}
              data={this.state.states_arr}
            />

            <DropDownModal
              title="Choose Delivery State"
              selected={this.state.delivery_state_id}
              itemFull={true}
              showdropDownModal={this.state.stateDeliveryModal}
              handleClose={() => this.setState({stateDeliveryModal: false})}
              onSelected={this.onDeliverySelectState}
              data={this.state.states_arr}
            />

            <DropDownModal
              title="Choose Region"
              selected={this.state.lgas_id}
              itemFull={true}
              showdropDownModal={this.state.regionModal}
              handleClose={() => this.setState({regionModal: false})}
              onSelected={this.onSelectLgas}
              data={this.state.lgas_arr}
            />

            <DropDownModal
              title="Choose Delivery LGA"
              selected={this.state.delivery_lgas_id}
              itemFull={true}
              showdropDownModal={this.state.lgaDeliveryModal}
              handleClose={() => this.setState({lgaDeliveryModal: false})}
              onSelected={this.onDeliverySelectLgas}
              data={this.state.lgas_arr}
            />
          </View>
        </KeyboardAwareScrollView>
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
    setScreenReload: value => dispatch({type: CUSTOMER_RELOAD, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewCustomer);
