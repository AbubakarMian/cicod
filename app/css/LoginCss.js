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
        width: width,
        backgroundColor: '#fff',

        alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },

  textInputView: {
    //  borderWidth:1,
    borderRadius: 5,
    borderColor: '#CFCFCF',
    width: width - 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comtextInputView: {
    borderRadius: 5,
    borderColor: '#CFCFCF',
    width: width - 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 0,
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
});
