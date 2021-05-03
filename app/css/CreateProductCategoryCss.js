import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground, Modal } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        height: height,
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        flexDirection: 'column',
    },
    backRowView:{
        flexDirection:'row',
        width:width-20,
        alignSelf:'center',
        paddingVertical:10,
        alignItems:'center'
    },
    backRowTouch:{
        paddingRight:20
    },
    backRowHeadingView:{
        paddingHorizontal:10,
    },
    backRowHeadingText:{
        color:'#2F2E7C',
        fontWeight:'bold',
        fontSize:12
    },
   mainContentView:{
       backgroundColor:'#fff',
       borderRadius:5,
       paddingBottom:20,
       paddingHorizontal:10,
       width:width-20,
       marginHorizontal:10,
       alignSelf:'center'
   },
   textInputView:{
    //  borderWidth:1,
     borderRadius:5 ,
     borderColor:'#CFCFCF',
     width:width-50,
     marginTop:10,
     flexDirection:'row',
     alignItems:'center',
     position:'relative',
     justifyContent:'center',
     alignItems:'center'
 },
 redBtn:{
    backgroundColor:'#B1272C',
    borderRadius:100,
    width:width/1.2,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    paddingVertical:15,
    marginBottom:20,
}
    
})



