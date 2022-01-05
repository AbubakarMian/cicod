/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Modal,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import splashImg from '../images/splash.jpg';
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
class Headet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      calenderModal: false,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const that = this;
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View
        style={{
          flexDirection: 'row',
          width: width,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        {!this.props.disabled ? (
          this.props.name ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('More')}
              style={{flex: 2}}>
              <Icon size={20} name="align-left" color="#ACB5BD" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={{flex: 2}}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../images/homeIcone.png')}
              />
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={{flex: 2}}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../images/homeIcone.png')}
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            flex: 8,
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'center',
          }}>
          {/* <Image
                 style={{height:30,width:120}} 
                 source={require('../images/headerLogo.png')}
                 /> */}
          <Text style={{color: '#343A40', fontWeight: 'bold', fontSize: 16}}>
            {this.props.user.tenantId.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            position: 'absolute',
            right: 10,
            top: 10,
            flexDirection: 'row',
          }}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../images/bellIcon.png')}
          />
          {/* <Text style={{backgroundColor:'#B1272C',color:'#fff',paddingHorizontal:12,paddingVertical:4,borderRadius:50}}>3</Text> */}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}

export default connect(mapStateToProps)(Headet);
