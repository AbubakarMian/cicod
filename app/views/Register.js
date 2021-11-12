import React from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
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
      <View style={{height: height, width: width}}>
        {/* https://www.cicodsaasdev.com/admin/merchant/setup/success?step=2 */}
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{color: '#fff'}}
          color={'#fff'}
        />
        <WebView
          onNavigationStateChange={({url, canGoBack}) => {
            console.log('url', url);
            if (
              url ==
              'https://www.cicodsaasdev.com/admin/merchant/setup/success?step=2'
            ) {
              this.props.navigation.replace('Login');
            }
          }}
          source={{
            uri: `${Constants.sass_url}/subscribe?offer=zZPjmFCBG6amyUvSfc0FkefEVPzTiH&trial=true&isBundle=true`,
          }}
          onLoadEnd={() => this.setState({spinner: false})}
        />
      </View>
    );
  }
}
