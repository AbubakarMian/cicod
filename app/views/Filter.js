import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Filter extends React.Component {
  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header />
        <View style={[{}, styles.mainRow]}>
          {/* <Image
          source={require('../images')}
          /> */}
          <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </View>
          <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20 }]}>Clear Filter</Text>
        </View>
        <View>
          <SearchBar
            ref="searchBar"
            placeholder="Product Category"
            barTintColor={'#fff'}
            backgroundColor={'#fff'}
            tintColor={'#fff'}
            
          // onChangeText={...}
          // onSearchButtonPress={...}
          // onCancelButtonPress={...}
          />
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20 }]}>Status</Text>
        <View>
          <View style={[{ paddingRight: 20 }, styles.mainRow]}>
            <View style={[{ marginRight:10 }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>All</Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PENDING </Text>
              </TouchableOpacity>
            </View>
          
            
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[{ flex: 1 }]}>
            <Text>Order Date</Text>
          </View>
          <View>
            <Text>Order Date</Text>
          </View>
        </View>
        <TouchableOpacity
        style={{width:width/1.5,alignSelf:'center',backgroundColor:'#B1272C',justifyContent:'center',alignItems:'center',paddingVertical:15,borderRadius:50,marginTop:10}}
        >
          <Text style={{color:'#fff',fontWeight:'bold'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
