import React from 'react';
import {
  View,
  ScrollView,
  Modal as SuspendModal,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  SectionList,
  StatusBar,
  Alert,
} from 'react-native';
import {Text, TextInput, Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/UpdateProductCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER} from '../redux/constants/index';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Constants} from './Constant';
import NavBack from './Components/NavBack';
import Spinner from 'react-native-loading-spinner-overlay';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      spinner: false,
      isChecked: false,
      searchPress: 1,
      search_text: '',
      updateProductModal: false,
      prod_list: [],
      responseProdList:[],
      buyer_detail: {},
      is_default: false,
      categories: [],
      products: [],
      item: {},
      pageNo: 1,

      totalPageCount: 1,
    };
  }

  componentDidMount() {
    this.setState({
      buyer_detail: this.props.route.params.buyer_detail,
      item: this.props.route.params.item,
      pageNo: 1,
    });
    console.log('reduxVComdid', this.props.productFilter);
    console.log('buyer_detail', this.props.route.params.buyer_detail);
    this.getData(Constants.products + '?page=1');
  }
  componentWillReceiveProps() {
    console.log('here in receive props !!!!!!!!!!!!!!!', this.props);
    if (this.props.route == null || this.props.route.params == null) {
      return;
    }

    this.setState({
      buyer_detail: this.props.route.params.buyer_detail,
    });

    console.log('this.props.route', this.props.route.params.filters);
    console.log('recentNewRed', this.props.productFilter);
    console.log('this.props.route', this.props.route.params);
    //this.getData(Constants.productslist);
    let filters = this.props.productFilter.filters;
    let filter = '?';
    for (let i = 0; i < filters.length; i++) {
      filter = filter + filters[i].key + '=' + filters[i].value;
      if (i != filters.length - 1) {
        filter = filter + '&';
      }
    }

    this.getData(
      Constants.productslist + filter + '&page=' + this.state.pageNo,
    );
  }

  getData(url) {
    console.log('NewUrl', url);
    let token = this.props.user.access_token;
    let data_arr = [];
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson.message @@@@...#####', responseJson);
        console.log('responseJson.postData', postData);
        // this.setState({
        //     spinner: false,

        // });
        if (
          responseJson.status === 'success' ||
          responseJson.success === true
        ) {
          let producResp = responseJson;
          let datares_arr = responseJson.data;
          // console.log('all data  ', datares_arr);
          let categories = [];

          for (let i = 0; i < datares_arr.length; i++) {
            // console.log('index ', i);
            // console.log('data_arrdata_arrdata_arr ', datares_arr[i]);
            // console.log('data_arrdata_arrdata_arr 2', datares_arr[i].category);
            let cat_name = '';
            // if (!datares_arr[i].category || datares_arr[i].category == null) {
            //   continue;
            //   // cat_name = datares_arr[i].category;
            // }
            cat_name = datares_arr[i].category;
            console.log('log in array', this.in_array(categories, cat_name));
            if (this.in_array(categories, cat_name) === -1) {
              // console.log('categoriescategoriescategories categories', categories)
              categories.push(datares_arr[i].category);
              console.log('Cat gories', categories);
              data_arr.push({
                category: cat_name,
                data: [],
              });
              console.log('rdatakk.....d', datares_arr[i]);
              console.log("gories$##",data_arr)
              // data_arr.push({
              //     category: 'null cat here',
              //     data: [],
              //     isChecked:false
              // });
              for (let j = 0; j < datares_arr.length; j++) {
                console.log('sd...', datares_arr[j]);
                // console.log('datares_arr[j].category 1', datares_arr[j].category);
                // console.log('cat_name 1', cat_name);
                if (datares_arr[j].category == cat_name) {
                  console.log('.....eeeee........ee...');
                  datares_arr[j].isChecked = false;
                  data_arr[data_arr.length - 1].data.push(datares_arr[j]);

                }
              }

              console.log("yupoo$##",data_arr[0])

              //  break;
            }
          }

          // this.setState({
          //   spinner: false, 
          //   totalPageCount: producResp.pages,
          //   responseProdList:[...this.state.responseProdList,...producResp.data],
          //   prod_list: [...this.state.prod_list, ...data_arr],
          // });
          //if route screen is update product get all te products buyer is given access to and do
          //te
          if (this.props.route.params.screen == 'updateproduct') {
            // alert('fff');
            const approve_product_url = `${Constants.approved_buyer_products}?id=${this.props.route.params.item.buyer_id}&page=${this.state.pageNo}`;
console.log("approve_product_url%$$$0",approve_product_url)
            let postRData = {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
              },
            };
            fetch(approve_product_url, postRData)
              .then(response => response.json())
              .then(async responseJson => {
                console.log(
                  '~~~~~~~~~~~~~~~~~~aproved products respnse@@@@@@@',
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
                  //get approved product
                  console.log('sowpd.....dll...', responseJson.data.length);
                  //   const approvedProducts=responseJson.data;
                  if (responseJson.data.length > 0) {
                    console.log('repoii......dd', data_arr);
                    for (let k = 0; k < data_arr.length; k++) {
                      for (let l = 0; l < data_arr[k].data.length; l++) {
                        let productId = data_arr[k].data[l].id;
                        console.log('repoii......dd', productId);
                        for (let m = 0; m < responseJson.data.length; m++) {
                          // console.log('monsb...dsd',responseJson.data[m])
                          if (productId == responseJson.data[m].id) {
                            console.log('worked....', productId);
                            data_arr[k].data[l].isChecked = true;
                            console.log(
                              'iscjeck,.....d',
                              data_arr[k].data[l].isChecked,
                            );
                          }
                        }
                      }
                    }
                    console.log('dataR......dsa...', data_arr);
                    this.setState({
                      spinner: false,
                      // data:  responseJson.data,
              //responseProdList:[...this.state.responseProdList,...producResp.data],

                      totalPageCount: producResp.pages,
                      prod_list: [...this.state.prod_list, ...data_arr],
                    });
                  }
                } else if (responseJson.status == 401) {
                  this.unauthorizedLogout();
                } else {
                  let message = responseJson.message;
                  Alert.alert('Error', message);
                }
              });
          } else {
            console.log('dataR......dsa...', data_arr);
            this.setState({
              spinner: false, 
              totalPageCount: producResp.pages,
              //responseProdList:[...this.state.responseProdList,...producResp.data],
              prod_list: [...this.state.prod_list, ...data_arr],
            });
          }
        } else if (responseJson.status == 401) {
          this.setState({
            spinner: false,
          });
          this.unauthorizedLogout();
        } else {
          this.setState({
            spinner: false,
          });
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  in_array(arr, value) {
    console.log('arr', arr);
    console.log('value', value);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == value) {
        return i;
      }
    }
    return -1;
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  updateProductAccess() {
    this.setState({spinner: true});
    let products = this.state.products;

    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify({
        products: products,
        // products: [
        //     "100",
        //     "101",
        //     "102"
        // ]
      }),
    };
    let buyer_id = this.state.buyer_detail.buyer_id;
    console.log(this.state.item);
    console.log(
      'buyer_id ',
      Constants.approve_request + '?id=' + this.state.item.buyer_id,
    );
    fetch(
      this.props.route.params.screen == 'buyer'
        ? Constants.approve_request + '?id=' + this.state.item.id
        : Constants.updateBuyerProduct +
            '?id=' +
            this.props.route.params.item.buyer_id,
      postData,
    )
      .then(response => response.json())
      .then(async responseJson => {
        console.log('update products access data ', postData);
        console.log(
          '&&&&&&&&&&&&&&&&&&&&&&&&&&&&update products access respones ',
          responseJson,
        );
        this.setState({spinner: false, updateProductModal: false});
        if (responseJson.success) {
          Alert.alert("Success",'Product update successfull', [
            {
              text:"OK",
              onPress:()=>{
                if (this.props.route.params.screen == 'buyer') {
                  this.props.navigation.navigate('Connect');
                } else {
                  this.props.navigation.navigate('BuyersView', {
                    items: this.props.route.params.item,
                    heading: 'BUYERS',
                  });
                  //this.props.navigation.goBack();
                }
              }
            }
          ]);
         

          // this.props.navigation.goBack();
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          console.log('error --------- ', responseJson.data);
          let message = responseJson.data.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
      });
  }
  onItemPress(item) {
    let list = this.state.prod_list;
    list = this.updateList(list, item);
    this.setState({
      prod_list: list,
    });
  }

  updateList(list, item) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].data.length; j++) {
        let search_id = list[i].data[j].id;
        if (item.id == search_id) {
          list[i].data[j].isChecked = !list[i].data[j].isChecked;
        }
      }
    }
    return list;
  }
  category_pressed(category) {
    let list = this.state.prod_list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].category == category) {
        list[i].isChecked = !list[i].isChecked;
        for (let j = 0; j < list[i].data.length; j++) {
          list[i].data[j].isChecked = list[i].isChecked;
        }
      }
    }
    this.setState({
      prod_list: list,
    });
  }

  Item = ({item}) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => this.onItemPress(item)}>
        <View style={[{}, styles.flatListRowView]}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../images/ticket.png')}
          />
          <Text style={[{}, styles.flatListRowText]}> {item.name}</Text>
          <Icon
            style={[{right: 10}, styles.flatelistHeadingIcon]}
            name="check-circle"
            color={item.isChecked ? '#26C281' : '#aaa'}
            size={20}
          />
        </View>
      </TouchableOpacity>
    );
  };

  showUpdateProductAccessPopup() {
    // if(this.state.products.length<1){
    //     Alert.alert("Error","Please select a product.");
    //     return;
    // }

    let list = this.state.prod_list;
    let products = this.state.products;
    let categories = [];
    for (let i = 0; i < list.length; i++) {
      let cat_marked = false;
      for (let j = 0; j < list[i].data.length; j++) {
        if (list[i].data[j].isChecked) {
          products.push(list[i].data[j].id + '');
          cat_marked = true;
        }
      }
      if (cat_marked) {
        categories.push(list[i].category);
      }
    }
    // if(products.length<1){
    //     Alert.alert("Error","Please select a product.");

    this.setState({
      products: products,
      categories: categories,
      // updateProductModal: false
    });
    if (this.state.products.length < 1) {
      Alert.alert('Error', 'Please select a product.');
      return;
    } else {
      this.setState({
        updateProductModal: true,
      });
    }
  }

  countProductSelected() {
    const {prod_list} = this.state;
    let count = 0;
    console.log('@@@@count List @@@@###', prod_list);
    for (let k = 0; k < prod_list.length; k++) {
      const item = prod_list[k];
      for (let index = 0; index < item.data.length; index++) {
        console.log('$####@@', item.data[index]);
        if (item.data[index].isChecked) {
          count++;
        }
      }
    }
    // prod_list.filter(item=>{
    //     item.data.filter(itx=>{
    //         console.log("##bboos^^^^",itx)
    //     })
    // })
    return count;
  }

  searchProducts() {
    const {search_text} = this.state;
    if (search_text.trim() == '') {
      this.getData(Constants.productslist);
      //Alert.alert("Info","Enter product to search")
    }
    console.log('seearc@@##', search_text);
    this.getData(`${Constants.productslist}?search=${search_text}`);
  }

  handleLoadMore = () => {
    // if (!this.state.spinner) {
    // alert(this.state.totalPageCount);
    const pageNo = this.state.pageNo + 1; // increase page by 1
    this.setState({pageNo});

    const product_url = Constants.productslist + '?page=' + pageNo;

    console.log('product_url$##@0', product_url);
    this.getData(product_url);

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

  render() {
    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Spinner
            cancelable={true}
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <Header navigation={this.props.navigation} />

          <NavBack
            title={
              this.props.route.params.screen == 'buyer'
                ? 'CONNECT ' + this.state.buyer_detail.buyer_name
                : 'UPDATE PRODUCTS ' + this.state.buyer_detail.buyer_name
            }
            onClick={() => this.props.navigation.goBack()}
          />
          <View style={[{}, styles.headingDescView]}>
            <Text style={[{}, styles.headingDescText]}>
              Select Product category or products you want Merchant to have
              access to
            </Text>
          </View>
          <View style={[{}, styles.headingBoxView]}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../images/bage.png')}
            />
            <Text style={[{}, styles.headingBoxText]}>
              {this.state.buyer_detail.buyer_name}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#E6E6E6',
              marginVertical: 10,
              width: width - 20,
              alignSelf: 'center',
            }}></View>
          <View style={[{}, styles.searchRowView]}>
            <TouchableOpacity onPress={() => this.searchProducts()}>
              <View>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../images/products/searchicon.png')}
                />
              </View>
            </TouchableOpacity>
            <View>
              <TextInput
                value={this.state.search_text}
                onChangeText={text => this.setState({search_text: text})}
                onSubmitEditing={() => this.searchProducts()}
                label="Search product or product category"
                style={{backgroundColor: 'transparent'}}
                width={width - 50}
                alignSelf={'center'}
                color={'#000'}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Filter', {
                  screen: 'UpdateProduct',
                })
              }
              style={[{}, styles.searchRowSettingIconView]}>
              <Image
                style={{height: 40, width: 40}}
                source={require('../images/Order/settingicon.png')}
              />
            </TouchableOpacity>
          </View>
          {/* <ScrollView> */}
          <View style={[{}, styles.selectedProductRowView]}>
            <Text style={[{}, styles.darkGrayBoldText]}>
              {this.countProductSelected()}{' '}
            </Text>
            <Text style={[{}, styles.darkGrayNormalText]}>
              product selected
            </Text>
          </View>
          {this.state.prod_list.length == 0 ? null : (
            <SectionList
              refreshing={true}
              sections={this.state.prod_list}
              keyExtractor={(item, index) => item + index}
              ListFooterComponent={this.renderFooter}
              renderItem={({item}) => <this.Item item={item} />}
              renderSectionHeader={({section: {category, isChecked}}) => (
                <TouchableOpacity
                  onPress={() => this.category_pressed(category)}
                  style={{marginTop: 22}}>
                  <Text
                    style={[
                      {justifyContent: 'center', alignItems: 'center'},
                      styles.flatelistHeadingText,
                    ]}>
                    {category}
                  </Text>
                  <Icon
                    style={[{right: 20}, styles.flatelistHeadingIcon]}
                    name="check-circle"
                    // color={'#E6E6E6'}
                    color={isChecked ? '#26C281' : '#aaa'}
                    size={20}
                  />
                </TouchableOpacity>
              )}
            />
          )}

          {/* </ScrollView> */}
          <TouchableOpacity
            onPress={() => this.showUpdateProductAccessPopup()}
            style={[{}, styles.redTouchView]}>
            {this.props.route.params.screen == 'buyer' ? (
              <Text style={{color: '#fff'}}>Enable Products </Text>
            ) : (
              <Text style={{color: '#fff'}}>Update Product Access</Text>
            )}
          </TouchableOpacity>

          <Modal
            onDismiss={() =>
              this.setState({
                updateProductModal: false,
                products: [],
                categories: [],
              })
            }
            visible={this.state.updateProductModal}
            onRequestClose={() =>
              this.setState({
                updateProductModal: false,
                products: [],
                categories: [],
              })
            }
            //transparent={true}
            transparent={true}
            dismissable={true}>
            <View
              // onPress={() => this.setState({ updateProductModal: false ,products:[],categories:[]})}
              style={[{}, styles.modalMainContainer]}>
              <View style={[{}, styles.modalCOntainer]}>
                <Image source={require('../images/bluequesmark.png')} />
                <Text style={[{}, styles.modalNormalText]}>
                  You are about to give
                </Text>
                <View style={[{}, styles.modalTextRowView]}>
                  <Text style={[{}, styles.modalNormalText]}>
                    {this.state.buyer_detail.buyer_name} access to
                  </Text>
                  <Text style={[{}, styles.modalBOldText]}>
                    {' '}
                    {this.state.products.length}{' '}
                  </Text>
                </View>
                <View style={[{}, styles.modalTextRowView]}>
                  <Text style={[{}, styles.modalBOldText]}>products </Text>
                  <Text style={[{}, styles.modalNormalText]}>
                    in {this.state.categories.length} product category
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.updateProductAccess()}
                  style={[{backgroundColor: '#B1272C'}, styles.modalTouchView]}>
                  <Text style={{color: '#fff'}}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      updateProductModal: false,
                      products: [],
                      categories: [],
                    })
                  }
                  style={[{backgroundColor: '#fff'}, styles.modalTouchView]}>
                  <Text style={{color: '#929497'}}>Cancel</Text>
                </TouchableOpacity>
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
    productFilter: state.productFilterReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
