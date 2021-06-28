import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/PayByUssdCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class PayByUssd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            ussd_codes:[],
            ussd_code_selected:null
        }
    }

    componentDidMount(){
        this.get_ussd_codes();
    }

    get_ussd_codes(){
        // https://com.cicodsaasstaging.com/com/api/ussd-codes
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
        };
        console.log('body params list @@@@@@!!!!!!!!!!!!!!', postData);
        fetch(Constants.ussd_codes, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" response Json responseJson usssd codes!!!!!!!!!!!", responseJson)
                if (responseJson.status === "success") {
                    let data = responseJson.data;
                    let ussd_codes = data.map((x, key) => {
                        return { label: x.bank_name, value: x.cicod_code+x.bank_ussd_code }
                    });
                    this.setState({ 
                        spinner: false,
                        ussd_codes:ussd_codes
                    
                    })
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
    render() {
        console.log('props',this.props);
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
                <View>
                    <ScrollView>
                        <View style={[{}, styles.contentContainer]}>
                            <Image source={require('../images/payByUssd.png')} />
                            <Text style={[{}, styles.collectText]}>Pay with USSD CODE</Text>
                            <Text style={[{}, styles.payText]}>N{this.props.route.params.amount_payable}</Text>
                            <Text style={[{}, styles.collectText]}>{this.props.user.email}</Text>
                            {/* <View style={[{}, styles.selectBankView]}> */}
                            
                                {/* <TextInput
                                    label="Select Bank"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                /> */}
                                <View style={[{}, styles.iconView]}>
                                    <Icon name="caret-down" size={20} color={'#4E4D4D'} />
                                </View>
                            {/* </View> */}

                        </View>
                        <DropDownPicker
                                    items={this.state.ussd_codes}
                                    placeholder="Select Bank"
                                    containerStyle={{ height: 50, marginTop: 5, width: width - 20, alignSelf: 'center' }}
                                    style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5,zIndex:0.99 }}
                                    dropDownStyle={{ height: 150, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                    labelStyle={{ color: '#A9A9A9' }}
                                    onChangeItem={item => this.setState({ussd_code_selected:item.value})} // 
                            />
                        <View style={[{}, styles.bankDetailView]}>
                            {this.state.ussd_code_selected == null ? 
                            <Text style={[{}, styles.bankDetailText]}>Select a bank above to get USSD CODE</Text> :
                            <View>
                               <Text>Dial the code below on your mobile phone to complete this transaction</Text>
                               <Text style={{textAlign:'center',color:'red'}}>{this.state.ussd_code_selected}</Text>
                            </View>
                            }
                            
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
export default connect(mapStateToProps, mapDispatchToProps)(PayByUssd)
