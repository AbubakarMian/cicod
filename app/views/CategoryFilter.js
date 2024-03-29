import React from 'react'
import { View, Dimensions, Image, Platform, TouchableOpacity, Alert } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
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
import { SET_USER, LOGOUT_USER,PRODUCT_CATEGORY_RELOAD,PRODUCT_CATEGORY_FILTER_RELOAD } from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from 'react-native-reanimated';
import {upsert} from '../Common'; 
import { set } from 'lodash';


const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      createdby_arr: [],
      backup_createdby_arr:[],
      categoryarr: [],
      category_name: '',
      spinner: false,
      date: '',
      date_filter_option:'',
      date_updated:'',
    };
  }
  componentDidMount() {

    this.getCategoryList()
    // this.setState({ spinner: true })


  }


  getCategoryList() {
    // return;
    this.setState({ spinner: true })
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },

    };
    console.log('$$$$$$$$$$$$',Constants.productcategorylist)
    fetch(Constants.productcategorylist, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({ spinner: false });
        if (responseJson.status === 'success') {

          let res = responseJson.data;
          console.log('all cats',res);
          // let categoryarr = res.map((x, key) => { return { label: x.name, value: x.name } });

          let createdby_arr = [];
          for(let i =0;i<res.length;i++){
            let x = res[i];
            upsert(createdby_arr,
              { key:x.created_by,label: x.created_by, value: x.created_by });
          }


          // let createdby_arr = res.map((x, key) => { 
          //   return { label: x.created_by, value: x.created_by } 
          // });
          // console.log('category !!!!!!', categoryarr);
          // console.log('createdby_arr  !!!!!!', createdby_arr);
          this.setState({
            createdby_arr: createdby_arr,
            backup_createdby_arr:createdby_arr
            // categoryarr: categoryarr,
          });
        } else {
          let message = JSON.stringify(responseJson.error.message)
          Alert.alert('Error', message)
        }

      })

  }


  onCategoryText(text) {
    // let filters = this.state.filters; 
    // filters.push({ key: 'search', value: text });
    let filters = upsert(this.state.filters,{ key: 'search', value: text });
    this.setState({
      filters: filters
    })
  }
  onCreatedByText(text) {
    // let filters = this.state.filters; 
    // filters.push({ key: 'created_by', value: text });
    let filters = upsert(this.state.filters,{ key: 'created_by', value: text });
    this.setState({
      filters: filters
    })
  }
  onCategoryText(text) {
    // let filters = this.state.filters; 
    // filters.push({ key: 'search', value: text });
    let filters = upsert(this.state.filters,{ key: 'search', value: text });
    this.setState({
      filters: filters
    })
  }
  activeSet(text) {
    // let filters = this.state.filters;
    // filters.push({ key: 'is_active', value: value })
    let filters = upsert(this.state.filters,{ key: 'is_active', value: text });
    this.setState({
      filters: filters
    })
  }
  applyFilter = () => {
    console.log('this.state.filters', this.state.filters);
    this.props.setScreenReload({
      reload:true
    })
    this.props.navigation.navigate('ProductCategory', { filters: this.state.filters, seller_id: 0 });
  }

  datePickerFun = (date_filter_option) => {
    this.setState({
      date_filter_option:date_filter_option,
      isDatePickerVisible: !this.state.isDatePickerVisible
    })
  }

  setDate = (date) => {
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    if(day<10){
      day="0"+day;
    }
    if(month<10){
      month="0"+month;
    }
    let newdate = year + "-" + month + "-" + day;
console.log('new date',newdate)
console.log('new date_filter_option ',this.state.date_filter_option)
    // let filters = this.state.filters;
    // filters.push({ key: 'date_created', value: newdate });
    let filters = upsert(this.state.filters,{ key: this.state.date_filter_option, value: newdate });
    if(this.state.date_filter_option == 'date_created' ){
      this.setState({
        date: newdate,
        isDatePickerVisible:false,
        filters: filters,
      })
    }
    else{
      this.setState({
        date_updated: newdate,
        isDatePickerVisible:false,
        filters: filters,
      })
    }

  }
  hideDatePicker = () => {
    this.setState({
      // setDatePickerVisibility: !this.state.setDatePickerVisibility,
      isDatePickerVisible: !this.state.isDatePickerVisible
    })
  }
