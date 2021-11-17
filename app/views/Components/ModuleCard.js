import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
const Device = require('react-native-device-detection');
const {width, height} = Dimensions.get('screen');
const ModuleCard = ({source, onPress, disabled, title}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={styles.cardViewStyle}>
        <Image
          style={{height: width / 3 - 80, width: width / 3 - 80}}
          source={source}
        />
        <Text
          style={[styles.cardLableText, {fontSize: Device.isTablet ? 15 : 12}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardLableText: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#4E4D4D',
  },
  cardViewStyle: {
    flexDirection: 'column',
    padding: 10,
    flex: 1,
    // width: Device.isTablet
    //   ? width / 2 - 200
    //   : width / 2 - 80,
    height: width / 3 - 30,
    width: width / 3 - 30,
    justifyContent: 'center',

    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});

export default ModuleCard;
