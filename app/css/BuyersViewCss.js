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
    backRowView: {
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
        paddingVertical: 10,
        alignItems: 'center'
    },
    backRowTouch: {
        paddingRight: 20
    },
    backRowHeadingView: {
        paddingHorizontal: 10,
    },
    backRowHeadingText: {
        color: '#2F2E7C',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing:1.2
    },
    productDetailContainerView: {
        backgroundColor: '#fff',
        width: width - 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconRight: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    productDetailROwView: {
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
    },
    columnView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightGrayText: {
        color: '#929497'
    },
    darkGrayBoldText: {
        fontWeight: 'bold',
        color: '#4E4D4D'
    },
    redTouch: {
        backgroundColor: '#B1272C',
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20
    },
    whiteTOuch: {
        borderColor: '#B1272C',
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20
    },
    moreTOuct: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    searRowView: {
        flexDirection: 'row',
        width: width - 20,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#fff',

        paddingHorizontal: 10,
        alignItems: 'center'
    },
    settingIconView: {
        position: 'absolute',
        right: 0
    },
    historyHeadingText: {
        color: '#2F2E7C',
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10
    },
    flatlistMainContianer: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal:10,
        marginTop: 5,
        width: width - 20,
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    flatlistMainRow: {
        flexDirection: 'row',
        position: 'relative'
    },
    actionContainer: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listImage: {
        marginRight: 10,
    },
    greenView: {
        paddingHorizontal: 10,
        borderRadius: 100,
        paddingVertical: 3,
        backgroundColor: '#DAF8EC'
    },
    greenText: {
        color: '#26C281',
        fontSize: 12,
        fontWeight: 'bold'
    },
    yellowView: {
        paddingHorizontal: 10,
        borderRadius: 100,
        paddingVertical: 3,
        backgroundColor: '#FFF3DB'
    },
    yellowText: {
        color: '#FDB72B',
        fontSize: 12,
        fontWeight: 'bold'
    },
    greyView: {
        paddingHorizontal: 10,
        borderRadius: 100,
        paddingVertical: 3,
        backgroundColor: '#E6E6E6'
    },
    greyText: {
        color: '#929497',
        fontSize: 12,
        fontWeight: 'bold'
    },
    modalBackGround: {
        height: height,
        backgroundColor: '#00000057',
     flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: -0.999
    },
    suspendModal:{
        //alignSelf: 'baseline',
        alignItems:'center',
        zIndex: 999,
        justifyContent:'center',
        //justifyContent:'space-around',
        backgroundColor: '#fff',
        width: width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom:30,
        position: 'absolute',
        bottom: 0,
        opacity:1,
        height:height/6
    },
    suspendTouch: {
       
        flexDirection: 'row',
        paddingBottom: 50,
        alignSelf: 'baseline',
        
    },
    banImage: {
        zIndex: 999,
        marginRight: 10
    },
    modalCloseTouch: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    moreDetailModalContentContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: width,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        zIndex: -0.9999999999999
    },
    moreDeatialModalHeadingRow: {
        flexDirection: 'row',
        width: width,
        position: 'relative',
        paddingVertical: 10,
        alignItems: 'center'
    },
    moreDetailHeadingText: {
        fontWeight: 'bold',
        color: '#2F2E7C'
    },
    moreDetailModalCloseTouch: {
        paddingHorizontal: 10,
        marginRight: 10,
        position: 'absolute',
        right: 20
    },
    moreDetailModalContentView: {
        paddingVertical: 10
    },
    moreDetailModalContentRow: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    moreDetailModalContentRowLable: {
        fontWeight: 'bold',
        color: '#707070'
    },
    moreDetailModalContentRowInfo: {
        color: '#929497'
    }

})



