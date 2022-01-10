/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/DiliveryAddressCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import {
  SET_USER,
  LOGOUT_USER,
  SET_DELIVERY_ADDRESS,
  ADD_DELIVERY_FEE_TO_COST,
} from '../redux/constants/index';
import {Container, Content, List, ListItem, Radio} from 'native-base';
import Scaffold from './Components/Scaffold';
import NavBack from './Components/NavBack';

const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class DiliveryAddress extends React.Component {
  loadDelivery_address = true;
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      is_selected_address: false,
      addressarr: [],
      selected_address_id: this.props.route.params.address_id ?? 0,
      delivery_type: this.props.route.params.type ?? '',
      isChecked: false,
    };
  }

  componentDidMount() {
    // this.setState({delivery_type:this.props.route.params.type})
    // this.getDeliveryAddress();
  }
  componentWillUnmount() {
    this.loadDelivery_address = true;
  }
  set_address() {
    console.log('~~~~~~~~~~~~~~~~~~~set adress 1', this.props.deliveryAddress);
    if (
      this.props.route.params.address == '' ||
      this.props.route.params.address == undefined
    ) {
      alert('Customer address not avalaible');
      return;
    }
    let same_as_delivery = !this.props.deliveryAddress.same_as_delivery;

    console.log('set adress same as delivery address 2', same_as_delivery);

    if (same_as_delivery) {
      console.log('step 3', this.props.route.params.address);
      console.log('Set');
      this.setState({same_as_delivery: same_as_delivery})
      this.getDeliveryFee(this.props.customer.detail,true);

      // this.props.setDeliveryAddress({
      //   address: object.value,
      //   country_id: object.country_id,
      //   state_id: object.state_id,
      //   type: 'Delivery',
      //   same_as_delivery: false,
      //   selected_address_id: object.list_id,
      // });
      // this.props.setDeliveryAddress({
      //   address: this.props.route.params.address,
      //   type: 'Delivery',
      //   same_as_delivery: same_as_delivery,
      //   selected_address_id: 0,
      // });
    } else {
      console.log('Set');
      this.props.setDeliveryAddress({
        address: '',
        type: 'Delivery',
        same_as_delivery: same_as_delivery,
        selected_address_id: 0,
      });
      this.props.navigation.goBack();
    }

    console.log('~diliver this.props.route.params',this.props.customer.detail);
   
  }
  getDeliveryAddress() {
    if (!this.loadDelivery_address) {
      return;
    }
    this.loadDelivery_address = false;
    this.setState({delivery_type: this.props.route.params.type});
    // this.getDeliveryAddress();
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log(
      'url !!!!!!!!!!!',
      Constants.customerdelivery + '?customer_id=' + this.props.customer.id,
    ); // id 7
    fetch(
      Constants.customerdelivery + '?customer_id=' + this.props.customer.id,
      postData,
    ) //+ this.props.customer.id
      .then(response => response.json())
      .then(async responseJson => {
        console.log('all address', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          let default_address = null;
          let selected_address = null;
          let res = responseJson.data;
          console.log("fojt%",res)
          if (res.length>0) {
            
            let addressarr=[];

            for (let index = 0; index < res.length; index++) {
              const x = res[index];
              if (x.country.id<1) {
                continue;
              }
              let address_item = {
                list_id: index + 1,
                is_default: x.is_default,
                country_id: x.country.id,
                state_id: x.state.id,
                lga_id:x.lga.id,
                label:
                  x.house_no +
                  ',' +
                  x.street +
                  ',' +
                  x.state.name +
                  ',' +
                  x.country.name,
                value:
                  x.house_no +
                  ',' +
                  x.street +
                  ',' +
                  x.state.name +
                  ',' +
                  x.country.name,
              };
            
              if (x.is_default) {
                default_address = address_item;
              }
              console.log(
                'selected address  respone !!!!!!',
                this.props.deliveryAddress,
              );
  
              if (address_item.label == this.props.deliveryAddress.address) {
                selected_address = address_item;
              }
              addressarr.push(address_item)
              
            }
          
          // let addressarr = res.map((x, key) => {
         
              
            
          //   let address_item = {
          //     list_id: key + 1,
          //     is_default: x.is_default,
          //     country_id: x.country.id,
          //     state_id: x.state.id,
          //     lga_id:x.lga.id,
          //     label:
          //       x.house_no +
          //       ',' +
          //       x.street +
          //       ',' +
          //       x.state.name +
          //       ',' +
          //       x.country.name,
          //     value:
          //       x.house_no +
          //       ',' +
          //       x.street +
          //       ',' +
          //       x.state.name +
          //       ',' +
          //       x.country.name,
          //   };
          
          //   if (x.is_default) {
          //     default_address = address_item;
          //   }
          //   console.log(
          //     'selected address  respone !!!!!!',
          //     this.props.deliveryAddress,
          //   );

          //   if (address_item.label == this.props.deliveryAddress.address) {
          //     selected_address = address_item;
          //   }
          //   return address_item;
          // });

          console.log("hre#$",addressarr)
          await this.setState({
            addressarr: addressarr,
          });

        }
          // if(this.props.same_as_delivery){
          //     this.set_address();
          // }
          if (!this.props.deliveryAddress.same_as_delivery) {
            if (selected_address != null) {
              this.selectAddress(selected_address);
            } else if (default_address != null && selected_address == null) {
              this.selectAddress(default_address);
            }
          }
        } else {
          let message = responseJson.message;
          Alert.alert('Message', message);
        }
      });
  }
  componentWillReceiveProps() {
    // console.log('deliveryAddress deliveryAddress', this.props.deliveryAddress);
    // this.getDeliveryAddress();
  }

  selectAddressGoBack(object) {
    this.getDeliveryFee(object);
    this.props.navigation.goBack();
  }

  getDeliveryFee(object,same_as=false) {
    this.setState({
      is_selected_address: !this.state.is_selected_address,
      selected_address_id: object.list_id,
      spinner: true,
    });
    console.log("incoming",object)

    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };

    console.log("uyy@#", `${Constants.deliveryCost}?order_amount=${this.props.cart.cart_detail.total_price_with_tax}&country_id=${object.country_id}&state_id=${object.state_id}&lga_id=${object.lga_id}`)

    fetch(
      `${Constants.deliveryCost}?order_amount=${this.props.cart.cart_detail.total_price_with_tax}&country_id=${object.country_id}&state_id=${object.state_id}&lga_id=${object.lga_id}`,
      postData,
    )
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        console.log('sucgjhjlkkll#@ RRE', responseJson);
        console.log('obk$##', object);
        if (responseJson.status === 'success') {
          this.props.addDeliveryFee({
            delivery_fee: responseJson.data,
          });
          if(same_as){
            this.props.setDeliveryAddress({
              address: object.address,
              country_id: object.country_id,
              state_id: object.state_id,
              type: 'Delivery',
              same_as_delivery: true,
              lga_id:object.lga_id,
              selected_address_id: object.list_id,
            });
            this.props.navigation.goBack()
          }else{
            this.props.setDeliveryAddress({
              address: object.value,
              country_id: object.country_id,
              state_id: object.state_id,
              type: 'Delivery',
              same_as_delivery: false,
              selected_address_id: object.list_id,
            });
          }
         
         

         
        } else {
          this.setState({spinner: false});
          let message = responseJson.status;
          Alert.alert('Info', responseJson.message);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }

  selectAddress(object) {
    console.log('select address object', object);
    this.setState({
      is_selected_address: !this.state.is_selected_address,
      selected_address_id: object.list_id,
    });
    console.log('object', object);
    this.props.setDeliveryAddress({
      address: object.value,
      country_id: object.country_id,
      state_id: object.state_id,
      type: 'Delivery',
      same_as_delivery: false,
      selected_address_id: object.list_id,
    });
  }
  render() {
    this.getDeliveryAddress();
    {
      console.log('this.props.deliveryAddress', this.state.addressarr);
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
          <ScrollView>
            <View >
           <View style={{marginHorizontal:10}}>
             <NavBack title="DELIVERY ADDRESS" onClick={()=>this.props.navigation.goBack()} />

           </View> 
              <CheckBox
                style={{
                  width: width - 20,
                  marginVertical: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
                onClick={() => {
                  this.set_address();
                  // , this.setState({
                  //     rememberIsChecked: !this.state.rememberIsChecked
                  // })
                }}
                isChecked={this.props.deliveryAddress.same_as_delivery}
                // isChecked={this.state.rememberIsChecked}
                rightText={'Same as customer’s address'}
                rightTextStyle={{fontSize: 10}}
              />
              <View style={[{}, styles.addressContainer]}>
                <TouchableOpacity
                // onPress={() => this.selectAddress(value)}
                // style={{marginBott}}
                >
                  <View style={[{}, styles.radioFormView]}>
                    <RadioForm
                      // isSelected={this.state.is_selected_address}
                      color={'yellow'}
                      // radio_props={radio_props_payment}
                      size={5}
                      buttonColor={'green'}
                      // backgroundColor={'#fff'}
                      paddingVertical={10}
                      buttonSize={10}
                      buttonOuterSize={20}
                      initial={0}

                      // onPress={(value) => this.selectAddress(obj)} //{ this.setState({ value3Index: value }) }
                    />

                    {this.state.addressarr.length>0 && this.state.addressarr.map((obj, i) => (
                      <RadioButton labelHorizontal={true} key={i}>
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <View
                          style={{
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 5,
                            marginBottom: 15,
                            paddingVertical: 10,
                            borderBottomLeftRadius: 5,
                          }}>
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={
                              obj.list_id === this.state.selected_address_id
                            }
                            onPress={value => this.selectAddressGoBack(obj)}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={
                              this.state.value3Index === i ? '#2196f3' : '#000'
                            }
                            buttonSize={10}
                            buttonOuterSize={20}
                            paddingVertical={30}
                            // backgroundColor={'#fff'}
                            // buttonStyle={{backgroundColor:'#fff'}}

                            buttonWrapStyle={{
                              marginLeft: 10,
                              marginVertical: 10,
                            }}
                          />
                        </View>
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          onPress={value => this.selectAddressGoBack(obj)}
                          // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                          labelWrapStyle={{
                            marginBottom: 15,
                            backgroundColor: '#fff',
                            width: width - width / 5,
                            paddingVertical: 20,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                          }}
                        />
                      </RadioButton>
                    ))}
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AddDiliveryAddress')
                }>
                <View style={[{}, styles.customerContaineraddProductView]}>
                  <Image
                    source={require('../images/products/circlePlus.png')}
                    style={{width: 30, height: 30}}
                  />
                  <Text style={[{}, styles.customerContaineraddProductText]}>
                    Add Address
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    user: state.userReducer,
    customer: state.customReducer,
    deliveryAddress: state.deliveryAddressReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setDeliveryAddress: value =>
      dispatch({type: SET_DELIVERY_ADDRESS, value: value}),
    addDeliveryFee: value =>
      dispatch({type: ADD_DELIVERY_FEE_TO_COST, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DiliveryAddress);
