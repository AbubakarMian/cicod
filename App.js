// import React from 'react';
// import {View} from 'react-native';
// import AppNavigater from './app/views/AppNavigater';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// export default class App extends React.Component{
//   render(){
//     return(
//       <AppNavigater/>
//     )
//   }
// }

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {Component} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
 } from 'react-native';
 
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import 'react-native-gesture-handler';
 import AppNavigation from './app/views/AppNavigater';
 import CustomSplashScreen from './app/views/Splash';
 import configureStore from './app/redux/store/configureStore';
 import { Provider } from 'react-redux';
 
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       isLoading: true,
     };
   }
   async componentDidMount() {
     const data = await this.performTimeConsumingTask();
 
     if (data !== null) {
       this.setState({isLoading: false});
     }
   }
   performTimeConsumingTask = async () => {
     return new Promise(resolve =>
       setTimeout(() => {
         resolve('result');
       }, 1000),
     );
   };
   render() {
     if (this.state.isLoading) {
       return <CustomSplashScreen />;
     } else {
       return (
         <Provider store={configureStore}>
         <View style={{ flex: 1 }}>
            <StatusBar hidden={true} translucent={true} />
           <AppNavigation />
         </View>
        </Provider>
       );
     }
   }
 }
 