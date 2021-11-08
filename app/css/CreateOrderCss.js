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
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Open Sans',
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
    customerContainerView: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        width: width - 20,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    customerContainerheading: {
        color: '#D8D8D8',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        fontSize: 15,
    },
    customerContainerhead: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 15,
        color: '#929497',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
    },
    customerContainerheadText: {
        color: '#D8D8D8',
    },
    customerContaineraddBtnView: {
        backgroundColor: '#B1272C',
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 10
    },
    customerContaineraddBtnText: {
        color: '#fff',
        marginHorizontal: 5,
        fontSize: 13,
        fontFamily: 'Open Sans'

    },
    customerContainerText: {
        color: '#D8D8D8',
        fontFamily: 'Open Sans',
        fontSize: 15,
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
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        fontSize: 15,
    },
    OrderDetailContainer: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        width: width - 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    OrderDetailContainerHeadingText: {
        color: '#D8D8D8',
        fontWeight: 'bold'
    },
    OrderDetailContainerText: {
        color: '#D8D8D8',
        fontSize: 10
    },

    diliveryTypeContainerView: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        width: width - 20,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 10
    },
    radioFormView: {
        paddingVertical: 10,
        // borderTopWidth:1,
        // borderTopColor:'#D8D8D8',
        // borderBottomWidth:1,
        // borderBottomColor:'#D8D8D8',
        marginTop: 10,
        marginHorizontal: 10,

        borderRadius: 2
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
        paddingHorizontal: 10,
        borderRadius: 10
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
        width: width - 40,
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
        color: '#4E4D4D',
        fontFamily: 'Open Sans',
        fontSize: 15
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
    OrderDetailHeadingRow: {
        position: 'absolute',
        top: 5,
        width: width,
        left: 5,
        flexDirection: 'row'
    },
    OrderDetailHeadingRowText: {
        color: '#929497',
        fontSize: 15,
        fontFamily: 'Open Sans',
        fontWeight: 'bold'
    },
    OrderDetailNormalgRowText: {
        color: '#E6E6E6',
        fontSize: 13,
        fontFamily: 'Open Sans',

    },
    OrderDetailClearTouc: {
        right: 10,
        top: 5,
        position: 'absolute'
    },
    OrderDetailNotificationText: {
        backgroundColor: '#B1272C',
        color: '#fff',
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 100,
    },
    OrderDetailDataCOntainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    OrderDetailDataCOntainerRow: {
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
        paddingHorizontal: 5,
        position: 'relative',
    },
    OrderDetailDataCOntainerHeadingText: {
        fontWeight: '700',
        color: '#4E4D4D'
    },
    OrderDetailDataCOntainerCounterView: {
        position: 'absolute',
        right: 5,
        borderWidth: 0.5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#929497',
        borderRadius: 5,
        top: 5

    },
    iconView: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5
    },
    orderDetailAmmountRow: {
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    },
    orderDetailAmmountColumn: {
        flex: 1
    },
    orderDetailAmmountColumnGaryBolText: {
        fontWeight: 'bold',
        color: '#4E4D4D'
    },
    orderDetailAmmountColumnRedText: {
        color: '#B1272C'
    },
    userDEtailCOntainer: {
        marginTop: 20,
        paddingLeft: 10
    },
    userDEtailCOntainerIconView: {
        flexDirection: 'row',
        width: width - 20,
        marginBottom: 10
    },
    userDEtailCOntainerText: {
        marginLeft: 10,
        color: '#4E4D4D',
        fontWeight: 'bold'
    },
    usetDetailInfoText: {
        color: '#929497'
    },
    usetDetailLableText: {
        color: '#929497',
        fontWeight: 'bold'
    },
    downIconView: {
        alignSelf: 'center'
    },
    cartSlashView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.25,
        width: width - 20,
        marginTop: 10,
        borderTopColor: '#E6E6E6',
        paddingVertical: 20
    },
    cartSlashheadingText: {
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        fontSize: 15,
        color: '#929497'
    },
    cartSlashNormalText: {
        fontFamily: 'Open Sans',
        fontSize: 15,
        color: '#D8D8D8'
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
    modalListContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 2,
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        width: width - 20,
        alignSelf: 'center',
        borderTopColor: '#aaaa',
        borderBottomColor: '#aaaa'
    },
    modalListContentView: {
        paddingHorizontal: 10,
        flexDirection: 'column',
    },
    modalListContentRightIcon: {
        position: 'absolute',
        right: 5
    },
    modalBoldeText: {
        fontWeight: 'bold',
        color: '#4E4D4D',
    },
    modalNumberText: {
        color: '#929497',
        fontSize: 10,
    },


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
        borderWidth:0.25,
        width:width-20,
        alignSelf:'center',
        borderTopColor:'#aaaa',
        borderColor:'#aaaa',
        borderRadius:5,
        paddingVertical:10,
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



