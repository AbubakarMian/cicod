import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        paddingBottom:10,
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

    backHeadingCloseView:{
        position:'absolute',
        right:10,
        flexDirection:'row'
    },
    backHeadingCloseText:{
        color:'#707070',
        marginLeft:5
    },
    addressContainer:{
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        padding:5,
        marginTop:5,

    },
    customerContaineraddProductView:{
        width:width/1.5,
        borderLeftColor:'#929497',
        paddingVertical:10,
        alignSelf:'flex-end',
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    customerContaineraddProductText:{
        marginHorizontal:10,
        color:'#4E4D4D',
        fontWeight:'bold'
    },
    redBtn:{
        backgroundColor:'#B1272C',
        borderRadius:100,
        width:width/1.5,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        paddingVertical:10,
        marginBottom:20,
    }
   
})



