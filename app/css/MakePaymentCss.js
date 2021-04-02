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
    cardTouch:{
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        marginTop:10,
        padding:10,
        position:'relative',
        justifyContent:'center'
    },
    cardHeadingText:{
        fontWeight:'bold',
        color:'#4E4D4D'
    },
    cardDescText:{
        color:'#929497',
        fontSize:10
    },
    cardImageView:{
        position:'absolute',
        right:10
    }
   
})



