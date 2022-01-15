/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
  View,
  Text,
  
  TouchableOpacity,
} from 'react-native';


const MultiViewHeader=({isActive,onPressListView,onPressGridView})=>{
    return(
        <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 10,
          marginTop: 5,
          marginBottom: 5,
          alignSelf: 'center',
          width: 200,
        }}>
        <TouchableOpacity
          onPress={ onPressListView}
          style={[
            styles.titleViewStyle,
            isActive ? styles.activeView : {},
          ]}>
          <Text>List View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressGridView}
          style={[
            styles.titleViewStyle,
            !isActive? styles.activeView : {},
          ]}>
          <Text>Grid View</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles=StyleSheet.create({
    titleViewStyle:{
        backgroundColor:"#fff",
        padding:10,
        borderRadius:10,
        width:100
    },
    activeView:{
        backgroundColor:"#C9C9C9",
        
            },
})

export default MultiViewHeader;