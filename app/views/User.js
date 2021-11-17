import React from 'react';
import {
  BackHandler,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/UserCss';
import fontStyles from '../css/FontCss';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from './Constant';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  SET_USER,
  LOGOUT_USER,
  ADD_TO_PRODUCT,
  REMOVE_FROM_CART,
} from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Scaffold from './Components/Scaffold';

var {width, height} = Dimensions.get('window');

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      spinner: false,
      spinner_new: false,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      avatar: '',
      role: '',
      tabViewIndex: 1,
      profile: null,
      user: null,
    };
  }
  ressetPassword() {
    console.log('Resset Resset Resset ');
  }

  async componentDidMount() {
    this.getUserDetail();
    this.getValidatedUserDetail();
  }

  getValidatedUserDetail() {
    this.setState({spinner_new: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log(this.props.user.access_token);
    console.log('url', Constants.validatedUser);
    fetch(Constants.validatedUser, postData)
      .then(response => response.json())
      .then(async responseJson => {
        // console.log('!!!!!!!!!responseJson @@@@@@@@###########', responseJson.data)
        // console.log('Constants.marchantDetail @@@@@@@@###########', Constants.marchantDetail)
        // console.log('this.props.user.access_token@@@@@@@@###########', this.props.user.access_token)
        this.setState({
          spinner_new: false,
        });
        if (responseJson.status === 'SUCCESS') {
          let merchant_contact = responseJson;
          console.log('~~~~validuser$#~~~', responseJson);
          this.setState({
            user: responseJson.user,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  getUserDetail() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log(this.props.user.access_token);
    console.log('url', Constants.marchantDetail);
    fetch(Constants.marchantDetail, postData)
      .then(response => response.json())
      .then(async responseJson => {
        // console.log('!!!!!!!!!responseJson @@@@@@@@###########', responseJson.data)
        // console.log('Constants.marchantDetail @@@@@@@@###########', Constants.marchantDetail)
        // console.log('this.props.user.access_token@@@@@@@@###########', this.props.user.access_token)
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'SUCCESS') {
          let merchant_contact = responseJson.merchant;
          console.log('~~~~~~~~~~', responseJson.merchant);
          this.setState({
            email: merchant_contact.email,
            first_name: merchant_contact.companyName, //contactPerson
            phone: merchant_contact.businessPhone,
            role: merchant_contact.customerCategory,
            avatar: merchant_contact.logo,
            profile: responseJson.merchant,
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
  async logout_user() {
    this.props.logoutUser();
    await AsyncStorage.removeItem('User');
    BackHandler.exitApp();
  }

  tabView = () => {
    if (this.state.tabViewIndex == 1) {
      return this.viewOne();
    } else if (this.state.tabViewIndex == 2) {
      return this.viewTwo();
    } else if (this.state.tabViewIndex == 3) {
      return this.viewThree();
    }
  };

  viewOne() {
    if (!this.state.user) return null;
    return (
      <Scaffold style={{flex: 1}}>
        <View>
          <View style={{flexDirection: 'row', width: width, marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={[{}, styles.userInfoLable]}>First Name</Text>
              <Text
                style={[
                  {color: '#4E4D4D', marginBottom: 10},
                  fontStyles.normal15,
                ]}>
                {this.state.user.firstname}
              </Text>
              <Text style={[{}, styles.userInfoLable]}>Last Name</Text>
              <Text
                style={[
                  {color: '#4E4D4D', marginBottom: 10},
                  fontStyles.normal15,
                ]}>
                {this.state.user.lastname ?? this.state.user.lastname}
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{height: 50, width: 50, borderRadius: 50}}
                source={
                  this.state.avatar == '' || this.state.avatar == null
                    ? require('../images/profilepic.png')
                    : {uri: this.state.avatar}
                }
              />
            </View>
          </View>
          <Text style={[{}, styles.userInfoLable]}>Email</Text>
          <Text
            style={[{color: '#4E4D4D', marginBottom: 10}, fontStyles.normal15]}>
            {this.state.user.email}
          </Text>
          <Text style={[{}, styles.userInfoLable]}>Phone Number</Text>
          <Text
            style={[{color: '#4E4D4D', marginBottom: 10}, fontStyles.normal15]}>
            {this.state.user.phone}
          </Text>
          <Text style={[{}, styles.userInfoLable]}>Role</Text>
          <Text
            style={[{color: '#4E4D4D', marginBottom: 10}, fontStyles.normal15]}>
            {this.state.user.roles}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChangePassword')}
            style={[{}, styles.changePasswordView]}>
            <Icon name="lock" color={'#B1272C'} size={30} />
            <Text style={[{}, styles.changePasswordText]}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </Scaffold>
    );
  }

  viewTwo() {
    return (
      <View>
        <View style={{flexDirection: 'row', width: width, marginTop: 10}}>
          <View style={{flex: 1}}>
            <Text style={[{}, styles.userInfoLable]}>Company Name</Text>
            <Text
              style={[
                {color: '#4E4D4D', marginBottom: 10},
                fontStyles.normal15,
              ]}>
              {this.state.profile.companyName}
            </Text>
            <Text style={[{}, styles.userInfoLable]}>Company Email</Text>
            <Text
              style={[
                {color: '#4E4D4D', marginBottom: 10},
                fontStyles.normal15,
              ]}>
              {this.state.profile.email}
            </Text>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={[{}, styles.userInfoLable]}>Country</Text>
              <Text
                style={[
                  {color: '#4E4D4D', marginBottom: 10},
                  fontStyles.normal15,
                ]}>
                {this.state.profile.country}
              </Text>
            </View>

            <View>
              <Text style={[{}, styles.userInfoLable]}>Business Sector</Text>
              <Text
                style={[
                  {color: '#4E4D4D', marginBottom: 10},
                  fontStyles.normal15,
                ]}>
                {this.state.profile.sectortype}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderColor: '#D8D8D8',
              borderWidth: 1,
              marginBottom: 10,
              marginTop: 20,
            }}
          />
        </View>

        <Text
          style={[styles.userInfoLable, {color: '#2F2E7C', marginBottom: 10}]}>
          Business Locations
        </Text>
        {this.state.profile.merchantBusinessStructure &&
          this.state.profile.merchantBusinessStructure.length > 0 &&
          this.state.profile.merchantBusinessStructure.map(business => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <View>
                  <Text style={[{}, styles.userInfoLable]}>City</Text>
                  <Text
                    style={[
                      {color: '#4E4D4D', marginBottom: 10},
                      fontStyles.normal15,
                    ]}>
                    {business.city}
                  </Text>
                </View>

                <View>
                  <Text style={[{}, styles.userInfoLable]}>Location</Text>
                  <Text
                    style={[
                      {color: '#4E4D4D', marginBottom: 10},
                      fontStyles.normal15,
                    ]}>
                    {business.location}
                  </Text>
                </View>
              </View>
            );
          })}

        <View
          style={{
            borderColor: '#D8D8D8',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <Text
          style={[styles.userInfoLable, {color: '#2F2E7C', marginBottom: 10}]}>
          Contact Persons
        </Text>
        {this.state.profile.contact &&
          this.state.profile.contact > 0 &&
          this.state.profile.contact.map(contact => {
            return (
              <View style={{marginBottom: 10}}>
                <Text style={[{}, styles.userInfoLable]}>Fullname</Text>
                <Text
                  style={[
                    {color: '#4E4D4D', marginBottom: 10},
                    fontStyles.normal15,
                  ]}>
                  {contact.name}
                </Text>
                <Text style={[{}, styles.userInfoLable]}>Email</Text>
                <Text
                  style={[
                    {color: '#4E4D4D', marginBottom: 10},
                    fontStyles.normal15,
                  ]}>
                  {contact.email}
                </Text>
                <Text style={[{}, styles.userInfoLable]}>Phone number</Text>
                <Text
                  style={[
                    {color: '#4E4D4D', marginBottom: 10},
                    fontStyles.normal15,
                  ]}>
                  {contact.phone}
                </Text>
              </View>
            );
          })}
      </View>
    );
  }

  viewThree() {
    return (
      <View style={{paddingBottom: 40}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: width,
            marginTop: 10,
          }}>
          <View>
            <Text style={{fontWeight: 'bold'}}>
              {this.state.user.firstname}
            </Text>
            <Text style={{color: '#929497', fontSize: 12}}>
              {this.state.user.email}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 50,
            }}>
            <Text style={{fontWeight: 'bold'}}>USER</Text>
            <View
              style={{
                // marginRight: 50,
                backgroundColor: '#DAF8EC',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                borderRadius: 10,
                width: 80,
              }}>
              <Text style={{color: '#26C281'}}>Active</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
          <Image
            style={{height: 70, width: 70}}
            source={require('../images/home/AddUserInfo.png')}
          />

          <Text style={{fontWeight: 'bold', color: '#4E4D4D', fontSize: 20}}>
            Want to add more user?
          </Text>
          <Text>Please access on the web.</Text>

          {/* <TouchableOpacity
            style={{
              borderWidth: 1,
              marginTop: 15,
              backgroundColor: '#fff',
              borderColor: '#2F2E7C',
              paddingVertical: 10,
              padding: 15,
              borderRadius: 100,
            }}>
            <Text style={{color: '#2F2E7C'}}>Access Now</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation} />
        <Spinner
          visible={this.state.spinner || this.state.spinner_new}
          textContent={'Please Wait...'}
          textStyle={{color: '#fff'}}
          color={'#fff'}
        />

        <TouchableOpacity
          // onPress={()=>this.props.navigation.navigate('More')}
          onPress={() => this.props.navigation.goBack()}>
          <View style={[{}, styles.headingRow]}>
            <Icon name="arrow-left" size={20} color={'#929497'} />

            <Text style={[{}, styles.moreText]}>ACCOUNT</Text>
          </View>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={[{borderRadius: 10}, styles.contentContainer]}>
              <View
                style={[
                  styles.tabView,
                  {borderBottomColor: '#E6E6E6', borderBottomWidth: 1},
                ]}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.tabViewIndex === 1 ? '#B1272C' : '#E6E6E6',
                    paddingVertical: 0,
                  }}
                  onPress={() => {
                    this.setState({tabViewIndex: 1});
                  }}>
                  <Text
                    style={{
                      color:
                        this.state.tabViewIndex === 1 ? '#B1272C' : '#929497',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    User Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.tabViewIndex === 2 ? '#B1272C' : '#E6E6E6',
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    this.setState({tabViewIndex: 2});
                  }}>
                  <Text
                    style={{
                      color:
                        this.state.tabViewIndex === 2 ? '#B1272C' : '#929497',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Company Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderBottomWidth: 2,
                    borderBottomColor:
                      this.state.tabViewIndex === 3 ? '#B1272C' : '#E6E6E6',
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    this.setState({tabViewIndex: 3});
                  }}>
                  <Text
                    style={{
                      color:
                        this.state.tabViewIndex === 3 ? '#B1272C' : '#929497',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Users
                  </Text>
                </TouchableOpacity>
              </View>
              <this.tabView />
            </View>

            <TouchableOpacity
              onPress={() => this.logout_user()}
              style={[{}, styles.logoutView]}>
              <Icon name="sign-out" color={'#929497'} size={30} />
              <Text style={[{}, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
            <Text
              style={[{alignSelf: 'center'}, styles.bottomDescText]}
              numberOfLines={2}>
              CICOD Merchant Mobile App is a product of Crown Interactive
            </Text>
            <Text style={[{alignSelf: 'center'}, styles.bottomVersioncText]}>
              Version 1.0
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
