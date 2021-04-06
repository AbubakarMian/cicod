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
    headingDescText:{
        color:'#4E4D4D',
        fontSize:13,
        marginHorizontal:10,
        fontWeight:'bold'
    },
    inputRedBoxView:{
        borderWidth:1,
        borderColor:'#B1272C',
        width:width-20,
        alignSelf:'center',
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:5,
        marginTop:5,
        
    },
    redBoxText:{
        color:'#4E4D4D',
        fontWeight:'bold'
    },
    redTextContainerView:{
        borderBottomWidth:1,
        width:width-20,
        alignSelf:'center',
        borderBottomColor:'#E8E8E8',
        paddingBottom:10
    },
    selectedSmallHeadingView:{
        flexDirection:'row',
        width:width-20,
        alignSelf:'center'
    },
    selectedSmallHeadingBold:{
        color:'#4E4D4D',
        fontWeight:'bold',
        marginRight:2
    },
    selectedSmallHeadingText:{
        color:'#4E4D4D'
    },
    productHeadingView:{
        flexDirection:'row',
        position:'relative',
        width:width-10,
    },
    productHeadingText:{
        color:'#4E4D4D',
        fontWeight:'bold',
        marginLeft:10,
        fontSize:15,
        marginTop:10,
    },
    greenCheckView:{
        position:'absolute',
        right:10
    },
    flatelistContainerView:{
        backgroundColor:'#fff',
        paddingVertical:2,
        flexDirection:'row',
        width:width-20,
        alignSelf:'center',
        alignItems:'center',
        paddingHorizontal:10,
        marginBottom:1,
        borderRadius:3,
        position:'relative'

    },
    touchView:{
        backgroundColor:'#B1272C',
        marginBottom:height/10,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        width:width-50,
        alignSelf:'center',
        borderRadius:100

    },
    modalBackgroundCOntainerView:{
        height: height, 
        width: width, 
        justifyContent: 'center',
        backgroundColor:'#000',
        opacity:0.7 
    },
    modalContentCOntainerView:{
        backgroundColor: '#fff', 
        paddingTop:30,
        paddingBottom:30,
        width: width - 30, 
        alignSelf: 'center',
        zIndex:-0.999,
        opacity:1,
        borderRadius:5,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center' 
    },
    modalTextRow:{
        flexDirection:'row',
    },
    modalBoldText:{
        fontWeight:'bold'
    },
    redTouchModal:{
        backgroundColor:'#B1272C',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        width:width/1.2,
        alignSelf:'center',
        borderRadius:100,
        marginVertical:5
    },
    grayTouchModal:{
        
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        width:width/1.2,
        alignSelf:'center',
        borderRadius:100,
        marginVertical:5
    },
    complaintHeadingModalView:{
        width:width/1.5
    },
    complaintHeadingModalText:{
        color:'#929497',
        fontWeight:'bold'   
    },


})



