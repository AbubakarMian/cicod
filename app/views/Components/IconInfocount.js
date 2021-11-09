import React from 'react';
import {View, Text} from 'react-native';
const Device = require('react-native-device-detection');

const IconInfocount = ({count}) => {
  return (
    <View
      style={{
        position: 'absolute',
        right: Device.isTablet ? -6 : 5,
        top: 1,
        zIndex: 100,
        padding: 5,
        backgroundColor: '#33A354',
        borderRadius: 70,
        width: 27,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#fff', fontSize: 10}}>{count}</Text>
    </View>
  );
};

export default IconInfocount;
