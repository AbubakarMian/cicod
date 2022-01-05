/* eslint-disable prettier/prettier */
import React from "react";
import {
    View,
   Text,
    Dimensions,
    
    Image,
    
  } from 'react-native';

const {width, height} = Dimensions.get('window');

const EmptyList=({title})=>{
    return(
        <View
          style={{
            height: height / 1.75,
            position: 'relative',
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F0F0F0',
            width: width - 20,
            padding: 10,
            borderRadius: 10,
            marginBottom: 5,
          }}>
          <Image source={require('../../images/Untitled-1.png')} />
          <Text
            style={{
              color: '#929497',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Open Sans',
            }}>
            {title}
          </Text>
        </View>
    )
}

export default EmptyList;