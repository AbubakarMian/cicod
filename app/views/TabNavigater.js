import { View, Text, Image,StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dashnoard from './Dashnoard';
import Order from './Order';
import Products from './Products';
import More from './More';

const Tab = createBottomTabNavigator();


export default class TabNavigater extends React.Component {
  constructor(props){
    super(props);
    this.state={
      orderActive:''
    }
  }
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#fff',
          activeTintColor:'#B1272C',
          inactiveTintColor:'#929497'
        }}
      >
        <Tab.Screen
          name="Dashnoard"
          component={Dashnoard} 
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  source={require('../images/chart.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  source={require('../images/orders.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />

<Tab.Screen
          name="Products"
          component={Products}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  source={require('../images/noProduct.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />

<Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.65,
                  elevation: 0,
                }}>
                <Image
                  source={require('../images/more.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderColor: 'red',
                    //tintColor: '#f1f6f9',
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }}
        />        
        

      </Tab.Navigator>
    );
  }
}
