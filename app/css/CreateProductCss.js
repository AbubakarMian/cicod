import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground, Modal } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        height: height,
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        flexDirection: 'column'
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
    productDetailContainerView:{
        backgroundColor:'#fff',
        width:width-20,
        paddingVertical:10,
        paddingHorizontal:10,
        alignSelf:'center'
    },
    formRowView:{
        flexDirection:'row',
    },
    formColumn:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'

    },
    rightIcon:{
        position:'absolute',
        right:10,
    },
    addImageView:{
        flexDirection:"column",
        
    },
    addImageLableText:{
        color:'#4E4D4D',
        fontWeight:'bold',
        marginBottom:10,
    },
    lightGrayText:{
        color:'#929497',
        fontSize:10,
        fontWeight:'bold'
    },
    varaitionText:{
        color:'#929497',
        fontWeight:'bold',
        marginTop:10,
        fontSize:17
    },
    redTouchText:{
        color:'#B1272C',
        fontSize:12,
        justifyContent:'center',
        alignItems:'center'
    },
    productImageLable:{
        color:'#4E4D4D',
        fontWeight:'bold'
    },
    productImage:{
        height:width/4,
        width:width/4,
    },
    productImageCross:{
        position:'absolute',
        top:2,
        right:2,
        zIndex:9999
    },
    redTouch:{
        backgroundColor:'#B1272C',
        marginVertical:20,
        width:width-50,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100
    },
    toolTipMainView:{

      alignSelf:'center',
      justifyContent:'center',
      paddingVertical:10,
      paddingHorizontal:20,
    },
    toolTipSaveBtn:{
        alignSelf:'center',
        backgroundColor:'#B1272C',
        borderRadius:100,
        paddingHorizontal:30,
        paddingVertical:10,
        marginVertical:10,
    }
    
})



