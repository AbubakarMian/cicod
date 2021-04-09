import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Constants } from '../views/Constant';
import DropDownPicker from 'react-native-dropdown-picker';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
import { color } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categoryarr: [],
      createdby_arr: [],
      category_name: '',
      spinner: false,
    };
  }
  componentDidMount() {

    this.getCategoryList()
    this.getProductList(Constants.productslist);
    this.setState({ spinner: true })
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
        console.log('response !!!!!!!!', responseJson)
        this.setState({ Spinner: false });
        this.setState({
          list: responseJson,
          data: responseJson.data
        });
        if (responseJson.status === true) {
          console.log("dataset", data)
          // this.props.navigation.navigate('DrawerNavigation')
        } else {
          let message = JSON.stringify(responseJson.error.message)
          Alert.alert('Error', message)
        }

      })

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
          let createdby_arr = res.map((x, key) => { return { label: x.created_by, value: x.created_by } });
          console.log('createdby_arr createdby_arr !!!!!!', createdby_arr);
          this.setState({
            createdby_arr: createdby_arr,
          });
          // for (let index = 0; index < responseJson.data.length; index++) {
          //   // const created_by = responseJson.data[index].created_by;
          //   let users = responseJson.data[index].created_by; //this.state.filters;
          //   users.push({ lable: text, value: text, });
          //   this.setState({
          //     createdby_arr: users
          //   })

          // }


          this.props.navigation.navigate('DrawerNavigation')
        } else {
          let message = JSON.stringify(responseJson.error.message)
          Alert.alert('Error', message)
        }
      })
  }

  getCategoryList() {
    this.setState({ spinner: true })
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
        this.setState({ spinner: false });
        if (responseJson.status === 'success') {

          let res = responseJson.data;
          let categoryarr = res.map((x, key) => { return { label: x.name, value: x.name } });
          console.log('category !!!!!!', categoryarr);
          this.setState({
            categoryarr: categoryarr,
          });
        } else {
          let message = JSON.stringify(responseJson.error.message)
          Alert.alert('Error', message)
        }

      })

  }

  onQuantityText(text) {
    let filters = this.state.filters;
    filters.push({ key: 'quantity', value: text });
    this.setState({
      filters: filters
    })
  }

  onCategoryText(text) {
    let filters = 'Freezer'; //this.state.filters;
    filters.push({ key: 'category', value: text });
    this.setState({
      filters: filters
    })
  }
  onCreatedByText(text) {
    // console.log(' category text text ', text);
    // return
    let filters = 'Freezer'; //this.state.filters;
    filters.push({ key: 'createdBy', value: text });
    this.setState({
      filters: filters
    })
  }
  activeSet(value) {
    let filters = this.state.filters;
    filters.push({ key: 'is_active', value: value })
    this.setState({
      filters: filters
    })
  }
  applyFilter = () => {
    console.log('this.state.filters', this.state.filters);
    this.props.navigation.navigate('Products', { filters: this.state.filters });
  }
  render() {
    console.log('createdby_arr createdby_arr', this.state.createdby_arr)
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation}/>
        <Spinner
          visible={this.state.Spinner}
          textContent={'Please Wait...'}
          textStyle={{ color: '#fff' }}
          color={'#fff'}
        />
        <View style={[{}, styles.mainRow]}>
          {/* <Image
          source={require('../images')}
          /> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Products')}
          
          style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </TouchableOpacity>
          <Text onPress={() => { this.setState({ filters: [] }) }} style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20, top: 20 }]}>Clear Filter</Text>
        </View>
        <View style={{ width: width - 20, backgroundColor: '#fff', paddingVertical: 10, marginTop: 20 }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>
            <TextInput onChangeText={text => this.onQuantityText(text)}
              placeholder="Quantity"
            />
            <View style={{ position: 'absolute', right: 10, bottom: 10 }}>

            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>
             {this.state.createdby_arr.length < 1 ? null :
              <DropDownPicker
                items={this.state.createdby_arr}
                containerStyle={{ height: 50, width: width - 25, marginTop: 15 }}
                style={{ backgroundColor: '#fff' }}
                itemStyle={{
                  justifyContent: 'flex-start', zIndex: 0.99
                }}
                placeholder="Created By"
                dropDownStyle={{ backgroundColor: '#000', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                labelStyle={{ color: '#A9A9A9' }}
                onChangeItem={item => this.onCreatedByText(item.value)}
              />}
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 0, flexDirection: 'row', position: 'relative' }}>
         
            {this.state.categoryarr.length < 1 ? null :
              <DropDownPicker
                items={this.state.categoryarr}
                containerStyle={{ height: 50, width: width - 25, marginTop: 15 }}
                style={{ backgroundColor: '#fff' }}
                itemStyle={{
                  justifyContent: 'flex-start', zIndex: 0.99
                }}
                placeholder="Catagory"
                dropDownStyle={{ backgroundColor: '#000', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                labelStyle={{ color: '#A9A9A9' }}
                onChangeItem={item => this.onCategoryText(item.value)}
              />}

          </View>

        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[{ flex: 1, paddingVertical: 10 }]}>
            <Text style={{ color: '#929497', fontWeight: 'bold' }}>Created Date</Text>
            <TouchableOpacity>
              <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginRight: 10, padding: 10, marginVertical: 10 }}>
                <Image
                  source={require('../images/calenderIcon.png')}
                />
                <Text style={{ marginLeft: 10, color: '#aaa' }}>DD-MM-YY</Text>
              </View>
              <View style={{ position: 'absolute', right: 20, bottom: 10 }}>
                <Icon
                  size={30}

                  name="caret-down"
                  color={'#707070'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[{ flex: 1, paddingVertical: 10 }]}>
            <Text style={{ color: '#929497', fontWeight: 'bold', marginLeft: 10 }}>Updated Date</Text>
            <TouchableOpacity>

              <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginLeft: 10, padding: 10, marginVertical: 10 }}>
                <Image
                  source={require('../images/calenderIcon.png')}
                />
                <Text style={{ marginLeft: 10, color: '#aaa' }}>DD-MM-YY</Text>
              </View>
              <View style={{ position: 'absolute', right: 20, bottom: 10 }}>
                <Icon
                  size={30}

                  name="caret-down"
                  color={'#707070'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }]}>Status</Text>
        <View>
          <ScrollView
            horizontal={true}
          >
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
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={this.applyFilter}
          style={{ width: width / 1.5, marginTop: 20, alignSelf: 'center', backgroundColor: '#B1272C', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 50 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
};
function mapDispatchToProps(dispatch) {
  return {
    setUser: (value) => dispatch({ type: SET_USER, value: value }),
    logoutUser: () => dispatch({ type: LOGOUT_USER })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter)