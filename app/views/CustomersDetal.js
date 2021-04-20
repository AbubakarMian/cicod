import React from 'react'
import { View, ImageBackground,  Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback } from 'react-native'
import {   Text, TextInput, Alert} from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/CustomerDeatailCss';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
class CustomersDetal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      calenderModal: false,
      spinner: false,
      data:{}
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
        console.log('responseJson !!!! @@@@@@@@@@@@@@@@@@@@@@@@@@', responseJson)
        this.setState({
          spinner: false,
        });

        if (responseJson.status === 'success') {
          this.setState({
            data: responseJson.data
          })
          // this.props.navigation.navigate('DrawerNavigation')
        }
      })
      .catch(error => {
        console.log('Error !!!', error)
      });
  }
  render() {

    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation}/>
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{ color: '#fff' }}
          color={'#fff'}
        />
        <View style={[{}, styles.headerRow]}>
          <View>
            <Icon name="arrow-left" size={25} color="#929497" />
          </View>
          <View>
            <Text style={[{}, styles.headerRowText]}>customers</Text>
          </View>

        </View>
        <View style={[{}, styles.mainContentView]}>
          <View style={[{}, styles.mainContentUserImageView]}>
            <Image
              source={require('../images/customer/usericon.png')}
            />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.state.data.first_name}</Text>
            <View style={[{}, styles.mainContentUserInfoView]}>
              <Text style={[{}, styles.mainContentUserInfoHeading]}>Email: </Text>
              <Text style={[{}, styles.mainContentUserInfo]}>{this.state.data.email}</Text>
            </View>
          </View>
          <View>
            <View style={[{}, styles.mainContentUserInfoView]}>
              <Text style={[{}, styles.mainContentUserInfoHeading]}>Phone: </Text>
              <Text style={[{}, styles.mainContentUserInfo]}>{this.state.data.phone}</Text>
            </View>
          </View>
          <View>
            <View style={[{}, styles.mainContentUserInfoView]}>
              <Text style={[{}, styles.mainContentUserInfoHeading]}>Customer Address: </Text>
              <Text
                numberOfLines={3}
                style={[{ width: width / 2 }, styles.mainContentUserInfo]}>{this.state.data.address}</Text>
            </View>
          </View>
        </View>
        <View style={[{}, styles.balanceView]}>
          <View style={[{}, styles.balanceRowView]}>
            <View style={[{}, styles.balanceColumn1View]}>
              <Text style={[{}, styles.balanceColumn1Text]}>Avail. Balance</Text>
            </View>
            <View style={[{}, styles.balanceColumn2View]}>
              <Text style={[{}, styles.balanceColumn2Text]}>₦ {this.state.data.available_balance}</Text>
            </View>
          </View>
          <View style={[{}, styles.balanceRowView]}>
            <View style={[{}, styles.balanceColumn1View]}>
              <Text style={[{}, styles.balanceColumn1Text]}>Acct. Balance</Text>
            </View>
            <View style={[{}, styles.balanceColumn2View]}>
              <Text style={[{}, styles.balanceColumn2Text]}>₦ {this.state.data.account_balance}</Text>
            </View>
          </View>
          <View style={[{}, styles.balanceRowView]}>
            <View style={[{}, styles.balanceColumn1View]}>
              <Text style={[{}, styles.balanceColumn1Text]}>Loyalty Points</Text>
            </View>
            <View style={[{}, styles.balanceColumn2View]}>
              <Text style={[{}, styles.balanceColumn2Text]}>{this.state.data.loyalty_points}</Text>
            </View>
          </View>
          <View style={[{ paddingBottom: 10 }, styles.balanceRowView]}>
            <View style={[{}, styles.balanceColumn1View]}>
              <Text style={[{}, styles.balanceColumn1Text]}>Credit Note</Text>
            </View>
            <View style={[{}, styles.balanceColumn2View]}>
              <Text style={[{}, styles.balanceColumn2Text]}>₦ {this.state.data.credit_note_balance}</Text>
            </View>
          </View>

        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomersDetal)
