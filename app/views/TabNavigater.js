import { View, Text,Image } from 'react-native';
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
  render() {
    return (
        <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor:'#fff',
          inactiveBackgroundColor: '#fff',
        }}
        >
        <Tab.Screen name="Dashnoard" component={Dashnoard} options={{ headerShown: true,headerStyle:{backgroundColor:'#fff'}, 
        tabBarIcon: ({ color, size }) => (
          <Icon name="bar-chart" color={'#B1272C'} size={size} />
        ), 
        headerTintColor:'#fff',headerTitleAlign:'center'}} />
         <Tab.Screen name="Order" component={Order} options={{ headerShown: true,headerStyle:{backgroundColor:'#fff'}, 
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ), 
        headerTintColor:'#fff',headerTitleAlign:'center'}} />
        <Tab.Screen name="Products" component={Products} options={{ headerShown: true,headerStyle:{backgroundColor:'#fff'}, 
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ), 
        headerTintColor:'#fff',headerTitleAlign:'center'}} />
        <Tab.Screen name="More" component={More} options={{ headerShown: true,headerStyle:{backgroundColor:'#fff'}, 
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ), 
        headerTintColor:'#fff',headerTitleAlign:'center'}} />
        {/* <Tab.Screen name="Events" component={Events} options={{ headerShown: true,headerStyle:{backgroundColor:'blue'},
        tabBarIcon: ({ color, size }) => (
          <Icon name="tasks" color={color} size={size} />
        ), 
        headerTintColor:'blue',headerTitleAlign:'center'}}  />
        <Tab.Screen name="Map" component={Map} options={{ headerShown: true,headerStyle:{backgroundColor:'blue'},
        tabBarIcon: ({ color, size }) => (
          <Icon name="map-marker" color={color} size={size} />
        ), 
        headerTintColor:'blue',headerTitleAlign:'center'}}  /> */}
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    );
  }
}