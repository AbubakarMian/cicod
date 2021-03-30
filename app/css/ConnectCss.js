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
    tabView:{
        backgroundColor:'#fff',
        paddingVertical:10,
        width:width-20,
        display:'flex',
        alignSelf:'center',
        paddingHorizontal:10,
        flexDirection:'row'
    },
    contentView:{
        backgroundColor:'#fff',
        marginTop:20,
        paddingVertical:30,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    searchView:{
        borderWidth:1,
        borderColor:'#D8DCDE',
        width:width-50,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    deatilcontentView:{
        width:width-20,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
    }
})



