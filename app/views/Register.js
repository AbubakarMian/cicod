import React from 'react';
import {View, Dimensions, Alert, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
var {width, height} = Dimensions.get('window');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }
  render() {
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
          {/* https://www.cicodsaasstaging.com/admin/merchant/setup/success?step=2 */}
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <WebView
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
              uri: `${Constants.sass_url}/subscribe?offer=zZPjmFCBG6amyUvSfc0FkefEVPzTiH&trial=true&isBundle=true`,
            }}
            onLoadEnd={() => this.setState({spinner: false})}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
