import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
import fontStyles from '../css/FontCss'
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
export default class Headet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    render() {
     const that=this;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ flexDirection:'row', width: width, position: 'relative',alignItems:'center',justifyContent:'center', backgroundColor: '#FFFFFF', paddingVertical: 10,paddingHorizontal:10 }}>
              <TouchableOpacity 
              onPress={()=>this.props.navigation.navigate('Home')}
              style={{flex:2}}>
                  <Image 
                  source={require('../images/homeIcone.png')}
                  />
              </TouchableOpacity>
              <View style={{flex:4, justifyContent:'center',alignItems:'flex-start',alignSelf:'center'}}>
                 <Image
                 style={{height:30,width:120}} 
                 source={require('../images/headerLogo.png')}
                 />
              </View>
              <View style={{flex:1,alignItems:'flex-end',position:'absolute',right:10,top:10, flexDirection:'row',}}>
                  <Image 
                  source={require('../images/bellIcon.png')}
                  />
                  {/* <Text style={{backgroundColor:'#B1272C',color:'#fff',paddingHorizontal:12,paddingVertical:4,borderRadius:50}}>3</Text> */}
              </View>
            </View>
        )
    }
}
