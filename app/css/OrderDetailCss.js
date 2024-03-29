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
        paddingHorizontal: 20
    },

    btnContinuueView: {
        backgroundColor: '#B1272C',
        borderRadius: 50,
        width: width - 50,
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
        fontSize:13,fontWeight:'bold',
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
      position:'relative',
      
    },
    priceLabel:{
        fontSize: 13, color: '#929497', marginRight: 20 
    },
    detailColumn2text: {
        textAlign: 'right',
        fontSize:13,
        fontWeight:'bold',
        color:'#4E4D4D'
    },
    invoiceRow: {
        borderBottomWidth: 2,
        borderBottomColor: '#E6E6E6',
        flexDirection: 'row',
        width:width-50,
        marginHorizontal:50,
        alignSelf:'center',
        
        paddingVertical:10
    },
    orderStatusText:{
        // color:"#ffffff",
        borderRadius: 50, 
        width: width / 4.8, 
        alignSelf: 'flex-end',
        textAlign:'center',
        fontSize:13,         
    }


})



