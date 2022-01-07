/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Dimensions, Alert,  TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InAppHeader from './Components/InAppHeader';
var {width, height} = Dimensions.get('window');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }
  render() {
    let WebViewRef;
    return (
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        // style={{marginBottom: 150}}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <View style={{height: height, width: width}}>
         <InAppHeader onPress={()=>this.props.navigation.goBack()} />
          
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <WebView
           ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            style={{flex: 1}}
            onLoadStart={() => this.setState({spinner: true})}
            onNavigationStateChange={({url, canGoBack}) => {
              console.log('url', url);
              if (
                url.includes('setup/success?step=2') ||
                url.includes('setup/success?step=3') ||
                url.includes('setup/success?step=4')
              ) {
                Alert.alert(
                  'Success!',
                  'Your account setup is successfull...',
                  [
                    {
                      text: 'Continue',
                      onPress: () =>
                        this.props.navigation.reset({
                          index: 0,
                          routes: [{name: 'Login'}],
                        }),
                    },
                  ],
                );
              }
            }}
            source={{
             // uri: `${Constants.sass_url}/subscribe?offer=zZPjmFCBG6amyUvSfc0FkefEVPzTiH&trial=true&isBundle=true`,
              uri: `${Constants.sass_url}/subscribe?offer=kMOR8wwTNaJjfzO1JVDSXNJfdz6bBk&trial=true&isBundle=true`,
            }}
            onError={()=>Alert.alert("Info","Slow or no internet connection. Please check your internet and try again.",[
              {
                text:"Close",
                onPress:()=>{
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
                }
              },
              {
                text:"Retry",
                onPress:()=> {
                  // alert("test")
                  this.props.navigation.replace("Register")}
              }
            ])} 
            onLoadEnd={() => this.setState({spinner: false})}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
