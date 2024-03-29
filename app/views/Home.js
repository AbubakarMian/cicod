import React from 'react'
import { BackHandler,View,Share, Modal as OtherModal,TouchableWithoutFeedback,ImageBackground, Dimensions, Image, Platform, Alert, TouchableOpacity, ScrollView,Linking } from 'react-native'
import { Text, TextInput,Modal } from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/HomeCss';
import fontStyles from '../css/FontCss'
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import { connect } from 'react-redux';
import { SET_USER,SET_CUSTOMER, LOGOUT_USER,CLEAR_ORDER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      isShopModal:false,
      closeApp:false,
      spinner: false,
      avatar: '',
      tenantId:"",
      user:{
        kciInfo:{
          kciUpdates:[
            {
              dayRemaining:0,

            }
          ]
        }
      }
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   this.setState({closeApp:true})
    return true;
}


  veiwShop(){
    Linking.openURL(`https://${this.state.tenantId.toLowerCase()}.${Constants.webshop_url}`)
    
  }

  async shareShop(){
    try {
      const result=await Share.share({
        message:`https://${this.state.tenantId.toLowerCase()}.${Constants.webshop_url}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("hrer#")
        } else {
          // shared
          console.log("shared#")
        }
      	} else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismissed#")
      }
    } catch (error) {
      alert(error.message);
    }
  }
  async componentDidMount() {
   
    console.log("he#@",this.props.user)
    console.log("ojk@#",this.props.user.tenantId)
    this.getAsyncData()
    if (this.props.user.avatar == '') {
      this.getUserDetail();
    }
  }

  

  async getAsyncData(){
    this.setState({ spinner: true })
    let user=await AsyncStorage.getItem('User');
    let me=JSON.parse(user)
    this.setState({tenantId:me.tenantId,user:me,spinner:false})
    
    if(this.props.user.firstname=="Guest"){
      console.log("rwewe#")
      this.props.setUser({
        firstname: me.firstname,
        lastname: me.lastname,
        email: me.email,
        phone: me.phone,
        access_token: me.access_token,
        kciInfo:me.kciInfo,
        tenantId:me.tenantId,
        id:me.id
    });
    }
    else{
      console.log("noth",me,"ff",this.props.user.access_token)
    }
  }

  getUserDetail() {
    this.setState({ spinner: true })
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.marchantDetail, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson @@@@@@@@###########', responseJson)
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'SUCCESS') {
          let merchant_contact = responseJson.merchant
          this.setState({
            avatar: merchant_contact.logo,
          })



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
createOrder(){
  this.props.setCustomer({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
})
this.props.emptyOrder({
   cart:[]
}) 
this.props.navigation.navigate('CreateOrder', { screen_name: 'sell' })
}

  render() {
    console.log("josE#",this.state.user.kciInfo.kciUpdates[0].dayRemaining)
    return (
      <View style={{ height: height, width: width, alignItems: 'center', position: 'relative', backgroundColor: '#F0F0F0' }}>
        <Header navigation={this.props.navigation} />
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{ color: '#fff' }}
          color={'#fff'}
        />
        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <View style={[{ flexDirection: 'row', paddingVertical: 10 }]}>
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Text style={[{ color: '#B1272C', fontWeight: 'bold', fontSize: 25, fontFamily: 'Open Sans' }]}>Welcome,</Text>
                <Text style={{ color: '#4E4D4D', fontSize: 25, fontFamily: 'Open Sans' }}>{this.props.user.firstname}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('User')}>
                  <Image
                    style={{ height: 50, width: 50 ,borderRadius:50}}
                    source={this.state.avatar==''?require('../images/profilepic.png'):{uri:this.state.avatar}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            { this.state.user.kciInfo.showWarning &&(
              <View style={{backgroundColor:"#a4272d",padding:10,borderRadius:10,flexDirection:"row"}}>
             {this.state.user.kciInfo.kciUpdates[0].dayRemaining==0?(
               <>
               <Text style={{color:"#ffffff"}}>Your subscription has Expired!  </Text>
              <TouchableOpacity  onPress={()=>{
                Linking.openURL(`https://${this.state.tenantId.toLowerCase()}.${Constants.renewalLink}`)
              }} >
                <Text style={{color:"#ffffff"}}>
               Click to renew
                </Text>
              
                </TouchableOpacity>
               </>
             ):(
              <Text style={{color:"#ffffff"}}>{this.state.user.kciInfo.kciUpdates[0].dayRemaining} days remaining before expiry!  </Text>
             )}
              
              </View>
            )}
            

            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }
                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Dashboard')}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center',
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/dashboard.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Dashboard</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.createOrder() }
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/sell.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Sell</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Order')}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center',
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/order.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Customer')}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/customers.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Customers</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Products', { seller_id: 0 })}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center',
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/products.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Products</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.setState({isShopModal:true})}

              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/webshop.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Webshop</Text>
                </View>
              </TouchableOpacity> 


              {/* <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Supplier', { heading: 'buy' })}

              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/tag.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Buy</Text>
                </View>
              </TouchableOpacity> */}
            </View>
            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Supplier',{heading:"supplier"})}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center',
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/suppliers.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Suppliers</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}
                onPress={() => this.props.navigation.navigate('Buyers')}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center', marginLeft: 15,
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/buyers.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Resellers</Text>
                </View>
              </TouchableOpacity>

            </View>
            <View style={[{ flexDirection: 'row', alignSelf: 'center', width: width - 20, alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }]}>
              <TouchableOpacity
              disabled={ this.state.user.kciInfo.showWarning && this.state.user.kciInfo.kciUpdates[0].dayRemaining==0 ?true:false }

                style={{ flex: 1 }}

                onPress={() => this.props.navigation.navigate('Connect')}
              >
                <View style={[{
                  flexDirection: 'column', width: width / 2 - 20, height: width / 2 - 50,
                  justifyContent: 'center', alignItems: 'center',
                  borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', borderColor: '#fff'
                }]}>
                  <Image
                    style={{ height: width / 6, width: width / 6 }}
                    source={require('../images/home/connect.png')}
                  />
                  <Text style={[{}, styles.cardLableText]}>Connect</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <OtherModal
                    visible={this.state.isShopModal}
                    onRequestClose={() => this.setState({ isShopModal: false })}     
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ isShopModal: false })}
                    >
                        <View style={[{}, styles.modalBackGround]}>
                            <TouchableWithoutFeedback>
                            <View style={styles.suspendModal}>
                                <View style={{alignItems:"center",flexDirection:"row"}} >
                                <Image
                                style={{height:20,width:20}}
                                    source={require('../images/online-shop.png')}
                                />
                                <TouchableOpacity
                                 onPress={() =>  this.veiwShop()}
                                style={[{marginLeft:7}, styles.suspendTouch]}>
                                
                                <Text style={{color:"#808080"}}>View Webshop</Text>
                            </TouchableOpacity>
                                </View>
                                <View style={{alignItems:"center",flexDirection:"row"}} >
                                <Image
                                style={{height:20,width:20}}
                                    source={require('../images/share.png')}
                                />
                            <TouchableOpacity
                                 onPress={() => this.shareShop()}
                                style={[{marginLeft:7}, styles.suspendTouch]}>
                                
                                <Text style={{color:"#808080"}}>Share Webshop</Text>
                            </TouchableOpacity>
                            </View>
                            {/* <View style={{marginTop:5}} /> */}
                            {/* <TouchableOpacity
                                onPress={() => this.setState({suspendModal:false})}
                                style={[{}, styles.suspendTouch]}>
                                <Image source={require('../images/redCross.png')} style={[{width:20,height:20}, styles.banImage]} />
                                <Text style={{}}> Cancel</Text>
                            </TouchableOpacity> */}
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableOpacity>

                </OtherModal>


                <Modal
                    visible={this.state.closeApp}
                    
                >
                    {console.log(this.props.user)}
                    <View
                        style={{ alignSelf: 'center', backgroundColor: '#fff', width: width - 50, justifyContent: 'center', alignItems: 'center', paddingVertical: 20, borderRadius: 10, flexDirection: 'column' }}
                    >
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <Text style={{ color: '#B1272C', fontWeight: 'bold', fontSize: 20 }}>Want to Exit App?</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <TouchableOpacity
                                    style={{ backgroundColor: '#fff', paddingVertical: 15, padding: 30, borderRadius: 100, borderWidth: 1, borderColor: '#B1272C' }}
                                    onPress={() => { this.setState({ closeApp: false }) }}
                                >
                                    <Text style={{ color: '#B1272C', paddingHorizontal: 10 }}>No</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                            >
                                <TouchableOpacity
                                    style={{ backgroundColor: '#B1272C', paddingVertical: 15, padding: 40, borderRadius: 100 }}
                                    onPress={() => BackHandler.exitApp()}
                                >
                                    <Text style={{ color: '#fff', }}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    logoutUser: () => dispatch({ type: LOGOUT_USER }),
    setCustomer: (value) => dispatch({ type: SET_CUSTOMER, value: value }),
    emptyOrder: () => dispatch({ type: CLEAR_ORDER }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)