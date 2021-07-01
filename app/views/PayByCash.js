import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity,Alert } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/PayByCashCss';
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
class PayByCash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order_detail: null,
            payment_link: null,
            order_id:0,
            amount_returned:'0',
            amount:0,
            cashCollected:''
        }
    }
    get_order_detail() {
        console.log('pay by cash ',this.props.route.params.data.id);
        // return;
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
        console.log('pay cash---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
        console.log('order url detail ', url);
        console.log('order postData ', postData);
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("order response response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else if (responseJson.status.toUpperCase() === "SUCCESS") {
                    let data = responseJson.data;
                    this.setState({
                        spinner: false,
                        order_detail: data,
                        order_id:order_id
                    })
                }               
                else {
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
    async amountRecieved(recieved,actual){   
       
        let amount_returned = recieved-actual;
        console.log('recieved',recieved);
        if(recieved == '' || 
            recieved.split(".").length > 2 ||
            recieved.includes(",")||recieved.includes("-")||recieved.includes(" ")||recieved.includes("..")){
                recieved=''
                amount_returned=''
        }
       
        await this.setState({
            cashCollected:recieved,
            amount_returned:amount_returned+''
        })
    }    

    getChange(){
        if(this.state.amount_returned=='NaN'){
            this.setState({
                amount_returned:'0'
            })
            return '0';
        }
        if(this.state.amount_returned < 0){
            return '0';
        }
        return this.state.amount_returned;        
    }

    press_done() {
        let order = this.state.order_detail
        let cashCollected = parseFloat(this.state.cashCollected)
        console.log('cashCollected) < 0 ',cashCollected <  order.amount)
        console.log('this.getChange() == \'\'',this.getChange() == '')
        console.log('cashCollected == \'\'',cashCollected)
        if(this.state.cashCollected == '' || cashCollected <  order.amount){
            Alert.alert('Alert','Insufficient Cash Collection')
            return;
        }
        console.log('param',this.props.route.params.payment_link);
        if (this.props.route.params.payment_link == null) {
            Alert.alert('payment error','Payment link not found')
        } 
        else {
            this.props.navigation.navigate('PaymentSuccess', { data:order})
            // this.props.navigation.navigate('PaymentWeb', { payment_link: this.props.route.params.payment_link,data:order });
        }
    }
    payByCash(props){
        let _that = props._that;
        let params = _that.props.route.params;
        let order = {};
        if(_that.state.order_detail == null || params.data.id != _that.state.order_id){
            order = _that.get_order_detail();
            return null;
        }        
        order = _that.state.order_detail
        return(
            <View>
                    <ScrollView>
                        <View style={[{}, styles.contentContainer]}>
                            <Image source={require('../images/payByCash.png')} />
                            <Text style={[{}, styles.collectText]}>Collect the sum of</Text>
                            <Text style={[{}, styles.payText]}>{_that.props.currency.currency+" "+order.amount}</Text>
                            <Text style={[{}, styles.cashText]}>in cash</Text>
                        </View>
                        <View style={[{}, styles.inputContainer]}>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                    label={"Cash Collected ("+_that.props.currency.currency+")"}
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                    keyboardType={'numeric'}
                                    onChangeText={(recieved)=>_that.amountRecieved(recieved,order.amount)}
                                    value={_that.state.cashCollected}
                                />
                            </View>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                    label={"Change ("+_that.props.currency.currency+")"}
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    // color={'red'}
                                    editable={false} 
                                    // keyboardType={'numeric'}
                                    value={_that.getChange()}
                                />
                            </View>
                            <TouchableOpacity style={[{}, styles.touchView]}
                                onPress={()=>_that.press_done()}
                            >
                                <Text style={[{}, styles.touchText]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
        );
    }

    render() {        
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
                    </View>
                </View>
                <this.payByCash _that={this}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(PayByCash)
