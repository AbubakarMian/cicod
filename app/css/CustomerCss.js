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
    //  paddingVertical:10,
    alignItems: 'center',
  },
  headerRowBackiconView: {
    marginRight: 30,
  },
  headerRowText: {
    color: '#2F2E7C',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerRowPlusiconView: {
    position: 'absolute',
    right: 5,
  },
  searchBoxView: {
    width: width - 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchBoxDividerView: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 2,
    marginVertical: 10,
    height: 1,
  },
});
