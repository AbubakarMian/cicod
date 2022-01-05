/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Text, TextInput, ActivityIndicator} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import fontStyles from '../css/FontCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import {connect} from 'react-redux';
import {SET_USER} from '../redux/constants';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class SplashScreen extends React.Component {
  state = {
    userExist: null,
  };

  // componentWillMount() {
  //   NetInfo.addEventListener(networkState => {
  //     console.log("ConnectionCCC type - ", networkState.type);
  //     console.log("Is connected? - ", networkState.isConnected);
  //   });
  // }
  

  registerAction(){
    this.props.navigation.navigate('Register');

    // NetInfo.fetch().then(networkState => {
    //   console.log("Connection type - ", networkState.type);
    //   console.log("Is connected? - ", networkState.isConnected);
    //   console.log("Is reachable? - ", networkState.isInternetReachable);

    //   if(networkState.isConnected && networkState.isInternetReachable){
    //     this.props.navigation.navigate('Register');
    //   }else{
    //     Alert.alert("Info","Slow or no internet connection. Please check your internet and try again.",[
    //       {
    //         text:"Close"
    //       },
    //       {
    //         text:"Retry",
    //         onPress:()=>this.registerAction()
    //       }
    //     ])
    //   }
    // });
  }
  async componentDidMount() {

    //listen for network change here
   
    const data = await AsyncStorage.getItem('User');
    console.log('spalsh@#', data);
    if (data) {
      let me = JSON.parse(data);
      this.props.setUser({
        firstname: me.firstname,
        lastname: me.lastname,
        email: me.email,
        phone: me.phone,
        access_token: me.access_token,
        kciInfo: me.kciInfo,
        tenantId: me.tenantId,
        id: me.id,
      });
      this.setState({userExist: true});
    } else {
      this.setState({userExist: false});
    }

    if (this.state.userExist) {
      this.props.navigation.navigate('Home');
    }
  }
  render() {
    if (this.state.userExist == null) {
      return (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color="#a4272d" />
        </View>
      );
    }
    // if (this.state.userExist==true) {
    //   console.log("Yesa#$");
    //   this.props.navigation.navigate("Home")
    // }
    return (
      <ImageBackground
        style={{width: width}}
        source={require('../images/splashBg.png')}>
        <View
          style={{
            height: height,
            width: width,
            alignItems: 'center',
            position: 'relative',
          }}>
          <View
            style={{
              width: width - 30,
              height: height / 1.4,
              position: 'absolute',
              bottom: 0,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image source={require('../images/loginlogo.png')} />
            </View>
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
                marginBottom: height / 4,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <View
                  style={{
                    width: width / 2,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#B1272C',
                    backgroundColor: '#FFF4F4',
                    borderRadius: 50,
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: '#B1272C'}}>Login</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>this.registerAction()}
                style={{
                  width: width / 2,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#B1272C',
                  backgroundColor: '#B1272C',
                  borderRadius: 50,
                  paddingVertical: 10,
                  marginTop:20
                }}>
                <Text style={{color: '#FFF4F4'}}>Register</Text>
              </TouchableOpacity>
              {/* <View>
                <Image
                  style={{}}
                  source={require('../images/splashbottomlogo.png')}
                />
              </View> */}
            </View>
          </View>
          <Text
            style={{
              position: 'absolute',
              bottom: 50,
              textAlign: 'center',
              alignSelf: 'center',
              color: '#B1272C',
              fontWeight: 'bold',
            }}>
            A PRODUCT OF CROWN INTERACTIVE
          </Text>
        </View>
      </ImageBackground>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
