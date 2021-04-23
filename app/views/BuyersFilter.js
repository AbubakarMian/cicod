import React from 'react'
import { View, ImageBackground, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native';
import { Text, TextInput, Alert } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import styles from '../css/Filter.Css'
import fontStyles from '../css/FontCss'
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
      date: '',
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
    let filters = this.state.filters;
    filters.push({ key: 'product_categories', value: text });
    this.setState({
      filters: filters
    })
  }
  approvedByText(text) {
    let filters = this.state.filters; //this.state.filters;
    filters.push({ key: 'approved_by', value: text });
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
  applyFilter = async () => {
    let filter_param = await this.state.filters
    console.log('buyers !!! this.state.filters', filter_param)

    this.props.navigation.navigate('Buyers', { filters: filter_param });
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
    filters.push({ key: 'create_time', value: date });
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
          visible={this.state.spinner}
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
            onPress={() => this.props.navigation.navigate('Buyers')}
            style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 5 }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </TouchableOpacity>
          <Text style={[{ color: '#D8D8D8', position: 'absolute', right: 20, top: 20 }, fontStyles.normal15]}>Clear Filter</Text>
        </View>


        <View style={{ width: width - 20, alignSelf: 'center', borderRadius: 10, backgroundColor: '#fff', paddingVertical: 10, marginTop: 20 }}>
          {this.state.categoryarr.length < 1 ? null :

            //     dropDownStyle={{ backgroundColor: '#fafafa' }}
            //     onChangeItem={item => this.setState({
            //         date: item.value
            //     })}
            //     style={{ width: width / 2 - 30, alignSelf: 'center', marginTop: 10, marginLeft: 10 }}
            // />
            <DropDownPicker
              items={this.state.categoryarr}
              containerStyle={{ height: 50, width: width - 30, alignSelf: 'center' }}
              style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5 }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              placeholder="Catagory"
              dropDownStyle={{ backgroundColor: '#fff', maxHeight: 50, }}
              labelStyle={{ color: '#A9A9A9' }}
              onChangeItem={item => this.onCategoryText(item.value)}
            />}
          {this.state.approvedby_arr.length < 1 ? null :
            <DropDownPicker
              items={this.state.approvedby_arr}
              containerStyle={{ height: 50, width: width - 30, alignSelf: 'center' }}
              style={{ backgroundColor: '#fff', marginTop: 10, borderWidth: 0, borderBottomWidth: 0.5 }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              placeholder="Approved By"
              dropDownStyle={{ backgroundColor: '#fff' }}
              labelStyle={{ color: '#A9A9A9' }}
              onChangeItem={item => this.approvedByText(item.value)}
            />}
        </View>
        <View style={[{ flexDirection: 'row', width: width / 2, zIndex: -0.999 }]}>
          <View style={[{ flex: 1, paddingVertical: 10 }]}>
            <Text style={[{ color: '#929497' }, fontStyles.bold15]}>Approved Date</Text>
            <TouchableOpacity
              onPress={() => this.datePickerFun()}
            >
              <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginRight: 10, padding: 10, marginVertical: 10 }}>
                <Image
                  source={require('../images/calenderIcon.png')}
                />
                <Text style={[{ color: '#909090', marginLeft: 5 }, fontStyles.normal12]}>{this.state.date == '' ? 'DD-MM-YY' : this.state.date}</Text>
              </View>
              <View style={{ position: 'absolute', right: 20, bottom: 15 }}>
                <Icon
                  size={25}
                  name="caret-down"
                  color={'#707070'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[{ color: '#929497' }, fontStyles.bold15]}>Status</Text>
        <View>
          <View style={[{ paddingRight: 20 }, styles.mainRow]}>
            <View style={[{ marginRight: 10 }]}>
              <TouchableOpacity onPress={() => this.activeSet(1)}>
                <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 10 }, fontStyles.normal15]}>ACTIVE</Text>
              </TouchableOpacity>
            </View>
            <View style={[{}]}>
              <TouchableOpacity onPress={() => this.activeSet(0)}>
                <Text style={[{ color: '#929497', borderRadius: 50, backgroundColor: '#E6E6E6', paddingHorizontal: 10 }, fontStyles.normal15]}>INACTIVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.applyFilter()}
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
