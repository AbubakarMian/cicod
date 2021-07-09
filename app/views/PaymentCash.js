import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Alert, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { SET_USER, SET_CUSTOMER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART, REMOVE_PRODUCT_FORM_CART, CLEAR_ORDER, SET_DELIVERY_ADDRESS } from '../redux/constants/index';
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/PaymentSuccessCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class PaymentCash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            payment_status:'',
            // bodyOrder: this.props.route.params.bodyOrder
        }
    }
    
    get_order_detail() {
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
        };

        let order_id = this.props.route.params.data.id;
        let url = Constants.orderslist + '/' + order_id
        console.log('---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
        console.log('order url detail ', url);
        console.log('order postData ', postData);
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("order response response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                // if (responseJson.status.toUpperCase() === "SUCCESS") {
                    if (responseJson.status === "success") {
                    let data = responseJson.data;
                    this.setState({
                        spinner: false,
                        order_detail: data,
                        order_id:order_id
                    })
                    // let payment_link = responseJson.data.payment_link
                    // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.message
                    console.log('some error',responseJson)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    successview(props) {
        let _that = props._that;
       
        let order = _that.props.route.params.data;
        console.log("order @@@@@@@@@@@@~~~~~~~~~~~~~~~~ order",order)
        if (order.payment_status == 'success') {            
        return (
            <View style={[{},styles.mainContainer]}>
                
                <View style={{borderColor:'#DAF8EC',borderWidth:20,borderRadius:100}}>     
            <Image
            style={{height:width/4,width:width/4}} 
            source={require('../images/greenTick.png')}
            />
            </View>
                <Text style={[{color:'#4E4D4D',marginTop:20},fontStyles.bold25]}>Payment Successful</Text>
                <Text style={[{color:'#929497'},fontStyles.normal15]}>Your payment of {_that.props.currency.currency+" "+order.amount} was successful</Text>
                <TouchableOpacity
                onPress={()=>_that.props.navigation.navigate('OrderDetail', { id:order.id })}
                style={[{},styles.touchView]}
                >
                    <Text style={[{},styles.touchText]}>View order</Text>
                </TouchableOpacity>
            </View>
        )
        }
      
    }

 


    


    render() {
        
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        // onPress={()=>this.props.navigation.navigate('Sell')}
                        onPress={() => this.props.navigation.navigate('CreateOrder')}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
                    </View>
                </View>
                {/* <View style={[{},styles.mainContainer]}>
                                
                                <View style={{borderColor:'#DAF8EC',borderWidth:20,borderRadius:100}}>     
                            <Image
                            style={{height:width/4,width:width/4}} 
                            source={require('../images/greenTick.png')}
                            />
                            </View>
                                <Text style={[{color:'#4E4D4D',marginTop:20},fontStyles.bold25]}>Payment Successful</Text>
                                <Text style={[{color:'#929497'},fontStyles.normal15]}>Your payment of {_that.props.currency.currency+" "+order.amount} was successful</Text>
                                <TouchableOpacity
                                onPress={()=>_that.props.navigation.navigate('OrderDetail', { id:order.id })}
                                style={[{},styles.touchView]}
                                >
                                    <Text style={[{},styles.touchText]}>View order</Text>
                                </TouchableOpacity>
                            </View> */}
                {/* {(this.props.route.params.data.payment_status== 'success')? */}
                <this.successview _that={this} />
                {/* <this.sccess_view_select _that={this}/> */}
                {/* :<this.rejectview _that={this} />
                } */}
                
                {/* <this.rejectview _that={this} /> */}

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
        currency: state.currencyReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentCash)

