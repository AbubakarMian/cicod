/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
const Device = require('react-native-device-detection');

const IconInfocount = ({count,iscart=false}) => {
  return (
    <View
      style={{
        position: 'absolute',
        right: Device.isTablet ? -6 : -6,
        top: 1,
        zIndex: 100,
        padding: 5,
        backgroundColor:iscart?"#2F2E7C" : '#33A354',
        borderRadius: 50,
        width: count>100?50:iscart?20:30,
        height: iscart? 20:35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#fff', fontSize: iscart?7:10}}>{count}</Text>
    </View>
  );
};

export default IconInfocount;
