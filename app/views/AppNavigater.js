import { View, Text } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Login from './Login';
import Filter from './Filter';
import Home from './Home';
import Dashnoard from './Dashnoard';

const Stack = createStackNavigator();

export default class AppNavigater extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Dashnoard" component={Dashnoard} options={{ headerShown: false }} />
          <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}