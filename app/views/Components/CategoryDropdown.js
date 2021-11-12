import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const CategoryDropdown = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#F5F5F5',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderColor: '#D8DCDE',
        backgroundColor: '#ffffff',
      }}>
      <Text
        style={{
          color: '#929497',
        }}>
        {title}
      </Text>

      <Icon
        size={20}
        name="caret-down"
        color={'#707070'}
        style={{alignSelf: 'center'}}
      />
    </TouchableOpacity>
  );
};

export default CategoryDropdown;
