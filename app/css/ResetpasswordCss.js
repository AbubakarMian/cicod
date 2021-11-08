import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     height:height,
     width:width,
     backgroundColor:'#F0F0F0',
     alignItems:'center',
     flex:1,
     flexDirection:'column',
     
 },
headingRow:{
flexDirection:'row',
width:width-20,
marginTop:10,
paddingHorizontal:5,
paddingVertical:10,
alignItems:'center'
},
resetText:{
    color:'#2F2E7C',
    fontWeight:'bold',
    marginLeft:10
},
 textInputView:{
     borderRadius:5 ,
     backgroundColor:'#fff',
     width:width-20,
     marginTop:10,
   
     paddingHorizontal:20,
     paddingBottom:40
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



