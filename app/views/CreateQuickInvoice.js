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
} from 'react-native';
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
import {Picker} from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';

import SearchBar from 'react-native-search-bar';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class CreateQuickInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      spinner: false,
      isEdit: false,
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
      noVat: false,
      tax_amount: 0,
      tax_percent: 0,
      deliveryType: '',
      show_part_payment: false,
      isDatePickerVisible: false,

      amount_payable: 0,
      isShowProductModal: false,
      sub_total: 0,
      date: '',
      date_created_timestamp: 'Today',
      products: [],
      product_name: '',
      quantity: 0,
      price: 0,
      modal_total: 0,
      total_amount: 0.0,
      discountType: 'Percentage',
      discount: 0,
      discount_amount: 0.0,
    };
  }
  update_cart_state() {
    return;
   
  }
  clearOrder() {
    this.props.emptyOrder();
    this.update_cart_state();
  }
  async componentDidMount() {
    console.log(' create order !!!! !!!!!!!!', this.props.user);
  }

  componentWillReceiveProps() {
    this.setState({
      customer_name: this.props.customer.name,
      customer_email: this.props.customer.email,
      customer_phone: this.props.customer.phone,
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

  sendQuickInvoice(send) {
    if (this.props.customer.name == '') {
      this.setState({error_title: 'Please Add Customer', isShowError: true});
      return;
    }

    if (this.state.products.length < 1) {
      this.setState({error_title: 'Please Add Products', isShowError: true});
      return;
    }

    if (this.state.date_created_timestamp == 'Today') {
      this.setState({error_title: 'Please Choose Date', isShowError: true});
      return;
    }

    let bodyData = {
      customer_name: this.props.customer.name,
      customer_email: this.props.customer.email,
      customer_phone: this.props.customer.phone,
      payment_due_date: this.state.date_created_timestamp,
      products: this.state.products,
      discount_percent:
        this.state.discountType == 'Percentage' ? this.state.discount : null,
      discount_fixed:
        this.state.discountType != 'Percentage' ? this.state.discount : null,

      amount: this.state.total_amount,
      remark: this.props.notes.notes,
      send_now: send,
      tax: this.state.tax_percent,
    };

    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify(bodyData),
    };
    this.setState({spinner: true});
    fetch(Constants.quickInvoice, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        console.log('response##$$$', responseJson);
        if (responseJson.status === 'success') {
          // alert(responseJson.message)
          let data = responseJson.data; //Pay Account,ACCOUNT

          this.setState({
            products: [],
            discount_percent: 0,
            discountType: 'Percentage',
            tax: 0,
            sub_total: 0.0,

            total_amount: 0.0,
            discount: 0,
          });
          if (send == 1) {
            this.setState({
              error_title: 'Invoice Sent Successfully',
              isShowError: true,
              isInvoiceSuccess: true,
            });

            // Alert.alert("Info ","Invoice Sent Successfully")
          } else {
            this.setState({
              error_title: 'Invoice Saved Successfully',
              isShowError: true,
              isInvoiceSuccess: true,
            });

            // Alert.alert("Info ","Invoice Saved Successfully")
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

  setDate(date) {
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    let newdate = year + '-' + month + '-' + day;

    //let filters = this.state.filters;

    console.log('hereee', newdate);

    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      // filters: filters,
      date: newdate,
      date_created_timestamp: newdate,
    });
  }

  handleChangeQuantity = e => {
    console.log('Riuo3#@@', e, 'dsd$#', this.state.price);
    alert(e.target.text);
  };

  datePickerFun = () => {
    this.setState({
      apply_filter: false,
      isDatePickerVisible: !this.state.isDatePickerVisible,
    });
  };

  productStateCompute = array_products => {
    let sub_total = 0;
    if (array_products.length > 0) {
      for (let index = 0; index < array_products.length; index++) {
        const product = array_products[index];
        console.log('#EEpr', product);
        sub_total +=
          parseInt(product.quantity) * parseFloat(product.unit_price);
      }
      //calculate total

      console.log('total$##', sub_total);
      let total_amount = sub_total;
      let discount_amount = 0.0;
      if (this.state.discount > 0) {
        if (this.state.discountType == 'Percentage') {
          discount_amount = (parseInt(this.state.discount) / 100) * sub_total;
          total_amount = sub_total - discount_amount;
        } else {
          total_amount = sub_total - parseInt(this.state.discount);
          discount_amount = this.state.discount;
          // total_amount=this.state.sub_total-discount
        }
      }

      this.setState({
        discount_amount,
        products: array_products,
        isShowProductModal: false,
        product_name: '',
        quantity: 0,
        price: 0,
        modal_total: 0,
        sub_total: sub_total,
        total_amount,
        isEdit: false,
      });
    } else {
      this.setState({
        tax_amount: 0,
        discount_amount: 0,
        products: array_products,
        isShowProductModal: false,
        product_name: '',
        quantity: 0,
        price: 0,
        modal_total: 0,
        sub_total: 0,
        total_amount: 0,
        isEdit: false,
      });
    }
  };

  editProductToArray = () => {
    let products = this.state.products;
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      if (this.state.index == element.index) {
        element.name = this.state.product_name;
        element.unit_price = this.state.price;
        element.quantity = this.state.quantity;
        break;
      }
    }

    this.productStateCompute(products);
  };

  pushProductToArray = () => {
    const {product_name, price, quantity, modal_total} = this.state;
    if (product_name.trim() == '') {
      this.setState({error_title: 'Enter Product Name', isShowError: true});
      return;
    }
    if (quantity == 0) {
      this.setState({error_title: 'Enter Quantity', isShowError: true});
      return;
    }
    if (price == 0) {
      this.setState({error_title: 'Enter Product Price', isShowError: true});
      return;
    }

    const array_products = this.state.products;

    array_products.push({
      name: product_name,
      quantity,
      unit_price: price,
      index: Date.now(),
    });
    //        let sub_total=0;
    //        for (let index = 0; index < array_products.length; index++) {
    //            const product = array_products[index];
    //            console.log("#EEpr",product)
    //            sub_total+=(parseInt(product.quantity)*parseFloat(product.unit_price))
    //        }
    //        //calculate total

    //        console.log("total$##",sub_total)
    //        let total_amount=sub_total;
    //        if(this.state.discount>0){
    //        if (this.state.discountType=="Percentage") {
    //         let discount=(parseInt(this.state.discount)/100)*sub_total;
    //         total_amount=sub_total-discount
    //     } else {
    //         total_amount=sub_total-parseInt(this.state.discount);
    //         // total_amount=this.state.sub_total-discount
    //     }
    // }

    this.productStateCompute(array_products);
  };

  handleChangeDiscount = numb => {
    let total_amount = 0;
    let discount = 0;
    if (isNaN(numb)|| parseInt(numb)<1) {
// this.setState({discount:0})
      return;
    }
    numb=numb==""?0:numb
    if (numb == '') {
      total_amount =
        this.state.total_amount + parseInt(this.state.discount_amount);

      this.setState({discount: 0, total_amount, discount_amount: 0});
    } else {
      if (this.state.discountType == 'Percentage') {
        discount = (parseFloat(numb) / 100) * this.state.sub_total;
        total_amount =
          this.state.sub_total + parseFloat(this.state.tax_amount) - discount;
      } else {
        total_amount =
          this.state.sub_total + this.state.tax_amount - parseFloat(numb);
        discount = numb;
        // total_amount=this.state.sub_total-discount
      }
      this.setState({discount: numb, total_amount, discount_amount: discount});
    }
  };

  handleChangeTax = tax_percent => {
    let total_amount = 0;
    let tax_amount = 0;
    let tax_loc = 0;
    if (isNaN(tax_percent)|| parseInt(tax_percent)<1) {
      // this.setState({discount:0})
            return;
          }

    // if (tax_percent < 1) {
    //   return;
    // }
    if (tax_percent == '') {
      tax_loc = this.state.tax_percent;
      console.log(
        'uyu#@',
        this.state.discount_amount,
        'kk',
        this.state.tax_amount,
      );
      // tax_amount=(parseInt(tax_loc)/100)*this.state.total_amount;
      total_amount =
        this.state.total_amount - parseFloat(this.state.tax_amount);
      this.setState({total_amount, tax_amount: 0, tax_percent: 0});
    } else {
      tax_loc = tax_percent;
      tax_amount = (parseFloat(tax_loc) / 100) * this.state.sub_total;
      total_amount =
        this.state.sub_total +
        parseFloat(tax_amount) -
        this.state.discount_amount;
      this.setState({total_amount, tax_amount, tax_percent: tax_loc});
    }
  };

  removeProductFromCart(item, index) {
    console.log('he#$', item, index);

    let arr_products = this.state.products;
    const newArr = arr_products.filter(product => {
      console.log('eee', product);
      return product.name != item.name;
    });

    console.log('newProds', newArr);
    this.productStateCompute(newArr);
  }

  editProduct = item => {
    console.log('iopn#$', item);
    const modal_total = item.quantity * item.unit_price;
    this.setState({
      index: item.index,
      isEdit: true,
      isShowProductModal: true,
      product_name: item.name,
      quantity: item.quantity,
      price: item.unit_price,
      modal_total,
    });
  };
  render() {
    console.log('prodcuts#$$', this.state.products);

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
            show={this.state.isShowError}
            showProgress={false}
            title={this.state.error_title}
            // message={this.state.error_title}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="Close"
            confirmText="Ok"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              if (this.state.isInvoiceSuccess) {
                let user_data = {};
                this.props.setCustomer(user_data);
                this.setState({isShowError: false}, () =>
                  this.props.navigation.replace('QuickInvoice'),
                );
              } else {
                this.setState({isShowError: false});
              }
            }}
          />
          <ScrollView>
            <View style={{paddingBottom: 20}}>
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Order')}
                onPress={() => this.props.navigation.goBack()}>
                <View style={[{}, styles.backHeaderRowView]}>
                  <Icon name="arrow-left" size={25} color="#929497" />

                  <View style={[{}, styles.backHeadingView]}>
                    <Text style={[{}, styles.backHeadingText]}>
                      CREATE INVOICE
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            <View style={{paddingHorizontal:20}}>
            <Text style={{fontSize:11}}>
              This is an accounting feature for products/services that are not setup in your product list.
               Note: This feature does not deplete quantity from your inventory, but registers the sale in accounting.
              </Text>

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
                  onPress={() =>
                    this.props.navigation.navigate('AddCustomerInvoice')
                  }>
                  <Icon name="plus-circle" size={20} color={'#fff'} />
                  <Text style={[{}, styles.customerContaineraddBtnText]}>
                    {this.props.customer.name == '' ||
                    this.props.customer.name == undefined
                      ? 'Add'
                      : 'Change'}
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
                this.props.customer.name == undefined ? (
                  <View
                    style={[
                      styles.customerContainerView,
                      {flexDirection: 'row'},
                    ]}>
                    <Icon name="user-circle" size={20} color="#D8D8D8" />
                    <Text
                      style={[
                        {marginLeft: 10},
                        styles.customerContainerheading,
                      ]}>
                      No Customer added
                    </Text>
                  </View>
                ) : (
                  <View style={[{}, styles.userDEtailCOntainer]}>
                    <View style={[{}, styles.userDEtailCOntainerIconView]}>
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../images/userinfo.png')}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text style={[{}, styles.userDEtailCOntainerText]}>
                          {this.props.customer.name}
                        </Text>
                        <Text
                          style={[styles.usetDetailInfoText, {marginLeft: 10}]}>
                          {this.props.customer.email}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 0,
                  marginBottom: 10,
                  padding: 10,
                }}>
                <Text
                  style={{color: '#929497', fontWeight: 'bold', fontSize: 15}}>
                  Select Due Date
                </Text>

                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={[
                      {
                        flexDirection: 'row',
                        maxWidth: width / 2,
                        height: 40,
                        borderRadius: 5,
                        marginTop: 5,
                        marginLeft: 51,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                      },
                    ]}
                    onPress={() => this.datePickerFun()}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        marginLeft: 10,
                      }}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/calenderIcon.png')}
                      />
                      <Text
                        style={[
                          {color: '#909090', marginLeft: 5},
                          fontStyles.normal12,
                        ]}>
                        {this.state.date_created_timestamp}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', right: 20, bottom: 15}}>
                      <Icon
                        size={20}
                        name="caret-down"
                        color={'#707070'}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  date={new Date()}
                  onConfirm={date => this.setDate(date)}
                  onCancel={this.hideDatePicker}
                />
              </View>

              <View style={[styles.OrderDetailContainer]}>
                <View
                  style={[
                    styles.OrderDetailHeadingRow,
                    {
                      padding: 10,
                      borderBottomColor: '#E6E6E6',
                      borderBottomWidth: 0.25,
                      paddingBottom: 10,
                    },
                  ]}>
                  <Text style={[{}, styles.OrderDetailHeadingRowText]}>
                    Product/ Service
                  </Text>
                  {this.state.products.length != 0 ? (
                    <Text style={[{}, styles.OrderDetailNotificationText]}>
                      {this.state.products.length ?? 0}
                    </Text>
                  ) : null}
                </View>

                {this.state.products.length != 0 && (
                  <View style={{flex: 1, marginTop: 15, padding: 10}}>
                    <FlatList
                      data={this.state.products}
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
                      renderItem={({item, index, separators}) => (
                        <View
                          style={[
                            {
                              width: '100%',
                              alignItems: 'flex-start',
                              flexDirection: 'column',
                              flex: 1,
                              borderBottomColor: '#E6E6E6',
                              borderBottomWidth: 0.25,
                              paddingBottom: 10,
                              marginTop: 10,
                            },
                          ]}>
                          <View
                            style={[
                              styles.OrderDetailDataCOntainerRow,
                              {
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                width: width - 40,
                              },
                            ]}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  this.removeProductFromCart(item, index)
                                }>
                                <Icon name="close" size={20} color="#B1272C" />
                              </TouchableOpacity>
                              <Text
                                style={{
                                  color: '#4E4D4D',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  marginLeft: 10,
                                }}>
                                {item.name}
                              </Text>
                            </View>

                            <Text
                              style={{
                                color: '#4E4D4D',
                                fontSize: 14,
                                fontWeight: 'bold',
                              }}>
                              {this.props.currency.currency}
                              {item.unit_price * item.quantity}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.OrderDetailDataCOntainerRow,
                              {
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                width: width - 40,
                                marginTop: 10,
                              },
                            ]}>
                            <Text style={{color: '#929497', fontSize: 14}}>
                              {item.quantity} x {this.props.currency.currency}{' '}
                              {item.unit_price}
                            </Text>

                            <TouchableOpacity
                              onPress={() => this.editProduct(item)}
                              style={{padding: 10}}>
                              <Icon
                                name="long-arrow-right"
                                size={20}
                                color="#929497"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                )}

                <View
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => this.setState({isShowProductModal: true})}>
                    <View
                      style={[
                        styles.customerContaineraddProductView,
                        {alignSelf: 'center', marginLeft: 60},
                      ]}>
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../images/products/circlePlus.png')}
                      />
                      <Text
                        style={[{}, styles.customerContaineraddProductText]}>
                        Add Product
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {this.state.products.length > 0 && (
                <>
                  <View style={[styles.OrderDetailContainer, {marginTop: 12}]}>
                    <View style={[styles.OrderDetailHeadingRow, {padding: 10}]}>
                      <Text style={[{}, styles.OrderDetailHeadingRowText]}>
                        Discount
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 0.25,
                        borderColor: '#E6E6E6',
                        width: width - 20,
                        alignSelf: 'center',
                        marginTop: 10,
                      }}></View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 150,
                          marginRight: 10,
                          marginTop: 1,
                          borderBottomColor: '#E6E6E6',
                          borderBottomWidth: 1,
                        }}>
                        <Picker
                          selectedValue={this.state.discountType}
                          onValueChange={(itemValue, itemLabel, itemIndex) => {
                            let total_amount = 0;
                            let discount = 0;

                            if (this.state.discount > 0) {
                              if (itemValue == 'Percentage') {
                                discount =
                                  (parseInt(this.state.discount) / 100) *
                                  this.state.sub_total;
                                total_amount =
                                  this.state.sub_total +
                                  this.state.tax_amount -
                                  discount;
                              } else {
                                total_amount =
                                  this.state.sub_total +
                                  this.state.tax_amount -
                                  parseInt(this.state.discount);
                                discount = this.state.discount;
                                // total_amount=this.state.sub_total-discount
                              }

                              this.setState({
                                discountType: itemValue,
                                total_amount,
                                discount_amount: discount,
                              });
                            }
                          }}>
                          <Picker.Item
                            style={{fontSize: 13}}
                            color="#929497"
                            label="Percentage"
                            value="Percentage"
                          />
                          <Picker.Item
                            style={{fontSize: 13}}
                            color="#929497"
                            label="Fixed"
                            value="Fixed"
                          />
                        </Picker>
                      </View>
                      <View />

                      <TextInput
                        value={this.state.discount}
                        onChangeText={text => this.handleChangeDiscount(text)}
                        keyboardType="numeric"
                        style={{
                          height: 52,
                          marginLeft: 10,
                          color: '#929497',
                          fontSize: 13,
                          backgroundColor: '#fff',
                          borderBottomColor: '#E6E6E6',
                        }}
                        placeholder="Enter discount"
                      />
                    </View>
                  </View>

                  <View style={[styles.OrderDetailContainer, {marginTop: 12}]}>
                    <View style={[styles.OrderDetailHeadingRow, {padding: 10}]}>
                      <Text style={[{}, styles.OrderDetailHeadingRowText]}>
                        Tax(%)
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 0.25,
                        borderColor: '#E6E6E6',
                        width: width - 20,
                        alignSelf: 'center',
                        marginTop: 10,
                      }}></View>

                    <TextInput
                      value={this.state.tax_percent}
                      onChangeText={text => this.handleChangeTax(text)}
                      keyboardType="numeric"
                      style={{
                        alignSelf: 'flex-start',
                        width: width - 70,
                        height: 52,
                        marginLeft: 10,
                        color: '#929497',
                        fontSize: 13,
                        backgroundColor: '#fff',
                        borderBottomColor: '#E6E6E6',
                      }}
                      placeholder="Enter Tax "
                    />
                  </View>
                </>
              )}

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
                    <Text
                      style={[styles.subTotleColumn1Text, {marginBottom: 12}]}>
                      Subtotal:
                    </Text>

                    <Text
                      style={[
                        {},
                        styles.subTotleColumn1Text,
                        {marginBottom: 12},
                      ]}>
                      VAT
                    </Text>
                    <Text
                      style={[
                        {},
                        styles.subTotleColumn1Text,
                        {marginBottom: 12},
                      ]}>
                      Discount
                    </Text>

                    <Text style={[{}, styles.subTotleColumn1Text]}>TOTAL:</Text>
                  </View>
                  <View style={[{}, styles.subTotleColumn2View]}>
                    <Text
                      style={[
                        {},
                        styles.subTotleColumn2Text,
                        {marginBottom: 12},
                      ]}>
                      {this.props.currency.currency +
                        ' ' +
                        this.state.sub_total}
                    </Text>

                    <Text
                      style={[
                        {},
                        styles.subTotleColumn2Text,
                        {marginBottom: 12},
                      ]}>
                      {this.props.currency.currency} {this.state.tax_amount}
                    </Text>

                    <Text
                      style={[
                        {},
                        styles.subTotleColumn2Text,
                        {marginBottom: 12},
                      ]}>
                      {this.props.currency.currency}{' '}
                      {this.state.discount_amount}
                    </Text>
                    <Text
                      style={[
                        {},
                        styles.subTotleColumn2Text,
                        {marginBottom: 12},
                      ]}>
                      {this.props.currency.currency} {this.state.total_amount}
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
                    onPress={() => this.props.navigation.navigate('AddNote')}>
                    {this.props.notes.notes != '' ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{marginRight: 7}}>
                          {this.props.notes.notes}
                        </Text>
                        <Icon name="edit" color="#B1272C" size={20} />
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../images/document.png')}
                          style={{height: 22, width: 20}}
                        />
                        <Text
                          style={{
                            color: '#929497',
                            fontSize: 13,
                            marginLeft: 5,
                            fontWeight: 'bold',
                          }}>
                          Add a note
                        </Text>
                      </View>
                    )}
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
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              backgroundColor: '#fff',
              height: 70,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.sendQuickInvoice(0)}
              style={[
                styles.btnContinuueView,
                {
                  width: width - 243,
                  marginRight: 20,
                  backgroundColor: '#fff',
                  borderColor: '#B1272C',
                  borderWidth: 1,
                },
              ]}>
              <Text style={{color: '#B1272C'}}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.sendQuickInvoice(1)}
              style={[styles.btnContinuueView, {width: width - 243}]}>
              <Text style={{color: '#FFFFFF'}}>Send</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={this.state.isShowProductModal}
            onDismiss={() => this.setState({isShowProductModal: false})}>
            <View
              style={{
                height: height - 350,
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                borderRadius: 10,
                flexDirection: 'column',
                padding: 25,
              }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
              <View style={{flexDirection: 'row', marginBottom: 30}}>
                <Text
                  style={{color: '#2F2E7C', fontWeight: 'bold', fontSize: 15}}>
                  ADD PRODUCT OR SERVICE
                </Text>
              </View>
              <View>
                <TextInput
                  value={this.state.product_name}
                  onChangeText={text => this.setState({product_name: text})}
                  placeholder="Enter Product or Service"
                  style={{
                    paddingLeft: 0,
                    height: 30,
                    backgroundColor: '#fff',
                    fontSize: 13,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <TextInput
                    keyboardType="numeric"
                    value={this.state.quantity}
                    onChangeText={text => {
                      if (isNaN(text)|| parseInt(text)<1) {
                        this.setState({
                          modal_total: this.state.quantity * this.state.price,
                        });
                      }else{
                        let quantity = text == ''||parseInt(text)<1 ? 0 : text;
                        this.setState({
                          quantity,
                          modal_total: parseInt(quantity) * this.state.price,
                        });
                      }
                     
                    }}
                    placeholder="Quantity"
                    style={{
                      paddingLeft: 0,
                      height: 30,
                      backgroundColor: '#fff',
                      fontSize: 13,
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    value={this.state.price}
                    onChangeText={text => {
                      if (isNaN(text) || parseInt(text)<1) {
                        // alert(parseInt(text))
                        // this.setState({
                        //   price: 0,
                        //   modal_total: 0* this.state.quantity,
                        // })

                        this.setState({
                          modal_total: this.state.price * this.state.quantity,
                        });
                      } else {
                        let price = text == ''||parseInt(text)<1 ? 0 : text;
                        this.setState({
                          price,
                          modal_total: parseInt(price) * this.state.quantity,
                        });
                      }
                    }}
                    placeholder="Price(0.00)"
                    style={{
                      paddingLeft: 0,
                      height: 30,
                      backgroundColor: '#fff',
                      fontSize: 13,
                    }}
                  />
                </View>
              </View>

              <View style={{marginTop: 20}}>
                {/* <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                noVat: !this.state.noVat
                                            })
                                        }}
                                        isChecked={this.state.noVat}
                                        rightText={"No Vat"}
                                        rightTextStyle={{ color: '#4E4D4D' }}
                                        checkedCheckBoxColor={'#4E4D4D'}
                                        checkBoxColor={'#4E4D4D'}
                                    /> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 23,
                }}>
                <Text style={{color: '#4E4D4D'}}>Total:</Text>
                <Text style={{fontWeight: 'bold'}}>
                  {this.props.currency.currency}
                  {this.state.modal_total.toString()}.00
                </Text>
              </View>
              <View style={{flexDirection: 'column', marginTop: 25}}>
                <View
                // style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#B1272C',
                      paddingVertical: 15,
                      padding: 40,
                      borderRadius: 100,
                    }}
                    onPress={() =>
                      this.state.isEdit
                        ? this.editProductToArray()
                        : this.pushProductToArray()
                    }>
                    <Text style={{color: '#fff'}}>Save</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{marginTop: 15}}
                  // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      padding: 30,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#E6E6E6',
                    }}
                    onPress={() => {
                      this.setState({isShowProductModal: false});
                    }}>
                    <Text style={{color: '#E6E6E6', paddingHorizontal: 10}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              </ScrollView>
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
  
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuickInvoice);
