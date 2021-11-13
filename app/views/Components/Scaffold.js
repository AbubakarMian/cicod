import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

const Scaffold = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#ffffff" />
      {props.children}
    </SafeAreaView>
  );
};

export default Scaffold;
