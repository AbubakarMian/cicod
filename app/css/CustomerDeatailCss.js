/* eslint-disable prettier/prettier */
import React from 'react';

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainView: {
    height: height,
    width: width,
    backgroundColor: '#F0F0F0',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    width: width - 20,
    position: 'relative',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerRowBackiconView: {
    marginRight: 30,
  },
  headerRowText: {
    color: '#2F2E7C',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  headerRowPlusiconView: {
    position: 'absolute',
    right: 5,
  },
  searchBoxView: {
    width: width - 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBoxDividerView: {
    borderBottomColor: '#E6E6E6',

    marginVertical: 10,
  },
  mainContentView: {
    backgroundColor: '#fff',
    width: width - 20,
    marginTop: 10,
    padding: 30,
  },
  mainContentUserImageView: {
    alignSelf: 'center',
  },
  mainContentUserInfoView: {
    flexDirection: 'row',
  },
  modalBackGround: {
    height: height,
    backgroundColor: '#00000057',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: -0.999,
  },
  suspendmodalBackGround: {
    height: height,
    backgroundColor: '#00000057',
    // opacity: 0.7,
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
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingHorizontal: 30,
  paddingTop: 20,
  flexDirection: 'row',
  paddingBottom: 20,
  
  position: 'absolute',
  bottom:0,
  // flexDirection:'column',
  justifyContent:'center'
 
},
  suspendModal: {
    //alignSelf: 'baseline',
    alignItems: 'flex-start',
    zIndex: 999,
    justifyContent: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 30,
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    height: height / 10,
  },
  mainContentUserInfoHeading: {
    fontWeight: 'bold',
    color: '#929497',
  },
  orderStatusText: {
    // color:"#ffffff",
    borderRadius: 50,
    width: width / 4.8,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13,
  },
  mainContentUserInfo: {
    fontSize: 10,
    color: '#929497',
  },
  balanceView: {
    borderTopColor: '#E6E6E6',
    borderTopWidth: 2,
    width: width - 20,
  },
  balanceRowView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  balanceColumn1Text: {
    color: '#929497',
  },
  balanceColumn2Text: {
    fontWeight: 'bold',
  },
  balanceColumn1View: {
    flex: 1,
  },

  balanceColumn2View: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
