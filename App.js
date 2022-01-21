/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import {
 
  View,
 
  StatusBar,
} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';

import 'react-native-gesture-handler';
import AppNavigation from './app/views/AppNavigater';

import configureStore from './app/redux/store/configureStore';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  async componentDidMount() {
    await RNBootSplash.hide({fade: true});

    Firebase.initializeApp(this);

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
      //  notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

    // const data = await this.performTimeConsumingTask();

    // if (data !== null) {
    //   this.setState({isLoading: false});
    // }
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 1000),
    );
  };
  render() {
    // if (this.state.isLoading) {
    //   return <CustomSplashScreen />;
    // } else {
    return (
      <Provider store={configureStore}>
        <PaperProvider theme={theme}>
          <MenuProvider>
            <View style={{flex: 1}}>
              <StatusBar hidden={true} translucent={true} />
              <AppNavigation />
            </View>
          </MenuProvider>
        </PaperProvider>
      </Provider>
    );
  }
  //}
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
