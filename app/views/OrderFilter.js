import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Filter extends React.Component {
  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation}/>
        <View style={[{}, styles.mainRow]}>
          <View style={[{ flexDirection: 'row', alignItems: 'center',marginVertical:10 }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>
          </View>
          <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20,top:20 }]}>Clear Filter</Text>
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20,marginVertical:10 }]}>Status</Text>
        <View>
          <ScrollView
          horizontal={true}
          >
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
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PAID </Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PART PAYMENT </Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PAID FROM CREDIT </Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PENDING </Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PENDING </Text>
              </TouchableOpacity>
            </View>
           </View>
          </ScrollView>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[{ flex: 1,paddingVertical:10 }]}>
              <Text style={{color:'#929497',fontWeight:'bold'}}>Order Date</Text>
            <TouchableOpacity>
             <View style={{backgroundColor:'#fff',flexDirection:'row',marginRight:10,padding:10,marginVertical:10}}>
              <Image 
              source={require('../images/calenderIcon.png')}
              />
               <Text style={{marginLeft:10,color:'#aaa'}}>DD-MM-YY</Text>
             </View>
             <View style={{position:'absolute',right:20,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View> 
            </TouchableOpacity>
          </View>
          <View style={[{ flex: 1,paddingVertical:10 }]}>
          <Text style={{color:'#929497',fontWeight:'bold',marginLeft:10}}>Payment Date</Text>
            <TouchableOpacity>
            
             <View style={{backgroundColor:'#fff',flexDirection:'row',marginLeft:10,padding:10,marginVertical:10}}>
             <Image 
              source={require('../images/calenderIcon.png')}
              />
              <Text style={{marginLeft:10,color:'#aaa'}}>DD-MM-YY</Text>
             </View>
             <View style={{position:'absolute',right:20,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 15,marginVertical:10 }]}>Delivery Type</Text>
        <View>
        <ScrollView
          horizontal={true}
          >
          <View style={[{ paddingRight: 20}, styles.mainRow]}>
            <View style={[{ marginRight:10 }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>PICKUP</Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>DELIVERY</Text>
              </TouchableOpacity>
            </View>
           </View>
          </ScrollView>
        </View>
        <View style={{width:width-20,backgroundColor:'#fff',paddingVertical:10,marginTop:20}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6',marginHorizontal:5,flexDirection:'row',position:'relative'}}>
             <TextInput 
             placeholder="Order Channel"
             />
             <View style={{position:'absolute',right:10,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>  
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6',marginHorizontal:5,flexDirection:'row',position:'relative'}}>
             <TextInput 
             placeholder="Payment Mode"
             />
             <View style={{position:'absolute',right:10,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>  
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6',marginHorizontal:5,flexDirection:'row',position:'relative'}}>
             <TextInput 
             placeholder="Created By"
             />
             <View style={{position:'absolute',right:10,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>  
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('Order')}
        style={{width:width/1.5,alignSelf:'center',backgroundColor:'#B1272C',justifyContent:'center',alignItems:'center',paddingVertical:15,borderRadius:50,marginTop:10}}
        >
          <Text style={{color:'#fff',fontWeight:'bold'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
