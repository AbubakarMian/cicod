import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/MakePaymentCss'
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
                <Header />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity>
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
                    </View>
                </View>
                <Text style={[{}, styles.heading]}>Please select preferred payment method</Text>
                <View>
                    <ScrollView>
                        <FlatList
                            data={[
                                { title: 'Pay Online', key: 'item1', qty: 'Make payment using card', brand: 'Pure Juice ' },
                                { title: 'Pay by POS', key: 'item1', qty: 'Make payment using POS', brand: 'Pure Juice ' },
                                { title: 'Pay by USSD', key: 'item1', qty: 'Make payment using Bank USSD code', brand: 'Pure Juice ' },
                                { title: 'Pay by cash', key: 'item1', qty: 'Make payment using cash', brand: 'Pure Juice ' },
                            ]}
                            ItemSeparatorComponent={
                                Platform.OS !== 'android' &&
                                (({ highlighted }) => (
                                    <View
                                        style={[
                                            style.separator,
                                            highlighted && { marginLeft: 0 }
                                        ]}
                                    />
                                ))
                            }
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    // onPress={()=>this.props.navigation.navigate('CustomersDetal')}//() => this._onPress(item)
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                        <View style={[{ flexDirection: 'row' }]}>

                                        </View>
                                        <View style={{ position: 'relative', flex: 3 }}>
                                            <Text>{item.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                <Text style={{ fontSize: 10, color: '#929497' }}>{item.qty}</Text>
                                                <Image style={{ position: 'absolute', right: 0, }} source={require('../images/payment/cash.png')} />

                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}
