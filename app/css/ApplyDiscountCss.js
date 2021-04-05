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

    mainContentView:{
        backgroundColor:'#fff',
        paddingVertical:20,
        width:width-20,
        alignSelf:'center',
        paddingHorizontal:10
    },
    formRow:{
        flexDirection:'row',
        alignItems:'center',
        width:width,
        alignSelf:'center',
        justifyContent:'center'
    },
    radioButtonView:{
        marginHorizontal:10,
        padding:15,
        paddingRight:50
    },
    btnView:{
        backgroundColor:'#B1272C',
        width:width-50,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100,
        marginTop:20
    }
 
})



