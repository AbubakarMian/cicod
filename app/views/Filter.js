import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Filter extends React.Component {
  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <View style={[{}, styles.mainRow]}>
          {/* <Image
          source={require('../images')}
          /> */}
          <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
            <Icon name="home" size={30} color="#900" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </View>
          <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20 }]}>Clear Filter</Text>
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20 }]}>Status</Text>
        <View>
          <View style={[{ paddingRight: 20 }, styles.mainRow]}>
            <View style={[{ flex: 1 }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497' }]}>All</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 1 }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497' }]}>PENDING </Text>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 1 }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497' }]}>PAID </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={[{ color: '#929497' }]}>PART PAYMENT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[{flexDirection:'row'}]}>
          <View style={[{flex:1}]}>
            <Text>Order Date</Text>
          </View>
          <View>
            <Text>Order Date</Text>
          </View>
        </View>
      </View>
    )
  }
}
