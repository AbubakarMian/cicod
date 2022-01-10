/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Modal as OtherModal,
  FlatList,
  Dimensions,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {Text, TextInput, Searchbar, Modal} from 'react-native-paper';

import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss';

import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
  SET_USER,
  LOGOUT_USER,
  UpdateTabbar,
  PRODUCT_RELOAD,
} from '../redux/constants/index';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
import DropDownPicker from 'react-native-dropdown-picker';
import {Constants} from '../views/Constant';
import {Picker} from '@react-native-picker/picker';
import TabNav from '../views/TabsNav';
import _ from 'lodash';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

import NavBack from './Components/NavBack';
import DropDownModal from './Components/DropDownModal';
import CategoryDropdown from './Components/CategoryDropdown';
import Scaffold from './Components/Scaffold';
import {getProducts} from '../redux/actions/product_action';
import EmptyList from './Components/EmptyList';
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      selectedStartDate: null,
      calenderModal: false,
      data: [],
      categoryarr: [],
      category_id: '',
      showdropDownModal: false,
      search_product: '',
      spinner: false,
      prod_image: '',
      reload: true,
      filters: [],
      url_products: '',
      isFetching: false,
      pageNo: 1,
      totalPageCount: 1,
      isListView: true,
      isShowSearch: false,
      showFloatingButton: false,
      productImageModal: false,
      prodImage: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onRefresh() {
    console.log('222222222222', this.state.isFetching);
    this.setState({isFetching: true, data: []});
    // if(this.state.isFetching==true){

    // let search_url = Constants.productslist + '?search=' + this.state.search_product;
    let product_url = Constants.productslist + '?page=' + this.state.pageNo;
    this.props.getProducts(product_url, false, () => {
      this.unauthorizedLogout();
    });
    return;
    // }

    // _that.setState({
    //     url_orders: url,
    // })
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  async componentDidMount() {
    console.log(
      '~~~~~~~~~~~~~~~~~~~~*************',
      this.props.user.access_token,
    );
    let product_url = Constants.productslist + '?page=' + this.state.pageNo;
    this.props.getProducts(product_url, false, () => {
      this.unauthorizedLogout();
    });
    // this.getData(product_url);
    const that = this;
    setTimeout(function () {
      that.getCategoryList();
    }, 700);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.route.params, 'ds%0', this.props.route.params);
    if (!_.isEqual(prevProps.route.params, this.props.route.params)) {
      let product_url = Constants.productslist + '?page=' + this.state.pageNo;
      this.getData(product_url);
    }
  }

  async getData(url) {
    let _that = this;
    if (_that.state.isFetching == true) {
      _that.setState({isFetching: false});
    }

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
          isFetching: false,
        });
        if (
          responseJson.status === 'success' ||
          responseJson.success === true
        ) {
          await this.setState({
            data: [...this.state.data, ...responseJson.data],
            totalPageCount: responseJson.pages,
          });
        } else if (responseJson.status === 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          // Alert.alert('Error', message);
        }
      });
  }

  search() {
    this.setState({data: []});
    let search_url =
      Constants.productslist + '?search=' + this.state.search_product;
    console.log('urlsearch$#', search_url);
    // this.getData(search_url);
    this.props.getProducts(search_url, false, () => {
      this.unauthorizedLogout();
    });
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
        // console.log('responseJson responseJson', responseJson);

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
          // Alert.alert('Error', message);
        }
      });
  }

  onCategoryText = category_id => {
    console.log(
      ' category ID search !!!!!!!!!!!!!!!@@@@@@@@@@@@@@',
      category_id,
    );
    this.setState({category_id, showdropDownModal: false, pageNo: 1, data: []});
    let url =
      category_id == ''
        ? Constants.productslist + '?page=' + this.state.pageNo
        : Constants.productslist +
          '?category_id=' +
          category_id +
          '&page=' +
          this.state.pageNo;
    //this.getData(url);
    this.props.getProducts(url, false, () => {
      this.unauthorizedLogout();
    });
  };

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
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
    this.props.getProducts(product_url, true, () => {
      this.unauthorizedLogout();
    });

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
      this.props.products.totalPageCount > 1 &&
      this.state.pageNo < this.props.products.totalPageCount
    ) {
      return (
        <TouchableOpacity
          onPress={() => this.handleLoadMore()}
          style={{
            padding: 5,
            alignSelf: 'center',
            marginTop: 7,
            marginBottom: 300,
          }}>
          <Text style={{letterSpacing: 1.1, fontWeight: 'bold'}}>
            Load More
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  listProducts(props) {
    let _that = props._that;
    // let url = Constants.productslist;
    // if (
    //   _that.props.route == null ||
    //   _that.props.route.params == null ||
    //   _that.props.route.params.filters == null
    // ) {
    //   url = Constants.productslist + '?page=' + _that.state.pageNo;
    // } else {
    //   let filters = _that.props.route.params.filters;
    //   let filter = '?page=' + _that.state.pageNo;
    //   for (let i = 0; i < filters.length; i++) {
    //     filter = filter + filters[i].key + '=' + filters[i].value;
    //     if (i != filters.length - 1) {
    //       filter = filter + '&';
    //     }
    //   }
    //   url = Constants.productslist + filter;
    // }
    // console.log('reloaded 1', _that.props.reload.product);
    // if (url != _that.state.url_products || _that.props.reload.product) {
    //   console.log('reloaded', _that.props.reload.product);
    //   _that.props.setScreenReload({
    //     reload: false,
    //   });
    //   _that.getData(url);
    //   _that.setState({
    //     url_products: url,
    //   });
    // }
    // console.log('url_products ', url);
    // return null;
    // if (_that.props.products.data.length < 1) {
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
    //         No Product found
    //       </Text>
    //     </View>
    //   );
    // } else {
    return (
      <View>
        <FlatList
          ref={ref => {
            _that.flatListRef = ref;
          }}
          onScroll={event => {
            console.log('posi#');

            if (
              event.nativeEvent.contentOffset.y >= 520.5 &&
              !_that.state.showFloatingButton
            ) {
              _that.setState({
                showFloatingButton: true,
              });
            }

            if (
              event.nativeEvent.contentOffset.y < 520.5 &&
              _that.state.showFloatingButton
            ) {
              _that.setState({
                showFloatingButton: false,
              });
            }
          }}
          ListEmptyComponent={<EmptyList title="No Product Found" />}
          ListHeaderComponent={_that.listHeader}
          onRefresh={() => _that.onRefresh()}
          refreshing={_that.props.products.isFetchingProducts}
          style={{}}
          data={_that.props.products.data}
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[styles.separator, highlighted && {marginLeft: 0}]}
              />
            ))
          }
          keyExtractor={(item, index) => index}
          ListFooterComponent={_that.renderFooter}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
            activeOpacity={0.5}
              key={item.key}
              onPress={() =>
                _that.state.isListView
                  ? _that.props.navigation.navigate('ProductView', {
                      prod_id: item.id,
                    })
                  : _that.setState({
                      prodImage: item.image,
                      productImageModal: true,
                    })
              }
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              {_that.state.isListView ? (
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
                        style={[{height: 50, width: 50, marginRight: 5}]}
                        source={require('../images/ticket.png')}
                      />
                    ) : (
                      <Image
                        style={[{height: 50, width: 50, borderRadius: 10}]}
                        source={{uri: item.image}}
                      />
                    )}
                  </View>
                  <View style={{position: 'relative', flex: 3, marginLeft: 10}}>
                    <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                        QTY: {item.no_qty_limit ? 'NO LIMIT' : item.quantity}
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
              ) : (
                <View
                  style={{
                    width: width - 20,
                    height: width - 20,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    marginTop: 20,
                  }}>
                  {item.is_active == false ? (
                    <View
                      style={[
                        {
                          zIndex: 1000,
                          position: 'absolute',
                          top: 20,
                          right: 10,
                          backgroundColor: '#e3b8be',

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
                          top: 20,
                          zIndex: 1000,
                          position: 'absolute',
                          right: 10,
                          backgroundColor: '#DAF8EC',

                          paddingHorizontal: 10,
                          borderRadius: 50,
                        },
                      ]}>
                      <Text style={[{color: '#26C281'}]}>ACTIVE</Text>
                    </View>
                  )}
                  <View style={{height: (width - 20) / 1.3}}>
                    {item.image == null ? (
                      <Image
                        style={{
                          flex: 1,
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                        }}
                        source={require('../images/local-business.png')}
                      />
                    ) : (
                      <Image
                        style={[
                          {
                            flex: 1,
                            width: '100%',
                            height: '100%',

                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            resizeMode: 'cover',
                          },
                        ]}
                        source={{uri: item.image}}
                      />
                    )}
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                    <Text style={{color: '#B1272C', fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 12}}>
                        QTY: {item.no_qty_limit ? 'NO LIMIT' : item.quantity}
                      </Text>

                      <Text>
                        {item.currency}
                        {item.has_vat
                          ? item.price + item.vat_amount
                          : item.price}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    );
    // }
  }

  listHeader = () => {
    return (
      <>
        <View
          style={{
            marginBottom: 5,
            flexDirection: 'row',
            width: width - 20,
            alignSelf: 'center',
            borderRadius: 5,
            marginTop: 3,
            alignItems: 'center',
          }}>
          <Searchbar
            placeholder="Search product, Price and code"
            style={[
              {color: '#D8D8D8'},
              fontStyles.normal14,
              {
                width: width / 1.1,
                alignSelf: 'center',
                elevation: 0,
                borderColor: '#D8DCDE',
              },
            ]}
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

          {/* <TouchableOpacity
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
            </TouchableOpacity> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={[
              {
                // position: 'relative',
                borderBottomColor: '#E6E6E6',
                borderBottomWidth: 1,
                flex: 2,
              },
              styles.formColumn,
            ]}>
            <CategoryDropdown
              title="Select Product Category"
              onPress={() => this.setState({showdropDownModal: true})}
            />

            {/* <DropDownPicker
                            scrollViewProps={{
                                persistentScrollbar: true,
                            }}
                            dropDownDirection="AUTO"
                            bottomOffset={200}
                            
                            items={this.state.categoryarr}
                            placeholder="Product Category"
                            containerStyle={{ height: 50, marginTop: 5, width: width - 20, alignSelf: 'center' }}
                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                            dropDownStyle={{ height: 160, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                            labelStyle={{ color: '#A9A9A9' }}
                            onChangeItem={item => this.onCategoryText(item.value)}
                        /> */}
          </View>
          <View
            style={
              {
                // marginVertical: 5,
              }
            }></View>

          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              // position: 'absolute',
              // right: 0,
              // alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              // paddingLeft: 10,
            }}
            onPress={() => {
              this.setState({data: [], pageNo: 1});
              let product_url = Constants.productslist + '?page=1';
              // this.getData(product_url);
              this.props.getProducts(product_url, false, () => {
                this.unauthorizedLogout();
              });
            }}>
            <Icon name="refresh" size={30} color="#929497" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 5,
            alignSelf: 'center',
            width: 200,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({isListView: true})}
            style={[
              styles.titleViewStyle,
              this.state.isListView ? styles.activeView : {},
            ]}>
            <Text>List View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({isListView: false})}
            style={[
              styles.titleViewStyle,
              !this.state.isListView ? styles.activeView : {},
            ]}>
            <Text>Grid View</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  render() {
    console.log('ui#@@m', this.state.pageNo, 'd87#@', this.props.products.data);

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
            visible={
              this.state.spinner || this.props.products.isFetchingProducts
            }
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          /> */}
          <Header navigation={this.props.navigation} />
          <View style={{padding: 10, width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <NavBack
                title="PRODUCTS"
                onClick={() => this.props.navigation.navigate('Home')}
              />

              {/* <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ProductCategory')}
                        >
                            <Text style={{ fontSize: 12, color: '#B1272C', marginRight: 10 }}>View Product Category</Text>
                        </TouchableOpacity> */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <TouchableOpacity
                        style={{marginRight:10}}
                onPress={() => this.setState({isShowSearch: !this.state.isShowSearch})}
                // onPress={() => this.props.navigation.navigate('CreateProduct', { action: 'create', prodDetail: null })}
              >
               <Icon size={30} name="search" color="#ACB5BD" />
              </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => this.setState({isShowModal: true})}
                  // onPress={() => this.props.navigation.navigate('CreateProduct', { action: 'create', prodDetail: null })}
                >
                  <Image
                    style={{height: 30, width: 30}}
                    source={require('../images/products/circlePlus.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <ScrollView></ScrollView> */}
          <View style={{flex: 1, marginBottom: 10}}>
            <this.listProducts _that={this} />
          </View>
          {this.state.showFloatingButton && (
            <TouchableOpacity
              onPress={() =>
                this.flatListRef.scrollToOffset({animated: true, offset: 0})
              }
              style={{position: 'absolute', right: 20, bottom: 70}}>
              <Icon size={40} color="#B1272C" name="chevron-circle-up" />
            </TouchableOpacity>
          )}

          <TabNav
            style={{position: 'absolute', bottom: 0}}
            screen={'product'}
            props={this.props}
          />
          {/* <Modal
                 animationType="fade"
                 visible={true}//this.state.regionModal
                 transparent={true}
                 hasBackdrop={true}
                 deviceHeight={height}
                 deviceWidth={width}
                 ba
                 justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 backgroundColor={'#000'}
                 opacity={0.8}
                > */}

          <OtherModal
            visible={this.state.isShowModal}
            onRequestClose={() => this.setState({isShowModal: false})}
            transparent={true}>
            <TouchableOpacity
              onPress={() => this.setState({isShowModal: false})}>
              <View style={[{}, styles.modalBackGround]}>
                <TouchableWithoutFeedback>
                  <View style={styles.suspendModal}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/add_product_sm.png')}
                      />
                      <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}
                        onPress={() =>
                          this.setState({isShowModal: false}, () => {
                            this.props.navigation.navigate('CreateProduct', {
                              action: 'create',
                              prodDetail: null,
                            });
                          })
                        }
                        style={[
                          {marginLeft: 7, width: '100%'},
                          styles.suspendTouch,
                        ]}>
                        <Text style={{color: '#4E4D4D'}}>Add Product</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/product_cat_sm.png')}
                      />
                      <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}
                        onPress={() =>
                          this.setState({isShowModal: false}, () => {
                            this.props.navigation.navigate(
                              'CreateProductCategory',
                              {action: 'create'},
                            );
                          })
                        }
                        style={[
                          {marginLeft: 7, width: '100%'},
                          styles.suspendTouch,
                        ]}>
                        <Text style={{color: '#4E4D4D'}}>
                          Add Product Category
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{marginTop:5}} /> */}
                    {/* <TouchableOpacity
                                onPress={() => this.setState({suspendModal:false})}
                                style={[{}, styles.suspendTouch]}>
                                <Image source={require('../images/redCross.png')} style={[{width:20,height:20}, styles.banImage]} />
                                <Text style={{}}> Cancel</Text>
                            </TouchableOpacity> */}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </OtherModal>
          <DropDownModal
            title="Product Categories"
            selected={this.state.category_id}
            showdropDownModal={this.state.showdropDownModal}
            handleClose={() => this.setState({showdropDownModal: false})}
            onSelected={this.onCategoryText}
            data={this.state.categoryarr}
          />
        </View>

        <Modal visible={this.state.productImageModal} onDismiss={()=>this.setState({productImageModal: false})} transparent={true}>
          <View style={[{flex:1,justifyContent:"center",alignItems:"center"}]}>
            <TouchableOpacity
            
              onPress={() => this.setState({productImageModal: false})}
              style={[{}, styles.modalCloseTouch]}>
              <Icon name="close" color={'#fff'} size={25} />
              <Text style={{color: '#fff', marginLeft: 10}}>Close</Text>
            </TouchableOpacity>
            
            <Image
              style={{height: height / 2, width: width / 1.3}}
              // source={require('../images/juice.png')}

              source={{
                uri: this.state.prodImage,
              }}
            />
            
            
          </View>
        </Modal>
      </Scaffold>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    tabBar: state.tabBarReducer,
    reload: state.reloadReducer,
    products: state.products_reducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setTabBar: value => dispatch({type: UpdateTabbar, value: value}),
    setScreenReload: value => dispatch({type: PRODUCT_RELOAD, value: value}),
    getProducts: (url, loadmore, next) =>
      dispatch(getProducts(url, loadmore, next)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
