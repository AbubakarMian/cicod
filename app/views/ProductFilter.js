import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/Filter.Css';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Constants} from '../views/Constant';
import DropDownPicker from 'react-native-dropdown-picker';
import {SET_USER, LOGOUT_USER} from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
import {color} from 'react-native-reanimated';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {upsert} from '../Common';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      backup_categoryarr: [],
      backup_createdby_arr: [],
      categoryarr: [],
      createdby_arr: [],
      category_name: '',
      spinner: false,
      created_at: 'YY-MM-DD',
      updated_at: 'YY-MM-DD',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      modal_date_type: '',
    };
  }
  async componentDidMount() {
    await this.getCategoryList();
    const that = this;
    setTimeout(function () {
      that.getProductList(Constants.productslist);
    }, 700);
    // await this.getProductList(Constants.productslist);
    return;
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch('https://com.cicodsaasstaging.com/com/api/orders', postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('response !!!!!!!!', responseJson);
        this.setState({Spinner: false});
        this.setState({
          list: responseJson,
          data: responseJson.data,
        });
        if (responseJson.status === true) {
          console.log('dataset', data);
          // this.props.navigation.navigate('DrawerNavigation')
        } else {
          let message = JSON.stringify(responseJson.error.message);
          Alert.alert('Error', message);
        }
      });
  }
  clear_filter() {
    this,
      this.setState({
        data: [],
        filters: [],
        categoryarr: [],
        createdby_arr: [],
        category_name: '',
        spinner: false,
        created_at: 'YY-MM-DD',
        updated_at: 'YY-MM-DD',
        isDatePickerVisible: false,
        setDatePickerVisibility: false,
        modal_date_type: '',
      });
    let _that = this;
    setTimeout(() => {
      _that.setState({
        categoryarr: _that.state.backup_categoryarr,
        createdby_arr: _that.state.backup_createdby_arr,
      });
    }, 300);
  }

  getProductList(url) {
    console.log('products');
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
        // this.setState({
        //   spinner: false,
        // });

        console.log('product list', responseJson.data);
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          // let createdby_arr = res.map((x, key) => { return { label: x.created_by, value: x.created_by } });

          let createdby_arr = [];
          for (let i = 0; i < res.length; i++) {
            let x = res[i];
            upsert(createdby_arr, {
              key: x.created_by,
              label: x.created_by,
              value: x.created_by,
            });
          }

          console.log('createdby_arr createdby_arr !!!!!!', createdby_arr);
          this.setState({
            createdby_arr: createdby_arr,
            backup_createdby_arr: createdby_arr,
          });

          // this.props.navigation.navigate('DrawerNavigation')
        } else {
          let message = JSON.stringify(responseJson.error.message);
          Alert.alert('Error', message);
        }
      });
  }
  upsert(array, item) {
    // (1)
    let foundindex = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key == item.key) {
        foundindex = i;
        break;
      }
    }
    if (foundindex == -1) {
      array.push(item);
    } else {
      array[foundindex].value = item.value;
    }
    return array;
  }
  upsert_filters(item) {
    // (1)
    let array = this.state.filters;
    array = this.upsert(array, item);
    this.setState({
      filters: array,
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
        console.log('jhgj gtjhgfhgfghfghfghfghfhgf', responseJson);
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let categoryarr = res.map((x, key) => {
            return {label: x.name, value: x.name, id: x.id};
          });
          console.log('category !!!!!!', responseJson.data);
          this.setState({
            categoryarr: categoryarr,
            backup_categoryarr: categoryarr,
          });
        } else {
          let message = JSON.stringify(responseJson.error.message);
          Alert.alert('Error', message);
        }
      });
  }

  onQuantityText(text) {
    let filters = this.state.filters;
    filters.push({key: 'quantity', value: text});
    this.setState({
      filters: filters,
    });
  }

  onCategoryText(id) {
    let filters = this.state.filters; //this.state.filters;
    filters.push({key: 'category_id', value: id});
    this.setState({
      filters: filters,
    });
  }
  onCreatedByText(text) {
    // console.log(' category text text ', text);
    // return
    let filters = this.state.filters; //this.state.filters;
    filters.push({key: 'created_by', value: text});
    this.setState({
      filters: filters,
    });
  }
  activeSet(value) {
    let filters = this.state.filters;
    filters.push({key: 'is_active', value: value});
    this.setState({
      filters: filters,
    });
  }

  applyFilter() {
    console.log('this.state.filters', this.state.filters);
    let filters = this.state.filters;
    this.setState({
      filters: [],
    });
    // this.props.navigation.navigate('Products', { filters: this.state.filters, seller_id: 1 });
    this.props.navigation.navigate('Products', {filters: filters});
  }

  onDateChange(date) {
    () =>
      this.setState({
        selectedStartDate: date,
      });
  }
  setDate = date => {
    this.setState({
      isDatePickerVisible: false,

      // filters: filters
    });

    console.log('date', date);
    console.log('this.state.modal_date_type', this.state.modal_date_type);

    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    var timestamp = date.getTime();

    // let newdate = day + "/" + month + "/" + year;
    // let newdate = year + "/" + month + "/" + day;

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    let newdate = year + '-' + month + '-' + day;

    // let sendDate = year + "/" + month + "/" + day;
    // var timestamp = Date.parse(new Date(sendDate));

    let filters = this.state.filters;
    if (this.state.modal_date_type == 'date_created') {
      this.upsert_filters({key: 'date_created', value: newdate});
      // filters.push({ key: 'date_created', value: newdate });
      this.setState({
        created_at: newdate,
      });
    }
    if (this.state.modal_date_type == 'date_updated') {
      this.upsert_filters({key: 'date_updated', value: newdate});
      // filters.push({ key: 'payment_status_date', value: newdate });
      this.setState({
        updated_at: newdate,
      });
    }
    console.log('filters !!!!!!!!!!!!!!', filters);
  };
  hideDatePicker() {
    console.log(' visibility !!!!!!!!!!!!!');
    this.setState({
      isDatePickerVisible: false,
    });
  }
  render() {
    return (
      <Scaffold>
        <View style={[{zIndex: 0.999}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.Spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            date={new Date()}
            onConfirm={this.setDate}
            onCancel={this.hideDatePicker}
          />
          <View style={[{}, styles.mainRow]}>
            {/* <Image
          source={require('../images')}
          /> */}
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('Products')}
              onPress={() => this.props.navigation.goBack()}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                },
              ]}>
              <Icon name="arrow-left" size={25} color="#929497" />
              <Text
                style={[
                  {color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10},
                ]}>
                FILTER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.clear_filter()}
              style={{position: 'absolute', right: 20, top: 20}}>
              <Text style={[{color: '#929497', fontWeight: 'bold'}]}>
                Clear Filter
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width - 20,
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                width: width - 20,
                backgroundColor: '#fff',
                zIndex: 0.999,
                paddingVertical: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E6E6E6',
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  position: 'relative',
                }}>
                <TextInput
                  onChangeText={text => this.onQuantityText(text)}
                  label="Quantity"
                  style={{backgroundColor: 'transparent'}}
                  width={width - 50}
                  alignSelf={'center'}
                  color={'#000'}
                />
                <View
                  style={{position: 'absolute', right: 10, bottom: 10}}></View>
              </View>
            </View>
            {this.state.createdby_arr.length < 1 ? null : (
              <DropDownPicker
                scrollViewProps={{
                  persistentScrollbar: true,
                }}
                dropDownDirection="AUTO"
                bottomOffset={200}
                items={this.state.createdby_arr}
                placeholder="Created By"
                containerStyle={{height: 50, width: width - 30}}
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 0,
                  borderBottomWidth: 0.5,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{
                  height: 120,
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 10,
                  opacity: 1,
                }}
                labelStyle={{color: '#A9A9A9'}}
                onChangeItem={item => this.onCreatedByText(item.value)}
              />
            )}
            {this.state.categoryarr.length < 1 ? null : (
              <DropDownPicker
                scrollViewProps={{
                  persistentScrollbar: true,
                }}
                dropDownDirection="AUTO"
                bottomOffset={200}
                items={this.state.categoryarr}
                placeholder="Catagory"
                containerStyle={{height: 50, width: width - 30}}
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 0,
                  borderBottomWidth: 0.5,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  zIndex: 0.999,
                }}
                dropDownStyle={{
                  height: 120,
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 10,
                  opacity: 1,
                }}
                labelStyle={{color: '#A9A9A9'}}
                onChangeItem={item => this.onCategoryText(item.id)}
              />
            )}

            <View style={[{flexDirection: 'row', zIndex: -0.999}]}>
              <View style={[{flex: 1, paddingVertical: 10}]}>
                <Text style={{color: '#929497', fontWeight: 'bold'}}>
                  Created Date
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isDatePickerVisible: true,
                      modal_date_type: 'date_created',
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                      padding: 10,
                      marginVertical: 10,
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../images/calenderIcon.png')}
                    />
                    <Text style={{marginLeft: 10, color: '#aaa'}}>
                      {this.state.created_at}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', right: 0, bottom: 20}}>
                    <Icon size={30} name="caret-down" color={'#707070'} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[{flex: 1, paddingVertical: 10}]}>
                <Text
                  style={{
                    color: '#929497',
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  Updated Date
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isDatePickerVisible: true,
                      modal_date_type: 'date_updated',
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      marginLeft: 10,
                      padding: 10,
                      marginVertical: 10,
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../images/calenderIcon.png')}
                    />
                    <Text style={{marginLeft: 10, color: '#aaa'}}>
                      {this.state.updated_at}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', right: 0, bottom: 20}}>
                    <Icon size={30} name="caret-down" color={'#707070'} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }]}>Status</Text> */}
          {/* <View>
         
            <View style={[{ paddingRight: 20 }, styles.mainRow]}>
              <View style={[{ marginRight: 10 }]}>
                <TouchableOpacity onPress={() => this.activeSet(1)}>
                  <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>ACTIVE</Text>
                </TouchableOpacity>
              </View>
              <View style={[{}]}>
                <TouchableOpacity onPress={() => this.activeSet(0)}>
                  <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>INACTIVE</Text>
                </TouchableOpacity>
              </View>




            </View>
          
        </View> */}

          <TouchableOpacity
            onPress={() => this.applyFilter()}
            style={{
              width: width / 1.5,
              marginTop: 20,
              alignSelf: 'center',
              backgroundColor: '#B1272C',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
              borderRadius: 50,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);
