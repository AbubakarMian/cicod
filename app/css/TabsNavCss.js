import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     height:60,
     width:width,
     backgroundColor:'#F0F0F0',
     flex:1,
     alignItems:'center',
     flexDirection:'column'
 },
 

})



