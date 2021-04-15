import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, ScrollView } from 'react-native'
import splashImg from '../images/splash.jpg'
import Header from '../views/Header';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class Home extends React.Component {
  render() {
    return (
      <View style={{ height: height, width: width, alignItems: 'center', position: 'relative', backgroundColor: '#F0F0F0' }}>
       <Header navigation={this.props.navigation}/>
        <View style={[{ flexDirection: 'row',paddingVertical:10 }]}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={[{ color: '#B1272C', fontWeight: 'bold', fontSize: 20 }]}>Welcome,</Text>
            <Text style={{fontWeight:'500'}}>{this.props.user.firstname}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
           <Image 
           style={{height:50,width:50}}
           source={require('../images/profilepic.png')}
           />
          </View>
        </View>
        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <View style={[{ flexDirection: 'row', width: width, paddingHorizontal: 10, marginTop: 10 }]}>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Dashnoard')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 20,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/dashboard.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Dashboard</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('CreateOrder')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 20,
                justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/sell.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Sell</Text>
              </View>
              </TouchableOpacity>
            </View>
            
            <View style={[{ flexDirection: 'row', width: width, paddingHorizontal: 10, marginTop: 10 }]}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Order')}
            >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/order.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Orders</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Customer')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/customers.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Customers</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={[{ flexDirection: 'row', width: width, paddingHorizontal: 10, marginTop: 10 }]}>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Products')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/products.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Products</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('CreateOrder')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/tag.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Buy</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={[{ flexDirection: 'row', width: width, paddingHorizontal: 10, marginTop: 10 }]}>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Supplier')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/suppliers.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Suppliers</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Buyers')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/buyers.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Buyers</Text>
              </View>
              </TouchableOpacity>

            </View>
            <View style={[{ flexDirection: 'row', width: width, paddingHorizontal: 10, marginTop: 10 }]}>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Connect')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: height / 4,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 4, width: width / 4 }}
                  source={require('../images/home/connect.png')}
                />
                <Text style={[{ fontWeight: 'bold' }]}>Connect</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)