import React from 'react';
import {
  BackHandler,
  View,
  Share,
  Modal as OtherModal,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Image,
  Platform,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {Text, TextInput, Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/HomeCss';
import fontStyles from '../css/FontCss';
import Spinner from 'react-native-loading-spinner-overlay';
const Device = require('react-native-device-detection');
import Header from '../views/Header';
import {connect} from 'react-redux';
import {
  SET_USER,
  SET_CUSTOMER,
  LOGOUT_USER,
  CLEAR_ORDER,
  CLEAR_CART,
  RESET,
  RESET_DELIVERY_MAIN,
} from '../redux/constants/index';
import {Constants} from '../views/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconInfocount from './Components/IconInfocount';
import Scaffold from './Components/Scaffold';
import ModuleCard from './Components/ModuleCard';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      isShopModal: false,
      countNetwork: 0,
      closeApp: false,
      modalInfo: false,
      modalInfoText: '',
      modalInfoTextMore: '',
      modalInfoType: '',

      spinner: false,
      avatar: '',
      tenantId: '',
      disable_button: false,
      user: {
        kciInfo: {
          kciUpdates: [
            {
              dayRemaining: 0,
            },
          ],
        },
      },
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    if (!this.props.navigation.isFocused()) {
      return false;
    }

    this.setState({closeApp: true});
    return true;
  }

  veiwShop() {
    this.props.navigation.navigate('InAppWebView', {
      uri: `https://${this.state.tenantId.toLowerCase()}.${
        Constants.webshop_url
      }`,
    });
    // Linking.openURL(
    //   `https://${this.state.tenantId.toLowerCase()}.${Constants.webshop_url}`,
    // );
  }

  async shareShop() {
    try {
      const result = await Share.share({
        message: `https://${this.state.tenantId.toLowerCase()}.${
          Constants.webshop_url
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('hrer#');
        } else {
          // shared
          console.log('shared#');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed#');
      }
    } catch (error) {
      alert(error.message);
    }
  }
  async componentDidMount() {
    // console.log('device#$', Device.isTablet);
    console.log('he#@', this.props.user);
    console.log('ojk@#', this.props.user.tenantId);
    this.getAsyncData();
    this.getMetworkCount();
    if (this.props.user.avatar == '') {
      this.getUserDetail();
    }
  }

  async getAsyncData() {
    this.setState({spinner: true});
    let user = await AsyncStorage.getItem('User');
    let me = JSON.parse(user);

    console.log('nrs87h%$^', me);
    const disable_button = me.merchantStatus.code < 5 ? true : false;
    //const disable_button= (me.merchantStatus.code==6||me.merchantStatus.code==7) ||(me.merchantStatus.code==5&& me.merchantApps.includes("ucg"))?true:false;

    this.setState({
      tenantId: me.tenantId,
      user: me,
      spinner: false,
      disable_button,
    });

    if (this.props.user.firstname == 'Guest') {
      console.log('rwewe#');
      this.props.setUser({
        firstname: me.firstname,
        lastname: me.lastname,
        email: me.email,
        phone: me.phone,
        access_token: me.access_token,
        kciInfo: me.kciInfo,
        tenantId: me.tenantId,
        id: me.id,
      });
    } else {
      console.log('noth', me, 'ff', this.props.user.access_token);
    }
  }

  getMetworkCount() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log('por%$$', postData);
    fetch(Constants.unReadNetwork, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson $%%#', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'SUCCESS') {
          let count = responseJson.statistics.count;
          this.setState({
            countNetwork: count,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  getUserDetail() {
    this.setState({spinner: true});
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
        console.log(
          'responseJson @@@@@@@@###########',
          Constants.marchantDetail,
          postData,
          responseJson,
        );
        this.setState({
          spinner: false,
        });
        if (responseJson.status === 'SUCCESS') {
          let merchant_contact = responseJson.merchant;
          this.setState({
            avatar: merchant_contact.logo,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          console.log("error#@",responseJson)
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  async logout_user() {
    this.props.logoutUser();
    await AsyncStorage.removeItem('User');

    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    // BackHandler.exitApp();
  }
  createOrder() {
    this.props.setCustomer({
      customer_name: '',
      customer_email: '',
      customer_phone: '',
    });
    this.props.resetDelivery();

    this.props.emptyOrder({
      cart: [],
    });
    this.props.navigation.navigate('CreateOrder', {screen_name: 'sell'});
  }

  async shareNetwork() {
    try {
      let message = `I found this commerce app that enables us collaborate in trade. \n`;
      message += `Download CICOD Merchant and connect with me on my CICOD handle “${this.props.user.tenantId}”.`;
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('hrer#');
        } else {
          // shared
          console.log('shared#');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed#');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    console.log('uhhhe#$', this.state.user);

    return (
      <Scaffold>
        <View
          style={{
            height: height,
            width: width,
            alignItems: 'center',
            position: 'relative',
            backgroundColor: '#F0F0F0',
          }}>
          <Header
            disabled={
              this.state.user.kciInfo &&
              this.state.user.kciInfo.showWarning &&
              this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                ? true
                : false
            }
            name={this.props.route.name}
            navigation={this.props.navigation}
          />
          {/* <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          /> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: 40}}>
              <View style={[{flexDirection: 'row', paddingVertical: 10}]}>
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text
                    style={[
                      {
                        color: '#B1272C',
                        fontWeight: 'bold',
                        fontSize: 25,
                        fontFamily: 'Open Sans',
                      },
                    ]}>
                    Welcome,
                  </Text>
                  <Text
                    style={{
                      color: '#4E4D4D',
                      fontSize: 25,
                      fontFamily: 'Open Sans',
                    }}>
                    {this.props.user.firstname}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', padding: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.state.user.kciInfo &&
                      this.state.user.kciInfo.showWarning &&
                      this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                        ? this.logout_user()
                        : this.props.navigation.navigate('User')
                    }>
                    <Image
                      style={{height: 50, width: 50, borderRadius: 50}}
                      source={
                        this.state.avatar == '' || this.state.avatar == null
                          ? require('../images/profilepic.png')
                          : {uri: this.state.avatar}
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {this.state.user.kciInfo && this.state.user.kciInfo.showWarning && (
                <View
                  style={{
                    backgroundColor: '#a4272d',
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}>
                  {this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0 ? (
                    <>
                      <Text style={{color: '#ffffff'}}>
                        Your subscription has Expired!{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(
                            `https://${this.state.tenantId.toLowerCase()}.${
                              Constants.renewalLink
                            }`,
                          );
                        }}>
                        <Text style={{color: '#ffffff'}}>Click to renew</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={{color: '#ffffff'}}>
                      {this.state.user.kciInfo.kciUpdates[0].dayRemaining} days
                      remaining before expiry!{' '}
                    </Text>
                  )}
                </View>
              )}

              {this.state.user.merchantStatus &&
                (this.state.user.merchantStatus.code == 6 ||
                  this.state.user.merchantStatus.code == 7) && (
                  <View
                    style={{
                      backgroundColor: '#a4272d',
                      padding: 10,
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#fff', fontSize: 13}}>
                      Your Documents are currently being reviewed, you'll be
                      notified via email within 24Hrs. Thank you.
                    </Text>
                  </View>
                )}


                {this.state.user.merchantStatus &&
                this.state.user.merchantStatus.code < 5 && (
                  <View
                    style={{
                      backgroundColor: '#a4272d',
                      padding: 10,
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#fff', fontSize: 13}}>
                      Please provide your contact details on the web.
                    </Text>
                  </View>
                )}

              {/* {this.state.user.merchantStatus &&
                this.state.user.merchantStatus.code == 5 &&
                this.state.user.merchantApps.includes('ucg') && (
                  <View
                    style={{
                      backgroundColor: '#a4272d',
                      padding: 10,
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#fff', fontSize: 13}}>
                      One more thing, please provide your bank details and
                      business information on the web app.
                    </Text>
                  </View>
                )} */}

              <View
                style={[
                  {
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    paddingHorizontal: 10,

                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // paddingRight: 10,
                  },
                ]}>
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() => this.props.navigation.navigate('Dashboard')}
                  source={require('../images/home/dashboard.png')}
                  title="Dashboard"
                />
                <ModuleCard
                  disabled={
                    (this.state.user.kciInfo &&
                      this.state.user.kciInfo.showWarning &&
                      this.state.user.kciInfo.kciUpdates[0].dayRemaining ==
                        0) ||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() => this.createOrder()}
                  source={require('../images/home/sell.png')}
                  title="     Sell       "
                />
                <ModuleCard
                  disabled={
                    (this.state.user.kciInfo &&
                      this.state.user.kciInfo.showWarning &&
                      this.state.user.kciInfo.kciUpdates[0].dayRemaining ==
                        0) ||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() => this.props.navigation.navigate('Order')}
                  source={require('../images/home/order.png')}
                  title="     Order     "
                />
              </View>

              <View
                style={[
                  {
                    flexDirection: 'row',

                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // paddingRight: 10,
                    paddingHorizontal: 10,
                  },
                ]}>
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                      ? true
                      : false
                  }
                  onPress={() => this.props.navigation.navigate('Customer')}
                  source={require('../images/home/customers.png')}
                  title="Customers"
                />
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0 ||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() =>
                    this.props.navigation.navigate('Products', {seller_id: 0})
                  }
                  source={require('../images/home/products.png')}
                  title="Products"
                />
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0 ||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() => this.props.navigation.navigate('Buyers')}
                  source={require('../images/home/buyers.png')}
                  title="Resellers"
                />
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',

                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // paddingRight: 10,
                    paddingHorizontal: 10,
                  },
                ]}>
                <ModuleCard
                  disabled={
                    (this.state.user.kciInfo &&
                      this.state.user.kciInfo.showWarning &&
                      this.state.user.kciInfo.kciUpdates[0].dayRemaining ==
                        0) ||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() => this.props.navigation.navigate('Connect')}
                  source={require('../images/home/connect.png')}
                  title="Connect"
                />
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0 ||
                    this.state.disable_button
                      ? true
                      : false
                  }
                  onPress={() =>
                    this.props.navigation.navigate('Supplier', {
                      heading: 'supplier',
                    })
                  }
                  source={require('../images/home/suppliers.png')}
                  title="Suppliers"
                />
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0 ||
                    this.state.disable_button
                      ? //|| this.state.user.roles!="SUPERADMIN"
                        true
                      : false
                  }
                  onPress={() => this.props.navigation.navigate('QuickInvoice')}
                  source={require('../images/home/quickinvoice.png')}
                  title="Quick Invoice"
                />
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',

                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // paddingRight: 10,
                    paddingHorizontal: 10,
                  },
                ]}>
                <View>
                  {this.state.countNetwork > 0 && (
                    <IconInfocount count={this.state.countNetwork} />
                  )}
                  <ModuleCard
                    disabled={
                      this.state.user.kciInfo &&
                      this.state.user.kciInfo.showWarning &&
                      this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                        ? true
                        : false
                    }
                    onPress={() => {
                      this.setState({countNetwork: 0}, () =>
                        this.props.navigation.navigate('Network'),
                      );
                    }}
                    source={require('../images/home/network.png')}
                    title="Network"
                  />
                </View>
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                      ? true
                      : false
                  }
                  onPress={() =>
                    this.setState({
                      modalInfoType: 'accounting',
                      modalInfoTextMore: 'Please access on the web',
                      modalInfo: true,
                      btn_modal_txt:"Login to CICOD.com",
                      modalInfoTextMore: 'Every transaction carried out on this CICOD Merchant app is automatically logged in the accounting module, which can be accessed via account on www.cicod.com',
                      modalInfoTextMore_two:
                        'This feature helps you keep track of your income and expenses and shows you the financial performance of your business.',
                      modalInfoTextMore_three: '',
                      modalInfoText: 'Keeping good records is important to monitor the health of your business.',
                    })
                  }
                  source={require('../images/home/account.png')}
                  title="Accounting"
                />
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                      ? true
                      : false
                  }
                  onPress={() =>
                    this.setState({
                      modalInfoType: 'adduser',
                      modalInfoText: 'Want to add more user?',
                      modalInfoTextMore: 'Go to www.cicod.com/login',
                      btn_modal_txt:"Login to CICOD.com ",
                      modalInfoTextMore_two:
                        'Click on Customer Order Management Module',
                      modalInfoTextMore_three: 'Then Administration tab',
                      modalInfo: true,
                    })
                  }
                  source={require('../images/home/AddUser.png')}
                  title="Add User"
                />
              </View>

              <View
                style={[
                  {
                    flexDirection: 'row',

                    marginTop: 10,
                    alignItems: 'center',
                    // justifyContent: 'space-between',

                    paddingHorizontal: 10,
                  },
                ]}>
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                      ? true
                      : false
                  }
                  onPress={() =>
                    this.setState({
                      modalInfoType: 'finance',
                      modalInfoTextMore: 'Different financial service providers shall update their criteria from time to time and this will be visible on check out during an order.',
                      modalInfo: true,
                      modalInfo: true,
                      modalInfoTextMore_two:"This affords you the opportunity of being considered for financial services from various financial service providers in your region. The following criteria will be considered: 1- Must have traded via the app continuously for 3 months and be linked on the trade network. 2- Conducted online transactions as this enables financial service providers with assurance of viability based on electronically referenced transactions over time.",
                      modalInfoTextMore_three:"",
                      modalInfoText: 'Keep the wheels of your business going with inventory finance.',
                      btn_modal_txt:"Login to CICOD.com "
                    })
                  }
                  source={require('../images/home/finance.png')}
                  title="Finance"
                />
                <View style={{width:30}} />
                <ModuleCard
                  disabled={
                    this.state.user.kciInfo &&
                    this.state.user.kciInfo.showWarning &&
                    this.state.user.kciInfo.kciUpdates[0].dayRemaining == 0
                      ? true
                      : false
                  }
                  onPress={() => {
                    this.setState({
                      btn_modal_txt:"Invite now",
                      modalInfoType: 'delivery',
                      modalInfoTextMore: 'The buyer is expected to provide the DAT when receiving the product, the DAT must then be validated by the merchant and provided on the app in order for settlement to occur. ',
                      modalInfoTextMore_two:
                        'In order to ensure a satisfactory business transaction between buyers and sellers a Delivery Acceptance Token (DAT) is sent to the buyer upon every successful sale.',
                      modalInfoTextMore_three:
                        'You can also invite your logistics partner to register on the app.',
                      modalInfo: true,
                      modalInfoText: 'Delivery',
                    });
                  }}
                  source={require('../images/home/delivery.png')}
                  title="Delivery"
                />
              </View>

              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: width - 20,
                    alignSelf: 'center',
                    marginTop: 20,
                    alignItems: 'center',
                    paddingRight: 10,
                  },
                ]}>
                <Text
                  style={{
                    color: '#2F2E7C',
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                  }}>
                  Click the link to access webshop
                </Text>
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: width - 20,
                    alignSelf: 'center',
                    marginTop: 10,
                    alignItems: 'center',
                    paddingRight: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => this.veiwShop()}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#FFFFFF',
                    height: 44,
                    width: '75%',
                    marginRight: 9,
                    borderRadius: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#007BFF',
                      fontWeight: 'bold',
                    }}>{`https://${this.state.tenantId.toLowerCase()}.${
                    Constants.webshop_url
                  }`}</Text>
                  <Image source={require('../images/home/share_alt.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.shareShop()}
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    height: 44,
                    width: '25%',
                    backgroundColor: '#2F2E7C',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../images/home/share.png')}
                  />
                  <Text style={{color: '#ffffff'}}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <OtherModal
            visible={this.state.isShopModal}
            onRequestClose={() => this.setState({isShopModal: false})}
            transparent={true}>
            <TouchableOpacity
              onPress={() => this.setState({isShopModal: false})}>
              <View style={[{}, styles.modalBackGround]}>
                <TouchableWithoutFeedback>
                  <View style={styles.suspendModal}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/online-shop.png')}
                      />
                      <TouchableOpacity
                        onPress={() => this.veiwShop()}
                        style={[{marginLeft: 7}, styles.suspendTouch]}>
                        <Text style={{color: '#808080'}}>View Webshop</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/share.png')}
                      />
                      <TouchableOpacity
                        onPress={() => this.shareShop()}
                        style={[{marginLeft: 7}, styles.suspendTouch]}>
                        <Text style={{color: '#808080'}}>Share Webshop</Text>
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
            visible={this.state.modalInfo}
            onDismiss={() => this.setState({modalInfo: false})}>
            <View
              style={{
                height: height - 90,
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                justifyContent: 'center',
                alignItems: 'center',
                // paddingVertical: 20,
                // paddingVertical: 10,
                paddingHorizontal:10,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              {this.state.modalInfoType == 'delivery' && (
                <Image
                   style={{height:100,width:100}}
                  source={require('../images/home/delivery.png')}
                />
              )}
              {this.state.modalInfoType == 'finance' && (
                <Image
                   style={{height:100,width:100}}
                  source={require('../images/home/finance.png')}
                />
              )}
              {this.state.modalInfoType == 'accounting' && (
                <Image
                   style={{height:100,width:100}}
                  source={require('../images/home/account.png')}
                />
              )}
              {this.state.modalInfoType == 'adduser' && (
                <Image
                  style={{height: 70, width: 70}}
                  source={require('../images/home/AddUserInfo.png')}
                />
              )}
              <Text
                style={{fontWeight: 'bold', color: '#4E4D4D', fontSize:this.state.modalInfoType == 'finance'?17: 20,marginTop:10,marginHorizontal:10}}>
                {this.state.modalInfoText}
              </Text>
              <View style={{alignSelf: 'flex-start', paddingHorizontal: 20,}}>
               
                <Text style={{ marginTop: 14, fontSize:this.state.modalInfoType == 'finance'? 12: 14}}>
                   {this.state.modalInfoTextMore_two}
                </Text>
                <View style={{justifyContent:"center",alignItems:"center", marginTop:20,backgroundColor:"#F0F3F5",borderColor:"#DDE2E5",borderWidth:1,borderRadius:10,paddingHorizontal:10,paddingVertical:20}}>
                <Text style={{color:"#B1272C",fontWeight:"bold",textAlign:"center"}}>NOTE</Text>
                <Text style={{color: '#4E4D4D', marginTop: 16, fontSize: 14}}>
                   {this.state.modalInfoTextMore}
                </Text>
                {
                  this.state.modalInfoTextMore_three!="" &&(
                    <Text style={{color: '#4E4D4D', marginTop: 16, fontSize: 14}}>
                    {this.state.modalInfoTextMore_three}
                    </Text>
                  )
                }
               
                <TouchableOpacity
                onPress={() => {
                  this.state.modalInfoType=="delivery"?this.shareNetwork()  : Linking.openURL(`${Constants.sass_url}/login`);
                }}
                style={{
                  borderWidth: 1,
                  marginTop: 35,
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor: '#fff',
                  borderColor: '#2F2E7C',
                  paddingVertical: 10,
                  padding: 15,
                  width:200,
                  alignSelf:"center",
                  borderRadius: 100,
                }}>
                <Text style={{color: '#2F2E7C'}}>{this.state.btn_modal_txt}</Text>
              </TouchableOpacity>
                </View>
                {/* <Text style={{color: '#4E4D4D', marginTop: 10, fontSize: 12}}>
                  * {this.state.modalInfoTextMore_three}
                </Text> */}
              </View>

            
            </View>
          </Modal>

          <Modal
            visible={this.state.closeApp}
            onDismiss={() => this.setState({closeApp: false})}>
            {console.log(this.props.user)}
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#fff',
                width: width - 50,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              <View style={{flexDirection: 'row', marginBottom: 30}}>
                <Text
                  style={{color: '#B1272C', fontWeight: 'bold', fontSize: 20}}>
                  Want to Exit App?
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      padding: 30,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#B1272C',
                    }}
                    onPress={() => {
                      this.setState({closeApp: false});
                    }}>
                    <Text style={{color: '#B1272C', paddingHorizontal: 10}}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#B1272C',
                      paddingVertical: 15,
                      padding: 40,
                      borderRadius: 100,
                    }}
                    onPress={() => BackHandler.exitApp()}>
                    <Text style={{color: '#fff'}}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    setCustomer: value => dispatch({type: SET_CUSTOMER, value: value}),
    resetDelivery: () => dispatch({type: RESET_DELIVERY_MAIN}),
    emptyOrder: () => dispatch({type: CLEAR_CART}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
