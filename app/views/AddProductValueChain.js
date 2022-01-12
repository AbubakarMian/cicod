/* eslint-disable prettier/prettier */
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
} from 'react-native';
import splashImg from '../images/splash.jpg';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import styles from '../css/AddProductCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import {
  SET_USER,
  LOGOUT_USER,
  ADD_TO_PRODUCT_CHAIN,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_CHAIN,
} from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import Scaffold from './Components/Scaffold';
import AddProductCartItem from './Components/CreateOrder/AddProductCartItem';
import NavBack from './Components/NavBack';
import CategoryDropdown from './Components/CategoryDropdown';
import DropDownModal from './Components/DropDownModal';

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
      pageNo:1,
      totalPageCount: 1,
      // catelog_products_total: 0,
      selected_product: [],
    };
  }

  componentDidMount() {
    console.log('oun#$');
    console.log('sellers s@@@##', this.props.route.params.item);

     this.getSellersProducts(
      Constants.sellerProductList +
        '?id=' +
        this.props.route.params.item.seller_id+"&page=1",
    );

    this.getCategoryList();
    // this.getSellersProducts();
  }

  getSellersProducts(url) {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    //Constants.productslist + '?is_active=1&search=' + this.state.search_product
    // let search_url =  '?is_active=1&search=' + this.state.search_product + '&category_id=' + this.state.category_id

    console.log('sllerszX@@##$$ ', url);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          spinner: false,
        });
        console.log('@@@@....sellers Products!! !!!!!!!!', responseJson);
        if (responseJson.success) {
          let cart_data = this.props.cart.cart;
          console.log('cart data : ', cart_data);
          let data = responseJson.data;
          for (let i = 0; i < data.length; i++) {
            let product_found = false;
            for (let c = 0; c < cart_data.length; c++) {
              console.log('asd');
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
            data: data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          this.getSellersProducts(
            Constants.sellerProductList +
              '?id=' +
              this.props.route.params.item.seller_id+"&page=1",
          );
//           Alert.alert('Info', "Please Reload Products",[
//             {
//               text:"OK",
// onPress:()=>{
//   this.getSellersProducts(
//     Constants.sellerProductList +
//       '?id=' +
//       this.props.route.params.item.seller_id+"&page=1",
//   );

// }
//             },{
//               text:"Back",
//               onPress:()=>this.props.navigation.goBack()
//             }
//           ]);
        }
      });
  }

  getProductList(search_product, category_id) {
    if (search_product == '' && category_id == '') {
      return;
    }
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    //Constants.productslist + '?is_active=1&search=' + this.state.search_product
    // let search_url =  '?is_active=1&search=' + this.state.search_product + '&category_id=' + this.state.category_id
    let category_search =
      category_id == 0 || category_id == ''
        ? ''
        : '&category_id=' + category_id;
    let search_url =
      Constants.productslist +
      '?is_active=1&search=' +
      search_product +
      category_search;
    console.log('search url ', search_url);
    console.log('postData ', postData);
    fetch(search_url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          spinner: false,
        });
        console.log('response !!!!!!!!', responseJson);
        if (responseJson.status === 'success') {
          let cart_data = this.props.cart.cart;
          console.log('cart data : ', cart_data);
          let data = responseJson.data;
          for (let i = 0; i < data.length; i++) {
            let product_found = false;
            for (let c = 0; c < cart_data.length; c++) {
              console.log('asd');
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
            data: data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
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
    fetch(
      this.props.route.params.heading == 'supplier'
        ? Constants.sellerProductCategoryList +
            '?id=' +
            this.props.route.params.item.seller_id
        : Constants.productcategorylist,
      postData,
    )
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({spinner: false});
        if (responseJson.success || responseJson.status === 'success') {
          let res = responseJson.data;
          let categoryarr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          console.log('categoryarr !!!!!!!!!!!!!!!!!!', categoryarr);
          const newCat = [{label: 'All', value: 'all'}, ...categoryarr];
          this.setState({
            categoryarr: newCat,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  onCategoryText=(category_id)=> {
    console.log('text !!!!!!!!!!!!!!!!!', category_id);
    this.setState({
      category_id: category_id,
      showdropDownModal:false
    });

    this.getSellersProducts(
      category_id == 'all'
        ? Constants.sellerProductList +
            '?id=' +
            this.props.route.params.item.seller_id
        : Constants.sellerProductList +
            '?id=' +
            this.props.route.params.item.seller_id +
            '&filter[category_id]=' +
            category_id,
    );
  }

  doneCart() {
    let data = this.state.data;
    if (data.length == 0) {
      // && data[index].purchased_quantity == 0  this.props.cart.cart.length
      Alert.alert('Error ', 'Cart is empty');
      return;
    }
    this.props.navigation.navigate('CreateOrderValueChain', {screen: 'active'});
  }

  async addProduct(index) {
    let data = this.state.data;
    if (data.length == 0) {
      // && data[index].purchased_quantity == 0  this.props.cart.cart.length
      Alert.alert('Error ', 'Cart is empty');
      return;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].purchased_quantity > 0) {
          if (data[i].minimum_order > data[i].purchased_quantity) {
            Alert.alert(
              'Info!',
              `${data[i].name} purchased quantity less than minimum order ${data[i].minimum_order}`,
            );
            continue;
          }
          await this.props.cartReducer(data[i]);
        }
      }
      console.log('aadded cart', data[index]);
      // this.props.navigation.navigate('CreateOrder', { screen: 'active' });
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
  counterFun = async (action, index) => {
    let data = this.state.data;
    if (action == 'add') {
      let updated_purchased_quantity=0;
      if (data[index].minimum_order > 0 &&  (!data[index].purchased_quantity ||  data[index].purchased_quantity <1 )) {
        updated_purchased_quantity=data[index].minimum_order;
        // Alert.alert(
        //   'Info!',
        //   `${data[index].name} purchased quantity less than minimum order ${data[i].minimum_order}`,
        // );
        // return;
      }else{
         updated_purchased_quantity = data[index].purchased_quantity + 1;
      }

      //let updated_purchased_quantity = data[index].purchased_quantity + 1;
      if (
        updated_purchased_quantity > data[index].qnty &&
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
        // if (data[index].minimum_order > data[index].purchased_quantity) {
        //   Alert.alert(
        //     'Info!',
        //     `${data[index].name} purchased quantity less than minimum order ${data[i].minimum_order}`,
        //   );
        //   return;
        // }

        // this.setState({
        //     data: data
        // },()=>{
        //     this.props.cartReducer(data[index]);
        // });

        this.setState({
          data: data,
        });
        await this.props.cartReducer(data[index]);

        // this.props.cartReducer(data[index]);

        console.log('cart : ', this.props.cart);
      }
    } else {

     // let updated_purchased_quantity = data[index].purchased_quantity - 1;
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
        console.log(' remove from cart cart : ', this.props.cart);
      }
    }
  };

  searchProduct() {
    if (this.state.category_id == 0) {
      this.getSellersProducts(
        Constants.sellerProductList +
          '?id=' +
          this.props.route.params.item.seller_id +
          '&filter[name]=' +
          this.state.search_product,
      );
    } else {
      this.getSellersProducts(
        this.state.category_id == 'all'
          ? Constants.sellerProductList +
              '?id=' +
              this.props.route.params.item.seller_id +
              '&filter[name]=' +
              this.state.search_product
          : Constants.sellerProductList +
              '?id=' +
              this.props.route.params.item.seller_id +
              '&filter[category_id]=' +
              this.state.category_id +
              '&filter[name]=' +
              this.state.search_product,
      );
      // category_id=="all"?Constants.sellerProductList+'?id='+this.props.route.params.item.seller_id+'&filter[name]='+this.state.search_product:Constants.sellerProductList+'?id='+this.props.route.params.item.seller_id+'&filter[category_id]='+category_id+'&filter[name]='+this.state.search_product);
    }
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    // if (!this.state.spinner) return null;
    // return <ActivityIndicator style={{color: '#000'}} />;
    if (
      this.state.data.length>3
    ) {
      return (
        <View
          // onPress={() => this.handleLoadMore()}
          style={{
            padding: 5,
            alignSelf: 'center',
            marginTop: 7,
            paddingBottom:50,
            marginBottom: 300,
          }}>
          {/* <Text style={{letterSpacing: 1.1, fontWeight: 'bold'}}>
            Load More
          </Text> */}
        </View>
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
          <NavBack title="ADD PRODUCT" onClick={()=> this.props.navigation.goBack()} />
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
          
              <Searchbar
                placeholder="Search Product"
                iconColor="#929497"
                style={{
                  width: width - 20,
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 5,
                  elevation: 0,
                  fontSize: 14,
                  color: '#D5D5D5',
                  borderColor: '#D8DCDE',
                }}
                onSubmitEditing={() => this.searchProduct()}
                onChangeText={text => this.setState({search_product: text})}
                //update
              ></Searchbar>
              {/* <View style={[{}, styles.searchByCatCOntainer]}> */}

              {this.state.categoryarr.length < 1 ? null : (
               <View style={{paddingHorizontal:10}}>
               <CategoryDropdown
                 title="Select Product Category"
                 onPress={() => this.setState({showdropDownModal: true})}
               />
               </View>
              )}
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
                    <Text style={{color: '#fff', marginLeft: 5, fontSize: 12}}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>

                {this.state.data.length != 0 ? (
                  <FlatList
                    data={this.state.data}
                    ListFooterComponent={this.renderFooter}
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
                      <AddProductCartItem
                        item={item}
                        counterFunAdd={() => this.counterFun('add', index)}
                        counterFunSub={() => this.counterFun('sub', index)}
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
                      No product selected
                    </Text>
                    <Text style={[{color: '#929497'}, fontStyles.normal15]}>
                      Search for a product
                    </Text>
                  </View>
                )}
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
        </View>
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    cart: state.cartChainReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    cartReducer: value => dispatch({type: ADD_TO_PRODUCT_CHAIN, value: value}),
    removeFromCart: value =>
      dispatch({type: REMOVE_FROM_CART_CHAIN, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
