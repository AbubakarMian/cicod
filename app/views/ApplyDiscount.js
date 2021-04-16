import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Touchable, Alert } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/ApplyDiscountCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { SET_DISCOUNT } from '../redux/constants';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class ApplyDiscount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value3Index: 0,
            isChecked: false,
            // discount_percent: '',
            discount_amount: '',
        }
    }

    setDiscount() {

        if (this.state.discount_amount == '') {
            Alert.alert('INFO', 'Discount Amount is Required .');

        }
        else {
            let discount_type = '';
            if (this.state.value3Index == 0) {
                discount_type = 'percentage';
                this.props.setDiscount({
                    discount_amount: this.state.discount_amount,
                    discount_type: discount_type
                })
            }
            else {
                discount_type = 'value';
                this.props.setDiscount({
                    discount_amount: this.state.discount_amount,
                    discount_type: discount_type
                })
            }
            this.props.navigation.goBack();

        }
    }

    radioBtnFun(index, lable) {
        console.log(' lable @@@@@@@@@@', lable);
        this.setState({ value3Index: index })

    }
    render() {

        var radio_props_per = [
            { label: 'Percentage', value: 0 },
            { label: 'Value', value: 1 },

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
                            onPress={(index, lable) => this.radioBtnFun(index, lable)}
                        >

                            {
                                radio_props_per.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i}
                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.value3Index === i ? '#F6EBEB' : '#fff' }}

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
                                            onPress={(index) => this.setState({ value3Index: index })}
                                            labelStyle={{ fontSize: 20, color: '#000', paddingVertical: 10 }}
                                            labelWrapStyle={{ marginRight: 10 }}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>

                    </View>
                    <View>

                        <TextInput
                            placeholder="Discount"
                            keyboardType='numeric'
                            onChangeText={text => this.setState({ discount_amount: text })}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.setDiscount()}
                    style={[{}, styles.btnView]}
                >
                    <Text style={{ color: '#fff' }}>Apply</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        discount: state.orderDiscountReducer,

    }
};
function mapDispatchToProps(dispatch) {
    return {
        setDiscount: (value) => dispatch({ type: SET_DISCOUNT, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyDiscount)
