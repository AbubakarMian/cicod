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
    // height: height,
    width: width,
    backgroundColor: '#F0F0F0',
    flex: 1,
    flexDirection: 'column',
  },
  backRowView: {
    flexDirection: 'row',
    width: width - 20,
    alignSelf: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
  backRowTouch: {
    paddingRight: 20,
  },
  backRowHeadingView: {
    paddingHorizontal: 10,
  },
  backRowHeadingText: {
    color: '#2F2E7C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  mainFormView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: width - 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  formRow: {
    flexDirection: 'row',
    flex: 1,
  },
  formColumn: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  gownIcon: {
    position: 'absolute',
    right: 20,
  },
  cheBox: {
    alignItems: 'center',
    marginLeft: -5,
  },
  redTouchView: {
    backgroundColor: '#B1272C',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 100,
    marginVertical: 10,
    paddingVertical: 10,
  },
});
