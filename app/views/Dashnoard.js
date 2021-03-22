import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, ScrollView } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Dashnoard extends React.Component {
  render() {
    return (
      <View style={{ height: height, width: width, alignItems: 'center', position: 'relative', backgroundColor: '#aaa',paddingVertical:20 }}>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={[{ color: '#B1272C', fontWeight: 'bold', fontSize: 20 }]}>Welcome,</Text>
            <Text>Johnson</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
            <Text>Picter</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <View style={[{ flexDirection: 'row', width: width, paddingHorizontal: 10, marginTop: 10 }]}>
              <TouchableOpacity>
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
              <TouchableOpacity>
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
            <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
