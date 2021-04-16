import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class SplashScreen extends React.Component {
  render() {
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
            <View style={{ alignItems: 'center', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <View style={{ width: width / 2, alignItems: 'center', borderWidth: 1, borderColor: '#B1272C', borderRadius: 50, paddingVertical: 10 }}>
                  <Text style={{ color: '#B1272C' }}>Login</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={{ color: '#487AE0' }}>Register</Text>
              </TouchableOpacity>
              <View>
                <Image
                  style={{}}
                  source={require('../images/splashbottomlogo.png')}
                />
              </View>
            </View>
            <View>

            </View>
          </View>
        </View>
      </ImageBackground>

    )
  }
}
