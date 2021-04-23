import React from 'react'
import { View, ImageBackground, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback,  } from 'react-native'
import {   Text, TextInput, Alert} from 'react-native-paper';
import fontStyles from '../css/FontCss'
import splashImg from '../images/splash.jpg'
import styles from '../css/BuyCss'
import CalendarPicker from 'react-native-calendar-picker';
import SearchBar from 'react-native-search-bar';
import Header from '../views/Header';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Buy extends React.Component {
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

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '#F0F0F0' }}>
                <Header navigation={this.props.navigation}/>
                <View style={{ flexDirection: 'row',marginVertical:10, alignContent: 'center', alignItems: 'center', width: width - 20, alignSelf: 'center' }}>
                    <TouchableOpacity
                    // onPress={()=>this.props.navigation.navigate('Home')}
                    onPress={() => this.props.navigation.goBack()}
                    >
                    <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View>
                    <Text style={{ color: '#2F2E7C', fontWeight: 'bold',marginHorizontal:20 }}>CREATE ORDER</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 0,flexDirection:'row',alignItems:'center' }}>
                        <Icon 
                        name="close"
                        color={'#929497'}
                        size={20}
                        /> 
                        <Text style={{marginLeft:10,color:'#929497'}}>Close</Text>
                    </View>
                </View>
            </View>
        )
    }
}
