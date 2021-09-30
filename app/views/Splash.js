import React from 'react'
import { View, ImageBackground,  Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import {   Text, TextInput, Alert, ActivityIndicator} from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import fontStyles from '../css/FontCss'
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class SplashScreen extends React.Component {
  state={
    userExist:null
  }
  async componentDidMount(){
     const data=await AsyncStorage.getItem("User");
     console.log("spalsh@#",data)
     if (data) {
       this.setState({userExist:true})
     } else {
      this.setState({userExist:false})
     }

     if(this.state.userExist){
      this.props.navigation.navigate("Home")
     }
  }
  render() {
    if(this.state.userExist==null){
      return(
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}>
          <ActivityIndicator size="large" color="#a4272d" />
        </View>
      )
    }
    // if (this.state.userExist==true) {
    //   console.log("Yesa#$");
    //   this.props.navigation.navigate("Home")
    // }
    return (
      <ImageBackground
      style={{width:width}}
      source={require('../images/splashBg.png')}
      >
        <View style={{ height: height, width: width, alignItems: 'center', position: 'relative' }}>
          <View style={{ width: width - 30, height: height / 1.4, position: 'absolute', bottom: 0 }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../images/loginlogo.png')}
              />
            </View>
            <View style={{ alignItems: 'center', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom:height/4 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.replace('Login')}
              >
                <View style={{ width: width / 2, alignItems: 'center', borderWidth: 1, borderColor: '#B1272C', backgroundColor:'#FFF4F4', borderRadius: 50, paddingVertical: 10 }}>
                  <Text style={{ color: '#B1272C' }}>Login</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={{ color: '#487AE0' }}>Register</Text>
              </TouchableOpacity>
              {/* <View>
                <Image
                  style={{}}
                  source={require('../images/splashbottomlogo.png')}
                />
              </View> */}
              
            </View>
            
         
          </View>
          <Text style={{position:'absolute',bottom:50,textAlign:'center',alignSelf:'center',color:'#B1272C',fontWeight:'bold'}}>A PRODUCT OF CROWN INTERACTIVE</Text>
        </View>
      </ImageBackground>

    )
  }
}
