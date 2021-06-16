import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Alert, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { SET_USER, SET_CUSTOMER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART, REMOVE_PRODUCT_FORM_CART, CLEAR_ORDER, SET_DELIVERY_ADDRESS } from '../redux/constants/index';
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/MakePaymentCss';
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
class MakePayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            bodyOrder: this.props.route.params.bodyOrder
        }
    }
componentDidMount(){
    console.log("!!!!!!!!!@@@@@@@@@@@!!!!!!!!!!!!~~~~~~~~~~",this.state.bodyOrder)
}
    setPaymentMode(payment_mode, navigateScreen) {
        let bodyOrder = this.props.route.params.bodyOrder;
        bodyOrder.payment_mode = payment_mode;
        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
            body: JSON.stringify(bodyOrder)
        };
        console.log(' setPaymentMode body params list @@@@@@!!!!!!!!!!!!!!', postData);
        fetch(Constants.orderslist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(' setPaymentMode responseJson @@@@@@!!!!!!!!!!!!!!', responseJson);
                if (responseJson.status.toUpperCase() === 'SUCCESS') {
                    console.log('navigate to ', navigateScreen)
                    console.log('reerere to ', responseJson)
                    let payment_link = responseJson.data.payment_link
                    this.payment_response(responseJson, navigateScreen,
                        {
                            // bodyOrder: bodyOrder,
                            data: responseJson.data,
                            amount_payable: this.props.route.params.amount_payable,
                            payment_link: payment_link
                        });
                }
                else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });

        // this.props.navigation.navigate(navigateScreen, { bodyOrder: bodyOrder, amount_payable: this.props.route.params.amount_payable });
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    makePaymentFun(payment_mode) {

        let bodyOrder = this.props.route.params.bodyOrder;
        bodyOrder.payment_mode = payment_mode;

        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
            body: JSON.stringify(bodyOrder)
        };
        console.log('makePaymentFun body params list @@@@@@!!!!!!!!!!!!!!', postData);
        fetch(Constants.orderslist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('all response ',responseJson);
                if (responseJson.status === "success") {
                let payment_link = responseJson.data.payment_link
                this.payment_response(responseJson, 'PaymentWeb', { payment_link: payment_link, data: responseJson.data });
                }
                else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }

    payment_response(responseJson, redirect_screen, redirect_body) {
        console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
        if (responseJson.status === "success") {

            this.setState({ spinner: false })
            alert(responseJson.message)
            this.props.navigation.navigate(redirect_screen, redirect_body);
        } else {
            this.setState({ spinner: false })
            let message = responseJson.message
            alert(message)
        }
    }

    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        // onPress={()=>this.props.navigation.navigate('Sell')}
                        onPress={() => this.props.navigation.goBack()}
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
                                style={[{}, styles.cardTouch]}
                                onPress={() => this.makePaymentFun('ONLINE')}
                            >
                                <View>
                                    <View>
                                        <Text style={[{}, styles.cardHeadingText]}>Pay Online</Text>
                                        <Text style={[{}, styles.cardDescText]}>Make payment using card</Text>
                                    </View>
                                </View>
                                <View style={[{}, styles.cardImageView]}>
                                    <Image source={require('../images/payonline.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={()=>this.props.navigation.navigate('PayByPos')}
                                onPress={() => this.setPaymentMode('POS', 'PayByPos')}
                                style={[{}, styles.cardTouch]}
                            >
                                <View>
                                    <View>
                                        <Text style={[{}, styles.cardHeadingText]}>Pay by POS</Text>
                                        <Text style={[{}, styles.cardDescText]}>Make payment using POS</Text>
                                    </View>
                                </View>
                                <View style={[{}, styles.cardImageView]}>
                                    <Image style={{ height: 50, width: 30 }} source={require('../images/pos-terminal.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={()=>this.props.navigation.navigate('PayByUssd')}
                                onPress={() => this.setPaymentMode('USSD', 'PayByUssd')}
                                style={[{}, styles.cardTouch]}
                            >
                                <View>
                                    <View>
                                        <Text style={[{}, styles.cardHeadingText]}>Pay by USSD</Text>
                                        <Text style={[{}, styles.cardDescText]}>Make payment using Bank USSD code</Text>
                                    </View>
                                </View>
                                <View style={[{}, styles.cardImageView]}>
                                    <Image source={require('../images/payByUssd.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={()=>this.props.navigation.navigate('PayByCash')}
                                onPress={() => this.setPaymentMode('CASH', 'PayByCash')}
                                style={[{}, styles.cardTouch]}
                            >
                                <View>
                                    <View>
                                        <Text style={[{}, styles.cardHeadingText]}>Pay by cash</Text>
                                        <Text style={[{}, styles.cardDescText]}>Make payment using cash</Text>
                                    </View>
                                </View>
                                <View style={[{}, styles.cardImageView]}>
                                    <Image source={require('../images/payByCash.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(MakePayment)

