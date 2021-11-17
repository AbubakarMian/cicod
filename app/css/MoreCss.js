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
  modalBackGround: {
    height: height,
    backgroundColor: '#00000057',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: -0.999,
  },
  suspendModal: {
    //alignSelf: 'baseline',
    alignItems: 'flex-start',
    zIndex: 999,
    justifyContent: 'center',
    justifyContent: 'space-between',
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
    height: height / 6,
  },
  mainView: {
    width: width,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    flexDirection: 'column',
  },
  headingRow: {
    flexDirection: 'row',
    width: width - 20,
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  moreText: {
    color: '#2F2E7C',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
  cardView: {
    width: width - 20,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  cardTextView: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  cardHeadingText: {
    fontWeight: 'bold',
    color: '#4E4D4D',
  },
  cardDescText: {
    fontSize: 10,
    color: '#929497',
  },
  logoutView: {
    marginTop: height / 20,
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginHorizontal: 5,
    color: '#929497',
  },
});
