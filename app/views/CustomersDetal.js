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
class CustomersDetal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      calenderModal: false,
      spinner: false,
      data: {},
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  componentDidMount() {
    let customer_id = this.props.route.params.customer_id;
    this.getCustomerDetail(customer_id);
  }
  getCustomerDetail(customer_id) {
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };

    fetch(Constants.customerlist + '/' + customer_id, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(
          'responseJson !!!! @@@@@@@@@@@@@@@@@@@@@@@@@@',
          responseJson,
        );
        this.setState({
          spinner: false,
        });

        if (responseJson.status === 'success') {
          this.setState({
            data: responseJson.data,
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
          <NavBack
            title="Customer"
            onClick={() => this.props.navigation.goBack()}
          />

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
              <View style={[{}, styles.mainContentUserImageView]}>
                <Image source={require('../images/customer/usericon.png')} />
              </View>
              <View>
                <Text
                  style={[
                    {textAlign: 'center', color: '#4E4D4D'},
                    fontStyles.bold18,
                  ]}>
                  {this.state.data.first_name}
                </Text>
                <View style={[{}, styles.mainContentUserInfoView]}>
                  <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                    Email:{' '}
                  </Text>
                  <Text style={[{color: '#929497'}, fontStyles.normal13]}>
                    {this.state.data.email}
                  </Text>
                </View>
              </View>
              <View>
                <View style={[{}, styles.mainContentUserInfoView]}>
                  <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                    Phone:{' '}
                  </Text>
                  <Text style={[{}, styles.mainContentUserInfo]}>
                    {this.state.data.phone}
                  </Text>
                </View>
              </View>
              <View>
                <View style={[{}, styles.mainContentUserInfoView]}>
                  <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                    Customer Address:{' '}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={[{width: width / 2}, styles.mainContentUserInfo]}>
                    {this.state.data.address}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[{}, styles.balanceView]}>
              <View style={[{}, styles.balanceRowView]}>
                <View style={[{}, styles.balanceColumn1View]}>
                  <Text style={[{color: '#929497'}, fontStyles.normal13]}>
                    Avail. Balance
                  </Text>
                </View>
                <View style={[{}, styles.balanceColumn2View]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold13]}>
                    ₦ {this.state.data.available_balance}
                  </Text>
                </View>
              </View>
              <View style={[{}, styles.balanceRowView]}>
                <View style={[{}, styles.balanceColumn1View]}>
                  <Text style={[{color: '#929497'}, fontStyles.normal13]}>
                    Acct. Balance
                  </Text>
                </View>
                <View style={[{}, styles.balanceColumn2View]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold13]}>
                    ₦ {this.state.data.account_balance}
                  </Text>
                </View>
              </View>
              <View style={[{}, styles.balanceRowView]}>
                <View style={[{}, styles.balanceColumn1View]}>
                  <Text style={[{color: '#929497'}, fontStyles.normal13]}>
                    Loyalty Points
                  </Text>
                </View>
                <View style={[{}, styles.balanceColumn2View]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold13]}>
                    {this.state.data.loyalty_points}
                  </Text>
                </View>
              </View>
              <View style={[{paddingBottom: 10}, styles.balanceRowView]}>
                <View style={[{}, styles.balanceColumn1View]}>
                  <Text style={[{color: '#929497'}, fontStyles.normal13]}>
                    Credit Note
                  </Text>
                </View>
                <View style={[{}, styles.balanceColumn2View]}>
                  <Text style={[{color: '#4E4D4D'}, fontStyles.bold13]}>
                    ₦ {this.state.data.credit_note_balance}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Scaffold>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomersDetal);
