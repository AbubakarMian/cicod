import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Home extends React.Component {
  render() {
    return (
      <View style={{ height: height, width: width, alignItems: 'center', position: 'relative',backgroundColor:'#e6e6e6' }}>
        <View style={[{flexDirection:'row'}]}>
            <View style={{flex:1,paddingHorizontal:10}}>
               <Text style={[{color:'#B1272C',fontWeight:'bold',fontSize:20}]}>Welcome,</Text>
               <Text>Johnson</Text>
            </View>
            <View style={{flex:1,alignItems:'flex-end',padding:10}}>
              <Text>Picter</Text>
            </View>

        </View>
        <View>

        </View>
      </View>
    )
  }
}
