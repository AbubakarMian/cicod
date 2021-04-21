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
    cardView:{
        flexDirection: 'column', 
        width: width / 2 - 20, 
        height: height / 4,
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 1, 
        borderRadius: 10, 
        backgroundColor: '#fff', 
        borderColor: '#fff'
    }, 
    cardLableText:{
        fontFamily:'Open Sans',
        fontWeight:'bold',
        fontSize:18,
        color:'#4E4D4D'
    }
})



