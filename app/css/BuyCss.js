import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
    //  height:height,
     width:width,
     backgroundColor:'#fff',
     paddingTop:50,
     alignItems:'center',
     flex:1,
     flexDirection:'column'
 },

 textInputView:{
     borderWidth:1,
     borderRadius:5 ,
     borderColor:'#CFCFCF',
     width:width-50,
     marginTop:10,
     paddingLeft:10
 },

btnContinuueView:{
    backgroundColor:'#B1272C',
    borderRadius:50,
    width:width-50,
    paddingVertical:15,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
}

 
})



