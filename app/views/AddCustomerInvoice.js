/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Modal,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import splashImg from '../images/splash.jpg';
import styles from '../css/AddCustomerCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import {SET_USER, SET_CUSTOMER} from '../redux/constants/index';
import {Item} from 'native-base';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class AddCustomerInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isChecked: false,
      searchPress: 1,
      spinner: false,
      customerData: [],
      search_text: '',
      isShowAddCustomer:false,
      customer_email:"",
      customer_phone:"",
      customer_name:"",

    };
  }

  componentDidMount() {
    this.getCustomers(Constants.customerlist);
  }
  seacrhClick() {
    if (this.state.searchPress === 1) {
      console.log('**********');
      this.setState({searchPress: 2});
    } else if (this.state.searchPress === 2) {
      console.log('#########');
      this.setState({searchPress: 2});
    }
  }
  searchText() {
    this.getCustomers(
      Constants.customerlist + '?search=' + this.state.search_text,
    );
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  getCustomers(url) {
    let param = 'first_name';
    // if(search_text == ''){
    //     return;
    // }
    // if(search_text.test(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)==0){
    //     para='email';
    //     param='first_name';
    //     return;
    // }else{
    //     param='phone'
    // }

    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    //console.log('url~~~~~~~~',Constants.customerlist + '?'+param+'=' + search_text)
    console.log('TTTTTTTTT', this.props.user.access_token);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'success') {
          console.log('KKKKKKKKK', responseJson);
          this.setState({
            customerData: responseJson.data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        console.log('Error !!!', error);
      });
  }

  async userInfo(item) {
    console.log('ITEMS !!!!!!!!!!', item);
    let user_data = {
      customer_id: item.id,
      customer_name: item.first_name + ' ' + item.last_name,
      customer_email: item.email,
      customer_phone: item.phone,
      customer_country: item.country,
      customer_state: item.state,
      customer_lga: item.lga,
      customer_address: item.address,
    };
    await this.props.setCustomer(user_data);
    console.log('user info !!!!!!!!!!!!!!! @@@@@@@@@@@@@', this.props);
    this.props.navigation.navigate('CreateQuickInvoice');
  }

  handleAddCustomer(){
    let user_data = {
      customer_id: 0,
      customer_name: this.state.customer_name,
      customer_email: this.state.customer_email,
      customer_phone: this.state.customer_phone,
      customer_country: "",
      customer_state: "",
      customer_lga:"",
      customer_address: "",
    };
     this.props.setCustomer(user_data);
     this.setState({isShowAddCustomer:false})
   
    this.props.navigation.navigate('CreateQuickInvoice');
  }

  render() {
    return (
      <Scaffold>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('CreateOrder')}
            onPress={() => this.props.navigation.goBack()}>
            <View style={[{}, styles.backHeaderRowView]}>
              <Icon name="arrow-left" size={25} color="#929497" />

              <View style={[{}, styles.backHeadingView]}>
                <Text
                  style={[
                    {color: '#2F2E7C', fontWeight: '700'},
                    fontStyles.normal15,
                  ]}>
                  ADD CUSTOMER
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <Searchbar
              placeholder="Search a Customer"
              iconColor="#929497"
              style={{
                width: width - 20,
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 5,
                elevation: 0,
                borderColor: '#D8DCDE',
              }}
              onChangeText={text => this.setState({search_text: text})}
              onSubmitEditing={() => this.searchText()}
              //update
            ></Searchbar>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 10,
                width: width - 20,
                alignSelf: 'center',
                borderBottomColor: '#E6E6E6',
              }}></View>
            {/* <View style={[{}, styles.searchContainer]}>
                            <Image
                                style={{height:20,width:20}}
                                source={require('../images/products/searchicon.png')}
                            />
                            <TextInput
                                label="Search Customer"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onSubmitEditing={() => this.searchText()}
                                // onPressIn={() => this.seacrhClick()}
                                onChangeText={(text) => this.setState({ search_text: text })}
                                
                            />
                        </View> */}
            {/* <View style={[{},styles.contentView]}>
                          <Image 
                          source={require('../images/user-circle.png')}
                          />
                          <Text style={[{},styles.contentViewHeadingText]}>No customer selected</Text>
                          <Text style={[{},styles.contentViewDescText]}>Search for a customer</Text>
                        </View> */}
            <View style={[{marginBottom: 10}]}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isShowAddCustomer:true})
                }
                style={[{}, styles.addCustommerRowView]}>
                <Image source={require('../images/circlePlus.png')} />
                <Text
                  style={[
                    {color: '#4E4D4D', marginLeft: 10},
                    fontStyles.bold15,
                  ]}>
                  Add new customer
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.customerData.length != 0 ? (
              <View>
                <FlatList
                  data={this.state.customerData}
                  ItemSeparatorComponent={
                    Platform.OS !== 'android' &&
                    (({highlighted}) => (
                      <View
                        style={[
                          styles.separator,
                          highlighted && {marginLeft: 0},
                        ]}
                      />
                    ))
                  }
                  renderItem={({item, index, separators}) => (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() => this.userInfo(item)} //=>this.props.navigation.navigate('CustomersDetal')
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
                              {item.email}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <View style={[{}, styles.contentView]}>
                <Image
                  style={{height: 100, width: 100}}
                  source={require('../images/user-circle.png')}
                />
                <Text style={[{}, styles.contentViewHeadingText]}>
                  No customer Found
                </Text>
              </View>
            )}
          </View>
        </View>

        <Modal
        onRequestClose={() => this.setState({isShowAddCustomer: false})}
            visible={this.state.isShowAddCustomer}
            onDismiss={() => this.setState({isShowAddCustomer: false})}>
            <View
              style={{
                height: height - 350,
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                borderRadius: 10,
                flexDirection: 'column',
                padding: 25,
              }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
              <View style={{flexDirection: 'row', marginBottom: 30}}>
                <Text
                  style={{color: '#2F2E7C', fontWeight: 'bold', fontSize: 15}}>
                 CREATE CUSTOMER
                </Text>
              </View>
              <View>
                <TextInput
                  value={this.state.customer_name}
                  onChangeText={text => this.setState({customer_name: text})}
                  placeholder="Enter Customer Name"
                  style={{
                    paddingLeft: 0,
                    height: 30,
                    backgroundColor: '#fff',
                    fontSize: 13,
                  }}
                />
              
              </View>

              <View style={{marginTop:30}}>
                <TextInput
                keyboardType="email-address"
                  value={this.state.customer_email}
                  onChangeText={text => this.setState({customer_email: text})}
                  placeholder="Enter Customer Email"
                  style={{
                    paddingLeft: 0,
                    height: 30,
                    backgroundColor: '#fff',
                    fontSize: 13,
                  }}
                />
              
              </View>

              <View style={{marginTop:30}}>
                <TextInput
                keyboardType="phone-pad"
                  value={this.state.customer_phone}
                  onChangeText={text => this.setState({customer_phone: text})}
                  placeholder="Enter Customer Phone"
                  style={{
                    paddingLeft: 0,
                    height: 30,
                    backgroundColor: '#fff',
                    fontSize: 13,
                  }}
                />
              
              </View>

            
             
              <View style={{flexDirection: 'column', marginTop: 35}}>
                <View
                // style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                >
                  <TouchableOpacity
                  onPress={()=>this.handleAddCustomer()}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#B1272C',
                      paddingVertical: 15,
                      padding: 40,
                      borderRadius: 100,
                    }}
                  >
                    <Text style={{color: '#fff'}}>Save</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{marginTop: 15}}
                  // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      padding: 30,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#E6E6E6',
                    }}
                    onPress={() => {
                      this.setState({isShowAddCustomer: false});
                    }}>
                    <Text style={{color: '#E6E6E6', paddingHorizontal: 10}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              </ScrollView>
            </View>
          </Modal>


      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    customer: state.customReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setCustomer: value => dispatch({type: SET_CUSTOMER, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerInvoice);