clear_filter(){
  console.log('1111111111',this.state.filters)
  this.setState({ 
    data: [],
      filters: [],
      createdby_arr: [],
      categoryarr: [],
      category_name: '',
      spinner: false,
      date: '',
      date_filter_option:'',
      date_updated:'',
   })
 
  console.log('2222222222',this.state.filters)
  let _that=this;
  setTimeout(() => {
    _that.setState({createdby_arr:_that.state.backup_createdby_arr})
  }, 300);
}
  render() {
    if(this.props.reload.product_category_filter){      
      this.props.setScreenFilterReload({
        reload:false
    })
    }
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
          <TouchableOpacity
          style={{position: 'absolute', right: 20, top: 20}}
          onPress={() => this.clear_filter()}
          >
          <Text  style={[{ color: '#929497', fontWeight: 'bold', }]}>Clear Filter</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{ backgroundColor: '#fff',borderRadius:5, }}>
          <View style={{ width: width - 20, backgroundColor: '#fff', paddingVertical: 10, marginTop: 20, zIndex: 9999 }}>

            <View style={{ marginHorizontal: 5, flexDirection: 'row', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
             
            </View>
            {/* <View style={{ marginHorizontal: 5, flexDirection: 'row', position: 'relative', alignItems: 'center', justifyContent: 'center' }}> */}

             

            {/* </View> */}

          </View>
         
               {/* {this.state.categoryarr.length < 1 ? null :
               
                <DropDownPicker
                  items={this.state.categoryarr}
                  controller={instance => this.controller = instance}
                  onChangeList={(items, callback) => {
                    this.setState({
                      items // items: items
                    }, callback);
                  }}
                  containerStyle={{ height: 50, width: width - 20, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5, zIndex: 99999999 }}
                  placeholder="Catagory"
                  containerStyle={{ height: 50, width: width - 20, }}
                  style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999 }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                  labelStyle={{ color: '#A9A9A9' }}

                  defaultValue={this.state.value}
                  onChangeItem={item => this.onCategoryText(item.value)}
                  
              
             
                
                />

              } */}
               {this.state.createdby_arr.length < 1 ? null :
               
               <DropDownPicker
               scrollViewProps={{
                persistentScrollbar: true,
            }}
                 items={this.state.createdby_arr}
                 controller={instance => this.controller = instance}
                 onChangeList={(items, callback) => {
                   this.setState({
                     items // items: items
                   }, callback);
                 }}
                 containerStyle={{ height: 50, width: width - 20, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5, zIndex: 99999999 }}
                 placeholder="Created By"
                 containerStyle={{ height: 50, width: width - 20, }}
                 style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999 }}
                 itemStyle={{
                   justifyContent: 'flex-start',
                 }}
                 dropDownStyle={{ height: 120, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                 labelStyle={{ color: '#A9A9A9' }}

                 defaultValue={this.state.value}
                 onChangeItem={item => this.onCreatedByText(item.value)}
               />

             }
          {/* {this.state.categoryarr.length < 1 ? null :
            

            <DropDownPicker
              items={this.state.categoryarr}
              placeholder="Catagory"


              containerStyle={{ height: 50, width: width - 20, }}
              style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
              labelStyle={{ color: '#A9A9A9' }}

              controller={instance => this.controller = instance}
              onChangeList={(items, callback) => {
                this.setState({
                   items: items //items
                }, callback);
              }}

              defaultValue={this.state.value}
              onChangeItem={item => this.setState({
                value: item.value
              })}
            />
          } */}
          <View style={[{ flexDirection: 'row', width: width - 50, alignSelf: 'center', zIndex: -0.999 }]}>
            <View style={[{ flex: 1, paddingVertical: 10 }]}>
              <Text style={{ color: '#929497', fontWeight: 'bold' }}>Created Date</Text>
              <TouchableOpacity
                onPress={() => this.datePickerFun('date_created')}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginRight: 10, padding: 10, marginVertical: 10, zIndex: -99999999 }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require('../images/calenderIcon.png')}
                  />
                  <Text style={{ marginLeft: 10, color: '#aaa' }}>{this.state.date == '' ? 'DD-MM-YY' : this.state.date}</Text>
                </View>
                <View style={{ position: 'absolute', right: 20, bottom: 30 }}>
                  <Icon
                    size={25}
                    name="caret-down"
                    color={'#707070'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 1, paddingVertical: 10 }]}>
              <Text style={{ color: '#929497', fontWeight: 'bold', marginLeft: 10 }}>Updated Date</Text>
              <TouchableOpacity
                onPress={() => this.datePickerFun('date_updated')}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginLeft: 10, padding: 10, marginVertical: 10 }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require('../images/calenderIcon.png')}
                  />
                  <Text style={{ marginLeft: 10, color: '#aaa' }}>{this.state.date_updated == '' ? 'DD-MM-YY' : this.state.date_updated}</Text>
                </View>
                <View style={{ position: 'absolute', right: 20, bottom: 30, alignSelf: 'center' }}>
                  <Icon
                    size={25}

                    name="caret-down"
                    color={'#707070'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }]}>Status</Text>
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
        </View> */}

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
    user: state.userReducer,
    reload: state.reloadReducer
  }
};
function mapDispatchToProps(dispatch) {
  return {
    setUser: (value) => dispatch({ type: SET_USER, value: value }),
    logoutUser: () => dispatch({ type: LOGOUT_USER }),
    setScreenReload: (value) => dispatch({ type: PRODUCT_CATEGORY_RELOAD, value: value }),
    setScreenFilterReload: (value) => dispatch({ type: PRODUCT_CATEGORY_FILTER_RELOAD, value: value }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)