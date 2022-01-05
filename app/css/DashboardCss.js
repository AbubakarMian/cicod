/* eslint-disable prettier/prettier */
import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        height: height,
        width: width,
        backgroundColor: '#fff',
        paddingTop: 50,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    headerRowView: {
        flexDirection: 'row',
        width: width - 20,
        marginVertical: 10
    },
    headingText: {
        color: '#2F2E7C',
        fontWeight: 'bold'
    },
    calenderText: {
        marginLeft: 10
    },
    calenderbtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        
        
        borderColor: '#FFF4F4'
    },
    cardContainer: {
        width: width - 20,
        flexDirection:'row',
    },
    cardView:{
        flex:1,
        padding:5
    },
    card:{
        backgroundColor:'#fff',
        borderRadius:5,
        justifyContent:'center',
        padding:10
        
    },
    recardtext:{
        backgroundColor:'#FFE5E5',
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
        borderRadius:50,
        color:'#B1272C',
        width:50,
        // height:width/8,
        textAlignVertical:'center',
        fontSize:10
    },
    greencardtext:{
        backgroundColor:'#DFFCEB',
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
        borderRadius:50,
        color:'#18A757',
        width:50,
        // height:width/8,
        textAlignVertical:'center',
        fontSize:10
    },
    bluecardtext:{
        backgroundColor:'#ACABCB',
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
        borderRadius:50,
        color:'#2F2E7C',
        width:50,
        // height:width/8,
        textAlignVertical:'center',
        fontSize:10
    },
    yellowcardtext:{
        backgroundColor:'#FFF3DB',
   
        paddingHorizontal:10,
        paddingVertical:5,
        textAlign:'center',
        borderRadius:50,
        color:'#FDB72B',
        width:50,
        // height:width/8,
        textAlignVertical:'center',
        fontSize:10
    },

    bannerView: {
        width: width - 20,
        backgroundColor: '#2F2E7C',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        position: 'relative',
        marginBottom:10
    },
    bannerContentView: {
        flex: 3,
        flexDirection: 'column'
    },
    bannerText: {
        color: '#fff'
    },
    bannerboldText: {
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 2
    },
    bannerpercentText: {
        color: '#B1272C',
        borderColor: '#B1272C',
        borderWidth: 1,
        width: 65,
        backgroundColor: '#FFE5E5',
        borderRadius: 50,
        paddingHorizontal: 10,
        alignSelf: 'flex-end',
        marginRight: width / 6,
        marginBottom: 5


    },
    bannerImagetView: {
        flex: 1,
        justifyContent: 'center'

    },
    activeView:{
backgroundColor:"#C9C9C9",

    },

    titleViewStyle:{
        backgroundColor:"#fff",padding:10,borderRadius:10,
        width:80
    }
    ,modalBackGround: {
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
})



