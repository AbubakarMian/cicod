import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from '../css/AddDiliveryAddressCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from '../views/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import {Text, TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  SET_USER,
  LOGOUT_USER,
  SET_DELIVERY_ADDRESS,
} from '../redux/constants/index';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import NavBack from './Components/NavBack';

const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class AddDiliveryAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      countries_arr: [],
      states_arr: [],
      lgas_arr: [],
      country_id: 0,
      state_id: 0,
      lgas_id: 0,
      lgas_name: '',
      state_name: '',
      country_name: '',
      house_no: '',
      street: '',
      landmark: '',
      is_default: false,
      setCountry: true,
      setStates: false,
      setRegion: false,
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

  getCountryList() {
    this.setState({spinner: true, states_arr: ''});
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
    this.setState({
      setCountry: true,
      setStates: true,
      setRegion: false,
      state_name: '',
      lgas_name: '',
    });
    console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      spinner: true,
      country_id: item.value,
      country_name: item.label,
      setCountry: false,
      countryModal: false,
    });
    let statesUrl = Constants.stateslist + '?country_id=' + item.value;
    console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl);
    this.setState({spinner: false});
    this.getStateList(statesUrl);
  }
  onSelectState(item) {
    this.setState({
      setCountry: false,
      setStates: true,
      setRegion: false,
      lgas_name: '',
    });
    console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item);
    this.setState({
      spinner: true,
      state_id: item.value,
      state_name: item.label,
      setStates: false,
      stateModal: false,
    });
    let lgasUrl = Constants.lgaslist + '?state_id=' + item.value;
    console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl);
    this.setState({spinner: false});
    this.getLgaList(lgasUrl);
  }
  onSelectLgas(item) {
    this.setState({
      spinner: true,
      lgas_id: item.value,
      lgas_name: item.label,
      setRegion: false,
      regionModal: false,
    });
    this.setState({spinner: false});
  }

  createDeliveryAddress() {
    if (this.state.house_no.trim() === '') {
      Alert.alert('Warning', 'House No required');
      return;
    } else if (this.state.street.trim() == '') {
      Alert.alert('Warning', 'Street Name are required');
      return;
    } else if (this.state.country_id == 0) {
      Alert.alert('Warning', 'Country required');
      return;
    } else if (this.state.state_id == 0) {
      Alert.alert('Warning', 'State required');
      return;
    } else if (this.state.lgas_id == 0) {
      Alert.alert('Warning', 'Region required');
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
        customer_id: this.props.customer.id,
        country_id: this.state.country_id,
        state_id: this.state.state_id,
        lga_id: this.state.lgas_id,
        house_no: this.state.house_no,
        street: this.state.street,
        landmark: this.state.landmark,
        is_default: this.state.is_default,
      }),
    };

    fetch(Constants.customerdelivery, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        console.log('Message RRE', responseJson);
        if (responseJson.status === 'success') {
          let address =
            this.state.house_no +
            ',' +
            this.state.street +
            ',' +
            this.state.landmark +
            ',' +
            this.state.state_name +
            ',' +
            this.state.country_name;

          address = address.replace('undefined,', '');
          await this.props.setDeliveryAddress({
            address: address,
            type: 'delivery',
          });
          console.log('~~~~~~~~~~~~~~~', address);

          Alert.alert('Message', responseJson.message);
          this.props.navigation.navigate('CreateOrder', {render: true});
        } else {
          this.setState({spinner: false});
          let message = responseJson.status;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }
  get_state() {
    if (this.state.country_name != '') {
      this.setState({stateModal: true});
    } else {
      Alert.alert('Select Country first');
    }
  }
  get_region() {
    if (this.state.state_name == '') {
      Alert.alert('Select State first');
    } else {
      this.setState({regionModal: true});
    }
  }
  render() {
    return (
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
              <NavBack
                title="ADD DELIVERY ADDRESS"
                onClick={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={[{}, styles.addressContainer]}>
              <View
                style={[
                  {marginTop: 10, height: height / 1.5},
                  styles.mainFormView,
                ]}>
                <View>
                  <TextInput
                    label="House No.*"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({house_no: text})}
                  />
                  <TextInput
                    label="Street*"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({street: text})}
                  />
                  <TextInput
                    label="Landmark"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text => this.setState({landmark: text})}
                  />
                  <View style={[{}, styles.formRow]}>
                    <View style={[{}, styles.formColumn]}>
                      <TouchableOpacity
                        onPress={() => this.setState({countryModal: true})}
                        style={{
                          padding: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: '#aaaa',
                        }}>
                        {this.state.country_name == '' ? (
                          <Text style={{color: '#929497'}}>Country *</Text>
                        ) : (
                          <Text style={{color: '#929497'}}>
                            {this.state.country_name}
                          </Text>
                        )}
                      </TouchableOpacity>

                      {/* <DropDownPicker
                                                onOpen={()=>
                                                this.setState({
                                                    setCountry:true,
                                                    setStates:false,
                                                    setRegion:false,
                                                    })
                                                }
                                                scrollViewProps={{
                                                    persistentScrollbar: true,
                                                }}
                                                // searchable={true}
                                                dropDownDirection="AUTO"
                                                bottomOffset={200}
                                                isVisible={this.state.setCountry}
                                                placeholder="Country *"
                                                items={this.state.countries_arr}
                                                autoScrollToDefaultValue={true}
                                                containerStyle={{ height: 50, width: width - 20, alignSelf: 'center' }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start',height:height/19
                                                }}
                                                dropDownStyle={{ height: height/4, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectCountry(item)}
                                            /> */}
                    </View>
                  </View>
                  <View style={[{flexDirection: 'row', alignSelf: 'center'}]}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        onPress={() => this.get_state()}
                        style={{
                          padding: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: '#aaaa',
                        }}>
                        {this.state.state_name == '' ? (
                          <Text style={{color: '#929497'}}>State *</Text>
                        ) : (
                          <Text style={{color: '#929497'}}>
                            {this.state.state_name}
                          </Text>
                        )}
                      </TouchableOpacity>
                      {/* <DropDownPicker
                                               onOpen={()=>
                                            this.setState({
                                                 setCountry:false,
                                                 setStates:true,
                                                 setRegion:false,
                                                })
                                             }
                                             scrollViewProps={{
                                                persistentScrollbar: true,
                                            }}
                                            dropDownDirection="AUTO"
                                            bottomOffset={200}
                                             isVisible={this.state.setStates}
                                                placeholder="States *"
                                                items={this.state.states_arr}
                                                autoScrollToDefaultValue={true}
                                                containerStyle={{ height: 50, width: width / 2-20, alignSelf: 'center' }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start',height:height/19
                                                }}
                                                dropDownStyle={{ height:120, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectState(item)}
                                            /> */}
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        onPress={() => this.get_region()}
                        style={{
                          padding: 10,
                          borderBottomWidth: 1,
                          marginLeft: 5,
                          borderBottomColor: '#aaaa',
                        }}>
                        {this.state.lgas_name == '' ? (
                          <Text style={{color: '#929497'}}>Region *</Text>
                        ) : (
                          <Text style={{color: '#929497'}}>
                            {this.state.lgas_name}
                          </Text>
                        )}
                      </TouchableOpacity>
                      {/* <DropDownPicker
                                                onOpen={()=>
                                                this.setState({
                                                    setCountry:false,
                                                    setStates:false,
                                                    setRegion:true,
                                                   })
                                                }
                                                scrollViewProps={{
                                                    persistentScrollbar: true,
                                                }}
                                                dropDownDirection="AUTO"
                                                bottomOffset={200}
                                                isVisible={this.state.setRegion}
                                                placeholder="Region *"
                                                items={this.state.lgas_arr}
                                                autoScrollToDefaultValue={true}
                                                containerStyle={{ height: 50, width: width /2- 20, alignSelf: 'center' }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start',height:height/19
                                                }}
                                                dropDownStyle={{ height:120,zIndex:0.999, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectLgas(item)}
                                                
                                            /> */}
                    </View>
                  </View>
                  <View style={{zIndex: -0.999, marginVertical: 20}}>
                    <CheckBox
                      style={[{width: width, zIndex: -0.999}, styles.cheBox]}
                      onClick={() => {
                        this.setState({
                          is_default: !this.state.is_default,
                        });
                      }}
                      isChecked={this.state.is_default}
                      rightText={'Set as default'}
                      rightTextStyle={{
                        color: '#4E4D4D',
                        fontSize: 13,
                        fontFamily: 'Open Sans',
                      }}
                      checkBoxColor={'#4E4D4D'}
                    />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.createDeliveryAddress()}
              style={[{zIndex: -0.999}, styles.redBtn]}>
              <Text style={{color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          visible={this.state.countryModal}
          transparent={true}
          hasBackdrop={true}
          onBackdropPress={() => this.setState({countryModal: false})}
          deviceHeight={height}
          deviceWidth={width}
          justifyContent={'center'}
          alignItems={'center'}
          backgroundColor={'#000'}
          opacity={0.8}>
          <View
            style={{
              maxHeight: height / 1.5,
              width: width / 1.5,
              backgroundColor: 'white',
              zIndex: 9999,
              opacity: 1,
              paddingHorizontal: 5,
              borderRadius: 5,
              paddingVertical: 5,
            }}>
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                (({highlighted}) => (
                  <View
                    style={[
                      style.separator,
                      highlighted && {marginLeft: 0, height: height / 3},
                    ]}
                  />
                ))
              }
              data={this.state.countries_arr} //[{ title: 'Title Text', key: 'item1' }]
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  key={item.key}
                  style={{
                    marginBottom: 2,
                    paddingBottom: 5,
                    paddingHorizontal: 5,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                  }}
                  onPress={() => this.onSelectCountry(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 5,
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      width: width,
                      borderRadius: 10,
                    }}>
                    <Text>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={this.state.stateModal}
          transparent={true}
          hasBackdrop={true}
          onBackdropPress={() => this.setState({stateModal: false})}
          deviceHeight={height}
          deviceWidth={width}
          justifyContent={'center'}
          alignItems={'center'}
          backgroundColor={'#000'}
          opacity={0.8}>
          <View
            style={{
              maxHeight: height / 1.5,
              width: width / 1.5,
              backgroundColor: 'white',
              opacity: 1,
              paddingHorizontal: 5,
              borderRadius: 5,
              paddingVertical: 5,
            }}>
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                (({highlighted}) => (
                  <View
                    style={[
                      style.separator,
                      highlighted && {marginLeft: 0, height: height / 3},
                    ]}
                  />
                ))
              }
              data={this.state.states_arr} //[{ title: 'Title Text', key: 'item1' }]
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  key={item.key}
                  style={{
                    marginBottom: 1,
                    paddingBottom: 5,
                    paddingHorizontal: 5,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                  }}
                  onPress={() => this.onSelectState(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 5,
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      width: width,
                      borderRadius: 10,
                    }}>
                    <Text>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={this.state.regionModal}
          transparent={true}
          hasBackdrop={true}
          onBackdropPress={() => this.setState({regionModal: false})}
          deviceHeight={height}
          deviceWidth={width}
          justifyContent={'center'}
          alignItems={'center'}
          backgroundColor={'#000'}
          opacity={0.8}>
          <View
            style={{
              maxHeight: height / 1.5,
              width: width / 1.5,
              backgroundColor: 'white',
              opacity: 1,
              paddingHorizontal: 5,
              borderRadius: 5,
              paddingVertical: 5,
            }}>
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                (({highlighted}) => (
                  <View
                    style={[
                      style.separator,
                      highlighted && {marginLeft: 0, height: height / 3},
                    ]}
                  />
                ))
              }
              data={this.state.lgas_arr} //[{ title: 'Title Text', key: 'item1' }]
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  key={item.key}
                  style={{
                    marginBottom: 1,
                    paddingBottom: 5,
                    paddingHorizontal: 5,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                  }}
                  onPress={() => this.onSelectLgas(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 5,
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      width: width,
                      borderRadius: 10,
                    }}>
                    <Text>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    customer: state.customReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    setDeliveryAddress: value =>
      dispatch({type: SET_DELIVERY_ADDRESS, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDiliveryAddress);
