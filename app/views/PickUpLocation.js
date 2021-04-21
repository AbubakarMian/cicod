import React from 'react'
import { View, ImageBackground, ScrollView, Dimensions, Image, Platform, TouchableOpacity, FlatList } from 'react-native'
import { Text, TextInput, Alert} from 'react-native-paper';
import styles from '../css/PickUpLocationCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from './Header';
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class PickUpLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            delivery_type: this.props.route.params.type ?? ''
        }

    }
    render() {
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'No 8, Left right, Avenue Lekki Phase 1, Lagos Nigeria', value: 1 },

        ];
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },

        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('BuyCreateOrder')}

                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>PICKUP LOCATION</Text>
                            </View>

                        </View>
                        <View style={[{}, styles.addressContainer]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('CreateOrder')}
                            >
                                <View style={[{}, styles.radioFormView]}>
                                    {/* <RadioForm
                                        isSelected={false}
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        radio_props={radio_props_pickup}
                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    /> */}
                                    <RadioForm
                                        isSelected={false}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={(value) => { this.setState({ value3Index: value }) }}
                                    />
                                    {
                                        radio_props_pickup.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}

                                                    isSelected={this.state.value3Index === i}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}


                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}

                                                    labelHorizontal={true}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }


                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{}, styles.addressContainer]}>
                            <TouchableOpacity>
                                <View style={[{}, styles.radioFormView]}>
                                    {/* <RadioForm
                                        isSelected={false}
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        radio_props={radio_props_pickup}
                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    /> */}
                                    <RadioForm
                                        isSelected={false}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={(value) => { this.setState({ value3Index: value }) }}
                                    />
                                    {
                                        radio_props_pickup.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}

                                                    isSelected={this.state.value3Index === i}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}


                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}

                                                    labelHorizontal={true}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }


                                </View>
                            </TouchableOpacity>
                        </View>





                    </View>
                </ScrollView>
            </View>
        );
    }
}


