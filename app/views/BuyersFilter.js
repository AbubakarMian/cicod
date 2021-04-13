import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { Constants } from '../views/Constant';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { connect } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class BuyersFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categoryarr: [],
      approvedby_arr: [],
      category_name: '',
      spinner: false,
      isDatePickerVisible: false,
      setDatePickerVisibility: false
    };
  }

  componentDidMount() {

    this.getCategoryList()
    this.buyerList()
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

  buyerList() {

    this.setState({ spinner: true })
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.buyerlist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          spinner: false,
        });
        if (responseJson.success === true) {
          let res = responseJson.data;
          let approvedby_arr = res.map((x, key) => { return { label: x.approved_by, value: x.approved_by } });
          console.log('approvedby_arr approvedby_arr !!!!!!', approvedby_arr);
          this.setState({
            approvedby_arr: approvedby_arr,
          });

        } else {
          let message = responseJson.message;
          Alert.alert('Error', message)
        }
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
    this.props.navigation.navigate('Buyers', { filters: this.state.filters });
  }

  datePickerFun() {

    this.setState({
      setDatePickerVisibility: !this.state.setDatePickerVisibility
    })
  }

  setDate = (date) => {
    console.log(' date !!!!!!!!!!!!! ', date);
  }
  hideDatePicker(){
    this.setState({
      setDatePickerVisibility: !this.state.setDatePickerVisibility
    })
  }

  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation} />
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{ color: '#fff' }}
          color={'#fff'}
        />
        <View style={[{}, styles.mainRow]}>
          {/* <Image
          source={require('../images')}
          /> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Buyers')}
            style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 5 }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </TouchableOpacity>
          <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20, top: 20 }]}>Clear Filter</Text>
        </View>
        <View style={{ width: width - 20, backgroundColor: '#fff', paddingVertical: 10, marginTop: 20 }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>

            {this.state.categoryarr.length < 1 ? null :
              <DropDownPicker
                items={this.state.categoryarr}
                containerStyle={{ height: 50, width: width - 35, marginTop: 15 }}
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
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6', marginHorizontal: 5, flexDirection: 'row', position: 'relative' }}>

            {this.state.approvedby_arr.length < 1 ? null :
              <DropDownPicker
                items={this.state.approvedby_arr}
                containerStyle={{ height: 50, width: width - 35, marginTop: 15 }}
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
        </View>
        <View style={[{ flexDirection: 'row', width: width / 2 }]}>
          <View style={[{ flex: 1, paddingVertical: 10 }]}>
            <Text style={{ color: '#929497', fontWeight: 'bold' }}>Approved Date</Text>
            <TouchableOpacity 
            onPress={()=>this.datePickerFun}
            >
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
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={this.setDate()}
              onCancel={this.state.hideDatePicker()}
            />
          </View>
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }]}>Status</Text>
        <View>
          <ScrollView
            horizontal={true}
          >
            <View style={[{ paddingRight: 20 }, styles.mainRow]}>
              <View style={[{ marginRight: 10 }]}>
                <TouchableOpacity>
                  <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>ACTIVE</Text>
                </TouchableOpacity>
              </View>
              <View style={[{}]}>
                <TouchableOpacity>
                  <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 5 }]}>INACTIVE</Text>
                </TouchableOpacity>
              </View>




            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => applyFilter()}
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
export default connect(mapStateToProps, mapDispatchToProps)(BuyersFilter)
