import React from 'react'
import { View, ImageBackground, Dimensions, Image, Alert,Platform, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { Constants } from '../views/Constant';
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, PRODUCT_FILTERS } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: [],
      categoryarr: [],
      category_name: '',
      spinner: false,
      active:null,
      inactive:false
    };
  }
  componentDidMount() {
    this.setFilter();
    this.getCategoryList();
    console.log('screen Props !!!!!!!!!!!!', this.props.route.params.screen)
  }
  setFilter(){
    if (this.props.filters.filters.length>0) {
      for (let index = 0; index < this.props.filters.filters.length; index++) {
        const filter = this.props.filters.filters[index];
        console.log("eke#00le",filter)
        if (filter.key=="is_active" && filter.value==0) {
          this.setState({active:0})
          break;
        }

        if (filter.key=="is_active" && filter.value==1) {
          this.setState({active:1})
          break;
        }
        
      }
    }
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
        if (responseJson.status === "success") {

          let res = responseJson.data;
          let categoryarr = res.map((x, key) => { return { label: x.name, value: x.name } });
          this.setState({
            categoryarr: categoryarr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        }
        else {
          let message = responseJson.message
          Alert.alert('Error', message)
        }

      })

  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg)
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  activeSet(value) {
    let filters = this.state.filters;
    filters.push({ key: 'is_active', value: value })
    this.setState({
      active:value,
      filters
    })
    // if (value==0) {
    //   this.setState({
    //     active:this.state.active,
    //     filters: filters
    //   })
    // }else{
    //   this.setState({
    //     active:!this.state.active,
    //     filters: filters
    //   })
    // }
    
    
    console.log('filters !!!!!!', this.state);
  }

  onCategoryText(text) {
    let filters = this.state.filters; //this.state.filters;
    filters.push({ key: 'category', value: text });
    this.setState({
      filters: filters
    })
  }


  applyFilter = () => {
    console.log('this.state.filters', this.state.filters);
    if(this.state.filters.length<1){
      this.props.navigation.navigate(this.props.route.params.screen)
      return;
    }
    this.props.productFilter(this.state.filters,)
    this.props.navigation.navigate(this.props.route.params.screen, { filters: this.state.filters });
  }
  clearFilter(){
    this.setState({active:null,filters: []})

    this.props.productFilter(this.state.filters)
    this.props.navigation.goBack();
  }

  render() {
    console.log(' categoryarr categoryarr ', this.state.categoryarr)
    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={this.props.navigation} />
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{ color: '#fff' }}
          color={'#fff'}
        />
        <View style={[{marginTop:10}, styles.mainRow]}>

          <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              // onPress={() => this.props.navigation.navigate('Product')}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-left" size={25} color="#929497" />
              <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>


            </TouchableOpacity>

          </View>
         
          <Text onPress={() => this.clearFilter()} style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20 }]}>Clear Filter</Text>
         
        </View>
        {/* <View style={{paddingVertical:10,backgroundColor:'#fff',borderTopLeftRadius:10,borderTopRightRadius:10,marginTop:10}}></View>  */}
        {/* {this.state.categoryarr.length < 1 ? null :
            <DropDownPicker
              items={this.state.categoryarr}
              // items={[
              //   {'1':'1'},
              //   {'2':'2'},
              //   {'3':'3'},
              // ]}
              placeholder="Catagory"
              containerStyle={{ height: 50, width: width-20,alignSelf:'center'}}
              style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5,paddingVertical:15 }}
              dropDownStyle={{height:80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1,  }}
              labelStyle={{ color: '#A9A9A9' }}
              onChangeItem={item => this.onCategoryText(item.value)}
            />} */}
            <View style={{paddingVertical:2,backgroundColor:'#fff',borderBottomLeftRadius:10,borderBottomRightRadius:10,marginBottom:10}}></View> 
        <View style={{zIndex:-0.999 }}>
          <View style={{ paddingVertical: 20, }}>
            <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 18 }]}>Status:</Text>
          </View>
          <View>
            <View style={[{ paddingRight: 30, marginTop: 5 }, styles.mainRow]}>
              <View style={[{ marginRight: 10 }]}>
                <TouchableOpacity onPress={() => this.activeSet(1)}>
                  <Text style={[{ color:this.state.active==1?"#fff": '#929497', borderRadius: 50,padding:7, backgroundColor: this.state.active==1?'green':'#E6E6E6', paddingHorizontal: 5 }]}>ACTIVE </Text>
                </TouchableOpacity>
              </View>
              <View style={[{}]}>
                <TouchableOpacity onPress={() => this.activeSet(0)}>
                  <Text style={[{ color: this.state.active==0?'#fff':'#929497',padding:7, borderRadius: 50, backgroundColor: this.state.active==0?'green':'#E6E6E6', paddingHorizontal: 5 }]}>IN ACTIVE </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={()=>this.applyFilter()}
          style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: '#B1272C', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 50, marginTop: 30 }}
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
    filters:state.productFilterReducer
  }
};
function mapDispatchToProps(dispatch) {
  return {
    setUser: (value) => dispatch({ type: SET_USER, value: value }),
    logoutUser: () => dispatch({ type: LOGOUT_USER }),
    productFilter:(value)=>dispatch({type:PRODUCT_FILTERS,value})
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
