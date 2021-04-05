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
        paddingVertical:20,
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
    searchByCatCOntainer:{
        marginTop:10,
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        position:'relative'
    },
    searchByCatCOntainerIconView:{
        position:'absolute',
        right:10
    }
    
})



