import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     height:height,
     width:width-20,
     alignSelf:'center',
     backgroundColor:'#F0F0F0',
     flex:1,
     flexDirection:'column',
     alignSelf:'center',
     justifyContent:'center',
     alignItems:'center'
 },
 mainRow:{
     flexDirection:'row',
     position:'relative',
     width:width-20,
     alignSelf:'center'
 },
 contentView:{
     backgroundColor:'#fff',
     borderRadius:10,
     width:width-20,
     padding:10,
     alignSelf:'center',
     marginTop:10

 }
 
})



