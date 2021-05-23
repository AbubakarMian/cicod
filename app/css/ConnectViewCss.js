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
        width:width-10,
        alignSelf:'center',
        borderRadius:10,
        paddingVertical:10,
        marginHorizontal:10,
        paddingHorizontal:10
    },
    productDeatailHeaderRow:{
        flexDirection:'row',
        position:'relative',
        alignItems:'center',
        width:width-20,
        justifyContent:'center',
      
    },
    aciveView:{
        position:'absolute',
        backgroundColor:'#DAF8EC',
        paddingHorizontal:10,
        borderRadius:100,
        left:10,
        
    },
    inaciveView:{
        position:'absolute',
        backgroundColor:'#FFF4F4',
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
        // textAlign:'center',
        paddingHorizontal:100
    },
    redTouch:{
        backgroundColor:'#B1272C',
        marginVertical:20,
        width:width-220,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100
    },
    greyTouch:{
        backgroundColor:'#E6E6E6',
        marginVertical:20,
        width:width-220,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100,
    },
    descRow:{
        flexDirection:'row',
        marginTop:20
    },
    descColumn:{
        flex:1,
        flexDirection:'row'
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
    },
    suspendmodalBackGround: {
        height: height,
        backgroundColor: '#00000057',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: -0.999
    },
    suspendTouch: {
        alignSelf: 'baseline',
        zIndex: 999,
        backgroundColor: '#fff',
        width: width,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 30,
        paddingTop: 20,
        flexDirection: 'row',
        paddingBottom: 20,
        alignSelf: 'baseline',
        position: 'absolute',
        bottom:0,
        flexDirection:'column',
        justifyContent:'center'
       
    },
    banImage: {
        zIndex: 999,
        marginRight: 10
    },
    modalBackGroung:{
        height:height,
        width:width,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000057',
        position:'relative'
    },
    modalCloseTouch:{
        position:'absolute',
        top:20,
        right:20,
        flexDirection:'row',
        alignSelf:'flex-end'
    },
})



