import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/PayByUssdCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class PayByUssd extends React.Component {
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
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('MakePayment')}

                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>
                        <View style={[{}, styles.contentContainer]}>
                            <Image source={require('../images/payByUssd.png')} />
                            <Text style={[{}, styles.collectText]}>Collect the sum of</Text>
                            <Text style={[{}, styles.payText]}>N50,000.00</Text>
                            <Text style={[{}, styles.collectText]}>omotayo.odupitan@cicod.com</Text>
                            <View style={[{}, styles.selectBankView]}>
                                <TextInput
                                    label="Select Bank"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                />
                                <View style={[{}, styles.iconView]}>
                                    <Icon name="caret-down" size={20} color={'#4E4D4D'} />
                                </View>
                            </View>

                        </View>
                        <View style={[{}, styles.bankDetailView]}>
                            <Text style={[{}, styles.bankDetailText]}>Select a bank above to get USSD CODE</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
