/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import Scaffold from './Components/Scaffold';
import Header from './Header';
var {width, height} = Dimensions.get('window');

export default class InAppWebView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }
  render() {
    return (
      <Scaffold>
        <View style={{height: height, width: width}}>
          {/* https://www.cicodsaasstaging.com/admin/merchant/setup/success?step=2 */}
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <WebView
            source={{
              uri: this.props.route.params.uri,
            }}
            onLoadEnd={() => this.setState({spinner: false})}
          />
        </View>
      </Scaffold>
    );
  }
}
