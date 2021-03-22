import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     height:height,
     width:width,
     backgroundColor:'#F0F0F0',
     paddingTop:5,
     paddingHorizontal:10,
     flex:1,
     flexDirection:'column'
 },
 mainRow:{
     flexDirection:'row',
     position:'relative',
     width:width
 }
 
})



