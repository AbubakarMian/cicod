import React from 'react'
import { View, ImageBackground, ScrollView, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CreateOrderCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            spinner: false,
            customer_name: '',
            customer_email: '',
            customer_phone: '',
        }
    }

    componentWillReceiveProps() {
        console.log(' componentWillReceiveProps CreateOrder', this.props.route)
        let customer_data = this.props.route.params.customer_data;

        this.setState({
            customer_name: customer_data.customer_name,
            customer_email: customer_data.customer_email,
            customer_phone: customer_data.customer_phone
        })
    }

    createOrder() {
        this.setState({ spinner: true })

        if (this.state.name === '' || this.state.price === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Product name and Price are required")
            return;
        }
        else {


            let postData = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.user.access_token,
                },
                body: JSON.stringify({
                    customer_name: this.state.category_id,//required
                    customer_phone: this.state.name,//required
                    customer_email: this.state.quantity,//sandbox
                    products: this.state.code,
                    delivery_type: this.state.price,// required
                    delivery_address: this.state.description,
                    payment_mode: this.state.validity,//required
                    country_id: this.state.is_qty_limit,
                    state_id: this.state.state_id,
                    lga_id: this.state.image,
                    note: this.state.is_web_shop,
                    discount_amount: this.state.is_web_shop,
                    discount_percent: this.state.is_web_shop,
                })
            };
            fetch(Constants.orderslist, postData)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log(" create customer response !!!!!!!!!!!", responseJson)

                    this.setState({ spinner: false })
                    if (responseJson.status === "success") {
                        Alert.alert('MESSAGE', responseJson.message)
                        let customer_id = responseJson.data.id;
                        // this.createCustomerDelivery(customer_id);
                    } else {
                        // this.setState({ spinner: false })
                        let message = JSON.stringify(responseJson.message)
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
            <View style={[{}, styles.mainView]}>
                <Header />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View style={{ paddingBottom: 20 }}>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity>
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>CREATE ORDER</Text>
                            </View>
                            <View style={[{}, styles.backHeadingCloseView]}>
                                <Icon name="times" size={20} color="#929497" />
                                <TouchableOpacity>
                                    <Text style={[{}, styles.backHeadingCloseText]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[{}, styles.customerContainerView]}>
                            <Text style={[{}, styles.customerContainerhead]}>Custommer Detail</Text>
                            <TouchableOpacity style={[{}, styles.customerContaineraddBtnView]}
                                onPress={() => this.props.navigation.navigate('AddCustomer')}
                            >
                                <Icon name="plus-circle" size={20} color={'#fff'} />
                                <Text style={[{}, styles.customerContaineraddBtnText]}>Add</Text>
                            </TouchableOpacity>
                            {(this.state.customer_name == '') ?
                                <View style={[{}, styles.customerContainerView]}>
                                    <Icon name="user-circle" size={50} color="#D8D8D8" />
                                    <Text style={[{}, styles.customerContainerheading]}>No Customer added</Text>
                                    <Text style={[{}, styles.customerContainerText]}>add customer</Text>
                                </View>
                                : <View style={[{}, styles.userDEtailCOntainer]}>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Icon
                                            name="user-circle"
                                            color="#D8D8D8"
                                            size={20}
                                        />
                                        <Text style={[{}, styles.userDEtailCOntainerText]}>Johnson James</Text>
                                    </View>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Text style={[{}, styles.usetDetailLableText]}>Email: </Text>
                                        <Text style={[{}, styles.usetDetailInfoText]}>j.joghnson@gmail.com</Text>
                                    </View>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Text style={[{}, styles.usetDetailLableText]}>Phone: </Text>
                                        <Text style={[{}, styles.usetDetailInfoText]}>08123456789</Text>
                                    </View>
                                    <View style={[{}, styles.downIconView]}>
                                        <Icon name="angle-down"
                                            size={20}
                                            color={'#929497'} />
                                    </View>
                                </View>}
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddProduct')}
                        >
                            <View style={[{}, styles.customerContaineraddProductView]}>

                                <Image
                                    source={require('../images/products/circlePlus.png')}
                                />
                                <Text style={[{}, styles.customerContaineraddProductText]}>Add Product</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <View style={[{}, styles.OrderDetailContainer]}>
                            <Text style={[{}, styles.customerContainerhead]}>Order Detail</Text>
                            <Image
                                source={require('../images/cartSlash.png')}
                            />
                            <Text style={[{}, styles.OrderDetailContainerHeadingText]}>No product added</Text>
                            <Text style={[{}, styles.OrderDetailContainerText]}>add a product</Text>
                        </View>  */}
                        <View style={[{}, styles.OrderDetailContainer]}>
                            <View style={[{}, styles.OrderDetailHeadingRow]}>
                                <Text style={[{}, styles.OrderDetailHeadingRowText]}>Order Detail</Text>
                                <Text style={[{}, styles.OrderDetailNotificationText]}>3</Text>
                            </View>
                            <TouchableOpacity style={[{}, styles.OrderDetailClearTouc]}>
                                <Text style={[{}, styles.OrderDetailHeadingRowText]}>Clear Order</Text>
                            </TouchableOpacity>
                            <View style={[{ flexDirection: 'column' }]}>
                                <View style={[{}, styles.OrderDetailDataCOntainer]}>
                                    <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
                                        <View>
                                            <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>Pure ORANGE JUICE  12PACK</Text>
                                            <Text style={[{}, styles.OrderDetailHeadingRowText]}>LAGOS- Palms</Text>
                                        </View>

                                        <View style={[{}, styles.OrderDetailDataCOntainerCounterView]}>
                                            <TouchableOpacity style={[{}, styles.iconView]}>
                                                <Icon name="minus" />
                                            </TouchableOpacity>
                                            <View style={[{}, styles.iconView]}>
                                                <Text>10</Text>
                                            </View>
                                            <TouchableOpacity style={[{}, styles.iconView]}>
                                                <Icon name="plus"
                                                    color="#B1272C"
                                                />
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                                <View style={[{}, styles.orderDetailAmmountRow]}>
                                    <View style={[{}, styles.orderDetailAmmountColumn]}>
                                        <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>N500,000</Text>
                                    </View>
                                    <View style={[{}, styles.orderDetailAmmountColumn]}>
                                        <TouchableOpacity
                                            style={[{ alignSelf: 'flex-end' }]}
                                        >
                                            <Text style={[{}, styles.orderDetailAmmountColumnRedText]}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[{ flexDirection: 'column' }]}>
                                <View style={[{}, styles.OrderDetailDataCOntainer]}>
                                    <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
                                        <View>
                                            <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>Pure ORANGE JUICE  12PACK</Text>
                                            <Text style={[{}, styles.OrderDetailHeadingRowText]}>LAGOS- Palms</Text>
                                        </View>

                                        <View style={[{}, styles.OrderDetailDataCOntainerCounterView]}>
                                            <TouchableOpacity style={[{}, styles.iconView]}>
                                                <Icon name="minus" />
                                            </TouchableOpacity>
                                            <View style={[{}, styles.iconView]}>
                                                <Text>10</Text>
                                            </View>
                                            <TouchableOpacity style={[{}, styles.iconView]}>
                                                <Icon name="plus"
                                                    color="#B1272C"
                                                />
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                                <View style={[{}, styles.orderDetailAmmountRow]}>
                                    <View style={[{}, styles.orderDetailAmmountColumn]}>
                                        <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>N500,000</Text>
                                    </View>
                                    <View style={[{}, styles.orderDetailAmmountColumn]}>
                                        <TouchableOpacity
                                            style={[{ alignSelf: 'flex-end' }]}
                                        >
                                            <Text style={[{}, styles.orderDetailAmmountColumnRedText]}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[{ flexDirection: 'column' }]}>
                                <View style={[{}, styles.OrderDetailDataCOntainer]}>
                                    <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
                                        <View>
                                            <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>Pure ORANGE JUICE  12PACK</Text>
                                            <Text style={[{}, styles.OrderDetailHeadingRowText]}>LAGOS- Palms</Text>
                                        </View>

                                        <View style={[{}, styles.OrderDetailDataCOntainerCounterView]}>
                                            <TouchableOpacity style={[{}, styles.iconView]}>
                                                <Icon name="minus" />
                                            </TouchableOpacity>
                                            <View style={[{}, styles.iconView]}>
                                                <Text>10</Text>
                                            </View>
                                            <TouchableOpacity style={[{}, styles.iconView]}>
                                                <Icon name="plus"
                                                    color="#B1272C"
                                                />
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                                <View style={[{}, styles.orderDetailAmmountRow]}>
                                    <View style={[{}, styles.orderDetailAmmountColumn]}>
                                        <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>N500,000</Text>
                                    </View>
                                    <View style={[{}, styles.orderDetailAmmountColumn]}>
                                        <TouchableOpacity
                                            style={[{ alignSelf: 'flex-end' }]}
                                        >
                                            <Text style={[{}, styles.orderDetailAmmountColumnRedText]}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[{}, styles.diliveryTypeContainerView]}>
                            <TouchableOpacity>
                                <View style={[{}, styles.radioFormView]}>
                                    <RadioForm
                                        isSelected={false}
                                        color={'#000'}
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        radio_props={radio_props_dilvery}

                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    />
                                    <Text style={[{}, styles.smailGrayText]}>Dilivery to customer address</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={[{}, styles.radioFormView]}>
                                    <RadioForm
                                        isSelected={false}
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        radio_props={radio_props_pickup}
                                        // initial={0}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                    />
                                    <Text style={[{}, styles.smailGrayText]}>Pickup from our location</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{}, styles.paymentContainerView]}>
                            <Text style={[{}, styles.paymentHeadingText]}>Payment Options</Text>
                            <View style={[{}, styles.radioFormView]}>
                                <RadioForm
                                    isSelected={false}
                                    color={'#000'}
                                    radio_props={radio_props_payment}
                                    size={5}
                                    buttonColor={'red'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    // initial={0}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                />

                            </View>
                            <View style={[{}, styles.paymentCheckboxView]}>
                                <CheckBox
                                    style={{ width: width / 1.5, alignSelf: 'center', alignItems: 'center' }}
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    isChecked={this.state.isChecked}
                                    rightText={"Accept multiple part payment"}


                                />
                            </View>
                        </View>


                        <View style={[{}, styles.subTotleRowView]}>

                            <View style={[{}, styles.subTotleColumn1View]}>
                                <Text style={[{}, styles.subTotleColumn1Text]}>subtotal:</Text>
                                <Text style={[{}, styles.subTotleColumn1Text]}>Tax(7.5%)</Text>
                                <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Apply for Discount</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.subTotleColumn2View]}>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <Text style={[{}, styles.subTotleColumn2Text]}>-</Text>
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Apply for Discount</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MakePayment')}
                            style={[{}, styles.btnContinuueView]}>
                            <Text style={{ color: '#FFFFFF' }}>Pay</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
