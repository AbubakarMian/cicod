import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     width:width,
     backgroundColor:'#F0F0F0',
     alignItems:'center',
     flex:1,
     flexDirection:'column'
 },
headingRow:{
flexDirection:'row',
width:width-20,
marginTop:10,
paddingHorizontal:5,
paddingVertical:10
},
moreText:{
    color:'#2F2E7C',
    fontWeight:'bold',
    fontSize:15,
    marginLeft:10
},
contentContainer:{
    backgroundColor:'#fff',
    padding:10,
    width:width-20

},
inputView:{
flexDirection:'row',
width:width-20,
alignItems:'center',
position:'relative'
},
eyeIconView:{
    position:'absolute',
    right:10,
    padding:10
},
changePasswordView:{
    backgroundColor:'#B1272C',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
    borderRadius:100,
    width:width-50,
    alignSelf:'center',
    marginTop:20
},
changePasswordText:{
    color:'#FFFFFF'
},
bottomDescText:{
    textAlign:'center',
    width:width-50,
    textAlign:'center',
    alignSelf:'center'
}

})



