import React,{useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Dimensions,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const {width, height} = Dimensions.get('screen');
const DropDownModal = ({
  titleStles = {},
  data,
  selected,
  showdropDownModal = false,
  buttonContainerStyle,
  itemFull=false,
  handleClose = f => f,
  onSelected,
  searchPlaceHolder = 'Search',
  title = '',
}) => {

const [mainData,setMainData]=useState([]);
const [filteredData,setFilteredData]=useState([]);
const [searchText,setSearchText]=useState("")

useEffect(()=>{
  setFilteredData(data)
  setMainData(data)
},[])

 console.log("dsd$#",filteredData)
  const searchList=(text)=>{
    console.log("searchRRT%",text)
    setSearchText(text);
    if (text=="") {
      setFilteredData(mainData)
      
    } else {
      const newList=data.filter(item=>{
        return item.label.toLowerCase().includes(text.toLowerCase())
      })
      console.log("filter array",newList);
      setFilteredData(newList)
    }
  }

  const renderHeader = () => {
    if (data.length<10)return null;
    return (
      <View style={{}}>
        <TextInput  value={searchText} onChangeText={(text)=>searchList(text)} style={{borderBottomColor:"#2F2E7C", borderBottomWidth:1,paddingHorizontal:15}} placeholderTextColor="#2F2E7C" placeholder={searchPlaceHolder} />
      </View>
    );
  };

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
            height: data.length > 10 ? height / 2 : height / 3,
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
          {renderHeader()}
          <FlatList
            data={filteredData && filteredData.length>0 ?filteredData:data}
            keyExtractor={(item, index) => index}
            // ListHeaderComponent={renderHeader}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                key={index}
                onPress={() => onSelected(itemFull?item :item.value)}
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
