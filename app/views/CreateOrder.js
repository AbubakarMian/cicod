import React from 'react'
import { View, ImageBackground, ScrollView, Dimensions, Alert, Image, TouchableHighlight, Platform, TouchableOpacity, FlatList } from 'react-native'
import { Text, TextInput, Modal } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/CreateOrderCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, SET_CUSTOMER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART, REMOVE_PRODUCT_FORM_CART, CLEAR_ORDER, SET_DELIVERY_ADDRESS } from '../redux/constants/index';
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
            customer_name: this.props.customer.name,
            customer_email: this.props.customer.email,
            customer_phone: this.props.customer.phone,
            customer_country: this.props.customer.country,
            customer_state: this.props.customer.state,
            customer_lga: this.props.customer.lga,
            cart_arr: this.props.cart.cart ?? [],
            limit_cart_arr: [],
            cart_detail: this.props.cart.cart_detail,
            payment_option: 0,
            delivery_type_btn: 0,
            is_pickup: true,
            payment_mode: '',
            suppliereModal: false,
            search_supplier: '',
            supplierlist: [],
            address_backgound:''
        }
    }
    clearOrder() {
        this.props.emptyOrder();
    }
    componentDidMount() {

        console.log(' create order !!!! !!!!!!!!', this.props);

        let res = this.props.cart.cart;
        let cart_arr = res.map((x, key) => { return { id: x.id, quantity: x.purchased_quantity } });
        this.setState({
            limit_cart_arr: cart_arr,
        });
        this.getSuppliersList(Constants.supplierlist);
    }

    componentWillReceiveProps() {

        this.setState({
            customer_name: this.props.customer.name,
            customer_email: this.props.customer.email,
            customer_phone: this.props.customer.phone,
        })

    }

    searchSupplier() {
        let url = Constants.supplierlist + 'filter[seller_name]=' + this.state.search_supplier;
        this.getSuppliersList(url);
    }
    async counterFun(action, index) {

        let data = this.state.cart_arr;
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
                let res = data;
                let cart_arr = res.map((x, key) => { return { id: x.id, quantity: x.purchased_quantity } });
                this.setState({
                    cart_arr: data,
                    limit_cart_arr: cart_arr
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

        if (this.props.customer.name == '') {

            alert('ADD CUSTOMER FIRST');
            return
        } else {


            if (type == 'pickup') {
                // this.props.navigation.navigate('PickUpLocation', { type })
                this.props.setDeliveryAddress({
                    address: '',
                    type: 'pickup',
                })
            }
            else {
                this.props.navigation.navigate('DiliveryAddress', { type })
            }
        }



    }

    paymentFun(item) {
        let mode = '';
        if (item.label == 'Pay Acount') {
            mode = 'ONLINE'
        } else if (item.label == 'Pay Now' || item.label == 'Pay Invoice') {
            mode = 'ONLINE'
        }
        this.setState({
            value3Index: item.value,
            payment_mode: mode,
        })
    }
    removeProduct(id) {
        this.props.removeProductFromCart(id);
    }
    createOrderFun() {

        
        // return;

        let dilevery_type = ''
        if (this.state.is_pickup == true) {
            dilevery_type = 'Pickup';
        } else {
            dilevery_type = 'Delivery';
        }
        console.log('dilevery_type', dilevery_type);
        console.log('this.props.deliveryAddress.type this.props.deliveryAddress.type', this.props.deliveryAddress);
        let discounted_price = 0
        if (this.props.orderDiscountReducer.discount_type == 'percentage') {
            discounted_price = (this.state.cart_detail.total_price_with_tax * this.props.orderDiscountReducer.discount_amount * 0.01);
        }
        else {
            discounted_price = this.props.orderDiscountReducer.discount_amount;
        }
        console.log('this.props.notes this.props.notes !!!!!!!!!!!!', this.props.notes)
        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
            body: JSON.stringify({
                customer_name: this.state.customer_name,//this.state.customer_name,//required
                customer_phone: this.state.customer_phone, //this.state.customer_phone,//required
                customer_email: this.state.customer_email,//this.state.customer_email,
                products: this.state.limit_cart_arr, //required
                delivery_type: this.props.deliveryAddress.type,//dilevery_type,?? 'PICKUP'
                delivery_address: this.props.deliveryAddress.address ?? '',
                payment_mode: this.state.payment_mode, //required
                // country_id: this.state.customer_country,
                // state_id: this.state.customer_state,
                // lga_id: this.state.customer_lga,
                note: this.props.notes.notes ?? '',
                discount_amount: discounted_price ?? 0,
            })
        };
        console.log('body params list @@@@@@!!!!!!!!!!!!!!',postData );
        fetch(Constants.orderslist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "success") {

                    this.setState({ spinner: false })
                    alert(responseJson.message)
                    let payment_link = responseJson.data.payment_link
                    this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
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

    getSuppliersList(url) {

        console.log('get Suppliers List');
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('suppliers responseJson @@@@@@@@@@@@@@@@@@@', responseJson);
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {

                    this.setState({
                        supplierlist: responseJson.data
                    })
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }
            })

    }
    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }

    closeOrder() {
        let user_data = {}
        this.props.setCustomer(user_data);
        this.props.navigation.goBack()
    }
    render() {
        console.log(' supplierlist @@@@@@@@@@@@@@@ supplierlist  !!!!!!!!!!!!!!', this.props.customer);
        var radio_props_dilvery = [
            { label: 'Delivery', value: 0 },

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
                                    onPress={() => this.closeOrder()}
                                >
                                    <Text style={[{}, styles.backHeadingCloseText]}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {(this.props.route.params.screen_name == 'buy') ?
                            <View style={[{}, styles.customerTitleRowView]}>
                                <Text style={[{}, styles.customerTitleRowHeadingText]}>TestKing Nigeria</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({ suppliereModal: true })}
                                >
                                    <Text style={[{}, styles.customerTitleRowchangesupplierText]}>Change Supplier</Text>
                                </TouchableOpacity>
                            </View>
                            : null}
                        <View style={[{}, styles.customerContainerView]}>

                            <Text style={[{ color: '#929497', textAlign: 'left', alignSelf: 'flex-start', marginLeft: 10 }, fontStyles.bold15]}>Customer Details</Text>
                            <TouchableOpacity style={[{}, styles.customerContaineraddBtnView]}
                                onPress={() => this.props.navigation.navigate('AddCustomer')}
                            >
                                <Icon name="plus-circle" size={20} color={'#fff'} />
                                <Text style={[{}, styles.customerContaineraddBtnText]}>Add</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.5, width: width - 20, alignSelf: 'center', marginVertical: 5, borderColor: '#E6E6E6' }}></View>
                            {(this.props.customer.name == '' || this.props.customer.name == undefined) ?
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
                                        <Text style={[{}, styles.userDEtailCOntainerText]}>{this.props.customer.name}</Text>
                                    </View>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Text style={[{}, styles.usetDetailLableText]}>Email: </Text>
                                        <Text style={[{}, styles.usetDetailInfoText]}>{this.props.customer.email}</Text>
                                    </View>
                                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                                        <Text style={[{}, styles.usetDetailLableText]}>Phone: </Text>
                                        <Text style={[{}, styles.usetDetailInfoText]}>{this.props.customer.phone}</Text>
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
                                {(this.state.cart_arr.length != 0) ?
                                    <Text style={[{}, styles.OrderDetailNotificationText]}>{this.state.cart_arr.length ?? 0}</Text>
                                    : null}
                            </View>
                            <TouchableOpacity
                                onPress={() => this.clearOrder()}
                                style={[{}, styles.OrderDetailClearTouc]}>
                                <Text style={[{}, styles.OrderDetailNormalgRowText]}>Clear Order</Text>
                            </TouchableOpacity>
                            {(this.state.cart_arr.length == 0) ?
                                <View style={[{}, styles.cartSlashView]}>
                                    <Image source={require('../images/cartSlash.png')} />
                                    <Text style={[{}, styles.cartSlashheadingText]}>No product added</Text>
                                    <Text style={[{}, styles.cartSlashNormalText]}>Add a product</Text>
                                </View>
                                :
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
                                                        onPress={() => this.removeProduct(index)}
                                                    >
                                                        <Text style={[{}, styles.orderDetailAmmountColumnRedText]}>Remove</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            }



                        </View>
                        <View style={[{}, styles.diliveryTypeContainerView]}>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('DiliveryAddress')}
                                onPress={() => this.DeliveryType('delivery')}

                            >
                                <View style={[{ borderWidth: 0.25, }, styles.radioFormView]}>

                                    <RadioForm
                                        isSelected={!this.state.is_pickup}
                                        color={'yellow'}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
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
                                    {/* <Text style={[{}, styles.smailGrayText]}>{this.props.deliveryAddress.address ?? 'Dilivery to customer address'}</Text> */}
                                    <Text style={[{}, styles.smailGrayText]}>Delivery to customer address</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.DeliveryType('pickup')}
                            >
                                <View style={[{ borderWidth: 0.25, }, styles.radioFormView]}>
                                    <RadioForm
                                        isSelected={this.state.is_pickup}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        backgroundColor={this.state.address_backgound === 'delivery' ? '#2196f3' : '#fff'}
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
                                                    backgroundColor={this.state.address_backgound === 'pickup' ? '#2196f3' : '#fff'}
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
                            <Text style={[{}, styles.OrderDetailHeadingRowText]}>Payment Options</Text>
                            <View style={{ borderWidth: 0.25, borderColor: '#E6E6E6', width: width - 20, alignSelf: 'center', marginTop: 10 }}></View>
                            <View style={[{}, styles.radioFormView]}>
                                <RadioForm
                                    isSelected={false}
                                    color={'yellow'}
                                    size={5}
                                    buttonColor={'green'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    initial={0}
                                    style={{}}
                                    onPress={(value) => { this.setState({ value3Index: value }) }}
                                    onPress={() => this.DeliveryType('delivery')}
                                />
                                {
                                    radio_props_payment.map((obj, i) => (
                                        <RadioButton
                                            style={{ backgroundColor: '#F5F5F5', paddingVertical: 10, marginBottom: 20, paddingHorizontal: 10 }}
                                            labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}

                                                style={{ backgroundColor: 'red' }}
                                                isSelected={this.state.value3Index === i}
                                                onPress={(value, label) => this.paymentFun(obj)}
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
                                                onPress={(value, label) => this.paymentFun(obj)} //this.setState({ value3Index: value })
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
                                    rightTextStyle={{color:'#4E4D4D',fontSize:13,fontFamily:'Open Sans'}}
                                    checkBoxColor={'#929497'}


                                />
                            </View>
                        </View>


                        <View style={{ backgroundColor: '#fff', width: width - 20, alignSelf: 'center', marginTop: 10, borderRadius: 10, paddingBottom: 10 }}>
                            <View style={[{ borderBottomWidth: 0.25 }, styles.subTotleRowView]}>

                                <View style={[{}, styles.subTotleColumn1View]}>
                                    <Text style={[{}, styles.subTotleColumn1Text]}>subtotal:</Text>
                                    <Text style={[{}, styles.subTotleColumn1Text]}>Tax(7.5%)</Text>
                                    <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('ApplyDiscount')}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../images/icon15.png')} />
                                            <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Apply for Discount</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[{}, styles.subTotleColumn2View]}>
                                    <Text style={[{}, styles.subTotleColumn2Text]}>N {this.state.cart_detail.total_price ?? 0}</Text>
                                    <Text style={[{}, styles.subTotleColumn2Text]}>N {this.state.cart_detail.tax ?? 0}</Text>
                                    <Text style={[{}, styles.subTotleColumn2Text]}>N {this.state.cart_detail.total_price_with_tax ?? 0}</Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('AddNote')}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../images/addNote.png')} />
                                            <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Add Note</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.createOrderFun()}
                                style={[{}, styles.btnContinuueView]}>
                                <Text style={{ color: '#FFFFFF' }}>Pay</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
                <Modal
                    visible={this.state.suppliereModal}
                    transparent={true}
                >
                    <View style={[{}, styles.mainContainer]}>
                        <TouchableOpacity
                            style={[{}, styles.backgroundTouch]}
                        >

                        </TouchableOpacity>
                        <View style={[{}, styles.contentView]}>
                            <View style={[{}, styles.modalCancleRow]}>
                                <Text style={[{}, styles.modalCancleText]}>SELECT SUPPLIERS</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({ suppliereModal: false })}
                                    style={[{}, styles.modalCancleTouch]}
                                >
                                    <Icon name="times" size={20} color="#929497" />
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.searchRow]}>
                                <Icon name="search" size={20} color="#929497" />
                                <TextInput
                                    label="Search supplier"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                    onChangeText={text => this.setState({ search_supplier: text })}
                                    onSubmitEditing={() => this.searchSupplier()}
                                />
                            </View>
                            <ScrollView

                            >
                                <FlatList

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
                                    data={this.state.supplierlist}
                                    renderItem={({ item, index, separators }) => (
                                        <TouchableOpacity
                                            key={item.key}
                                            onPress={() => this.props.navigation.navigate('BuyersView', { items: items, heading: 'SUPPLIERS' })}
                                            onShowUnderlay={separators.highlight}
                                            onHideUnderlay={separators.unhighlight}>
                                            <View style={[{ marginTop: 10 }, styles.modalListContainer]}>
                                                <Image source={require('../images/bage.png')} />
                                                <View style={[{}, styles.modalListContentView]}>
                                                    <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>{item.seller_name}</Text>
                                                    <Text style={[{ color: '#929497' }, fontStyles.normal12]}>{item.seller_id}</Text>
                                                </View>
                                                <Icon
                                                    style={[{}, styles.modalListContentRightIcon]}
                                                    name="angle-right" size={20} color="#aaa" />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </ScrollView>

                        </View>
                    </View>

                </Modal>
            </View>

        );
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
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
