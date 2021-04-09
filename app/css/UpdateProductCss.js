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
    headingBoxView:{
        borderWidth:1,
        borderColor:'#B1272C',
        width:width-20,
        alignSelf:'center',
        marginTop:10,
        padding:5,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center'
    },
    headingBoxText:{
        fontWeight:'bold',
        marginLeft:10,
        color:'#4E4D4D'
    },
    searchRowView:{
        flexDirection:'row',
        alignSelf:'center',
        width:width-20,
        alignItems:'center',
        position:'relative',
    },
    searchRowSettingIconView:{
        position:'absolute',
        right:0,
    },
    darkGrayBoldText:{
        color:'#4E4D4D',
        fontWeight:'bold',
        marginVertical:10,
    },
    darkGrayNormalText:{
        color:'#4E4D4D',
    },
    selectedProductRowView:{
        flexDirection:'row',
        width:width-20,
        alignSelf:'center',
        alignItems:'center',
    },
    HeadingView:{
        flexDirection:'row',
        position:'relative'
    },
    HeadingText:{
        fontWeight:'bold',
        fontSize:15,
        color:'#4E4D4D',
        marginLeft:10
    },
    HeadingIcon:{
        position:'absolute',
        
    },
    flatListRowView:{
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        position:'relative',
        borderRadius:5,
        marginTop:5
    },
    flatListRowText:{
        color:'#4E4D4D',
        fontWeight:'bold',
        marginLeft:5
    },
    redTouchView:{
        backgroundColor:'#B1272C',
        marginVertical:10,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100
    },
    flatelistHeadingText:{
        marginLeft:10,
    },
    flatelistHeadingIcon:{
        position:'absolute',
        
    },
    //updateProductModal
    modalCOntainer:{
        width:width-20,
        height:height/2+50,
        paddingVertical:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderWidth:0.5,
        borderRadius:5,

    },
    modalMainContainer:{
        height:height,
        width:width,alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        opacity:0.6
},

    modalTextRowView:{
        flexDirection:'row'
    },
    modalNormalText:{
        color:'#4E4D4D'
    },
    modalBOldText:{
        color:'#4E4D4D',
        fontWeight:'bold',
    },
    modalTouchView:{
        marginVertical:10,
        width:width/1.5,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100,
        marginTop:10,
    },
   
   
})



