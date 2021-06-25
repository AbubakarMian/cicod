import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, FlatList, Alert, Dimensions, Image, Platform, TouchableOpacity, Touchable, } from 'react-native'
import splashImg from '../images/splash.jpg'
import { Text, TextInput } from 'react-native-paper';
import styles from '../css/ApplyDiscountCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { SET_DISCOUNT,UPDATE_CART } from '../redux/constants';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class ApplyDiscount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value3Index: this.props.orderDiscountReducer.discount_type != 'percentage' ? 1 : 0,
            isChecked: false,
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
            // this.props.cartReducer();
            this.props.navigation.goBack();

        }
    }

    radioBtnFun(index, lable) {
        console.log(' lable @@@@@@@@@@', lable);
        this.setState({ value3Index: index })

    }

    setDiscountAmount(amount){  
        console.log('amount 000ttt',amount);
        if(amount.includes(",")||amount.includes("-")||amount.includes(" ")||amount.includes("..")){
            this.setState({
                discount_amount : ''
            })
            return;
        }
        amount = parseFloat(amount);
        if(this.state.value3Index == 0){
            console.log('percentage');
            if(amount < 100){
                this.setState({ discount_amount: amount })
                return;
            }
        }
        else{
            let total_amount = parseFloat(this.props.route.params.total_price);
            console.log('amount',amount)
            console.log('total_amount',total_amount)
            if(total_amount > amount){
                this.setState({ discount_amount: amount })
                return;
            }
        }
        this.setState({
            discount_amount : ''
        })
    }
    render() {

        var radio_props_per = [
            { label: 'Percentage', value: 0 },
            { label: 'Value', value: 1 },

        ];
        if(this.props.route.params.discount_amount != '' && this.state.discount_amount == ''){
            this.setState({
                discount_amount:parseFloat(this.props.route.params.discount_amount)})
        }
        console.log(this.props.orderDiscountReducer.discount_amount)
 
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('CreateOrder')}
                        onPress={() => this.props.navigation.goBack()}

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
                                            value={this.props.orderDiscountReducer.discount_amount}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>

                    </View>
                    <View>

                        <TextInput
                            label="Discount"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            keyboardType='numeric'
                            onChangeText={text => this.setDiscountAmount(text)}
                            value={this.props.orderDiscountReducer.discount_amount+""}
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
        orderDiscountReducer: state.orderDiscountReducer,

    }
};
function mapDispatchToProps(dispatch) {
    return {
        setDiscount: (value) => dispatch({ type: SET_DISCOUNT, value: value }),
        cartReducer: () => dispatch({ type: UPDATE_CART}),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyDiscount)
