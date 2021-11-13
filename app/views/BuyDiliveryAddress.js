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
} from '../redux/constants/index';
import {Container, Content, List, ListItem, Radio} from 'native-base';
import Scaffold from './Components/Scaffold';

const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class BuyDiliveryAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      is_selected_address: false,
      addressarr: [],
      delivery_type: this.props.route.params.type ?? '',
      countries_arr: [],
      states_arr: [],
      lgas_arr: [],
      country_id: 0,
      state_id: 0,
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
        //'Tenant-ID': this.props.route.params.item.seller_name.toLowerCase()
      },
    };
    console.log('postDate#2', postData, Constants.deliveryCountriesList);
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
      });
  }

  onSelectCountry(item) {
    console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      country_id: item.value,
      country_name: item.label,
    });
    let statesUrl = Constants.stateslist + '?country_id=' + item.value;
    console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl);
    this.getStateList(statesUrl);
  }
  onSelectState(item) {
    console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      state_id: item.value,
      state_name: item.lable,
    });
    let lgasUrl = Constants.lgaslist + '?state_id=' + item.value;
    console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl);
    this.getLgaList(lgasUrl);
  }
  onSelectLgas(item) {
    this.setState({
      lgas_id: item.value,
      lgas_name: item.lable,
    });
  }

  submitAddress() {
    if (this.state.country_id == 0 || this.state.state_id == 0) {
      Alert.alert('Error ', 'Country, states and address are required .');

      return;
    }
    this.props.setDeliveryAddress({
      country_id: this.state.country_id,
      state_id: this.state.state_id,
      address: this.state.address,
      type: 'Delivery',
    });
    this.props.navigation.goBack();
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
              <View style={[{}, styles.backHeaderRowView]}>
                <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate('BuyCreateOrder')}
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-left" size={25} color="#929497" />
                </TouchableOpacity>
                <View style={[{}, styles.backHeadingView]}>
                  <Text style={[{}, styles.backHeadingText]}>
                    DELIVERY ADDRESS
                  </Text>
                </View>
              </View>
              <View style={[{}, styles.addressContainer]}>
                <View style={[{marginTop: 10}, styles.mainFormView]}>
                  <View>
                    <View style={[{}, styles.formRow]}>
                      <View style={[{}, styles.formColumn]}>
                        {this.state.country_name == '' ? (
                          <Text style={{color: '#929497'}}>Country *</Text>
                        ) : (
                          <Text style={{color: '#929497'}}>
                            {this.state.country_name}
                          </Text>
                        )}
                        <DropDownPicker
                          placeholder="Country *"
                          items={this.state.countries_arr}
                          autoScrollToDefaultValue={true}
                          containerStyle={{
                            height: 50,
                            width: width - 20,
                            alignSelf: 'center',
                          }}
                          style={{
                            backgroundColor: '#fff',
                            borderWidth: 0,
                            borderBottomWidth: 0.5,
                          }}
                          itemStyle={{
                            justifyContent: 'flex-start',
                          }}
                          searchable={true}
                          searchablePlaceholder="Search country"
                          dropDownStyle={{
                            zIndex: 10000,
                            height: 600,
                            overflow: 'scroll',
                            backgroundColor: '#fff',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            opacity: 1,
                          }}
                          labelStyle={{color: '#A9A9A9'}}
                          onChangeItem={item => this.onSelectCountry(item)}
                        />
                      </View>
                    </View>
                    <View style={[{}, styles.formColumn]}>
                      <DropDownPicker
                        zIndex={1000}
                        disabled={this.state.country_name == '' ? true : false}
                        placeholder="States *"
                        items={this.state.states_arr}
                        items={this.state.states_arr}
                        containerStyle={{
                          height: 50,
                          width: width - 20,
                          alignSelf: 'center',
                        }}
                        style={{
                          backgroundColor: '#fff',
                          borderWidth: 0,
                          borderBottomWidth: 0.5,
                        }}
                        itemStyle={{
                          justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{
                          height: 180,
                          backgroundColor: '#fff',
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          opacity: 1,
                        }}
                        labelStyle={{color: '#A9A9A9'}}
                        onChangeItem={item => this.onSelectState(item)}
                      />
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
                style={[{marginTop: -20}, styles.redBtn]}>
                <Text style={{color: '#fff'}}>Submit</Text>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyDiliveryAddress);
