/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Clipboard,
  Dimensions,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/PayByUssdCss';
import Spinner from 'react-native-loading-spinner-overlay';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Scaffold from './Components/Scaffold';
import {CLEAR_ORDER, SET_USER} from '../redux/constants';
import CategoryDropdown from './Components/CategoryDropdown';
import DropDownModal from './Components/DropDownModal';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class PayByUssd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isChecked: false,
      ussd_codes: [],
      ussd_code_selected: null,
      spinner: false,
      bank_name:"",
      showdropDownModal:false,
      order_id:0,
    };
  }

  componentDidMount() {
     console.log('~~~~~~~~~~~', this.props.route.params)
    // this.setState({
    //     order_id:
    // })

    this.get_ussd_codes();
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
    console.log(
      '---- body params list @@@@@@!!!!!!!!!!!!!!',
      this.props.route.params,
    );
    console.log('order url detail ', url);
    console.log('order postData ', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(
          'order response response Json responseJson responseJson!!!!!!!!!!!',
          responseJson,
        );
        if (responseJson.status.toUpperCase() === 'SUCCESS') {
          console.log('##########', responseJson.data.id);
          this.props.navigation.navigate('OrderDetail_pending', {
            id: responseJson.data.id
          });
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

  async makePaymentFun(payment_mode) {
    if (await this.state.spinner) {
      return;
    }
    if (this.props.route.params.data != undefined) {
      console.log(
        'in if this.props.route.params.data.id',
        this.props.route.params.data.id,
      );
      this.props.navigation.navigate('OrderDetail', {
        id: this.props.route.params.data.id,
      });
      return;
    }
    await this.setState({spinner: true});
    let bodyOrder = this.props.route.params.bodyOrder;
    bodyOrder.payment_mode = payment_mode;
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify(bodyOrder),
    };
    console.log(
      '222222222222 makePaymentFun body params list @@@@@@!!!!!!!!!!!!!!',
      postData,
    );
    fetch(Constants.orderslist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        console.log('all response ', responseJson);
        if (responseJson.status === 'success') {
          this.props.emptyOrder();
          this.props.navigation.navigate('OrderDetail_pending', {
            id: responseJson.data.id
          });
          //this.get_order_detail(responseJson.data.id);
          // let payment_link = responseJson.data.payment_link
          // this.payment_response(responseJson, 'PaymentWeb', { payment_link: payment_link, data: responseJson.data });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
      });
  }

  pay_redirect_detail() {
    if (this.state.ussd_code_selected == null) {
      Alert.alert('Please select the Bank');
    } else {
      this.makePaymentFun(this.props.route.params.payment_mode);
    }
  }

  get_ussd_codes() {
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.ussd_codes, postData)
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.status === 'success') {
          let data = responseJson.data;
          console.log("suc#$",data);
          let ussd_codes = data.map((x, key) => {
            return {label: x.bank_name, value: x.cicod_code + this.props.route.params.data.cicod_order_id+"#"};
          });
          this.setState({
            spinner: false,
            ussd_codes: ussd_codes,
          });
        } else {
          this.setState({spinner: false});
          let message = responseJson.message;
          alert(message);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }

onBankSelected=(item)=>{
  // alert(item)
  this.setState({ussd_code_selected: item.value,bank_name:item.label,showdropDownModal:false});
}


  render() {
    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <View style={[{}, styles.backHeaderRowView]}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Please Wait...'}
              textStyle={{color: '#fff'}}
              color={'#fff'}
            />
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
                <Text style={[{}, styles.payText]}>
                  {this.props.currency.currency +
                    ' ' +
                    this.props.route.params.amount_payable}
                </Text>
                <Text style={[{}, styles.collectText]}>
                  {this.props.user.email}
                </Text>
                {/* <View style={[{}, styles.selectBankView]}> */}

                {/* <TextInput
                                    label="Select Bank"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                /> */}
                {/* <View style={[{}, styles.iconView]}>
                                <Icon name="caret-down" size={20} color={'#4E4D4D'} />
                            </View> */}
                {/* </View> */}
              </View>
<View style={{paddingHorizontal:10,marginTop:10}}>
<CategoryDropdown
                        title={
                          this.state.bank_name == ''
                            ? 'Select Bank'
                            : this.state.bank_name
                        }
                        onPress={() => this.setState({showdropDownModal: true})}
                      />
</View>
              

              
              <View style={[{}, styles.bankDetailView]}>
                {this.state.ussd_code_selected == null ? (
                  <Text style={[{}, styles.bankDetailText]}>
                    Select a bank above to get USSD CODE
                  </Text>
                ) : (
                  <View>
                    <Text>
                      Dial the code below on your mobile phone to complete this
                      transaction
                    </Text>
                    <View style={{flexDirection:"row",marginTop:10,justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{textAlign: 'center', color: 'red'}}>
                      {this.state.ussd_code_selected}
                    </Text>


                  <TouchableOpacity onPress={()=>{
                    Clipboard.setString(this.state.ussd_code_selected);
                    alert("Copied to clipboard")
                    }}>
                    <Icon name="copy" color="##929497" size={30} />
                  </TouchableOpacity>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#B1272C',
                    borderRadius: 100,
                    paddingVertical: 15,
                    width: width / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                  onPress={() => this.pay_redirect_detail()}>
                  <Text style={{color: '#fff'}}>ORDER DETAIL</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>

            <DropDownModal
            title="Banks"
            selected={this.state.bank_name}
            itemFull={true}
            showdropDownModal={this.state.showdropDownModal}
            handleClose={() => this.setState({showdropDownModal: false})}
            onSelected={this.onBankSelected}
            data={this.state.ussd_codes}
          />
          </View>
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
    
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PayByUssd);
