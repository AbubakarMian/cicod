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
    fontSize:17,
    marginLeft:10
},
contentContainer:{
    backgroundColor:'#fff',
    padding:10,
    width:width-20

},
userInfoLable:{
    fontWeight:'bold',
    color:'#929497',
    fontSize:12,
},
userInfo:{
    fontWeight:'700',
    color:'#4E4D4D'
},
changePasswordView:{
    marginTop:height/15,
    paddingTop:10,
    width:width-20,
    flexDirection:'row',
    alignItems:'center'
},
changePasswordText:{
    marginHorizontal:10,
    fontWeight:'bold',
    color:'#B1272C'
},
logoutView:{
    marginTop:height/15,
    alignSelf:'center',
    marginBottom:20,
    flexDirection:'row',
    alignItems:'center',
},
logoutText:{
    marginHorizontal:5,
    color:'#929497'
},
bottomDescText:{
    width:width-50,
    textAlign:'center',
    fontSize:12,
    fontWeight:'bold',
    color:'#929497',
    marginTop:height/7
},
bottomVersioncText:{
    width:width-50,
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold',
    color:'#929497',
    marginTop:10,
    marginBottom:10
}

})



