/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Dimensions, Alert,  TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
var {width, height} = Dimensions.get('window');

const InAppHeader=({onPress=f=>f})=>{
    return(
        <View style={{ flexDirection: 'row',
        width: width,
        position: 'relative',
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 10,}}>
          <TouchableOpacity hitSlop={{top:20,bottom:20,right:20,left:20}} onPress={()=>{
             Alert.alert("Info","Do you want to exit?",[
              {
                text:"NO",
              },
              {
                text:"YES",
                onPress:()=>onPress()
              }
            ]);
            
            }}>
<Icon name="arrow-left" size={25} color={'#929497'} />


          </TouchableOpacity>
        </View>
    )
}

export default InAppHeader;

