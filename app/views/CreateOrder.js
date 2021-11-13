import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Text, TextInput, Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/CreateOrderCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import NavBack from './Components/NavBack';
import {
  SET_USER,
  SET_CUSTOMER,
  LOGOUT_USER,
  ADD_TO_PRODUCT,
  REMOVE_FROM_CART,
  REMOVE_PRODUCT_FORM_CART,
  CLEAR_ORDER,
  SET_DELIVERY_ADDRESS,
} from '../redux/constants/index';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchBar from 'react-native-search-bar';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class CreateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
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
      delivery_type_option: null,
      is_pickup: true,
      payment_mode: '',
      suppliereModal: false,
      search_supplier: '',
      supplierlist: [],
      address_backgound: '',
      deliveryType: '',
      show_part_payment: false,
      isDatePickerVisible: false,
      part_payment_balance_due_date: new Date(),
      part_payment_percent: 0,
      part_payment_amount: 0,
      goto_payment_screen: '',
      payment_option_selected: '',
      pay_button_lable: 'Pay',
      amount_payable: 0,
      ConfirmationPayInvoice: false,
      valuePayNowPayment: null,
      showPayNowDropDown: false,
      alertMessage: '',
      isAlertError: false,
      alertType: '',
    };
  }
  update_cart_state() {
    return;
    this.setState({
      cart_detail: this.props.cart.cart_detail,
    });
  }
  clearOrder() {
    this.props.emptyOrder();
    this.update_cart_state();
  }
  async componentDidMount() {
    console.log(' create order !!!! !!!!!!!!', this.props.user);
    // this.getSuppliersList(Constants.supplierlist);
  }

  componentWillReceiveProps() {
    this.setState({
      customer_name: this.props.customer.name,
      customer_email: this.props.customer.email,
      customer_phone: this.props.customer.phone,
    });
  }

  searchSupplier() {
    let url =
      Constants.supplierlist +
      'filter[seller_name]=' +
      this.state.search_supplier;
    this.getSuppliersList(url);
  }
  async counterFun(action, index) {
    let data = this.state.cart_arr;
    if (action == 'add') {
      let updated_purchased_quantity = data[index].purchased_quantity + 1;
      if (updated_purchased_quantity > data[index].quantity) {
        alert('Out of stock');
      } else {
        data[index].purchased_quantity = updated_purchased_quantity;
        await this.props.cartReducer(data[index]);
        let res = data;
        let cart_arr = res.map((x, key) => {
          return {id: x.id, quantity: x.purchased_quantity};
        });
        this.setState({
          cart_arr: data,
          limit_cart_arr: cart_arr,
        });

        this.update_cart_state();
        console.log('cart : ', this.props.cart);
      }
    } else {
      let updated_purchased_quantity = data[index].purchased_quantity - 1;

      if (data[index].purchased_quantity > 0) {
        await this.props.removeFromCart(data[index]);
        data[index].purchased_quantity = updated_purchased_quantity;
        this.setState({
          data: data,
        });
        this.update_cart_state();
        console.log(' remove from cart cart : ', this.props.cart);
      }
    }

    // let cart_product = this.state.product_cart;
  }

  DeliveryType(type) {
    // if (this.props.customer.name == '') {
    //   alert('ADD CUSTOMER FIRST');
    //   return;
    // }
    //alert(this.state.cart_arr.length);
    if (this.state.cart_arr.length < 1 || !this.state.cart_arr) {
      this.setState({
        isAlertError: true,
        alertMessage: 'Please Add Product',
        alertType: 'NO_PRODUCT',
      });
      return;
    }

    if (type == 'delivery' && this.props.customer.name == '') {
      this.setState({
        isAlertError: true,
        alertMessage: 'Please Add Customer',
        alertType: 'NO_CUSTOMER',
      });
      return;
    }
    this.setState({delivery_type_option: type});
    // this.props.setDeliveryAddress({
    //     type: type,
    // })
    console.log('dilivery type ------', type);
    // this.setState({ is_pickup: !this.state.is_pickup, })
    if (type === 'delivery') {
      this.setState({deliveryType: 'delivery'});
    } else if (type === 'pickup') {
      this.setState({deliveryType: 'pickup'});
    } //return;
    if (type == 'delivery') {
      if (this.props.route.params.screen_name == 'buy') {
        this.props.navigation.navigate('BuyDiliveryAddress', {
          type,
          address: this.props.customer.address,
          address_id: this.props.deliveryAddress.selected_address_id,
        });
      } else {
        console.log(
          'RRRRRRRRRR',
          this.props.deliveryAddress.selected_address_id,
        );

        this.props.navigation.navigate('DiliveryAddress', {
          type,
          address: this.props.customer.address,
          address_id: this.props.deliveryAddress.selected_address_id,
        });
      }
    } else {
      // pickup
      this.props.setDeliveryAddress({
        address: '',
        type: 'pickup',
      });
    }
  }

  paymentFun(item) {
    let mode = '';

    let pay_button_lable = 'Pay';
    let goto_payment_screen = '';
    if (
      item.label == 'Pay Now' ||
      item.label == 'Pay Cash' ||
      item.label == 'Pay Online' ||
      item.label == 'Pay By POS' ||
      item.label == 'Pay By USSD'
    ) {
      mode = '';
      goto_payment_screen = 'MakePayment';
    } else if (item.label == 'Pay Account') {
      mode = 'ACCOUNT';
      goto_payment_screen = '';
    } else if (item.label == 'Send Invoice') {
      mode = 'ONLINE';
      goto_payment_screen = '';
      pay_button_lable = 'Generate CICOD Order ID';
    } else if (item.label == 'Part Payment') {
      mode = 'ONLINE';
      goto_payment_screen = 'PartPaytment';
    }

    // if (
    //   item.label == 'Pay Now' ||
    //   item.label == 'Pay Cash' ||
    //   item.label == 'Pay Online' ||
    //   item.label == 'Pay By POS' ||
    //   item.label == 'Pay By USSD'
    // ) {
    //   console.log('here$%%', item);
    //   this.setState({
    //     valuePayNowPayment: item.value,
    //     value3IndexPayment: null,

    //     payment_mode: mode,
    //     goto_payment_screen: goto_payment_screen,
    //     payment_option_selected: item.label,
    //     pay_button_lable: pay_button_lable,
    //   });
    // } else {
    console.log('forrr##', item);
    this.setState({
      valuePayNowPayment: null,
      showPayNowDropDown: false,
      value3IndexPayment: item.value,
      payment_mode: mode,
      goto_payment_screen: goto_payment_screen,
      payment_option_selected: item.label,
      pay_button_lable: pay_button_lable,
    });
  }
  removeProduct(id) {
    this.props.removeProductFromCart(id);
    this.update_cart_state();
  }

  set_limit_cart_arr() {
    let res = this.props.cart.cart;
    let cart_arr = res.map((x, key) => {
      return {id: x.id, quantity: x.purchased_quantity};
    });
    this.setState({
      limit_cart_arr: cart_arr,
    });
    return cart_arr;
  }
  async createOrderFun() {
    if (await this.state.spinner) {
      return;
    }
    await this.setState({spinner: true});

    if (
      this.state.payment_option_selected == 'Pay Invoice' &&
      !this.state.ConfirmationPayInvoice
    ) {
      this.setState({
        ConfirmationPayInvoice: true,
        spinner: false,
      });
      return;
    }

    let dilevery_type = '';
    // if (this.state.is_pickup == true) {
    // this.props.deliveryAddress.address
    if (
      this.state.delivery_type_option == null ||
      (this.props.deliveryAddress.address == '' &&
        this.state.delivery_type_option == 'delivery')
    ) {
      alert('Select delivery type');
      this.setState({spinner: false});
      return;
    }

    // alert(this.state.payment_option_selected);
    if (
      (this.state.payment_option_selected != 'Pay Cash' ||
        this.state.payment_option_selected != 'Pay By POS') &&
      this.props.customer.name == ''
    ) {
      this.setState({
        isAlertError: true,
        alertMessage: 'Please Add Customer',
        alertType: 'NO_CUSTOMER',
      });

      return;
    }

    if (this.state.delivery_type_option == 'pickup') {
      dilevery_type = 'Pickup';
    } else {
      dilevery_type = 'Delivery';
    }
    let cart = this.set_limit_cart_arr();
    // if(cart.length<1){
    //     alert('Add products to cart')
    // }
    console.log('dilevery_type', dilevery_type);
    console.log(
      'this.props.deliveryAddress.type this.props.deliveryAddress.type',
      this.props.deliveryAddress,
    );
    let discounted_price = 0;
    let discounted_percentage = 0;
    let amount_payable = this.state.amount_payable;
    // if (this.props.orderDiscountReducer.discount_type == 'percentage') {
    //     discounted_percentage = this.props.orderDiscountReducer.discount_amount;
    //     // discounted_price = (this.state.cart_detail.total_price_with_tax * this.props.orderDiscountReducer.discount_amount * 0.01);
    //     amount_payable = this.state.cart_detail.total_price_with_tax - (this.state.cart_detail.total_price_with_tax * this.props.orderDiscountReducer.discount_amount * 0.01) ?? 0;
    // }
    // else {
    //     discounted_price = this.props.orderDiscountReducer.discount_amount;
    //     amount_payable = (this.state.cart_detail.total_price_with_tax - this.props.orderDiscountReducer.discount_amount) ?? 0;
    // }

    let bodyOrder = {
      customer_name: this.state.customer_name, //this.state.customer_name,//required
      customer_phone: this.state.customer_phone, //this.state.customer_phone,//required
      customer_email: this.state.customer_email, //this.state.customer_email,
      products: cart, //required this.state.limit_cart_arr
      delivery_type: this.props.deliveryAddress.type, //dilevery_type,?? 'PICKUP'
      delivery_address: this.props.deliveryAddress.address ?? '',
      payment_mode: this.state.payment_mode, //required
      country_id: this.props.deliveryAddress.country_id,
      state_id: this.props.deliveryAddress.state_id,
      lga_id: this.state.customer_lga,
      note: this.props.notes.notes ?? '',
      discount_amount: discounted_price,
      discount_percent: discounted_percentage,
      accept_multiple_part_payment: this.state.show_part_payment,
      // part_payment_balance_due_date: this.state.part_payment_balance_due_date,
      // part_payment_percent: this.state.part_payment_percent,
      // part_payment_amount: this.state.part_payment_amount,
    };

    // this.setState({
    //     amount_payable: amount_payable,
    //     ConfirmationPayInvoice: false
    // })
    if (this.state.goto_payment_screen == '') {
      //show_part_payment
      console.log('step  1 ');
      await this.create_order_id(Constants.orderslist, bodyOrder);
    } else {
      await this.setState({spinner: false});
      this.props.navigation.navigate(this.state.goto_payment_screen, {
        bodyOrder: bodyOrder,
        payment_mode: this.state.payment_mode,
        amount_payable: this.state.amount_payable,
      });
      console.log('step  2 ');
      return;
    }
  }

  get_order_detail(order_id) {
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };

    // let order_id = this.props.route.params.data.id;
    let url = Constants.orderslist + '/' + order_id;
    // console.log('---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
    console.log('order url detail ', url);
    console.log('order postData ', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(
          'get_order_detail order response response Json responseJson responseJson!!!!!!!!!!!',
          responseJson,
        );
        if (responseJson.status.toUpperCase() === 'SUCCESS') {
          let data = responseJson.data;
          console.log('##########ddddddddddd', data);

          this.props.navigation.navigate('PaymentSuccess', {data: data});
          // this.setState({
          //     spinner: false,
          //     order_detail: data,
          //     order_id:order_id
          // })
          // let payment_link = responseJson.data.payment_link
          // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
        } else {
          this.setState({spinner: false});
          let message = responseJson.message;
          console.log('some error', responseJson);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }

  create_order_id(url, bodyOrder) {
    console.log('*******************create_order_id', bodyOrder);
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify(bodyOrder),
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          // alert(responseJson.message)
          let payment_link = responseJson.data; //Pay Account,ACCOUNT
          if (this.state.payment_option_selected == 'Pay Account') {
            // alert(responseJson.message)
            console.log(
              '~~~~~~~~~~~create_order_id payment_link!',
              responseJson.data,
            );
            this.get_order_detail(responseJson.data.id);

            // this.props.navigation.navigate('PaymentCash', { payment_link: payment_link,data:responseJson });
            // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link,data:responseJson.data });
          }
          if (this.state.payment_option_selected == 'Pay Invoice') {
            this.props.navigation.navigate('OrderDetail', {
              id: responseJson.data.id,
            });
          }
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          alert(message);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }

  getSuppliersList(url) {
    console.log('get Suppliers List');
    this.setState({spinner: true});
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
            supplierlist: responseJson.data,
          });
        } else {
          console.log('errorrrrr', responseJson);
          let message = JSON.stringify(responseJson.error.message);
          Alert.alert('Error', message);
        }
      });
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  closeOrder() {
    let user_data = {};
    this.props.setCustomer(user_data);
    this.props.emptyOrder();
    this.update_cart_state();
    this.props.navigation.goBack();
  }

  supplierModalFun(item) {
    this.setState({
      suppliereModal: false,
    });
    this.props.navigation.navigate('BuyersView', {
      items: item,
      heading: 'SUPPLIERS',
    });
  }

  setDate(date) {
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    let newdate = day + '/' + month + '/' + year;

    let filters = this.state.filters;
    filters.push({key: 'create_time', value: date});
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      filters: filters,
      part_payment_balance_due_date: newdate,
    });
  }
  render() {
    console.log(
      ' supplierlist @@@@@@@@@@@@@@@ supplierlist  !!!!!!!!!!!!!!',
      this.props.supplier,
    );
    console.log(
      ' this.props.cart.cart_detail @@@@@@@@@@@@@@@ this.props.cart.cart_detail  !!!!!!!!!!!!!!',
      this.props.cart.cart_detail,
    );
    console.log(
      ' this.props.cart.cart_detail @@@@@@@@@@@@@@@ this.props.cart.cart_detail  !!!!!!!!!!!!!!',
      this.state.cart_detail,
    );
    var radio_props_dilvery = [{label: 'Delivery', value: 0}];
    var radio_props_pickup = [{label: 'Pickup', value: 1}];
    var radio_props_payment = [
      // {label: 'Pay Now', value: 0},
      {label: 'Pay Online', value: 0},
      {label: 'Pay Account', value: 1},
      {label: 'Pay Cash', value: 2},
      {label: 'Pay By POS', value: 3},
      {label: 'Pay By USSD', value: 4},
      {label: 'Part Payment', value: 5},
      {label: 'Send Invoice', value: 6},
    ];

    // var radio_props_payment_pay_now = [
    //   {label: 'Pay Cash', value: 0},
    //   {label: 'Pay Online', value: 1},
    //   {label: 'Pay By POS', value: 2},
    //   {label: 'Part By USSD', value: 3},
    // ];

    var amount_payable = 0; //this.props.currency.currency + " "
    if (this.props.orderDiscountReducer.discount_type == 'percentage') {
      amount_payable =
        this.state.cart_detail.total_price_with_tax -
        (
          this.state.cart_detail.total_price_with_tax *
          this.props.orderDiscountReducer.discount_amount *
          0.01
        ).toFixed(2);
    } else {
      //'value'
      amount_payable = (
        this.state.cart_detail.total_price_with_tax -
        this.props.orderDiscountReducer.discount_amount
      ).toFixed(2);
    }

    if (this.state.amount_payable != amount_payable) {
      this.setState({
        amount_payable: amount_payable,
      });
    }

    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <AwesomeAlert
            show={this.state.isAlertError}
            showProgress={false}
            title="Info"
            message={this.state.alertMessage}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Close"
            onCancelPressed={() => {
              this.setState({
                isAlertError: false,
                alertMessage: '',
                alertType: '',
                spinner: false,
              });
            }}
            confirmText={this.state.alertType == 'NO_CUSTOMER' ? 'Add' : 'Ok'}
            onDismiss={() => {
              this.setState({
                isAlertError: false,
                alertMessage: '',
                spinner: false,
                alertType: '',
              });
            }}
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              this.setState({
                isAlertError: false,
                alertMessage: '',
                spinner: false,
              });
              if (this.state.alertType == 'NO_CUSTOMER') {
                this.props.navigation.navigate('AddCustomer');
              } else if (this.state.alertType == 'NO_PRODUCT') {
                this.props.navigation.navigate('AddProduct');
              }
            }}
          />
          <ScrollView>
            <View style={{paddingBottom: 20}}>
              <View style={[{}, styles.backHeaderRowView]}>
                <NavBack
                  title="CREATE ORDER"
                  onClick={() => this.props.navigation.goBack()}
                />
                <View style={[{}, styles.backHeadingCloseView]}>
                  <Icon name="times" size={20} color="#929497" />
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('Order')}
                    onPress={() => this.closeOrder()}>
                    <Text style={[{}, styles.backHeadingCloseText]}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {this.props.route.params.screen_name == 'buy' ? (
                <View style={[{}, styles.customerTitleRowView]}>
                  {this.props.supplier.name != '' ? (
                    <Text style={[{}, styles.customerTitleRowHeadingText]}>
                      {this.props.supplier.name}
                    </Text>
                  ) : (
                    <Text style={[{}, styles.customerTitleRowHeadingText]}>
                      {this.props.user.firstname +
                        ' ' +
                        this.props.user.lastname}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => this.setState({suppliereModal: true})}>
                    <Text
                      style={[{}, styles.customerTitleRowchangesupplierText]}>
                      Select Supplier
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddProduct')}>
                <View style={[{}, styles.customerContaineraddProductView]}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={require('../images/products/circlePlus.png')}
                  />
                  <Text style={[{}, styles.customerContaineraddProductText]}>
                    Add Product
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[{}, styles.OrderDetailContainer]}>
                <View style={[{}, styles.OrderDetailHeadingRow]}>
                  <Text style={[{}, styles.OrderDetailHeadingRowText]}>
                    Order Detail
                  </Text>
                  {this.state.cart_arr.length != 0 ? (
                    <Text style={[{}, styles.OrderDetailNotificationText]}>
                      {this.state.cart_arr.length ?? 0}
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => this.clearOrder()}
                  style={[{}, styles.OrderDetailClearTouc]}>
                  <Text style={[{}, styles.OrderDetailNormalgRowText]}>
                    Clear Order
                  </Text>
                </TouchableOpacity>
                {this.state.cart_arr.length == 0 ? (
                  <View style={[{}, styles.cartSlashView]}>
                    <Image
                      style={{height: width / 3, width: width / 3}}
                      source={require('../images/cartSlash.png')}
                    />
                    <Text style={[{}, styles.cartSlashheadingText]}>
                      No product added
                    </Text>
                    <Text style={[{}, styles.cartSlashNormalText]}>
                      Add a product
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={this.state.cart_arr}
                    ItemSeparatorComponent={
                      Platform.OS !== 'android' &&
                      (({highlighted}) => (
                        <View
                          style={[
                            style.separator,
                            highlighted && {marginLeft: 0},
                          ]}
                        />
                      ))
                    }
                    renderItem={({item, index, separators}) => (
                      <View style={[{flexDirection: 'column'}]}>
                        <View style={[{}, styles.OrderDetailDataCOntainer]}>
                          <View
                            style={[{}, styles.OrderDetailDataCOntainerRow]}>
                            <View>
                              <Text
                                style={[
                                  {width: width / 1.5},
                                  styles.OrderDetailDataCOntainerHeadingText,
                                ]}>
                                {item.name} {item.quantity} PACK
                              </Text>
                              <Text
                                style={[{}, styles.OrderDetailHeadingRowText]}>
                                {item.category}
                              </Text>
                            </View>

                            <View
                              style={[
                                {},
                                styles.OrderDetailDataCOntainerCounterView,
                              ]}>
                              <TouchableOpacity
                                style={[{}, styles.iconView]}
                                onPress={() => this.counterFun('sub', index)}>
                                <Icon name="minus" />
                              </TouchableOpacity>
                              <View style={[{}, styles.iconView]}>
                                <Text>{item.purchased_quantity}</Text>
                              </View>
                              <TouchableOpacity
                                style={[{}, styles.iconView]}
                                onPress={() => this.counterFun('add', index)}>
                                <Icon name="plus" color="#B1272C" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <View style={[{}, styles.orderDetailAmmountRow]}>
                          <View style={[{}, styles.orderDetailAmmountColumn]}>
                            <Text
                              style={[
                                {},
                                styles.orderDetailAmmountColumnGaryBolText,
                              ]}>
                              {this.props.currency.currency + ' ' + item.price}
                            </Text>
                          </View>
                          <View style={[{}, styles.orderDetailAmmountColumn]}>
                            <TouchableOpacity
                              style={[{alignSelf: 'flex-end'}]}
                              onPress={() => this.removeProduct(index)}>
                              <Text
                                style={[
                                  {},
                                  styles.orderDetailAmmountColumnRedText,
                                ]}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>

              <View style={[{}, styles.customerContainerView]}>
                <Text
                  style={[
                    {
                      color: '#929497',
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                    },
                    fontStyles.bold15,
                  ]}>
                  Customer Details
                </Text>
                <TouchableOpacity
                  style={[{}, styles.customerContaineraddBtnView]}
                  onPress={() => this.props.navigation.navigate('AddCustomer')}>
                  <Icon name="plus-circle" size={20} color={'#fff'} />
                  <Text style={[{}, styles.customerContaineraddBtnText]}>
                    Add
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: width - 20,
                    alignSelf: 'center',
                    marginVertical: 5,
                    borderColor: '#E6E6E6',
                  }}></View>

                {this.props.customer.name == '' ||
                this.props.customer.name == undefined ? null : (
                  <View style={[{}, styles.userDEtailCOntainer]}>
                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                      <Icon name="user-circle" color="#D8D8D8" size={20} />
                      <Text style={[{}, styles.userDEtailCOntainerText]}>
                        {this.props.customer.name}
                      </Text>
                    </View>
                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                      <Text style={[{}, styles.usetDetailLableText]}>
                        Email:{' '}
                      </Text>
                      <Text style={[{}, styles.usetDetailInfoText]}>
                        {this.props.customer.email}
                      </Text>
                    </View>
                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                      <Text style={[{}, styles.usetDetailLableText]}>
                        Phone:{' '}
                      </Text>
                      <Text style={[{}, styles.usetDetailInfoText]}>
                        {this.props.customer.phone}
                      </Text>
                    </View>
                    <View style={[{}, styles.downIconView]}>
                      <Icon name="angle-down" size={20} color={'#929497'} />
                    </View>
                  </View>
                )}
              </View>

              <View style={[{}, styles.diliveryTypeContainerView]}>
                <TouchableOpacity onPress={() => this.DeliveryType('pickup')}>
                  <View
                    style={[
                      {
                        borderWidth: 0.25,
                        backgroundColor:
                          this.state.deliveryType === 'pickup'
                            ? '#FFF4F4'
                            : '#fff',
                      },
                      styles.radioFormView,
                    ]}>
                    <RadioForm
                      isSelected={this.state.delivery_type_option == 'pickup'}
                      color={'yellow'}
                      // radio_props={radio_props_payment}
                      size={5}
                      buttonColor={'green'}
                      buttonSize={10}
                      buttonOuterSize={20}
                      backgroundColor={
                        this.state.address_backgound === 'delivery'
                          ? '#2196f3'
                          : '#fff'
                      }
                      onPress={() => this.DeliveryType('pickup')}
                    />
                    {radio_props_pickup.map((obj, i) => (
                      <RadioButton labelHorizontal={true} key={i}>
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={
                            this.state.delivery_type_option == 'pickup'
                          }
                          onPress={() => this.DeliveryType('pickup')}
                          borderWidth={1}
                          buttonInnerColor={'#e74c3c'}
                          buttonOuterColor={
                            this.state.value3Index === i ? '#2196f3' : '#000'
                          }
                          backgroundColor={
                            this.state.address_backgound === 'pickup'
                              ? '#2196f3'
                              : '#fff'
                          }
                          buttonSize={10}
                          buttonOuterSize={20}
                          buttonStyle={{}}
                          buttonWrapStyle={{marginLeft: 10}}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          onPress={value => {
                            this.setState({value3Index: value});
                          }}
                          labelWrapStyle={{}}
                        />
                      </RadioButton>
                    ))}
                    <Text style={[{}, styles.smailGrayText]}>
                      Pickup from our location
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.DeliveryType('delivery')}>
                  <View
                    style={[
                      {
                        borderWidth: 0.25,
                        backgroundColor:
                          this.state.deliveryType === 'delivery' &&
                          this.props.deliveryAddress.address != ''
                            ? '#FFF4F4'
                            : '#fff',
                      },
                      styles.radioFormView,
                    ]}>
                    <RadioForm
                      // isSelected={this.state.delivery_type_option == 'delivery'}
                      color={'yellow'}
                      size={5}
                      buttonColor={'green'}
                      buttonSize={10}
                      buttonOuterSize={20}
                      onPress={value => {
                        this.setState({value3Index: value});
                      }}
                    />

                    {radio_props_dilvery.map((obj, i) => (
                      <RadioButton labelHorizontal={true} key={i}>
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          null
                          isSelected={
                            this.state.delivery_type_option == 'delivery' &&
                            this.props.deliveryAddress.address != ''
                          }
                          onPress={() => this.DeliveryType('delivery')}
                          borderWidth={1}
                          buttonInnerColor={'#e74c3c'}
                          buttonOuterColor={
                            this.state.value3Index === i &&
                            this.props.deliveryAddress.address != ''
                              ? '#2196f3'
                              : '#000'
                          }
                          buttonSize={10}
                          buttonOuterSize={20}
                          buttonStyle={{}}
                          buttonWrapStyle={{marginLeft: 10}}
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
                    ))}
                    {/* <Text style={[{}, styles.smailGrayText]}>{this.props.deliveryAddress.address ?? 'Dilivery to customer address'}</Text> */}

                    <Text style={[{}, styles.smailGrayText]}>
                      {this.state.delivery_type_option == 'delivery' &&
                      this.props.deliveryAddress.address != ''
                        ? this.props.deliveryAddress.address
                        : 'Delivery to customer address'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[{}, styles.paymentContainerView]}>
                <Text style={[{}, styles.OrderDetailHeadingRowText]}>
                  Payment Options
                </Text>
                <View
                  style={{
                    borderWidth: 0.25,
                    borderColor: '#E6E6E6',
                    width: width - 20,
                    alignSelf: 'center',
                    marginTop: 10,
                  }}></View>
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
                    onPress={value => {
                      this.setState({value3IndexPayment: value});
                    }}
                    // onPress={() => this.DeliveryType('delivery')}
                  />
                  {radio_props_payment.map((obj, i) => (
                    <RadioButton
                      style={{
                        backgroundColor: '#F5F5F5',
                        paddingVertical: 10,
                        marginBottom: 20,
                        paddingHorizontal: 10,
                      }}
                      labelHorizontal={true}
                      key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        style={{backgroundColor: 'red'}}
                        isSelected={this.state.value3IndexPayment === i}
                        onPress={(value, label) => this.paymentFun(obj)}
                        borderWidth={1}
                        buttonInnerColor={'#e74c3c'}
                        buttonOuterColor={
                          this.state.value3IndexPayment === i
                            ? '#2196f3'
                            : '#000'
                        }
                        buttonSize={10}
                        buttonOuterSize={20}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginLeft: 10}}
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
                  ))}
                </View>
                <View style={[{}, styles.paymentCheckboxView]}>
                  <CheckBox
                    style={{
                      width: width / 1.5,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      this.setState({
                        show_part_payment: !this.state.show_part_payment,
                      });
                    }}
                    isChecked={this.state.show_part_payment}
                    rightText={'Accept multiple part payment'}
                    rightTextStyle={{
                      color: '#4E4D4D',
                      fontSize: 13,
                      fontFamily: 'Open Sans',
                    }}
                    checkBoxColor={'#929497'}
                  />
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  width: width - 20,
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                  paddingBottom: 10,
                }}>
                <View
                  style={[{borderBottomWidth: 0.25}, styles.subTotleRowView]}>
                  <View style={[{}, styles.subTotleColumn1View]}>
                    <Text style={[{}, styles.subTotleColumn1Text]}>
                      Subtotal:
                    </Text>
                    {this.state.cart_detail.has_vat ? (
                      <Text style={[{}, styles.subTotleColumn1Text]}>
                        Tax({this.state.cart_detail.vat_percent}%)
                      </Text>
                    ) : null}

                    <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                  </View>
                  <View style={[{}, styles.subTotleColumn2View]}>
                    <Text style={[{}, styles.subTotleColumn2Text]}>
                      {this.props.currency.currency +
                        ' ' +
                        this.state.cart_detail.total_price ?? 0.0}
                    </Text>
                    {this.state.cart_detail.has_vat ? (
                      <Text style={[{}, styles.subTotleColumn2Text]}>
                        {this.props.currency.currency +
                          ' ' +
                          this.state.cart_detail.tax ?? 0.0}
                      </Text>
                    ) : null}
                    <Text style={[{}, styles.subTotleColumn2Text]}>
                      {this.props.currency.currency +
                        ' ' +
                        parseFloat(this.state.amount_payable + '').toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width - 50,
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center'}}
                    onPress={() =>
                      this.props.navigation.navigate('ApplyDiscount', {
                        total_price: this.state.cart_detail.total_price,
                        discount_amount: this.props.orderDiscountReducer
                          .discount_amount,
                      })
                    }>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../images/icon15.png')}
                        style={{height: 20, width: 20}}
                      />
                      <Text
                        style={{
                          color: '#929497',
                          fontSize: 10,
                          marginLeft: 5,
                          fontWeight: 'bold',
                        }}>
                        Apply Discount
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
                                    onPress={() => this.props.navigation.navigate('AddNote')}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../images/addNote.png')}
                                            style={{ height: 20, width: 15 }} />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Add Note</Text>
                                    </View>
                                </TouchableOpacity> */}
                </View>
                <TouchableOpacity
                  onPress={() => this.createOrderFun()}
                  style={[{}, styles.btnContinuueView]}>
                  <Text style={{color: '#FFFFFF'}}>
                    {this.state.pay_button_lable}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Modal visible={this.state.suppliereModal} transparent={true}>
            <View style={[{}, styles.mainContainer]}>
              <TouchableOpacity
                style={[{}, styles.backgroundTouch]}></TouchableOpacity>
              <View style={[{}, styles.contentView]}>
                <View style={[{}, styles.modalCancleRow]}>
                  <Text style={[{}, styles.modalCancleText]}>
                    SELECT SUPPLIERS
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.setState({suppliereModal: false})}
                    style={[{}, styles.modalCancleTouch]}>
                    <Icon name="times" size={20} color="#929497" />
                  </TouchableOpacity>
                </View>
                <View style={[{}, styles.searchRow]}>
                  <Icon name="search" size={20} color="#929497" />
                  <TextInput
                    label="Search supplier"
                    style={{backgroundColor: 'transparent'}}
                    width={width - 50}
                    alignSelf={'center'}
                    color={'#000'}
                    onChangeText={text =>
                      this.setState({search_supplier: text})
                    }
                    onSubmitEditing={() => this.searchSupplier()}
                  />
                </View>
                <ScrollView>
                  <FlatList
                    ItemSeparatorComponent={
                      Platform.OS !== 'android' &&
                      (({highlighted}) => (
                        <View
                          style={[
                            style.separator,
                            highlighted && {marginLeft: 0},
                          ]}
                        />
                      ))
                    }
                    data={this.state.supplierlist}
                    renderItem={({item, index, separators}) => (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => this.supplierModalFun(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View
                          style={[{marginTop: 10}, styles.modalListContainer]}>
                          <Image
                            style={{width: 30, height: 30}}
                            source={require('../images/bage.png')}
                          />
                          <View style={[{}, styles.modalListContentView]}>
                            <Text
                              style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                              {item.seller_name}
                            </Text>
                            <Text
                              style={[{color: '#929497'}, fontStyles.normal12]}>
                              {item.seller_id}
                            </Text>
                          </View>
                          <Icon
                            style={[{}, styles.modalListContentRightIcon]}
                            name="angle-right"
                            size={20}
                            color="#aaa"
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Modal
            onDismiss={() => {
              this.setState({
                ConfirmationPayInvoice: false,
              });
            }}
            visible={this.state.ConfirmationPayInvoice}>
            {console.log(this.props.user)}
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              <View style={{flexDirection: 'row', marginBottom: 30}}>
                <Text
                  style={{color: '#B1272C', fontWeight: 'bold', fontSize: 20}}>
                  Generate CICOD Order
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      padding: 30,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#B1272C',
                    }}
                    onPress={() => {
                      this.setState({ConfirmationPayInvoice: false});
                    }}>
                    <Text style={{color: '#B1272C', paddingHorizontal: 10}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#B1272C',
                      paddingVertical: 15,
                      padding: 40,
                      borderRadius: 100,
                    }}
                    onPress={() => this.createOrderFun()}>
                    <Text style={{color: '#fff'}}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Scaffold>
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
    supplier: state.supplierReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    emptyOrder: () => dispatch({type: CLEAR_ORDER}),
    cartReducer: value => dispatch({type: ADD_TO_PRODUCT, value: value}),
    removeFromCart: value => dispatch({type: REMOVE_FROM_CART, value: value}),
    removeProductFromCart: value =>
      dispatch({type: REMOVE_PRODUCT_FORM_CART, value: value}),
    setDeliveryAddress: value =>
      dispatch({type: SET_DELIVERY_ADDRESS, value: value}),
    setCustomer: value => dispatch({type: SET_CUSTOMER, value: value}),
    setSupplier: value => dispatch({type: SET_SUPPLIER, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
