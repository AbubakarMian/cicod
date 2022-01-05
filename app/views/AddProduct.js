import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import splashImg from '../images/splash.jpg';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import styles from '../css/AddProductCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import {Picker} from '@react-native-picker/picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Constants} from '../views/Constant';
import AddProductCartItem from './Components/CreateOrder/AddProductCartItem';

import {connect} from 'react-redux';
import {
  SET_USER,
  LOGOUT_USER,
  ADD_TO_PRODUCT,
  REMOVE_FROM_CART,
} from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBack from './Components/NavBack';
import DropDownModal from './Components/DropDownModal';
import CategoryDropdown from './Components/CategoryDropdown';
import Scaffold from './Components/Scaffold';

const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isChecked: false,
      spinner: false,
      data: [],
      search_product: '',
      total_add_order: 0,
      categoryarr: [],
      category_id: 0,
      showdropDownModal: false,
      // catelog_products_total: 0,
      selected_product: [],
      pageNo:1,
      totalPageCount:1
    };
  }

  componentDidMount() {
    this.getProductList(Constants.productslist + '?is_active=1&page=1');
    this.getCategoryList();
  }

  getProductList(search_url) {
    // if ( search_product == '' && category_id == '') {
    //   return;
    // }
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
   
    console.log('search url ', search_url);
    console.log('postData ', postData);
    fetch(search_url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          spinner: false,
        });
        console.log('response !!!!!!!!', responseJson);
        if (responseJson.status == 'success') {
          let cart_data = this.props.cart.cart;
          console.log('cart data : ', cart_data);
          let data = responseJson.data;
          for (let i = 0; i < data.length; i++) {
            let product_found = false;
            for (let c = 0; c < cart_data.length; c++) {
           
              if (cart_data[c].id == data[i].id) {
                data[i].purchased_quantity = cart_data[c].purchased_quantity;
                data[i].is_added = true;
                product_found = true;
              }
            }
            if (!product_found) {
              data[i].purchased_quantity = 0;
              data[i].is_added = false;
            }
          }
          this.setState({
            data: [...this.state.data,...data],
            totalPageCount:responseJson.pages
          });
         
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          // Alert.alert('Error', message);
          Alert.alert('Info', "Please click to reload products",[
            {
              text:"Close",
              onPress:()=>{
                console.log("close")
              }
            },
            {
              text:"Reload",
              onPress:()=>this.getProductList(Constants.productslist + '?is_active=1&page=1')
            }
            ,
            
          ],{ cancelable: true });
        }
      })
      .catch(error => {
        console.log('error$$', error);
        console.log('error');
      });
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  getCategoryList() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.productcategorylist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let categoryarr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          console.log('categoryarr !!!!!!!!!!!!!!!!!!', categoryarr);
          this.setState({
            categoryarr: categoryarr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          // Alert.alert('Error', message);
        }
      });
  }

  onCategoryText = category_id => {
    console.log('text !!!!!!!!!!!!!!!!!', category_id);
    this.setState({
      category_id: category_id,
      showdropDownModal: false,
      pageNo: 1, data: []
    });
    const url =
      Constants.productslist +
      '?is_active=1&category_id=' +
      this.state.category_id+ '?page=' + this.state.pageNo;
    this.getProductList(url);
  };

  async addProduct(index) {
    let data = this.state.data;
    if (data.length == 0) {
      // && data[index].purchased_quantity == 0  this.props.cart.cart.length
      Alert.alert('Error ', 'Cart is empty');
      return;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].purchased_quantity > 0) {
          await this.props.cartReducer(data[i]);
        }
      }
      console.log('aadded cart', data[index]);
      this.props.navigation.navigate('CreateOrder', {screen: 'active'});
    }
  }
  catelog_count() {
    let data = this.state.data;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].purchased_quantity > 0) {
        count = count + 1;
      }
    }
    // this.setState({
    //     catelog_products_total:count
    // })
    return count;
  }
  async counterFun(action, index) {
    let data = this.state.data;
    if (action == 'add') {
      let updated_purchased_quantity = data[index].purchased_quantity + 1;
      if (
        updated_purchased_quantity > data[index].quantity &&
        !data[index].no_qty_limit
      ) {
        alert('Out of stock');
      } else {
        console.log(
          'here in else condition !!!!!!!!!',
          data[index].purchased_quantity,
        );
        // await this.props.cartReducer(data[index]);
        data[index].purchased_quantity = updated_purchased_quantity;
        console.log(
          'here in else condition !!!!!!!!! after : ',
          data[index].purchased_quantity,
        );

        this.setState({
          data: data,
        });
        // this.props.cartReducer(data[index]);
        await this.props.cartReducer(data[index]);
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
        console.log(' remove from cart cart : ', this.props.cart);
      }
    }
  }

  doneCart() {
    let data = this.state.data;
    if (data.length == 0) {
      // && data[index].purchased_quantity == 0  this.props.cart.cart.length
      Alert.alert('Error ', 'Cart is empty');
      return;
    }
    this.props.navigation.navigate('CreateOrder', {screen: 'active'});
  }

  handleLoadMore = () => {
    // if (!this.state.spinner) {
    // alert(this.state.totalPageCount);
    const pageNo = this.state.pageNo + 1; // increase page by 1
    this.setState({pageNo});

    const product_url =
      this.state.category_id == ''
        ? Constants.productslist + '?page=' + pageNo
        : Constants.productslist +
          '?category_id=' +
          this.state.category_id +
          '&page=' +
          pageNo;

    console.log('product_url$##@0', product_url);
    this.getProductList(product_url);

    // method for API call
    // } else {
    //   alert('here');
    // }
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    // if (!this.state.spinner) return null;
    // return <ActivityIndicator style={{color: '#000'}} />;
    if (
      this.state.totalPageCount > 1 &&
      this.state.pageNo < this.state.totalPageCount
    ) {
      return (
        <TouchableOpacity
          onPress={() => this.handleLoadMore()}
          style={{
            padding: 5,
            alignSelf: 'center',
            marginTop: 7,
            paddingBottom:50,
            marginBottom: 350,
          }}>
          <Text style={{letterSpacing: 1.1, fontWeight: 'bold'}}>
            Load More
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };


  render() {
    var radio_props_dilvery = [{label: 'Dilivery', value: 0}];
    var radio_props_pickup = [{label: 'Pickup', value: 1}];
    var radio_props_payment = [
      {label: 'Pay Now', value: 0},
      {label: 'Pay Acount', value: 1},
      {label: 'Pay Invoice', value: 2},
      {label: 'Part Payment', value: 3},
    ];
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
          <View style={{marginHorizontal:10}}>
          <NavBack
            title="ADD PRODUCT"
            onClick={() => this.props.navigation.goBack()}
          />
          </View>
          {/* <View style={[{}, styles.backHeaderRowView]}>
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('CreateOrder')}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="#929497" />
          </TouchableOpacity>
          <View style={[{}, styles.backHeadingView]}>
            <Text style={[{}, styles.backHeadingText]}>ADD PRODUCT</Text>
          </View>
        </View> */}
          <View>
         <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10,alignItems:"center"}}>
              <Searchbar
                placeholder="Search Product"
                iconColor="#929497"
                style={{
                  flex:1,
                  // width: width - 50,
                  // alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 0,
                  fontSize: 14,
                  color: '#D5D5D5',
                  borderColor: '#D8DCDE',
                }}
                onSubmitEditing={() => {
                  //   category_id == 0 || category_id == ''
                  //     ? ''
                  //     : '&category_id=' + category_id;
                  // let search_url =
                  //   Constants.productslist +
                  //   '?is_active=1&search=' +
                  //   search_product +
                  //   category_search;
this.setState({data:[]})
                  let category_search =
                    this.state.category_id == 0 ||  this.state.category_id == ''
                      ? ''
                      : '&category_id=' +  this.state.category_id;
                  let url =
                    Constants.productslist +
                    '?is_active=1&search=' +
                    this.state.search_product +
                    category_search;
                  this.getProductList(url);
                }}
                onChangeText={text => this.setState({search_product: text})}
                //update
              ></Searchbar>

<TouchableOpacity
              style={{
                height: 50,
                width: 50,
                // position: 'absolute',
                // right: 0,
                // alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
              }}
              onPress={() => {
                this.setState({data: [], pageNo: 1});
                let product_url = Constants.productslist + '?page=1&is_active=1';
                this.getProductList(product_url);
              }}>
              <Icon name="refresh" size={30} color="#929497" />
            </TouchableOpacity>

              </View>

              
              {/* <View style={[{}, styles.searchByCatCOntainer]}> */}

              {
                this.state.categoryarr.length < 1 ? null : (
                  <View style={{padding: 10}}>
                    <CategoryDropdown
                      title="Select Product Category"
                      onPress={() => this.setState({showdropDownModal: true})}
                    />
                  </View>

                  // <Picker
                  //   style={{
                  //     backgroundColor: '#fff',
                  //     borderWidth: 0,
                  //     borderBottomWidth: 0.5,
                  //     margin: 10,
                  //   }}

                  //   onValueChange={(itemValue, itemLabel, itemIndex) =>
                  //     this.onCategoryText(itemValue)
                  //   }
                  //   selectedValue={this.state.category_id}>
                  //   <Picker.Item
                  //     style={{fontSize: 15}}
                  //     color="#929497"
                  //     label="Product Category"
                  //     value=""
                  //   />
                  //   {this.state.categoryarr.map(elem => {
                  //     return (
                  //       <Picker.Item
                  //         style={{fontSize: 13}}
                  //         color="#929497"
                  //         label={elem.label}
                  //         value={elem.value}
                  //       />
                  //     );
                  //   })}
                  // </Picker>
                )
                //    <DropDownPicker
                //         scrollViewProps={{
                //             persistentScrollbar: true,
                //         }}
                //         dropDownDirection="AUTO"
                //         bottomOffset={200}
                //         items={this.state.categoryarr}
                //         placeholder="Catagory"
                //         containerStyle={{ height: 50, width: width - 20, alignSelf: 'center', marginVertical: 10, borderRadius: 5 }}
                //         style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                //         itemStyle={{
                //             justifyContent: 'flex-start',
                //         }}

                //         dropDownStyle={{ height: 160, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                //         labelStyle={{ color: '#A9A9A9' }}
                //         // onChangeItem={item => this.onSelectCountry(item.value)}  //this.onSelectCountry(item.value)}
                //         onChangeItem={item => this.onCategoryText(item.value)}
                //     />
              }
              {/* </View> */}

              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#E6E6E6',
                  width: width - 20,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}></View>
              <View style={[{zIndex: -0.9999}, styles.OrderDetailContainer]}>
                <View
                  style={[
                    styles.OrderDetailHeadingRow,
                    {justifyContent: 'space-between', right: 20},
                  ]}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[{}, styles.OrderDetailHeadingRowText]}>
                      Product Catalog
                    </Text>
                    <Text style={[{}, styles.OrderDetailNotificationText]}>
                      {this.catelog_count()}
                    </Text>
                  </View>

                  {this.state.data.length > 0 && (
                    <TouchableOpacity
                      onPress={() => this.doneCart()}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#B1272C',
                        marginRight: 30,
                        paddingHorizontal: 10,
                        borderRadius: 100,
                        paddingVertical: 2,
                        width: width / 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon name="plus-circle" color={'#fff'} />
                      <Text
                        style={{color: '#fff', marginLeft: 5, fontSize: 12}}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {this.state.data.length != 0 ? (
                  <FlatList
                    data={this.state.data}
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
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item, index, separators}) => (
                      <AddProductCartItem
                        item={item}
                        counterFunAdd={() => this.counterFun('add', index)}
                        counterFunSub={() => this.counterFun('sub', index)}
                        isValueChain={false}
                      />
                    )}
                  />
                ) : (
                  <View style={[{}, styles.contentView]}>
                    <Image
                      style={{height: 100, width: 100}}
                      source={require('../images/noProduct.png')}
                    />
                    <Text style={[{}, styles.contentViewHeadingText]}>
                      No product found
                    </Text>
                    <Text style={[{color: '#929497'}, fontStyles.normal15]}>
                      Select product category
                    </Text>
                  </View>
                )}

               
              </View>
           
           
          </View>
         
          <DropDownModal
            title="Product Categories"
            selected={this.state.category_id}
            showdropDownModal={this.state.showdropDownModal}
            handleClose={() => this.setState({showdropDownModal: false})}
            onSelected={this.onCategoryText}
            data={this.state.categoryarr}
          />
        </View>
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    cart: state.cartReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    cartReducer: value => dispatch({type: ADD_TO_PRODUCT, value: value}),
    removeFromCart: value => dispatch({type: REMOVE_FROM_CART, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
