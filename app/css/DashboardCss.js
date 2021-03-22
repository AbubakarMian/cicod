import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     height:height,
     width:width,
     backgroundColor:'#fff',
     paddingTop:50,
     alignItems:'center',
     flex:1,
     flexDirection:'column'
 }, 
})



