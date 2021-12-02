import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Dimensions,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const {width, height} = Dimensions.get('screen');
const DropDownModal = ({
  titleStles = {},
  data,
  selected,
  showdropDownModal = false,
  buttonContainerStyle,
  handleClose = f => f,
  onSelected,
  title = '',
}) => {
  return (
    <Modal
      animated
      onDismiss={handleClose}
      onRequestClose={handleClose}
      animationType="slide"
      visible={showdropDownModal}
      transparent={true}>
      <View
        style={{
          //   bottom: 10,
          backgroundColor: 'rgba(0,0,0,0.2)',
          flex: 1,
          height: height,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            height: data.length > 10 ? height / 4 : height / 2,
            bottom: 0,
            backgroundColor: '#fff',
            padding: 10,
            paddingBottom: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={([titleStles], {letterSpacing: 1.06, fontWeight: 'bold'})}>
              {title}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close" size={22} color="#B1272C" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                key={index}
                onPress={() => onSelected(item.value)}
                style={[styles.buttonStyle, buttonContainerStyle]}>
                <Text
                  style={{
                    color: selected == item.value ? '#B1272C' : '#010101',
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 15,
    borderBottomColor: '#d0d0d0',
    borderBottomWidth: 1,
  },
});

export default DropDownModal;
