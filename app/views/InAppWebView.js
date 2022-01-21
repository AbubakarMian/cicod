/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Dimensions, TouchableOpacity,Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

import Scaffold from './Components/Scaffold';
import InAppHeader from './Components/InAppHeader';

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
         <InAppHeader onPress={()=>this.props.navigation.goBack()} />
         
          <Spinner
          
          cancelable={true}
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
