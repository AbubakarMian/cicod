import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Touchable } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/AddNoteCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false
        }
    }
    render() {
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'Pickup', value: 1 },
        ];

        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Sell')}
                    
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>APPLY NOTE</Text>
                    </View>
                </View>

                <View style={[{}, styles.mainContentView]}>
                 
                    <View>
                        
                        <TextInput
                        placeholder="Add note to this order"
                        />
                    </View>
                </View>
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Sell')}
                style={[{},styles.btnView]}
                >
                    <Text style={{color:'#fff'}}>Done</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
