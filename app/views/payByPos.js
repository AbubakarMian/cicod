import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import {   Text, TextInput, Alert} from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/PayByPosCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class PayByPOS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            order_detail:{}
        }
    }

    press_confirm(){
        // let payment_link = this.state.payment_link;
        this.props.navigation.navigate('PaymentWeb', { payment_link: this.props.route.params.data.payment_link });
    }

    get_order_detail(){
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
        };
        console.log('body params list @@@@@@!!!!!!!!!!!!!!', postData);
        fetch(Constants.orderslist+'order_id'+order_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "success") {
                    let data = responseJson.data;
                    this.setState({ 
                        spinner: false,
                        order_detail:{
                            cicod_order_id: data.cicod_order_id,
                            expiry_date: data.expiry_date,
                            id: data.id,
                            payment_link: data.payment_link
                        }
                    
                    })
                    alert(responseJson.message)
                    // let payment_link = responseJson.data.payment_link
                    // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.message
                    alert(message)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }

     pay(_that){
            _that = _that._that;
            let params = _that.props.route.params;
            console.log('props pay by pos ',params.data.cicod_order_id);
            // return null;
            return(
                <View style={[{}, styles.mainView]}>
                <Header navigation={_that.props.navigation}/>
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                    // onPress={()=>_that.props.navigation.navigate('MakePayment')}
                    onPress={() => _that.props.navigation.goBack()}
                    
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
                            <Image style={{height:60,width:40}} source={require('../images/pos-terminal.png')} />
                            <Text style={[{}, styles.collectText]}>Collect the sum of</Text>
                            <Text style={[{}, styles.payText]}>N{params.amount_payable}</Text>
                            <View style={{flexDirection:'row'}}>
                            <Text style={[{}, styles.cashText]}>for CICOD ORDER ID </Text>
                            <Text style={[{fontWeight:'bold'}, styles.cashText]}> {params.data.cicod_order_id}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <TouchableOpacity
                              style={[{backgroundColor:'#E6E6E6'},styles.touchView]}
                              onPress={() => _that.props.navigation.goBack()}
                              >
                                  <Text style={{color:'#4E4D4D'}}>Cancel</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                              onPress={()=>_that.press_confirm()}
                              style={[{ backgroundColor:'#B1272C',},styles.touchView]}
                              >
                                  <Text style={{color:'#fff'}}>Confirm</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                       
                    </ScrollView>
                </View>
            </View>
            );

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
            <this.pay _that={this}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
        customer: state.customReducer,
        cart: state.cartReducer,
        notes: state.orderNotesReducer,
        deliveryAddress: state.deliveryAddressReducer,
        orderDiscountReducer: state.orderDiscountReducer,
        supplier: state.supplierReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        emptyOrder: () => dispatch({ type: CLEAR_ORDER }),
        cartReducer: (value) => dispatch({ type: ADD_TO_PRODUCT, value: value }),
        removeFromCart: (value) => dispatch({ type: REMOVE_FROM_CART, value: value }),
        removeProductFromCart: (value) => dispatch({ type: REMOVE_PRODUCT_FORM_CART, value: value }),
        setDeliveryAddress: (value) => dispatch({ type: SET_DELIVERY_ADDRESS, value: value }),
        setCustomer: (value) => dispatch({ type: SET_CUSTOMER, value: value }),
        setSupplier: (value) => dispatch({ type: SET_SUPPLIER, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PayByPOS)
