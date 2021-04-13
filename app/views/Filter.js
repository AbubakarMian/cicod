import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { Constants } from '../views/Constant';
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categoryarr: [],
      category_name: '',
      spinner: false,
    };
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


  activeSet(value) {
    let filters = this.state.filters;
    filters.push({ key: 'is_active', value: value })
    this.setState({
      filters: filters
    })
    console.log('filters !!!!!!', filters);
  }

  onCategoryText(text) {
    let filters = 'Freezer'; //this.state.filters;
    filters.push({ key: 'category', value: text });
    this.setState({
      filters: filters
    })
  }


  applyFilter = () => {
    console.log('this.state.filters', this.state.filters);
    this.props.navigation.navigate('Supplier', { filters: this.state.filters });
  }

  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation} />
        <View style={[{}, styles.mainRow]}>
          {/* <Image
          source={require('../images')}
          /> */}
          <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Product')}
            >  <Icon name="arrow-left" size={25} color="#929497" />
              <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>


            </TouchableOpacity>

          </View>
          <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20 }]}>Clear Filter</Text>
        </View>
        {/* <View> */}
        {/* <SearchBar
            ref="searchBar"
            placeholder="Product Category"
            barTintColor={'#fff'}
            backgroundColor={'#fff'}
            tintColor={'#fff'}
            
          // onChangeText={...}
          // onSearchButtonPress={...}
          // onCancelButtonPress={...}
          /> */}
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

        {/* </View> */}
        <View style={{ paddingVertical: 20 }}>
          <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 18 }]}>Status</Text>
        </View>
        <View>
          <View style={[{ paddingRight: 30, marginTop: 5 }, styles.mainRow]}>
            <View style={[{ marginRight: 10 }]}>
              <TouchableOpacity onPress={() => this.activeSet(1)}>
                <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>ACTIVE </Text>
              </TouchableOpacity>
            </View>
            <View style={[{}]}>
              <TouchableOpacity onPress={() => this.activeSet(0)}>
                <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>IN ACTIVE </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={[{ flexDirection: 'row' }]}>
          <View style={[{ flex: 1 }]}>
            <Text>Order Date</Text>
          </View>
          <View>
            <Text>Order Date</Text>
          </View>
        </View> */}
        <TouchableOpacity
          onPress={this.applyFilter}
          style={{ width: width / 1.5, alignSelf: 'center', backgroundColor: '#B1272C', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 50, marginTop: 30 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
