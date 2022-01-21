/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  Modal,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  SafeAreaView,
} from 'react-native';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/CustomerCss';
import fontStyles from '../css/FontCss';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from '../views/Constant';
import Header from './Header';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER, CUSTOMER_RELOAD} from '../redux/constants/index';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
import { getCustomers } from '../redux/actions/customer_action';
import EmptyList from './Components/EmptyList';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      calenderModal: false,
      page: 1,
      search_text: '',
      spinner: false,
      data: [],
      pageNo: 1,
      isFetching: false,
      totalPageCount: 1,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  componentDidMount() {
    console.log('this.props.user', this.props.user.access_token);
   // this.getCustomers(Constants.customerlist + '?page=' + this.state.pageNo);

    this.props.getCustomers(Constants.customerlist + '?page=' + this.state.pageNo, false, () => {
      this.unauthorizedLogout();
    },()=>{
      Alert.alert("ERROR",this.props.customers.error)
    });
  }

  handleLoadMore = () => {
    // if (!this.state.spinner) {
    // alert(this.state.totalPageCount);
    const pageNo = this.state.pageNo + 1; // increase page by 1
    this.setState({pageNo});

    const customer_url = Constants.customerlist + '?page=' + pageNo;

    console.log('customer_url$##@0', customer_url);
    this.props.getCustomers(customer_url + '?page=' + this.state.pageNo, true, () => {
      this.unauthorizedLogout();
    },()=>{
      Alert.alert("ERROR",this.props.customers.error);
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
      this.props.customers.totalPageCount > 1 &&
      this.state.pageNo < this.props.customers.totalPageCount
    ) {
      return (
        <TouchableOpacity
          onPress={() => this.handleLoadMore()}
          style={{
            padding: 5,
            alignSelf: 'center',
            marginTop: 7,
            marginBottom: 400,
            paddingVertical: 40,
          }}>
          <Text style={{letterSpacing: 1.1, fontWeight: 'bold'}}>
            Load More
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  // getCustomers(url) {
  //   this.setState({spinner: true});
  //   let postData = {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: this.props.user.access_token,
  //     },
  //   };
  //   //'https://com.cicodsaasstaging.com/com/api/customers?page=1'
  //   // Constants.customerlist+'?page='+this.state.page
  //   fetch(url, postData)
  //     .then(response => response.json())
  //     .then(async responseJson => {
  //       console.log('responseJson !!!! @@@@@@@@@@@@', responseJson);
  //       this.setState({
  //         spinner: false,
  //         isFetching: false,
  //       });
  //       if (responseJson.status === 'success') {
  //         this.setState({
  //           data: [...this.state.data, ...responseJson.data],
  //           totalPageCount: responseJson.pages,
  //         });
  //         // this.props.navigation.navigate('DrawerNavigation')
  //       } else if (responseJson.status == 401) {
  //         this.unauthorizedLogout();
  //       } else {
  //         let message = responseJson.message;
  //         // Alert.alert('Error', message);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error !!!', error);
  //     });
  // }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  customerDetails(items) {
    console.log('items !!!!!!!!!!!!', items.id);
    this.props.navigation.navigate('CustomersDetal', {customer_id: items.id});
  }

  search() {
    let url =
      Constants.customerlist +
      '?first_name=' +
      this.state.search_text +
      '&last_name=' +
      this.state.search_text;
      this.props.getCustomers(url, false, () => {
        this.unauthorizedLogout();
      },()=>{
        Alert.alert("ERROR",this.props.customers.error);
      });
  }

  onRefresh = () => {
    console.log('222222222222', this.state.isFetching);
   // this.setState({isFetching: true, data: []});
    // if(this.state.isFetching==true){

    // let search_url = Constants.productslist + '?search=' + this.state.search_product;
    let url = Constants.customerlist + '?page=1';
    this.props.getCustomers(url, false, () => {
      this.unauthorizedLogout();
    },()=>{
      Alert.alert("ERROR",this.props.customers.error);
    });
    
    return;
    // }
    
    // _that.setState({
    //     url_orders: url,
    // })
  };
  render() {
    // if (this.props.reload.customer) {
    //   this.getCustomers(Constants.customerlist + '?page=1');
    //   this.props.setScreenReload({
    //     reload: false,
    //   });
    // }

    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <Scaffold style={{flex: 1}}>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <View style={[{}, styles.headerRow]}>
            <NavBack
              title="CUSTOMERS"
              onClick={() => this.props.navigation.goBack()}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddNewCustomer',{action:"create"})}
              style={[{}, styles.headerRowPlusiconView]}>
              {/* <View > */}
              <Image
                style={{height: 30, width: 30}}
                source={require('../images/products/circlePlus.png')}
              />
              {/* </View> */}
            </TouchableOpacity>
          </View>
          {/* <View style={[{}, styles.searchBoxView]}>
                    <Image
                        style={{height:25,width:25}}
                        source={require('../images/products/searchicon.png')}
                    />
                    <TextInput
                        onChangeText={text => this.setState({ search_text: text })}
                        onSubmitEditing={() => this.search()}
                        label=""
                        style={{ backgroundColor: 'transparent', borderBottomWidth: 0, borderColor: '#fff' }}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                    />
                </View> */}
          <Searchbar
            placeholder="Search Customer"
            style={[{color: '#D8D8D8'}, fontStyles.normal14,{
              width: width - 20,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 5,
              elevation: 0,
              borderColor: '#D8DCDE',
            }]}
            iconColor="#929497"
            
            onChangeText={text => this.setState({search_text: text})}
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
                marginTop: 2,
                marginBottom: 2,
              },
            ]}></View>
          <View style={{flex: 1}}>
            
              <FlatList
                data={this.props.customers.data}
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View
                      style={[styles.separator, highlighted && {marginLeft: 0}]}
                    />
                  ))
                }
                ListEmptyComponent={<EmptyList title="No Customer Found" />}
                refreshing={this.props.customers.isFetching}
                onRefresh={this.onRefresh}
                keyExtractor={(item, index) => index}
                ListFooterComponent={this.renderFooter}
                renderItem={({item, index, separators}) => (
                  <TouchableOpacity
                    // key={item.key}
                    onPress={() => this.customerDetails(item)} //=>this.props.navigation.navigate('CustomersDetal')
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View
                      style={{
                        position: 'relative',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        width: width - 20,
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 5,
                      }}>
                      <View style={[{flexDirection: 'row'}]}>
                        <Image
                          style={[{height: 50, width: 50, marginRight: 5}]}
                          source={require('../images/customer/usericon.png')}
                        />
                      </View>
                      <View style={{position: 'relative', flex: 3}}>
                        <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                          {item.first_name + ' ' + item.last_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            numberOfLines={3}
                            style={[
                              {color: '#929497', width: width / 1.8},
                              fontStyles.normal12,
                            ]}>
                            {item.email + '.' + item.phone}
                          </Text>
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
                            <Text style={[{color: '#26C281'}]}>
                              {item.is_active ? 'ACTIVE' : 'IN ACTIVE'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
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
    reload: state.reloadReducer,
    customers:state.customReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setScreenReload: value => dispatch({type: CUSTOMER_RELOAD, value: value}),
    getCustomers: (url, loadmore, next) =>
    dispatch(getCustomers(url, loadmore, next)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
