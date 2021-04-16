import React from 'react'
import { View, ImageBackground, ScrollView, Text, Dimensions, Image, Platform, TouchableOpacity, FlatList, Alert } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CreateOrderCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART } from '../redux/constants/index';
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
            customer_name: this.props.customer.name ?? '',
            customer_email: this.props.customer.email ?? '',
            customer_phone: this.props.customer.phone ?? '',
            cart_arr: this.props.cart.cart ?? [],
            payment_option: 0,
            delivery_type_btn: 0,
            is_pickup: false,
            payment_mode: '',
            payment_methood: '',
        }
    }

    componentDidMount() {
        console.log(' componentDidMount componentDidMount', this.props);
    }

    componentWillReceiveProps() {
        console.log(' componentWillReceiveProps CreateOrder', this.props);

        this.setState({
            customer_name: this.props.customer.name,
            customer_email: this.props.customer.email,
            customer_phone: this.props.customer.phone,
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


    async counterFun(action, index) {

        let data = this.state.cart_arr;
        console.log('fun called ');
        if (action == 'add') {

            let updated_purchased_quantity = data[index].purchased_quantity + 1;
            if (updated_purchased_quantity > data[index].quantity) {
                alert('Out of stock');
            }
            else {
                console.log('here in else condition !!!!!!!!!', data[index].purchased_quantity);
                await this.props.cartReducer(data[index]);
                data[index].purchased_quantity = updated_purchased_quantity;
                console.log('here in else condition !!!!!!!!! after : ', data[index].purchased_quantity);

                this.setState({
                    cart_arr: data
                });

                console.log('cart : ', this.props.cart);
            }
        }
        else {
            let updated_purchased_quantity = data[index].purchased_quantity - 1;

            if (data[index].purchased_quantity > 0) {
                await this.props.removeFromCart(data[index]);
                data[index].purchased_quantity = updated_purchased_quantity;
                this.setState({
                    data: data
                })
                console.log(' remove from cart cart : ', this.props.cart);
            }
        }

        let cart_product = this.state.product_cart;

        // cart_product.forEach(item ,index, function(){

        //     return item ;
        // })

    }

    DeliveryType(type) {
        console.log(' type !!!!!!!', type);
        this.setState({ is_pickup: !this.state.is_pickup })

        if (this.state.customer_name == '') {

            Alert.alert('Error', 'ADD CUSTOMER FIRST');
            return
        } else {


            if (type == 'pickup') {
                // this.props.navigation.navigate('PickUpLocation', { type })
            }
            else {
                this.props.navigation.navigate('DiliveryAddress', { type })
            }
        }



    }

    paymentMethood(){

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
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View style={{ paddingBottom: 20 }}>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('Order')}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>CREATE ORDER</Text>
                            </View>
                            <View style={[{}, styles.backHeadingCloseView]}>
                                <Icon name="times" size={20} color="#929497" />
                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('Order')}
                                    onPress={() => this.props.navigation.goBack()}
                                >
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
                                        <Text style={[{}, styles.userDEtailCOntainerText]}>{this.state.customer_name}</Text>
                                    </View>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Text style={[{}, styles.usetDetailLableText]}>Email: </Text>
                                        <Text style={[{}, styles.usetDetailInfoText]}>{this.state.customer_email}</Text>
                                    </View>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Text style={[{}, styles.usetDetailLableText]}>Phone: </Text>
                                        <Text style={[{}, styles.usetDetailInfoText]}>{this.state.customer_phone}</Text>
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
                        <View style={[{}, styles.OrderDetailContainer]}>
                            <View style={[{}, styles.OrderDetailHeadingRow]}>
                                <Text style={[{}, styles.OrderDetailHeadingRowText]}>Order Detail</Text>
                                <Text style={[{}, styles.OrderDetailNotificationText]}>{this.state.cart_arr.length ?? 0}</Text>
                            </View>
                            <TouchableOpacity style={[{}, styles.OrderDetailClearTouc]}>
                                <Text style={[{}, styles.OrderDetailHeadingRowText]}>Clear Order</Text>
                            </TouchableOpacity>


                            <FlatList
                                data={this.state.cart_arr}
                                ItemSeparatorComponent={
                                    Platform.OS !== 'android' &&
                                    (({ highlighted }) => (
                                        <View
                                            style={[
                                                style.separator,
                                                highlighted && { marginLeft: 0 }
                                            ]}
                                        />
                                    ))
                                }
                                renderItem={({ item, index, separators }) => (
                                    <View style={[{ flexDirection: 'column' }]}>
                                        <View style={[{}, styles.OrderDetailDataCOntainer]}>
                                            <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
                                                <View>
                                                    <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>{item.name}  {item.quantity} PACK</Text>
                                                    <Text style={[{}, styles.OrderDetailHeadingRowText]}>{item.category}</Text>
                                                </View>

                                                <View style={[{}, styles.OrderDetailDataCOntainerCounterView]}>
                                                    <TouchableOpacity style={[{}, styles.iconView]}
                                                        onPress={() => this.counterFun('sub', index)}
                                                    >
                                                        <Icon name="minus" />
                                                    </TouchableOpacity>
                                                    <View style={[{}, styles.iconView]}>
                                                        <Text>{item.purchased_quantity}</Text>
                                                    </View>
                                                    <TouchableOpacity style={[{}, styles.iconView]}
                                                        onPress={() => this.counterFun('add', index)}
                                                    >
                                                        <Icon name="plus"
                                                            color="#B1272C"
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                        </View>
                                        <View style={[{}, styles.orderDetailAmmountRow]}>
                                            <View style={[{}, styles.orderDetailAmmountColumn]}>
                                                <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>N{item.price}</Text>
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
                                )}
                            />




                        </View>
                        <View style={[{}, styles.diliveryTypeContainerView]}>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('DiliveryAddress')}
                                onPress={() => this.DeliveryType('delivery')}

                            >
                                <View style={[{}, styles.radioFormView]}>

                                    <RadioForm
                                        isSelected={!this.state.is_pickup}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={(value) => { this.setState({ value3Index: value }) }}
                                    />
                                    {
                                        radio_props_dilvery.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    null
                                                    isSelected={!this.state.is_pickup}
                                                    onPress={() => this.DeliveryType('delivery')}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={() => this.DeliveryType('delivery')}
                                                    // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                    <Text style={[{}, styles.smailGrayText]}>{this.props.deliveryAddress.address ?? 'Dilivery to customer address'}</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.DeliveryType('pickup')}

                            >
                                <View style={[{}, styles.radioFormView]}>

                                    <RadioForm
                                        isSelected={this.state.is_pickup}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={() => this.DeliveryType('pickup')}

                                    />
                                    {
                                        radio_props_pickup.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={this.state.is_pickup}
                                                    onPress={() => this.DeliveryType('pickup')}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}

                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                    <Text style={[{}, styles.smailGrayText]}>Pickup from our location</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{}, styles.paymentContainerView]}>
                            <Text style={[{}, styles.paymentHeadingText]}>Payment Options</Text>
                            <View style={[{}, styles.radioFormView]}>
                                <RadioForm
                                    isSelected={false}
                                    color={'yellow'}
                                    size={5}
                                    buttonColor={'green'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    initial={0}
                                    // onPress={(value) => { this.setState({ value3Index: value }) }}
                                    onPress={() => this.DeliveryType('delivery')}
                                />
                                {
                                    radio_props_payment.map((obj, i) => (
                                        <RadioButton labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value3Index === i}
                                                // onPress={(value) => { this.setState({ value3Index: value }) }}
                                                onPress={(value) => this.paymentMethood()}
                                                borderWidth={1}
                                                buttonInnerColor={'#e74c3c'}
                                                buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                buttonSize={10}
                                                buttonOuterSize={20}
                                                buttonStyle={{}}

                                                buttonWrapStyle={{ marginLeft: 10 }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                // onPress={(value) => { this.setState({ value3Index: value }) }}
                                                onPress={(value) => this.paymentMethood()}
                                                // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    ))
                                }
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
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ApplyDiscount')}
                                >
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
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('AddNote')}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="times-circle" size={20} color="#B1272C" />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Add Note</Text>
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

        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.userReducer,
        customer: state.customReducer,
        cart: state.cartReducer,
        deliveryAddress: state.deliveryAddressReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        cartReducer: (value) => dispatch({ type: ADD_TO_PRODUCT, value: value }),
        removeFromCart: (value) => dispatch({ type: REMOVE_FROM_CART, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
