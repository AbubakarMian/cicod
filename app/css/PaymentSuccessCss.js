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
    mainContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:width-20,
        alignSelf:'center',
        height:height-100,
        backgroundColor:'#fff',
        borderRadius:5
    },
    touchView:{
        borderWidth:1,
        borderColor:'#B1272C',
        borderRadius:100,
        paddingHorizontal:width/10,
        paddingVertical:width/30,
        marginTop:20,
    },
    touchText:{
        color:'#B1272C',
        fontFamily:'Open Sans',
        fontSize:16
    }
   
})



