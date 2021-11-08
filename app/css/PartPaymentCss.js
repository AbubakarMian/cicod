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
     flexDirection:'column'
 },
 backHeaderRowView: {
    flexDirection: 'row',
    width: width - 20,
    marginHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    position: 'relative'
},
backHeadingView: {
    marginHorizontal: 10
},
backHeadingText: {
    color: '#2F2E7C',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Open Sans',
},

backHeadingCloseView: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row'
},
backHeadingCloseText: {
    color: '#707070',
    marginLeft: 5
},
balanceHeadingView:{
    backgroundColor:'#fff',
    borderRadius:10,
    width:width-20,
    alignSelf:'center',
    paddingVertical:20,
    marginTop:10
},
balanceView:{
    borderRadius:5,
    paddingVertical:10,
    marginTop:10,
    width:width/2,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
},
btnRow:{
    flexDirection:'row',
    marginTop:50,
    marginBottom:20
},
btnColumn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
btnTouch:{
    borderRadius:100,
    paddingVertical:15,
    width:width/2.5,
    justifyContent:'center',
    alignItems:'center'
},
calandetBtn:{
    flexDirection:'row',
    borderWidth:0.5,
    width:width/3,
    alignSelf:'center',
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:3,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    position:'relative'
}
})



