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
            value3Index: 0,
            value: 0,
            isChecked: false,
            discount_percent: '',
            discount_amount: '',
        }
    }
    render() {

        var radio_props_per = [
            { label: 'Percentage', value: 1 },
            { label: 'Value', value: 0 },

        ];



        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Sell')}

                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>APPLY DISCOUNT</Text>
                    </View>
                </View>

                <View style={[{}, styles.mainContentView]}>
                    <View style={[{}, styles.formRow]}>

                        <RadioForm
                            formHorizontal={true}
                            animation={true}

                            onPress={(index) => this.setState({ value3Index: index })}
                        >

                            {
                                radio_props_per.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i}
                                        style={{justifyContent:'center',alignItems:'center', backgroundColor: this.state.value3Index === i ? '#F6EBEB' : '#fff' }}

                                    >

                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={this.state.value3Index === i}
                                            onPress={(index) => this.setState({ value3Index: index })}
                                            //   onPress={()=>console.log('button input')}
                                            borderWidth={2}
                                            buttonInnerColor={'#e74c3c'}
                                            buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                            buttonSize={7}
                                            buttonOuterSize={20}
                                            buttonStyle={{}}
                                            buttonWrapStyle={{ marginLeft: 10 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={() => console.log('button RadioButtonLabel')}
                                            labelStyle={{ fontSize: 20, color: '#000',paddingVertical:10 }}
                                            labelWrapStyle={{ marginRight:10 }}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>








                        {/* <View style={[{}, styles.radioButtonView]}>
                            <RadioForm
                                initial={0}
                                isSelected={false}
                                color={'#000'}
                                buttonSize={7}
                                buttonOuterSize={20}
                                buttonColor={'#aaa'}
                                radio_props={radio_props_per}

                                // initial={0}
                                onPress={(value) => { this.setState({ value: value }) }}
                            />

                        </View>
                        <View style={[{ backgroundColor: '#F6EBEB' }, styles.radioButtonView]}>
                            <RadioForm
                                isSelected={false}
                                color={'#000'}
                                buttonSize={7}
                                buttonOuterSize={20}
                                buttonColor={'e74c3c'}
                                radio_props={radio_props_val}
                                // initial={0}
                                onPress={(value) => { this.setState({ value: value }) }}
                            />

                        </View> */}

                    </View>
                    <View>

                        <TextInput
                            placeholder="Discount"
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Sell')}
                    style={[{}, styles.btnView]}
                >
                    <Text style={{ color: '#fff' }}>Apply</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
