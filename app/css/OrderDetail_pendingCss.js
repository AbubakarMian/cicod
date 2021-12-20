import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        //  height:height,
        width: width,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    headingRow: {
        flexDirection: 'row',
        width: width - 20,
        marginTop: 10,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    resetText: {
        color: '#2F2E7C',
        fontWeight: 'bold',
        marginLeft: 10
    },
    textInputView: {
        borderRadius: 5,
        backgroundColor: '#fff',
        width: width - 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 20,
        paddingHorizontal: 20,
        position:'relative'
    },

    btnContinuueView: {
        backgroundColor: '#B1272C',
        borderRadius: 50,
        width: width/4,
        flex:1.1,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal:10
    },
    btnSend:{
        backgroundColor: '#fff',
        borderWidth:0.5,
        borderColor:'#B1272C',
        borderRadius: 50,
        width: width/4,
        flex:2.4,
        marginHorizontal:10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    detailMainView: {
        width: width - 20,
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginVertical: 10,
        padding:10
    },
    detailRow: {
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row'
    },
    invoiceRow: {
        borderBottomWidth: 2,
        borderBottomColor: '#E6E6E6',
        flexDirection: 'row'
    },
    detailColumn1: {
        flex: 1
    },
    detailColumn2: {
        flex: 1
    },
    detailColumn1text: {
        color: "#aaa",
        fontSize:13
    },
    orderStatusText:{
        // color:"#ffffff",
        borderRadius: 50, 
        width: width / 4.8, 
        alignSelf: 'flex-end',
        textAlign:'center',
        fontSize:13,
    },
    detailInvoiceGraytext: {
        color: "#aaa",
        fontSize:15
    },
    detailInvoiceDarkGraytext: {
        textAlign: 'right',
        fontSize:15,
        fontWeight:'bold',
        color:'#4E4D4D'
    },
    detailInvoiceLable:{
      color:'#4E4D4D',
      fontSize:15,
      
    },
    detailColumn2text: {
        textAlign: 'right',
        fontSize:11,
        fontWeight:'bold',
        color:'#4E4D4D'
    },
    invoiceRow: {
      
        flexDirection: 'row',
        width:width-50,
        marginHorizontal:50,
        alignSelf:'center',
        
        paddingVertical:10
    },
    noteView:{
        backgroundColor:'#fff',
        borderRadius:5,
        paddingVertical:10,
        width:width-20,
        alignSelf:'center',
        marginBottom:10
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



