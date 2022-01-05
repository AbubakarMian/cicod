/* eslint-disable prettier/prettier */
import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground, Modal } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    modalBackGround: {
        height: height,
        backgroundColor: '#00000057',
     flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: -0.999
    },
    suspendModal:{
        //alignSelf: 'baseline',
        alignItems:"center",
        zIndex: 999,
        // justifyContent:'center',
        justifyContent:"space-between",
        backgroundColor: '#fff',
        width: width,
        paddingVertical:30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 30,
        // paddingTop: 30,
        // paddingBottom:30,
        position: 'absolute',
        bottom: 0,
        opacity:1,
        height:height/6
    },
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
    headingDescView:{
        width:width-20,
        alignSelf:'center'
    },
    headingDescText:{
        fontWeight:'bold',
        color:'#929497',
        fontSize:12
    },
    plusTouch:{
        position:'absolute',
        right:5,
    },
    searchRow:{
        flexDirection:'row',
        width:width-20,
        alignSelf:'center',
        marginVertical:10,
        paddingBottom:20,
        borderBottomColor:'#E6E6E6',
        borderBottomWidth:1,
        alignItems:'center',
        position:'relative',
    },
    settingTouch:{
        position:'absolute',
        right:5
    },
    listContainer:{
        flexDirection:'row',
        paddingHorizontal:5,
        marginBottom:5,
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        paddingVertical:10,
        borderRadius:5
    },
    listImageView:{
        flex:1
    },
    listDescView:{
        flex:4,
        flexDirection:'column',
    },
    listDescBoldText:{
      color:'#4E4D4D',
      fontWeight:'bold'
    },
    listDescNormalText:{
        color:'#929497',
        fontSize:12
    },
    listActionView:{
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:10,
       
    },
    actionText:{
        backgroundColor:'#DAF8EC',
        color:'#26C281',
        paddingHorizontal:15,
        paddingVertical:3,
        borderRadius:100,
    },
    inactiveActionText:{
        backgroundColor:'#E6E6E6',
        color:'#FFFFFF',
        paddingHorizontal:5,
        paddingVertical:3,
        borderRadius:100,
        fontSize:12,
        textAlign:'center',
        // width:120,
    },
   dotsTouch:{
       
       
   }
})



