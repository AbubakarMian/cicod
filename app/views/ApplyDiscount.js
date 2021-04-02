import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Touchable } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/ApplyDiscountCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class ApplyDiscount extends React.Component {
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
                <Header />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity>
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>APPLY DISCOUNT</Text>
                    </View>
                </View>

                <View style={[{}, styles.mainContentView]}>
                    <View style={[{}, styles.formRow]}>
                        <View style={[{}, styles.radioButtonView]}>
                            <RadioForm
                                isSelected={false}
                                color={'#000'}
                                radio_props={radio_props_dilvery}

                                // initial={0}
                                onPress={(value) => { this.setState({ value: value }) }}
                            />

                        </View>
                        <View style={[{ backgroundColor: '#F6EBEB' }, styles.radioButtonView]}>
                            <RadioForm
                                isSelected={false}
                                color={'#000'}
                                radio_props={radio_props_dilvery}
                                // initial={0}
                                onPress={(value) => { this.setState({ value: value }) }}
                            />

                        </View>

                    </View>
                    <View>
                        
                        <TextInput
                        placeholder="Discount"
                        />
                    </View>
                </View>
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Sell')}
                style={[{},styles.btnView]}
                >
                    <Text style={{color:'#fff'}}>Apply</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
