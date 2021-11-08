import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        height: height,
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        flexDirection: 'column'
    },
    backHeaderRowView:{
        flexDirection:'row',
        width:width-20,
        marginHorizontal:10,
        paddingVertical:5,
        alignItems:'center',
        position:'relative'
    },
    backHeadingView:{
        marginHorizontal:10
    },
    backHeadingText:{
        color:'#2F2E7C',
        fontWeight:'bold'
    },
    heading:{
        color:'#929497',
        fontWeight:'bold',
        marginHorizontal:15
    },
    contentContainer:{
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20,
        width:width-20,
        marginTop:20,
        alignSelf:'center'
    },
    collectText:{
        color:'#929497'
    },
    payText:{
        color:'#4E4D4D',
        fontWeight:'bold'
    },
    cashText:{
        color:'#929497'
    },
    inputContainer:{
        backgroundColor:'#fff',
        paddingVertical:20,
        width:width-20,
        marginTop:20,
        alignSelf:'center'
    },
    inputView:{
        // borderBottomWidth:1,
        // borderBottomColor:'#929497',
        width:width-30,
        alignSelf:'center'
    },
    touchView:{
       
        paddingHorizontal:50,
        alignSelf:'center',
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        marginHorizontal:10,
        marginTop:20,
        // backgroundColor:'#B1272C'
    },
    touchText:{
        color:'#fff'
    },   
})



