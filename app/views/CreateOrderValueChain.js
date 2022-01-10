/* eslint-disable prettier/prettier */
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
  BackHandler,
} from 'react-native';
import {Text, TextInput, Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/CreateOrderCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from './Header';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import {connect} from 'react-redux';
import {
  SET_USER,
  SET_CUSTOMER,
  SET_SUPPLIER,
  LOGOUT_USER,
  ADD_TO_PRODUCT_CHAIN,
  REMOVE_FROM_CART_CHAIN,
  CLEAR_CART,
  REMOVE_PRODUCT_FORM_CART,
  CLEAR_ORDER,
  SET_DELIVERY_ADDRESS,
  REMOVE_DELIVERY_FEE_TO_COST,
  RESET,
  REMOVE_PRODUCT_FORM_CART_CHAIN,
  CLEAR_ORDER_CHAIN,
  RESET_DELIVERY,
} from '../redux/constants/index';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchBar from 'react-native-search-bar';
import NoCustomer from './Components/CreateOrder/NoCustomer';
import CustomerDetail from './Components/CreateOrder/CustomerDetail';
import NoOrderDetail from './Components/CreateOrder/NoOrderDetail';
import OrderDetail from './Components/CreateOrder/OrderDetail';
import _ from 'lodash';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class CreateOrderValueChain extends React.Component {
  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      value: 0,
      spinner: false,
      customer_name: this.props.customer.name,
      customer_email: this.props.customer.email,
      customer_phone: this.props.customer.phone,
      customer_country: this.props.customer.country,
      customer_state: this.props.customer.state,
      customer_lga: this.props.customer.lga,
      customer: {},
      cart_arr: this.props.cart.cart ?? [],
      limit_cart_arr: [],
      cart_detail: this.props.cart.cart_detail,
      payment_option: 0,
      delivery_type_option: "pickup",
      is_pickup: true,
      payment_mode: 'ONLINE',
      suppliereModal: false,
      search_supplier: '',
      supplierlist: [],
      supplier: {},
      address_backgound: '',
      deliveryType: '',
      value3IndexPayment:0,
      show_part_payment: false,
      isDatePickerVisible: false,
      part_payment_balance_due_date: new Date(),
      part_payment_percent: 0,
      part_payment_amount: 0,
      goto_payment_screen: '',
      payment_option_selected: '',
      pay_button_lable: 'Pay',
      valuePaymentKey:"PAY_ONLINE",
      amount_payable: 0,
      ConfirmationPayInvoice: false,
      closeApp: false,
    };
  }

  // componentWillMount() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // handleBackButtonClick() {
  //   if (!this.props.navigation.isFocused()) {
  //     return false;
  //   }
  //   if (this.state.cart_arr.length > 0) {
  //     this.setState({closeApp: true});
  //     return true;
  //   }
  // }

  // componentWillUnmount(){
  //     this.clearOrder()
  // }
  clearOrder() {
    console.log('unmount#@@$');
    this.setState({
      cart_detail: this.props.cart.cart_detail,
      amount_payable: 0,
    });
    this.props.emptyOrder();
    this.props.resetDelivery();
    this.props.resetDeliveryAddress();
  }
  async componentDidMount() {
    //console.log('heress#', this.props.cart.cart_detail);
    // this.props.emptyOrder();

      console.log("dsdd#$",this.props.supplier)
      // this.clearOrder()
    //getSellers
    this.setState({supplier: this.props.route.params.item});
    let url =
      Constants.seller_customer_details + '?id=' + this.props.supplier.id;

    this.getSellersCustomers(url);

    //console.log(' create order !!!! !!!!!!!!', this.props.user);"buyer_id": "10608"
    //  this.getSuppliersList(Constants.supplierlist);
  }

  getSellersCustomers(url) {
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    this.setState({spinner: true});
    // let order_id = this.props.route.params.data.id;
    //let url = Constants.seller_customer_details + '?id=' + this.props.route.params.item.seller_id
    // //console.log('---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
    //console.log('order url detail ', url);
    //console.log('order postData ', postData);
    console.log('fors', url);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        //console.log("Suppliers ##@@@@%^^&", responseJson)
        if (responseJson.success) {
          let data = responseJson.data;
          console.log('##########ddddddddddd', data);
          // this.setState({ spinner: false })
          // this.props.navigation.navigate('PaymentSuccess',{data:data})

          this.setState({
            customer: data,
            customer_email: data.customer_email,
            customer_phone: data.customer_phone,
            customer_name: data.customer_name,

            spinner: false,
          });
          // let payment_link = responseJson.data.payment_link
          // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
        } else {
          this.setState({spinner: false});
          let message = responseJson.message;
          //console.log('some error',responseJson)
        }
      })
      .catch(error => {
        //console.log("Api call error", error);
        // Alert.alert(error.message);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    //   console.log("dui@E",this.props.cart,"fuhs#",prevProps.cart)
    if (!_.isEqual(prevProps.supplier, this.props.supplier)) {
      let url =
        Constants.seller_customer_details + '?id=' + this.props.supplier.id;

      this.getSellersCustomers(url);
    }
    // console.log("yb#",prevState.cart_arr,"oune",this.state.cart_arr)
    // if (!_.isEqual(prevState.cart_arr,this.state.cart_arr)) {
    console.log('oladx');
    console.log(
      'ewee@##',
      prevProps.cart.cart_detail.total_price_with_tax,
      'dff',
      this.props.cart.cart_detail.total_price_with_tax,
    );
    if (
      !isNaN(prevProps.cart.cart_detail.total_price_with_tax) &&
      !isNaN(this.props.cart.cart_detail.total_price_with_tax) &&
      prevProps.cart.cart_detail.total_price_with_tax !=
        this.props.cart.cart_detail.total_price_with_tax
    ) {
      var amount_payable = 0; //this.props.currency.currency + " "
      if (this.props.orderDiscountReducer.discount_type == 'percentage') {
        amount_payable =
          this.props.cart.cart_detail.total_price_with_tax -
          (
            this.props.cart.cart_detail.total_price_with_tax *
            this.props.orderDiscountReducer.discount_amount *
            0.01
          ).toFixed(2);
      } else {
        //'value'

        amount_payable = (
          this.props.cart.cart_detail.total_price_with_tax -
          this.props.orderDiscountReducer.discount_amount
        ).toFixed(2);
      }

      this.setState({
        cart_detail: this.props.cart.cart_detail,
        amount_payable: amount_payable,
      });
    }
    //}
    console.log('ou#$', prevProps.cart.cart_detail.total_price_with_tax);

    console.log(
      'ewee@##',
      this.state.cart_detail.total_price_with_tax,
      'dff',
      this.props.cart.cart_detail.total_price_with_tax,
    );

    // if(prevProps.cartReducer)
  }

  // componentWillReceiveProps() {

  //     if(this.props.route.params.heading == 'supplier'){
  //         console.log("sellers detailsss",this.props.route.params.item)
  //         //getSellers
  //         this.setState({supplier:this.props.route.params.item});
  //         this.getSellersCustomers();
  //     }
  //     this.setState({
  //         customer_name: this.props.customer.name,
  //         customer_email: this.props.customer.email,
  //         customer_phone: this.props.customer.phone,
  //     })

  // }

  searchSupplier() {
    let url =
      Constants.supplierlist +
      '?filter[seller_name]=' +
      this.state.search_supplier;

    console.log('ui$#ui', url);
    this.getSuppliersList(url);
  }
  counterFun = async (action, index) => {
    //console.log("###$$$$@",action,index,this.state.cart_arr)
    let data = this.state.cart_arr;
    if (action == 'add') {
      let updated_purchased_quantity = data[index].purchased_quantity + 1;
      if (updated_purchased_quantity > data[index].quantity) {
        alert('Out of stock');
      } else {
        data[index].purchased_quantity = updated_purchased_quantity;
        let res = data;
        let cart_arr = res.map((x, key) => {
          return {id: x.id, quantity: x.purchased_quantity};
        });
        this.setState({
          cart_arr: data,
          limit_cart_arr: cart_arr,
        });
        await this.props.cartReducer(data[index]);

        //console.log('cart : ', this.props.cart);
      }
    } else {
      // let updated_purchased_quantity = data[index].purchased_quantity - 1;

      // if (data[index].purchased_quantity > 0) {
      //   await this.props.removeFromCart(data[index]);
      //   data[index].purchased_quantity = updated_purchased_quantity;

      let updated_purchased_quantity =0;
     

      if (data[index].purchased_quantity > 0) {

        if (data[index].minimum_order >0 &&data[index].minimum_order>= data[index].purchased_quantity) {
          updated_purchased_quantity=data[index].purchased_quantity-data[index].minimum_order;
        }else{
           updated_purchased_quantity = data[index].purchased_quantity - 1;
        }


        data[index].purchased_quantity = updated_purchased_quantity;

        await this.props.removeFromCart(data[index]);

        this.setState({
          data: data,
        });
        //console.log(' remove from cart cart : ', this.props.cart);
      }
    }

    // let cart_product = this.state.product_cart;
  };

  DeliveryType(type) {
   // if (this.props.route.params.heading == 'supplier') {
      if (this.state.customer_name == '') {
        alert('NO CUSTOMER FOUND');
      }
    // } else {
    //   if (this.props.customer.name == '') {
    //     alert('ADD CUSTOMER FIRST');
    //     return;
    //   }
    // }

    if (
      !this.state.cart_detail.total_price ||
      this.state.cart_detail.total_price == 0
    ) {
      Alert.alert('Info', 'Please Select Products.');
      return;
    }

    this.setState({delivery_type_option: type});
    // this.props.setDeliveryAddress({
    //     type: type,
    // })
    //console.log('dilivery type ------', type)
    // this.setState({ is_pickup: !this.state.is_pickup, })
    if (type === 'delivery') {
      this.setState({deliveryType: 'delivery'});
    } else if (type === 'pickup') {
      this.setState({deliveryType: 'pickup'});
    } //return;
    if (type == 'delivery') {
      this.props.navigation.navigate('BuyDiliveryAddressValueChain', {
        item: this.props.route.params.item,
        type,
        address: this.state.customer.address,
        address_id: this.props.deliveryAddress.selected_address_id,
      });
      // } else {
      //     //console.log("RRRRRRRRRR",this.props.deliveryAddress.selected_address_id)

      //     this.props.navigation.navigate('DiliveryAddress', { type, address: this.props.customer.address,address_id:this.props.deliveryAddress.selected_address_id})
      // }
    } else {
      // pickup
      this.props.setDeliveryAddress({
        address: '',
        type: 'pickup',
      });
      this.props.removeDeliveryCost();
      this.props.resetDelivery();
      this.props.resetDeliveryAddress();
    }
  }

  paymentFun(item) {
    let mode = '';
    let pay_button_lable = 'Pay';
    let goto_payment_screen = '';
    if (item.key == 'PAY_ONLINE') {
      mode = 'ONLINE';
      goto_payment_screen = 'MakePayment';
    }  else if (item.key == "PAY_ACCOUNT") {
      mode = 'ACCOUNT';
      goto_payment_screen = '';
    } else if (item.key == "PAY_POS") {
      mode = 'POS';
      goto_payment_screen = '';
    } else if (item.key == "PAY_USSD") {
      mode = 'USSD';
      goto_payment_screen = '';
    } else if (item.key == "PAY_CASH") {
      mode = 'CASH';
      goto_payment_screen = '';
    } else if (item.key == "SEND_INVOICE") {
      mode = 'ONLINE';
      goto_payment_screen = '';
      pay_button_lable = 'Generate CICOD Order ID';
    }

    this.setState({
      value3IndexPayment: item.value,
      payment_mode: mode,
      valuePaymentKey:item.key,
      goto_payment_screen: goto_payment_screen,
      payment_option_selected: item.label,
      pay_button_lable: pay_button_lable,
    });
  }
  removeProduct = id => {
    this.props.removeProductFromCart(id);
  };

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


    console.log("this.state.amount_payable",this.state.amount_payable)
//check if minimum spent is greater than total order amount
    if (this.props.supplier.detail && this.props.supplier.detail.minimum_spend && this.props.supplier.detail.minimum_spend>0 && this.props.supplier.detail.minimum_spend>this.state.amount_payable) {
      Alert.alert("Info","Order cannot be less than amount.");
      return;
    }

    await this.setState({spinner: true});

    if (
      this.state.payment_option_selected == 'SEND_INVOICE' &&
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
    if (this.state.delivery_type_option == 'pickup') {
      dilevery_type = 'Pickup';
    } else {
      dilevery_type = 'Delivery';
    }
    let cart = this.set_limit_cart_arr();
    // if(cart.length<1){
    //     alert('Add products to cart')
    // }
    //console.log('dilevery_type', dilevery_type);
    //console.log('this.props.deliveryAddress.type this.props.deliveryAddress.type', this.props.deliveryAddress);
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

    console.log('Limit cart @@###$$$$', cart);

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
      //lga_id: this.state.customer_lga,
      note: this.props.notes.notes ?? '',
      discount_amount: discounted_price,
      merchant_id: this.props.route.params.item.buyer_id,
      // discount_percent: discounted_percentage,
      //accept_multiple_part_payment: this.state.show_part_payment,
      // part_payment_balance_due_date: this.state.part_payment_balance_due_date,
      // part_payment_percent: this.state.part_payment_percent,
      // part_payment_amount: this.state.part_payment_amount,
    };

    // this.setState({
    //     amount_payable: amount_payable,
    //     ConfirmationPayInvoice: false
    // })
  //  if (this.state.goto_payment_screen == '') {
      //show_part_payment
      //console.log('step  1 ')
      // let params={
      //   bodyOrder,
      //   heading: 'supplier',
      //   item: this.state.supplier,
      //   payment_mode: this.state.payment_mode,
      //   amount_payable: this.state.amount_payable,
      // }
      await this.create_order_id(Constants.orderslist, bodyOrder);
    // } else {
    //   await this.setState({spinner: false});
    //   this.props.route.params.heading == 'supplier'
    //     ? this.props.navigation.navigate(this.state.goto_payment_screen, {
    //         bodyOrder: bodyOrder,
    //         heading: 'supplier',
    //         item: this.state.supplier,
    //         payment_mode: this.state.payment_mode,
    //         amount_payable: this.state.amount_payable,
    //       })
    //     : this.props.navigation.navigate(this.state.goto_payment_screen, {
    //         bodyOrder: bodyOrder,
    //         payment_mode: this.state.payment_mode,
    //         amount_payable: this.state.amount_payable,
    //       });
      //console.log('step  2 ')
     // return;
   // }
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
    // //console.log('---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
    //console.log('order url detail ', url);
    //console.log('order postData ', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        //console.log("get_order_detail order response response Json responseJson responseJson!!!!!!!!!!!", responseJson)
        if (responseJson.status.toUpperCase() === 'SUCCESS') {
          let data = responseJson.data;
          //console.log("##########ddddddddddd",data)

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
          //console.log('some error',responseJson)
        }
      })
      .catch(error => {
        //console.log("Api call error", error);
        // Alert.alert(error.message);
      });
  }

  create_order_id(url, bodyOrder) {
    console.log('create_order_id', bodyOrder);
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'SSO-Authorization': this.props.user.access_token,
        'Tenant-ID': this.props.route.params.item.seller_name.toLowerCase(),
        // 'Authorization': this.props.user.access_token
      },
      body: JSON.stringify(bodyOrder),
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        console.log("ress$#",responseJson)
        if (responseJson.status === 'success') {
          // alert(responseJson.message)
          // this.props.clearCart();
          // this.clearOrder();
          console.log('here#$d', responseJson.data);
          console.log('ropsx$#', this.props.route.params.item);
          let payment_link = responseJson.data.payment_link;
        


          const params = {
            data: responseJson.data,
            heading: 'supplier',
            seller_id: this.props.route.params.item.seller_id,
            amount_payable: this.state.amount_payable,
            payment_link,
            payment_mode: this.state.payment_mode,
            order_id: responseJson.data.id,
          };
          if (this.state.valuePaymentKey == 'PAY_ACCOUNT') {
            // alert(responseJson.message)
            this.props.navigation.navigate('PaymentSuccess', {
              heading: 'supplier',
              order_id: responseJson.data.cicod_order_id,
              seller_id: this.props.route.params.item.seller_id,
            });
            //console.log("~~~~~~~~~~~create_order_id payment_link!", responseJson.data)
            //  this.get_order_detail(responseJson.data.id);

            // this.props.navigation.navigate('PaymentCash', { payment_link: payment_link,data:responseJson });
            // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link,data:responseJson.data });
          }
          else if (this.state.valuePaymentKey == 'PAY_ONLINE') { 
            this.props.navigation.navigate('PaymentWeb',params);
          }
          else if (this.state.valuePaymentKey == 'SEND_INVOICE') {
            console.log('oprf$3');
            this.props.navigation.navigate('OrderDetailValueChain', {
              order_id: responseJson.data.cicod_order_id,
              seller_Id: this.props.route.params.item.seller_id,
              heading: 'SUPPLIERS',
            });
          }
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          console.log("fdfd4$",responseJson);
          let message = responseJson.message;
          alert(message);
        }
      })
      .catch(error => {
        //console.log("Api call error", error);
        // Alert.alert(error.message);
      });
  }

  getSuppliersList(url) {
    //console.log('get Suppliers List');
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
        //console.log('suppliers responseJson @@@@@@@@@@@@@@@@@@@', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.success === true) {
          let supplierlist = [];
          console.log('pop#4id', this.props.supplier.id);
          console.log('correct#$', responseJson.data);

          // for (let index = 0; index < responseJson.data; index++) {
          //    if (responseJson.data[index].seller_id==this.props.supplier.id) {
          //        console.log("roieddd")
          //        continue
          //    }
          //    supplierlist.push(responseJson.data[index])

          // }
          this.setState({
            supplierlist: responseJson.data,
            suppliereModal: true,
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
    // this.props.navigation.goBack();
  }

  supplierModalFun(item) {
   
    this.props.emptyOrder();
    this.props.resetDelivery();
    this.props.resetDeliveryAddress();

    this.setState({
      suppliereModal: false,
      cart_detail: this.props.cart.cart_detail,
      amount_payable: 0,
    });
    this.props.setSupplier({
      detail:item,
      id: item.seller_id,
      name: item.seller_name,
    });
    // this.props.navigation.navigate('BuyersView', { items: item, heading: 'SUPPLIERS' })
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
    //console.log(' supplierlist @@@@@@@@@@@@@@@ supplierlist  !!!!!!!!!!!!!!', this.props.supplier);
    var radio_props_dilvery = [{label: 'Delivery', value: 0}];
    var radio_props_pickup = [{label: 'Pickup', value: 1}];
    var radio_props_payment =
      // this.props.route.params.heading == 'supplier'
      //   ?
         [
          {label: 'Pay Online', value: 0,key:"PAY_ONLINE"},
            {label: 'Pay Account', value: 1,key:"PAY_ACCOUNT"},
            {label: 'Send Invoice', value: 2,key:"SEND_INVOICE"},
            {label: 'Pay by POS', value: 2,key:"PAY_POS"},
            //{ label: 'Part Payment', value: 3 },
          ]
        // : [
        //     {label: 'Pay Now', value: 0},
        //     {label: 'Pay Account', value: 1},
        //     {label: 'Pay Invoice', value: 2},
        //     {label: 'Part Payment', value: 3},
        //   ];
    console.log(
      'amount Payable@@@',
      this.props.orderDiscountReducer.discount_type,
    );

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
                    onPress={() => this.clearOrder()}>
                    <Text style={[{}, styles.backHeadingCloseText]}>
                      Clear Order
                    </Text>
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
                    onPress={() => {
                      this.getSuppliersList(Constants.supplierlist);
                      // this.setState({ suppliereModal: true });
                    }}>
                    <Text
                      style={[{}, styles.customerTitleRowchangesupplierText]}>
                      Change Supplier
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View
                style={[styles.customerContainerView, {paddingVertical: 10}]}>
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

                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: width - 20,
                    alignSelf: 'center',
                    marginVertical: 5,
                    borderColor: '#E6E6E6',
                  }}></View>

                {this.props.route.params.heading == 'supplier' && (
                  <CustomerDetail
                    isSupplier={true}
                    customer={this.state.customer}
                    minimum_spend={ this.props.supplier.detail && this.props.supplier.detail.minimum_spend}
                    supplierCurrency={this.props.supplier.detail && this.props.supplier.detail.seller_currency &&this.props.supplier.detail.seller_currency.symbol}
                    name={this.state.customer_name}
                    email={this.state.customer_email}
                    phone={this.state.customer_phone}
                  />
                )}
                {this.props.route.params.heading != 'supplier' &&
                  (this.props.customer.name == '' ||
                  this.props.customer.name == undefined ? (
                    <NoCustomer />
                  ) : (
                    <CustomerDetail
                      currency={this.props.currency.currency}
                      name={this.props.customer.name}
                      email={this.props.customer.email}
                      phone={this.props.customer.phone}
                    />
                  ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AddProductValueChain', {
                    heading: 'supplier',
                    item: this.state.supplier,
                  })
                }>
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
                    Product Detail
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
                    Clear Products
                  </Text>
                </TouchableOpacity>
                {this.state.cart_arr.length == 0 ? (
                  <NoOrderDetail />
                ) : (
                  <OrderDetail
                    currency={this.props.cart.currency}
                    carts={this.state.cart_arr}
                    counterFun={this.counterFun}
                    removeProduct={this.removeProduct}
                  />
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
                {this.props.route.params.screen_name != 'buy' && (
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
                )}
              </View>

              {this.state.cart_arr.length>0 &&
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

                    {this.props.delivery.country_id != 0 ? (
                      <Text style={[{}, styles.subTotleColumn1Text]}>
                        Delivery Fee:
                      </Text>
                    ) : null}
                    <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                  </View>
                  <View style={[{}, styles.subTotleColumn2View]}>
                    <Text style={[{}, styles.subTotleColumn2Text]}>
                      {this.props.cart.currency}{' '}
                      {parseFloat(
                        this.state.cart_detail.total_price ?? 0.0,
                      ).toFixed(2)}
                    </Text>
                    {this.state.cart_detail.has_vat ? (
                      <Text style={[{}, styles.subTotleColumn2Text]}>
                        {this.props.cart.currency +
                          ' ' +
                          this.state.cart_detail.tax.toFixed(2) ?? 0.0}
                      </Text>
                    ) : null}

                    {this.props.delivery.country_id != 0 ? (
                      <Text style={[{}, styles.subTotleColumn2Text]}>
                        {' '}
                        {this.props.cart.currency}{' '}
                        {this.props.delivery.delivery_fee ?? 0.0}
                      </Text>
                    ) : null}
                    <Text style={[{}, styles.subTotleColumn2Text]}>
                      {this.props.cart.currency +
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
                    {/* <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../images/icon15.png')}
                                            style={{ height: 20, width: 20 }} />
                                        <Text style={{ color: '#929497', fontSize: 10, marginLeft: 5, fontWeight: 'bold' }}>Apply Discount</Text>
                                    </View> */}
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
              }
            </View>
          </ScrollView>
          <Modal
            visible={this.state.suppliereModal}
            onRequestClose={() => this.setState({suppliereModal: false})}
            onDismiss={() => this.setState({suppliereModal: false})}
            transparent={true}>
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
                            styles.separator,
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
          <Modal visible={this.state.ConfirmationPayInvoice}>
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

          <Modal
            visible={this.state.closeApp}
            onDismiss={() => this.setState({closeApp: false})}>
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
                  style={{color: '#2d3093', fontWeight: 'bold', fontSize: 20}}>
                  Want to exit Order?
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
                      borderColor: '#2d3093',
                    }}
                    onPress={() => {
                      this.setState({closeApp: false});
                    }}>
                    <Text style={{color: '#2d3093', paddingHorizontal: 10}}>
                      No
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
                      backgroundColor: '#2d3093',
                      paddingVertical: 15,
                      padding: 40,
                      borderRadius: 100,
                    }}
                    onPress={() => this.closeOrder()}>
                    <Text style={{color: '#fff'}}>Yes</Text>
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
    cart: state.cartChainReducer,
    notes: state.orderNotesReducer,
    deliveryAddress: state.deliveryAddressReducer,
    orderDiscountReducer: state.orderDiscountReducer,
    supplier: state.supplierReducer,
    currency: state.currencyReducer,
    delivery: state.deliveryAddressReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    emptyOrder: () => dispatch({type: CLEAR_ORDER_CHAIN}),
    cartReducer: value => dispatch({type: ADD_TO_PRODUCT_CHAIN, value: value}),
    removeFromCart: value =>
      dispatch({type: REMOVE_FROM_CART_CHAIN, value: value}),
    removeProductFromCart: value =>
      dispatch({type: REMOVE_PRODUCT_FORM_CART_CHAIN, value: value}),
    setDeliveryAddress: value =>
      dispatch({type: SET_DELIVERY_ADDRESS, value: value}),
    setCustomer: value =>
      dispatch({type: SET_CUSTOMER, SET_SUPPLIER, value: value}),
    setSupplier: value => dispatch({type: SET_SUPPLIER, value: value}),
    clearCart: () => dispatch({type: CLEAR_CART}),
    removeDeliveryCost: () => dispatch({type: REMOVE_DELIVERY_FEE_TO_COST}),
    resetDelivery: () => dispatch({type: RESET_DELIVERY}),
    resetDeliveryAddress: () => dispatch({type: RESET}),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateOrderValueChain);
