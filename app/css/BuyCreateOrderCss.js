import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        paddingBottom: 10,
        flexDirection: 'column'
    },
    backHeaderRowView: {
        flexDirection: 'row',
        width: width - 20,
        marginHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        position: 'relative'
    },
    backHeadingView: {
        marginHorizontal: 10
    },
    backHeadingText: {
        color: '#2F2E7C',
        fontWeight: 'bold'
    },

    backHeadingCloseView: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row'
    },
    backHeadingCloseText: {
        color: '#707070',
        marginLeft: 5
    },
    customerTitleRowView: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 5

    },
    customerTitleRowHeadingText: {
        fontWeight: 'bold',
        marginRight: 10,
        color: '#4E4D4D'
    },
    customerTitleRowchangesupplierText: {
        color: '#B1272C',
        fontSize: 12
    },
    customerDetailView: {
        width: width - 20,
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: 'center',
        padding: 5
    },
    customerDetailHeadingText: {
        color: '#929497',
        marginBottom: 10,
    },
    customerDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    customerDetailNameText: {
        color: '#4E4D4D',
        fontWeight: '700',
        marginLeft: 5
    },
    customerDetailLable: {
        color: '#929497',
        fontWeight: 'bold',
    },
    customerDetailInfo: {
        color: '#929497'
    },
    downIconView: {
        alignSelf: 'center'
    },
    customerContaineraddProductView: {
        width: width / 1.5,

        borderLeftColor: '#929497',
        paddingVertical: 10,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    customerContaineraddProductText: {
        marginHorizontal: 10,
        color: '#4E4D4D',
        fontWeight: 'bold'
    },
    OrderDetailContainer: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        width: width - 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    OrderDetailContainerHeadingText: {
        color: '#D8D8D8',
        fontWeight: 'bold'
    },
    OrderDetailContainerText: {
        color: '#D8D8D8',
        fontSize: 10
    },
    customerContainerhead: {
        position: 'absolute',
        top: 3,
        left: 3,
        color: '#929497',
        fontWeight: 'bold'
    },

    diliveryTypeContainerView: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        width: width - 20,
        marginTop: 10,
        alignSelf: 'center',
    },
    radioFormView: {
        paddingVertical: 10,
        // borderTopWidth:1,
        // borderTopColor:'#D8D8D8',
        // borderBottomWidth:1,
        // borderBottomColor:'#D8D8D8',
        marginTop: 10,
        marginHorizontal: 10
    },
    smailGrayText: {
        color: '#D8D8D8',
        marginLeft: 20
    },
    paymentContainerView: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginTop: 10,
        width: width - 20,
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    paymentHeadingText: {
        color: '#D8D8D8',

    },
    subtotleContainer: {
        width: width - 20,
        alignSelf: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    subtotleContainerHeading: {
        color: '#929497',
        fontWeight: 'bold'
    },
    subTotleRowView: {
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    subTotleColumn1View: {
        flex: 1,

    },
    subTotleColumn1Text: {
        color: '#929497',
        fontWeight: 'bold'
    },
    subTotleColumn2Text: {
        color: '#929497',
    },
    subTotleColumn2View: {
        flex: 1,
        alignItems: 'flex-end'

    },
    btnContinuueView: {
        backgroundColor: '#B1272C',
        borderRadius: 50,
        width: width - 50,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center'
    },


    /////////Modal/////////
    mainContainer: {
        height: height,
        width: width,
        flexDirection: 'column',
    },
    backgroundTouch: {
        flex: 0.25
    },
    contentView: {
        flex: 9,
        backgroundColor: '#fff',
        opacity: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 0.999
    },
    modalCancleRow: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        position: 'relative',
    },
    modalCancleText: {
        color: '#2F2E7C',
        fontWeight: 'bold'
    },
    modalCancleTouch: {
        padding: 10,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    searchRow: {
        marginTop: 10,
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
        borderBottomWidth: 0.25,
        alignItems: 'center',
        borderBottomColor: '#929497',
    },
    modalListContainer:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:5,
        alignItems:'center',
        backgroundColor:'#fff',
        marginBottom:2,
        borderTopWidth:0.25,
        borderBottomWidth:0.25,
        width:width-20,
        alignSelf:'center',
        borderTopColor:'#aaaa',
        borderBottomColor:'#aaaa'
    },
    modalListContentView:{
        paddingHorizontal:10,
        flexDirection:'column'
    },
    modalListContentRightIcon:{
        position:'absolute',
        right:5
    },
    modalBoldeText:{
        fontWeight:'bold',
        color:'#4E4D4D',
    },
    modalNumberText:{
        color:'#929497',
        fontSize:10,
    }


})



