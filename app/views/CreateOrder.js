import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CreateOrderCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class CreateOrder extends React.Component {
  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header />
        <View>
            
        </View>
      </View>
    )
  }
}
