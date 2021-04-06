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
    productDeatailContainer:{
        padding:5,
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
    },
    productDeatailHeaderRow:{
        flexDirection:'row',
        position:'relative',
        alignItems:'center',
        width:width-20,
        justifyContent:'center'
    },
    aciveView:{
        position:'absolute',
        backgroundColor:'#DAF8EC',
        paddingHorizontal:10,
        borderRadius:100,
        left:10,
        
    },
    settingIcon:{
        position:'absolute',
        right:10,
        top:0
    },
    productDeatailHeadingText:{
        color:'#4E4D4D',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center',
        marginTop:10
    },
    lightGrayTex:{
        color:'#929497',
        textAlign:'center',
        
    },
    darkGarayText:{
        fontWeight:'bold',
        color:'#4E4D4D',
        textAlign:'center',
    },
    descRow:{
        flexDirection:'row',
    },
    descColumn:{
        flex:1,
        flexDirection:'column'
    },
    imageHeadingText:{
        color:'#2F2E7C',
        fontWeight:'bold',
        marginLeft:20,
        marginTop:10,
    },
    productImage:{
        maxHeight:width/2,
        maxWidth:width/2,
        marginLeft:20,
        marginTop:20
    }
})



