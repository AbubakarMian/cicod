import React from 'react'
import { View, ScrollView,  Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import {   Text, TextInput, Alert} from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/SellCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Sell extends React.Component {
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
                <ScrollView>
                    <View style={{ paddingBottom: 20 }}>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>CREATE ORDER dddddddddddddddddddd</Text>
                            </View>
                            <View style={[{}, styles.backHeadingCloseView]}>
                                <Icon name="times" size={20} color="#929497" />
                                <TouchableOpacity>
                                    <Text style={[{}, styles.backHeadingCloseText]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{}, styles.customerContainerView]}>
                            <Text style={[{}, styles.customerContainerhead]}>Custommer Detail</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AddCustomer')}
                                style={[{}, styles.customerContaineraddBtnView]}>
                                <Icon name="plus-circle" size={20} color={'#fff'} />
                                <Text style={[{}, styles.customerContaineraddBtnText]}>Add</Text>
                            </TouchableOpacity>
                            <Icon name="user-circle" size={50} color="#D8D8D8" />
                            <Text style={[{}, styles.customerContainerheading]}>No Customer added</Text>
                            <Text style={[{}, styles.customerContainerText]}>add customer</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddProduct')}
                            style={[{}, styles.customerContaineraddProductView]}>
                            <Image
                                source={require('../images/products/circlePlus.png')}
                            />
                            <Text style={[{}, styles.customerContaineraddProductText]}>Add Product</Text>
                        </TouchableOpacity>
                        <View style={[{}, styles.OrderDetailContainer]}>
                            <Text style={[{}, styles.customerContainerhead]}>Order Detail</Text>
                            <Image source={require('../images/cartSlash.png')} />
                            <Text style={[{}, styles.OrderDetailContainerHeadingText]}>No product added</Text>
                            <Text style={[{}, styles.OrderDetailContainerText]}>add a product</Text>
                        </View>
                        <View style={[{}, styles.diliveryTypeContainerView]}>
                            <TouchableOpacity>
                                <View style={[{}, styles.radioFormView]}>
                                    <RadioForm
                                        isSelected={false}
                                        color={'#000'}
                                        buttonSize={7}
                                        buttonOuterSize={20}
                                        buttonColor={'#aaa'}

                                        // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                        radio_props={radio_props_dilvery}

                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    />
                                    <Text style={[{}, styles.smailGrayText]}>Dilivery to customer address</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={[{}, styles.radioFormView]}>
                                    <RadioForm
                                        isSelected={false}
                                        color={'#000'}
                                        buttonSize={7}
                                        buttonOuterSize={20}
                                        buttonColor={'#aaa'}
                                        radio_props={radio_props_pickup}
                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    />
                                    <Text style={[{}, styles.smailGrayText]}>Pickup from our location</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{}, styles.paymentContainerView]}>
                            <Text style={[{}, styles.paymentHeadingText]}>Payment Options</Text>
                            <View style={[{}, styles.radioFormView]}>
                                <RadioForm

                                    isSelected={false}
                                    color={'#000'}
                                    radio_props={radio_props_payment}
                                    buttonSize={7}
                                    buttonOuterSize={20}
                                    buttonColor={'#aaa'}
                                    size={5}
                                    // initial={0}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                />

                            </View>
                            <View style={[{}, styles.paymentCheckboxView]}>
                                <CheckBox
                                    style={{ width: width / 1.5, alignSelf: 'center', alignItems: 'center' }}
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    isChecked={this.state.isChecked}
                                    rightText={"Accept multiple part payment"}


                                />
                            </View>
                        </View>


                        <View style={[{}, styles.subTotleRowView]}>

                            <View style={[{}, styles.subTotleColumn1View]}>
                                <Text style={[{}, styles.subTotleColumn1Text]}>subtotal:</Text>
                                <Text style={[{}, styles.subTotleColumn1Text]}>Tax(7.5%)</Text>
                                <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ApplyDiscount')}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Apply for Discount</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.subTotleColumn2View]}>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('AddNote')}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Add a Note</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MakePayment')}
                            style={[{}, styles.btnContinuueView]}>
                            <Text style={{ color: '#FFFFFF' }}>Pay</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </View>
        )
    }
}
