import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight,  FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import {   Text, TextInput, Alert} from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/MakePaymentCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class MakePayment extends React.Component {
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
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },
            { label: 'Part Payment', value: 3 },
        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation}/>
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Sell')}
                    
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
                    </View>
                </View>
                <Text style={[{}, styles.heading]}>Please select preferred payment method</Text>
                <View>
                    <ScrollView>
                        <View>
                        <TouchableOpacity
                        style={[{},styles.cardTouch]}
                        >
                            <View>
                                <View>
                                    <Text style={[{},styles.cardHeadingText]}>Pay Online</Text>
                                    <Text style={[{},styles.cardDescText]}>Make payment using card</Text>
                                </View>
                            </View>
                            <View style={[{},styles.cardImageView]}>
                                <Image source={require('../images/payonline.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('PayByPos')}
                        style={[{},styles.cardTouch]}
                        >
                            <View>
                                <View>
                                    <Text style={[{},styles.cardHeadingText]}>Pay by POS</Text>
                                    <Text style={[{},styles.cardDescText]}>Make payment using POS</Text>
                                </View>
                            </View>
                            <View style={[{},styles.cardImageView]}>
                            <Image style={{height:50,width:30}} source={require('../images/pos-terminal.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('PayByUssd')}
                        style={[{},styles.cardTouch]}
                        >
                            <View>
                                <View>
                                    <Text style={[{},styles.cardHeadingText]}>Pay by USSD</Text>
                                    <Text style={[{},styles.cardDescText]}>Make payment using Bank USSD code</Text>
                                </View>
                            </View>
                            <View style={[{},styles.cardImageView]}>
                                <Image source={require('../images/payByUssd.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('PayByCash')}
                        style={[{},styles.cardTouch]}
                        >
                            <View>
                                <View>
                                    <Text style={[{},styles.cardHeadingText]}>Pay by cash</Text>
                                    <Text style={[{},styles.cardDescText]}>Make payment using cash</Text>
                                </View>
                            </View>
                            <View style={[{},styles.cardImageView]}>
                                <Image source={require('../images/payByCash.png')}/>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
