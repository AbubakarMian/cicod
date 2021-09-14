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
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class MakePayment extends React.Component {
    constructor(props) {
        super(props);
        let p = null
        if(this.props.route.params.pending_order_res != 'undefinded'){ 

        }
        this.state = {
            value: 0,
            isChecked: false,
            bodyOrder: this.props.route.params.bodyOrder,
            spinner: false,
            pending_order_res:this.props.route.params.pending_order_res ?? null,
            data:[]
        }
    }
    componentDidMount() {
        console.log("!!!!!!!!!@@@@@@@@@@@!!!!!!!!!!!!~~~~~~~~~~", this.state.bodyOrder)
    }
    async setPaymentMode(payment_mode, navigateScreen) {
        if (await this.state.spinner) {
            return;
        }
        console.log("EEEEEEEEEEEEEEEE",this.props.route.params.pending_order_res)
        await this.setState({ spinner: false })
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAA',this.props.route.params)
        if(this.props.route.params.pending_order_res != undefined){
           console.log('****************RRRRRRRR',this.props.route.params.pending_order_res.data)
            console.log('FFFFFFFFFFF',navigateScreen)
            // return;
            this.props.navigation.navigate(navigateScreen,{
                        bodyOrder:this.props.route.params.bodyOrder,
                        amount_payable:this.props.route.params.amount_payable,
                        data: this.props.route.params.pending_order_res,
                        order_id: this.props.route.params.pending_order_res.data.id,
            })   
            return;         
        }
        else{
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
        console.log('1111111111111 setPaymentMode body params list @@@@@@!!!!!!!!!!!!!!', postData);
        fetch(Constants.orderslist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false })
                console.log(' setPaymentMode responseJson @@@@@@!!!!!!!!!!!!!!', responseJson);
                if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else if (responseJson.status === 'success') {
                    console.log('navigate to ', navigateScreen)
                    console.log('reerere to ', responseJson)
                    let payment_link = responseJson.data.payment_link
                    this.payment_response(responseJson, navigateScreen,
                        {
                            // bodyOrder: bodyOrder,
                            data: responseJson.data,
                            
                            amount_payable: this.props.route.params.amount_payable,
                            payment_link: payment_link,

                            payment_mode: payment_mode,
                            order_id: responseJson.data.id,
                        });
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
        }
  }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }

    async makePaymentFun(payment_mode) { // only for online
        if (await this.state.spinner) {
            return;
        }
        let pending_order_res = this.state.pending_order_res 
        console.log('pending_order_res.data.payment_link 121212121212',pending_order_res);
        
        if(pending_order_res != null ){    
            console.log('~~~~~~~~~~~')        
            this.payment_response(pending_order_res, 
            'PaymentWeb', { payment_link: pending_order_res.data.payment_link, data: pending_order_res.data });
            return;
        }

        await this.setState({ spinner: true })
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
        console.log('*****************', postData);
        console.log('~~~~~~~~~~~~~~~~~~UUUUUUUUUUUUUUUUU',Constants.orderslist)
        fetch(Constants.orderslist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false })
                console.log('all response ', responseJson);
                
                if (responseJson.status === "success") {
                    let payment_link = responseJson.data.payment_link
                    this.payment_response(responseJson, 'PaymentWeb', { payment_link: payment_link, data: responseJson.data });
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
    }

    async payment_response(responseJson, redirect_screen, redirect_body) {
        console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
        if (responseJson.status === "success") {
            this.setState({ spinner: false })
            // alert(responseJson.message)
            this.props.navigation.navigate(redirect_screen, redirect_body);
        }
        else if (responseJson.status == 401) {
            this.unauthorizedLogout();
        } else {
            this.setState({ spinner: false })
            let message = responseJson.message
            alert(message)
        }
    }

    payByCash(){
        console.log('WWWWWWWWWWWWWWW',this.props)
    
        this.setState({spinner:false})
     
        // this.setPaymentMode('CASH', 'PayByCash')
        if(this.props.route.params.pending_order_res == undefined){
            this.setPaymentMode('CASH', 'PayByCash')
        }
        else{
            
            this.props.navigation.navigate('PayByCash', {
                bodyOrder: this.props.route.params.bodyOrder,
                amount_payable: this.props.route.params.amount_payable,
                // pending_order_res: this.props.route.params.pending_order_res,
                payment_link: this.props.route.params.pending_order_res.data.payment_link,
                payment_mode:  'CASH',
                data:this.props.route.params.pending_order_res.data,
                order_id:this.props.route.params.pending_order_res.data.id,
            })

        }
        
    }

    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
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
                            //     onPress={()=>
                            //         // console.log("pppppppppp",this.props.route.params)
                                    
                            //         this.props.navigation.navigate('PayByPos',{
                            //         bodyOrder:this.props.route.params.bodyOrder,
                            //         amount_payable:this.props.route.params.amount_payable,
                            //         // pending_order_res:this.props.route.params.pending_order_res,
                            //         // data: this.props.route.params.pending_order_res.data,
                            //         data: this.props.route.params.pending_order_res,
                                  
                                    
                            // })
                        // }
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
                                onPress={
                                    // () => console.log("RRRRRRRRRRRRRRRR",this.props.route.params.bodyOrder)
                                    () => this.props.navigation.navigate('PayByUssd', {
                                    bodyOrder: this.props.route.params.bodyOrder,
                                    amount_payable: this.props.route.params.amount_payable,
                                    data: this.props.route.params.pending_order_res,
                                    payment_mode:'USSD',
                                })
                            }
                                // onPress={() => this.setPaymentMode('USSD', 'PayByUssd')}
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
                           
                                onPress={()=>this.payByCash()}
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

