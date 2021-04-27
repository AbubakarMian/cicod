import React from 'react'
import { View, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Constants } from '../views/Constant';
import DropDownPicker from 'react-native-dropdown-picker';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      createdby_arr: [],
      categoryarr: [],
      category_name: '',
      spinner: false,
      date:'' ,
    };
  }
  componentDidMount() {

    this.getCategoryList()
    this.setState({ spinner: true })
    

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
          let createdby_arr = res.map((x, key) => { return { label: x.created_by, value: x.created_by } });
          console.log('category !!!!!!', categoryarr);
          console.log('createdby_arr  !!!!!!', createdby_arr);
          this.setState({
            createdby_arr: createdby_arr,
            categoryarr: categoryarr,
          });
        } else {
          let message = JSON.stringify(responseJson.error.message)
          Alert.alert('Error', message)
        }

      })

  }

  // onQuantityText(text) {
  //   let filters = this.state.filters;
  //   filters.push({ key: 'quantity', value: text });
  //   this.setState({
  //     filters: filters
  //   })
  // }

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
    this.props.navigation.navigate('Products', { filters: this.state.filters, seller_id: 0 });
  }

  datePickerFun = () => {
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible
    })
  }

  setDate = (date) => {
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    let newdate = day + "/" + month + "/" + year;

    let filters = this.state.filters;
    filters.push({ key: 'date_created', value: date });
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      filters: filters,
      date: newdate,
    })

  }
  hideDatePicker = () => {
    this.setState({
      // setDatePickerVisibility: !this.state.setDatePickerVisibility,
      isDatePickerVisible: !this.state.isDatePickerVisible
    })
  }

  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation} />
        <Spinner
          visible={this.state.Spinner}
          textContent={'Please Wait...'}
          textStyle={{ color: '#fff' }}
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

            style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </TouchableOpacity>
          <Text onPress={() => { this.setState({ filters: [] }) }} style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20, top: 20 }]}>Clear Filter</Text>
        </View>
        <View style={{ width: width - 20, backgroundColor: '#fff', paddingVertical: 10, marginTop: 20 }}>
          {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>
            <TextInput onChangeText={text => this.onQuantityText(text)}
              label="Quantity"
              style={{ backgroundColor: 'transparent', }}
              width={width - 50}
              alignSelf={'center'}
              color={'#000'}
            />
            <View style={{ position: 'absolute', right: 10, bottom: 10 }}>

            </View>
          </View> */}

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>
            {this.state.createdby_arr.length < 1 ? null :
              <DropDownPicker
                items={this.state.createdby_arr}
                containerStyle={{ height: 50, width: width / 2 - 10, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                itemStyle={{
                  justifyContent: 'flex-start', zIndex: 0.99
                }}
                placeholder="Created By"
                dropDownStyle={{  borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                labelStyle={{ color: '#A9A9A9' }}
                onChangeItem={item => this.onCreatedByText(item.value)}
              />}
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 0, flexDirection: 'row', zIndex: -0.999, position: 'relative' }}>

            {this.state.categoryarr.length < 1 ? null :
              <DropDownPicker
                items={this.state.categoryarr}
                containerStyle={{ height: 50, width: width / 2 - 10, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                itemStyle={{
                  justifyContent: 'flex-start', zIndex: 0.99
                }}
                placeholder="Catagory"
                dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                labelStyle={{ color: '#A9A9A9' }}
                onChangeItem={item => this.onCategoryText(item.value)}
              />}

          </View>

        </View>
        <View style={[{ flexDirection: 'row', zIndex: -0.999 }]}>
          <View style={[{ flex: 1, paddingVertical: 10 }]}>
            <Text style={{ color: '#929497', fontWeight: 'bold' }}>Created Date</Text>
            <TouchableOpacity
             onPress={() => this.datePickerFun()}>
              <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginRight: 10, padding: 10, marginVertical: 10 }}>
                <Image
                  source={require('../images/calenderIcon.png')}
                />
                <Text style={{ marginLeft: 10, color: '#aaa' }}>{this.state.date == '' ? 'DD-MM-YY' : this.state.date}</Text>
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
            <TouchableOpacity
            
            >

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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)