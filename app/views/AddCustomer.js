import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import splashImg from '../images/splash.jpg';
import styles from '../css/AddCustomerCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import {SET_USER, SET_CUSTOMER} from '../redux/constants/index';
import {Item} from 'native-base';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isChecked: false,
      searchPress: 1,
      spinner: false,
      customerData: [],
      search_text: '',
    };
  }
  seacrhClick() {
    if (this.state.searchPress === 1) {
      console.log('**********');
      this.setState({searchPress: 2});
    } else if (this.state.searchPress === 2) {
      console.log('#########');
      this.setState({searchPress: 2});
    }
  }
  searchText() {
    this.getCustomers(this.state.search_text);
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  getCustomers(search_text) {
    let param = 'first_name';
    // if(search_text == ''){
    //     return;
    // }
    // if(search_text.test(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)==0){
    //     para='email';
    //     param='first_name';
    //     return;
    // }else{
    //     param='phone'
    // }

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
      'url~~~~~~~~',
      Constants.customerlist + '?' + param + '=' + search_text,
    );
    console.log('TTTTTTTTT', this.props.user.access_token);
    fetch(Constants.customerlist + '?search=' + search_text, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          console.log('KKKKKKKKK', responseJson);
          this.setState({
            customerData: responseJson.data,
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
      });
  }

  async userInfo(item) {
    console.log('ITEMS !!!!!!!!!!', item);
    let user_data = {
      customer_id: item.id,
      customer_name: item.first_name + ' ' + item.last_name,
      customer_email: item.email,
      customer_phone: item.phone,
      customer_country: item.country,
      customer_state: item.state,
      customer_lga: item.lga,
      customer_address: item.address,
    };
    await this.props.setCustomer(user_data);
    console.log('user info !!!!!!!!!!!!!!! @@@@@@@@@@@@@', this.props);
    this.props.navigation.navigate('CreateOrder');
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
          <View style={[{}, styles.backHeaderRowView]}>
            <NavBack
              title="ADD NEW CUSTOMER"
              onClick={() => this.props.navigation.goBack()}
            />
          </View>
          <View>
            <Searchbar
              placeholder="Search a Customer"
              iconColor="#929497"
              style={{
                width: width - 20,
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 5,
                elevation: 0,
                borderColor: '#D8DCDE',
              }}
              onChangeText={text => this.setState({search_text: text})}
              onSubmitEditing={() => this.searchText()}
              //update
            ></Searchbar>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 10,
                width: width - 20,
                alignSelf: 'center',
                borderBottomColor: '#E6E6E6',
              }}></View>
            {/* <View style={[{}, styles.searchContainer]}>
                            <Image
                                style={{height:20,width:20}}
                                source={require('../images/products/searchicon.png')}
                            />
                            <TextInput
                                label="Search Customer"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onSubmitEditing={() => this.searchText()}
                                // onPressIn={() => this.seacrhClick()}
                                onChangeText={(text) => this.setState({ search_text: text })}
                                
                            />
                        </View> */}
            {/* <View style={[{},styles.contentView]}>
                          <Image 
                          source={require('../images/user-circle.png')}
                          />
                          <Text style={[{},styles.contentViewHeadingText]}>No customer selected</Text>
                          <Text style={[{},styles.contentViewDescText]}>Search for a customer</Text>
                        </View> */}

            {this.state.customerData.length != 0 ? (
              <View>
                <FlatList
                  data={this.state.customerData}
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
                  renderItem={({item, index, separators}) => (
                    <View
                      style={[
                        {paddingVertical: 10},
                        styles.custommerDeatailContainerView,
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.userInfo(item);
                        }}>
                        <View style={[{}, styles.custommerDtailCarView]}>
                          <View style={[{}, styles.custommerNameRow]}>
                            <Icon name="user-circle" size={15} />
                            <Text style={[{}, styles.custommerNameText]}>
                              {item.first_name + ' ' + item.last_name}
                            </Text>
                            <Icon
                              style={[{}, styles.custommerNameRightAngle]}
                              name="angle-right"
                              size={20}
                            />
                          </View>
                          <View style={[{}, styles.custommerDtailCardRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Email:{' '}
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              {item.email}
                            </Text>
                          </View>
                          <View style={[{}, styles.custommerDtailCardRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Phone:{' '}
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              {item.phone}
                            </Text>
                          </View>
                          <View style={[{}, styles.custommerDtailCardRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Customer Address:{' '}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              {item.address}
                            </Text>
                          </View>
                        </View>
                        <View style={[{}, styles.countingContainer]}>
                          <View style={[{}, styles.countingRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Avail. Balance
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              ₦ {item.available_balance}
                            </Text>
                          </View>
                          <View style={[{}, styles.countingRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Acct. Balance
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              ₦ {item.account_balance}
                            </Text>
                          </View>
                          <View style={[{}, styles.countingRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Credit Balance
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              ₦ {item.credit_note_balance}
                            </Text>
                          </View>
                        </View>
                        <View style={[{}, styles.countingContainer]}>
                          <View style={[{}, styles.countingRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Loyalty Points
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              {item.loyalty_points}
                            </Text>
                          </View>
                          <View style={[{}, styles.countingRowView]}>
                            <Text
                              style={[{}, styles.custommerDtailCardBoldText]}>
                              Credit Note
                            </Text>
                            <Text
                              style={[{}, styles.custommerDtailCardNormalText]}>
                              ₦ {item.credit_note_balance}
                            </Text>
                          </View>
                          <View style={[{}, styles.countingRowView]}></View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View style={[{}, styles.contentView]}>
                <Image
                  style={{height: 100, width: 100}}
                  source={require('../images/user-circle.png')}
                />
                <Text style={[{}, styles.contentViewHeadingText]}>
                  No customer selected
                </Text>
                <Text style={[{color: '#929497'}, fontStyles.normal15]}>
                  Search for a customer
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AddNewCustomer')
                  }
                  style={[{}, styles.addCustommerRowView]}>
                  <Image source={require('../images/circlePlus.png')} />
                  <Text
                    style={[
                      {color: '#4E4D4D', marginLeft: 10},
                      fontStyles.bold15,
                    ]}>
                    Add new customer
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Scaffold>
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
    setCustomer: value => dispatch({type: SET_CUSTOMER, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
