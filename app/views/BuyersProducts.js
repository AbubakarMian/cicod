/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss';
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  SET_USER,
  LOGOUT_USER,
  UpdateTabbar,
  ORDER_RELOAD,
  PRODUCT_RELOAD,
} from '../redux/constants/index';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
import DropDownPicker from 'react-native-dropdown-picker';
import {Constants} from '../views/Constant';
import NavBack from './Components/NavBack';
import {nativeViewProps} from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import Scaffold from './Components/Scaffold';
import MultiViewHeader from './Components/MultiViewHeader';
import GridView from './Components/GridView';
import EmptyList from './Components/EmptyList';
class BuyerProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      calenderModal: false,
      data: [],
      categoryarr: [],
      search_product: '',
      spinner: false,
      prod_image: '',
      reload: true,
      filters: [],
      url_products: '',
      isListView: true,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  async componentDidMount() {
    console.log('items.....sd', this.props.route.params.heading);
    console.log(
      '~~~~~~~~~~~~~~~~~~~~*************',
      this.props.user.access_token,
    );
    const that = this;
  }

  async getData(url) {
    this.setState({spinner: true});
    console.log('search url ', url);
    console.log('token ', this.props.user.access_token);

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
        console.log(
          '~~~~~~~~~~~~~~~~~~responseJson.responseJson responseJson responseJson @@@@@@@',
          responseJson,
        );
        // console.log('responseJson.postData', postData);
        this.setState({
          spinner: false,
        });
        if (
          responseJson.status === 'success' ||
          responseJson.success === true
        ) {
          await this.setState({
            data: responseJson.data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  search() {
    let search_url;
    if (this.props.route.params.heading == 'SUPPLIERS') {
      search_url =
        this.state.url_products + '&filter[name]=' + this.state.search_product;
    } else {
      search_url =
        this.state.url_products + '?search=' + this.state.search_product;
    }
    console.log('searult@@', search_url);

    this.getData(search_url);
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
        console.log(' category body ', postData);
        console.log('URLLLLLLLLLLLLLLLLLLLLLLL', Constants.productcategorylist);
        console.log('responseJson responseJson', responseJson);

        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let categoryarr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          this.setState({
            categoryarr: categoryarr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  onCategoryText(category_id) {
    console.log(
      ' category ID search !!!!!!!!!!!!!!!@@@@@@@@@@@@@@',
      category_id,
    );
    let url = this.state.url_products + '?category_id=' + category_id;
    this.getData(url);
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  renderHeader=()=>{
    return(
    <>
    <View
    style={{
      marginBottom: 5,
      flexDirection: 'row',
      width: width - 20,
      alignSelf: 'center',
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    }}>
    <Searchbar
      placeholder="Search product, Price and code"
      style={[{color: '#D8D8D8'}, fontStyles.normal14,{
        width: width / 1.3,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
        elevation: 0,
        borderColor: '#D8DCDE',
      }]}
      iconColor="#929497"
      
      onChangeText={text => this.setState({search_product: text})}
      onSubmitEditing={() => this.search()}
      //update
    ></Searchbar>
    <View
      style={[
        {
          borderBottomColor: '#E6E6E6',
          borderBottomWidth: 0.5,
          width: width - 20,
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10,
        },
      ]}></View>

    <TouchableOpacity
      style={{position: 'absolute', right: 0, alignSelf: 'center'}}
      onPress={() => {
        this.setState({
          reload: true,
          search_product: '',
        });
        this.props.navigation.navigate('ProductFilter');
      }}>
      <Image
        style={{height: 50, width: 50}}
        source={require('../images/Order/settingicon.png')}
      />
    </TouchableOpacity>
  </View>
  <View style={[{}, styles.formRowView]}>
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: '#E6E6E6',
        width: width - 20,
        alignSelf: 'center',
        marginVertical: 10,
      }}></View>
  </View>
  <MultiViewHeader isActive={this.state.isListView} onPressGridView={() => this.setState({isListView: false})} onPressListView={() => this.setState({isListView: true})} />
</>
    )
  }


  onRefresh() {
    console.log('222222222222', this.state.isFetching);
    let url;
    if (this.props.route.params.heading == 'SUPPLIERS') {
      url =
        Constants.sellerProductList +
        '?id=' +
        this.props.route.params.items.seller_id;
    } else {
      url = `${Constants.approved_buyer_products}?id=${this.props.route.params.items.buyer_id}&sort=-id`;
    }
    this.setState({spinner: true, data: []});
    // if(this.state.isFetching==true){

    // let search_url = Constants.productslist + '?search=' + this.state.search_product;
    this.getData(url);
    return;
    // }

    // _that.setState({
    //     url_orders: url,
    // })
  }

  listProducts(props) {
    let _that = props._that;
    let url;
    if (_that.props.route.params.heading == 'SUPPLIERS') {
      url =
        Constants.sellerProductList +
        '?id=' +
        _that.props.route.params.items.seller_id;
    } else {
      url = `${Constants.approved_buyer_products}?id=${_that.props.route.params.items.buyer_id}&sort=-id`;
    }
    // if (_that.props.route == null || _that.props.route.params == null || _that.props.route.params.filters == null) {
    //     url = Constants.productslist;
    // }
    // else{
    //     let filters = _that.props.route.params.filters;
    //     let filter = '?';
    //     for (let i = 0; i < filters.length; i++) {
    //         filter = filter + filters[i].key + '=' + filters[i].value;
    //         if (i != filters.length - 1) {
    //             filter = filter + '&';
    //         }
    //     }
    //     url = (Constants.productslist + filter);
    // }
    // console.log('reloaded 1',_that.props.reload.product)
    if (url != _that.state.url_products || _that.props.reload.product) {
      console.log('reloaded', _that.props.reload.product);
      _that.props.setScreenReload({
        reload: false,
      });
      _that.getData(url);
      _that.setState({
        url_products: url,
      });
    }
    console.log('url_products ', url);
    // return null;
    // if (_that.state.data.length < 1) {
    //   return (
    //     <View
    //       style={{
    //         height: height / 1.75,
    //         position: 'relative',
    //         flexDirection: 'column',
    //         alignSelf: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         backgroundColor: '#F0F0F0',
    //         width: width - 20,
    //         padding: 10,
    //         borderRadius: 10,
    //         marginBottom: 5,
    //       }}>
    //       <Image source={require('../images/Untitled-1.png')} />
    //       <Text
    //         style={{
    //           color: '#929497',
    //           fontSize: 20,
    //           fontWeight: 'bold',
    //           fontFamily: 'Open Sans',
    //         }}>
    //         No order found
    //       </Text>
    //     </View>
    //   );
    // } else {
      return (
       
          <FlatList
          onRefresh={() => _that.onRefresh()}
          refreshing={_that.state.spinner}
            style={{}}
            data={_that.state.data}
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[styles.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            ListEmptyComponent={<EmptyList title={"No Product Found"} />}
            ListHeaderComponent={_that.renderHeader}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                key={item.key}
                onPress={() =>
                  _that.props.navigation.navigate('ProductView', {
                    item,
                    prod_id: item.id,
                    heading: _that.props.route.params.heading || 'BUYERS',
                    items:_that.props.route.params.items
                  })
                }
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
               
               {_that.state.isListView ? 
               <View
               style={{
                 zIndex: -0.999,
                 position: 'relative',
                 alignSelf: 'center',
                 flexDirection: 'row',
                 backgroundColor: 'white',
                 width: width - 20,
                 padding: 10,
                 borderRadius: 10,
                 marginTop: 5,
               }}>
               <View style={[{zIndex: -0.999, flexDirection: 'row'}]}>
                 {item.image == null ? (
                   <Image
                     style={[{height: 40, width: 40, marginRight: 5}]}
                     source={require('../images/ticket.png')}
                   />
                 ) : (
                   <Image
                     style={[{height: 50, width: 50}]}
                     source={{uri: item.image_url}}
                   />
                 )}
               </View>
               <View style={{position: 'relative', flex: 3, marginLeft: 10}}>
                 <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                   {item.name}
                 </Text>
                 <View style={{flexDirection: 'row'}}>
                   <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                     QTY: {item.no_qty_limit?"NO LIMIT": item.qnty}
                   </Text>
                   <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                     . {item.slug}
                   </Text>
                   {item.is_active == false ? (
                     <View
                       style={[
                         {
                           position: 'absolute',
                           right: 0,
                           backgroundColor: '#e3b8be',
                           marginLeft: 10,
                           paddingHorizontal: 10,
                           borderRadius: 50,
                         },
                       ]}>
                       <Text style={[{color: '#ba071f'}]}>IN ACTIVE</Text>
                     </View>
                   ) : (
                     <View
                       style={[
                         {
                           position: 'absolute',
                           right: 0,
                           backgroundColor: '#DAF8EC',
                           marginLeft: 10,
                           paddingHorizontal: 10,
                           borderRadius: 50,
                         },
                       ]}>
                       <Text style={[{color: '#26C281'}]}>ACTIVE</Text>
                     </View>
                   )}
                 </View>
               </View>
             </View>
               :
               <GridView item={item} supplierProd={true}/>
               }
                
              </TouchableOpacity>
            )}
          />
        
      );
    //}
  }

  render() {
    console.log('categoryarr categoryarr categoryarr', this.props.route.params);
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const {items} = this.props.route.params;
    console.log('sdoooo.....', items);
    return (
      <Scaffold>
        <View
          style={{
            width: width,
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            flex: 1,
            borderRadius: 10,
            flexDirection: 'column',
          }}>
          {/* <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          /> */}
          <Header navigation={this.props.navigation} />
          <View style={{alignSelf: 'flex-start', paddingHorizontal: 10}}>
            <NavBack
              title={`Products - ${items.seller_name}`}
              onClick={() => this.props.navigation.goBack()}
            />
          </View>

         
        
          {/* <ScrollView></ScrollView> */}
          
            <this.listProducts _that={this} />
         
        </View>
      </Scaffold>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    tabBar: state.tabBarReducer,
    reload: state.reloadReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setTabBar: value => dispatch({type: UpdateTabbar, value: value}),
    setScreenReload: value => dispatch({type: PRODUCT_RELOAD, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerProducts);
