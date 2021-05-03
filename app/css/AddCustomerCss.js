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
    searchContainer:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        alignSelf:'center',
        width:width-20,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#e2e2e2',
        borderBottomWidth:1,
        position:'relative',
        width:width-20,
    },
    contentView:{
     justifyContent:'center',
     alignItems:'center',
     width:width-20,
     alignSelf:'center',
     minHeight:height/2
    },
    contentViewHeadingText:{
        fontWeight:'bold',
        color:'#929497',
        marginTop:10
    },
    contentViewDescText:{
        color:'#929497',
        fontSize:12
    },
    custommerDeatailContainerView:{
        width:width-20,
        alignSelf:'center',
        borderRadius:10,marginVertical:10
    },
    custommerDtailCarView:{
        backgroundColor:'#fff',
        paddingVertical:10,
    },
    custommerNameRow:{
        flexDirection:'row',
        paddingLeft:5,
        alignItems:'center',
        position:'relative'
    },
    custommerNameText:{
        color:'#4E4D4D',
        fontWeight:'bold',
        marginLeft:5
    },
    custommerNameRightAngle:{
        position:'absolute',
        right:width/10,
    },
    custommerDtailCardRowView:{
        flexDirection:'row',
        paddingHorizontal:10,
    },
    custommerDtailCardBoldText:{
        color:'#929497',
        fontWeight:'bold',
        fontSize:12,
    },
    custommerDtailCardNormalText:{
        color:'#929497',
        fontSize:10,
    },
    countingContainer:{
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingVertical:10,
        paddingHorizontal:10

    },
    countingRowView:{
        flex:1,

    },
    addCustommerRowView:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    addCustommerText:{
        fontWeight:'bold',
        color:'#4E4D4D',
        marginLeft:10
    }
})



