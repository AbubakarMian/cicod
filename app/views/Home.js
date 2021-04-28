import React from 'react'
import { View, ImageBackground, Dimensions, Image, Platform, Alert, TouchableOpacity, ScrollView } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/HomeCss';
import fontStyles from '../css/FontCss'
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
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <View style={[{ flexDirection: 'row', paddingVertical: 10 }]}>
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Text style={[{ color: '#B1272C', fontWeight: 'bold', fontSize: 25, fontFamily: 'Open Sans' }]}>Welcome,</Text>
                <Text style={{ color: '#4E4D4D', fontSize: 25, fontFamily: 'Open Sans' }}>{this.props.user.firstname}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('User')}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../images/profilepic.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 10, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Dashnoard')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/dashboard.png')}
                />
                <Text style={[{},styles.cardLableText]}>Dashboard</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
              style={{flex:1}}
              onPress={()=>this.props.navigation.navigate('CreateOrder', {screen_name:'sell'})}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/sell.png')}
                />
                <Text style={[{},styles.cardLableText]}>Sell</Text>
              </View>
              </TouchableOpacity>
            </View>
            
            <View style={[{ flexDirection: 'row',alignSelf:'center', width: width-20,alignSelf:'center', marginTop: 10,alignItems:'center',justifyContent:'center',paddingRight:10 }]}>
            <TouchableOpacity
            style={{flex:1}}
            onPress={()=>this.props.navigation.navigate('Order')}
            >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/order.png')}
                />
                <Text style={[{},styles.cardLableText]}>Orders</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Customer')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/customers.png')}
                />
                <Text style={[{},styles.cardLableText]}>Customers</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 10, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Products', { seller_id: 0 })}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/products.png')}
                />
                <Text style={[{},styles.cardLableText]}>Products</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
              style={{flex:1}}
              onPress={()=>this.props.navigation.navigate('CreateOrder', {screen_name:'buy'})}
            
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/tag.png')}
                />
                <Text style={[{},styles.cardLableText]}>Buy</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 10, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Supplier')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/suppliers.png')}
                />
                <Text style={[{},styles.cardLableText]}>Suppliers</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Buyers')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/buyers.png')}
                />
                <Text style={[{},styles.cardLableText]}>Buyers</Text>
              </View>
              </TouchableOpacity>

            </View>
            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 10, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
                style={{ flex: 1 }}

                onPress={() => this.props.navigation.navigate('Connect')}
              >
              <View style={[{
                flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
              }]}>
                <Image
                  style={{ height: width / 6, width: width / 6 }}
                  source={require('../images/home/connect.png')}
                />
                <Text style={[{},styles.cardLableText]}>Connect</Text>
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