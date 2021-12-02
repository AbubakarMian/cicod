import React from 'react';
import {
  View,
  Linking,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Text, TextInput, Searchbar} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import styles from '../css/ConnectCss';
import fontStyles from '../css/FontCss';
import {
  Container,
  Left,
  Body,
  Right,
  Button,
  Title,
  Segment,
  Content,
} from 'native-base';
import {Constants} from './Constant';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER} from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
import Scaffold from './Components/Scaffold';
import NavBack from './Components/NavBack';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabViewIndex: 1,
      received_arr: [],
      send_arr: [],
      spinner: false,
      search_text:
        this.props.route.params && this.props.route.params.header == 'Network'
          ? this.props.route.params.tenantId
          : '',
      area: '',
      business_sector: '',
      business_type: '',
      merchant_id: 0,
      merchant_name: '',
      date_joined: '',
      is_active_tab: 'connect',
      product_text: '',
      isFound: null,
    };
  }

  timeConvertion(date) {
    //return 'some time';
    console.log('dddd date', date);
    var datetime = date.split(' ');
    var date = datetime[0];
    var time = datetime[1];
    var time_arr = time.split(':');
    var hr = parseInt(time_arr[0]);
    var am_pm = 'AM';
    if (hr > 12) {
      am_pm = 'PM';
      hr = hr - 12;
    }
    if (hr == 12) {
      am_pm = 'PM';
    }

    var timestr = hr + ':' + time_arr[1] + ':' + time_arr[1];
    var date_time = date + ' ' + timestr + ' ' + am_pm;
    console.log('date_time converted ', date_time);
    return date_time;
  }

  getProduct(action) {
    let url = '';
    if (action == 'receive') {
      if (this.state.product_text == '') {
        url = Constants.connectreceivedrequest;
      } else {
        url =
          Constants.connectreceivedrequest +
          '&filter[buyer_name]=' +
          this.state.product_text;
      }

      console.log('**************1', url);
      this.getReceivedConnect(url);
    } else {
      if (this.state.product_text == '') {
        url = Constants.connectsentrequest;
      } else {
        url =
          Constants.connectsentrequest +
          '&filter[seller_name]=' +
          this.state.product_text;
      }
      // url = Constants.connectsentrequest + '?filter[seller_name]=' + this.state.product_text;
      // console.log('**************1',this.state.product_text)
      this.getSendConnect(url);
    }
  }
  componentDidMount() {
    if (
      this.props.route.params &&
      this.props.route.params.header == 'Network'
    ) {
      this.setState({search_text: this.props.route.params.tenantId});
      this.getMerchant();
    }
    this.getSendConnect(Constants.connectsentrequest);
    this.getReceivedConnect(Constants.connectreceivedrequest);
  }
  getReceivedConnect(url) {
    this.setState({spinner: true});
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
        console.log(
          '@@@@@@@@...#####$$$$$response json received!!!!',
          responseJson,
        );
        this.setState({
          spinner: false,
        });
        if (responseJson.success === true) {
          this.setState({
            received_arr: responseJson.data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.data.message;
          if (message == '' || message == undefined) {
            message = 'Server responded with error contact admin';
          }
          Alert.alert('Error', message);
        }
      });
  }
  getSendConnect(url) {
    console.log('+++++++++++++++++++', url);
    this.setState({spinner: true});

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
        this.setState({
          spinner: false,
        });
        console.log('##responseJson sent conet @@@', responseJson);
        if (responseJson.success === true) {
          this.setState({
            send_arr: responseJson.data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          if (message == '' || message == undefined) {
            message = 'Server responded with error contact admin';
          }
          Alert.alert('Error', message);
        }
      });
  }

  getMerchant() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };

    console.log(
      'url !!!!!!!!!!!!!!!!!!',
      Constants.searchMerchant + '?merchantId=' + this.state.search_text,
    );
    fetch(
      Constants.searchMerchant + '?merchantId=' + this.state.search_text,
      postData,
    )
      .then(response => response.json())
      .then(async responseJson => {
        console.log('response json received!!!!', responseJson);
        this.setState({
          spinner: false,
        });
        if (responseJson.success === true) {
          let merchatnt_detail = responseJson.data;
          this.setState({
            isFound: true,
            area: merchatnt_detail.area,
            business_sector: merchatnt_detail.business_sector,
            business_type: merchatnt_detail.business_type,
            merchant_id: merchatnt_detail.merchant_id,
            merchant_name: merchatnt_detail.merchant_name,
            date_joined: merchatnt_detail.date_joined,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          this.setState({isFound: false, merchant_id: 0});
          let show_msg = true;
          let message = responseJson.data.message;
          if (message.includes('No records found for')) {
            show_msg = false;
          }
          if (message == '' || message == undefined) {
            message = 'Server responded with error contact admin';
          }
          if (show_msg == true) {
            Alert.alert('Error', message);
          }
        }
      })
      .catch(error => {
        console.log('jewC');
      });
  }

  sendConnectRequest(id) {
    //https://com.cicodsaasstaging.com/com/api/value-chain/request
    this.setState({spinner: true});
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
      body: JSON.stringify({
        merchant_id: id,
      }),
    };
    fetch(Constants.connectRequest, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(
          ' response Json responseJson responseJson!!!!!!!!!!!',
          responseJson,
        );
        this.setState({spinner: false});
        console.log('working ere');
        if (responseJson.success === 'true') {
          let res = responseJson.data.message;
          console.log('nope');
          Alert.alert('Message', res);
          console.log('testing ere');
          this.setState({merchant_id: 0, search_text: ''});
          this.getSendConnect(Constants.connectsentrequest);
        } else if (responseJson.status == 401) {
          console.log('resds');
          this.unauthorizedLogout();
        } else {
          let message = responseJson.data.message;
          console.log('miow');
          Alert.alert('Message', message);
          this.setState({merchant_id: 0, search_text: ''});
          this.getSendConnect(Constants.connectsentrequest);
        }
      })
      .catch(error => {
        console.log('Api call error', error);
        // Alert.alert(error.message);
      });
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  veiwShop() {
    this.props.navigation.navigate('InAppWebView', {
      uri: `https://${this.state.merchant_id.toLowerCase()}.${
        Constants.webshop_url
      }`,
    });
    // Linking.openURL(
    //   `https://${this.state.merchant_id.toLowerCase()}.${
    //     Constants.webshop_url
    //   }`,
    // );
  }
  connectView() {
    return (
      // <View>

      // </View>
      <View>
        <View style={[{}, styles.contentView]}>
          <Image
            style={{height: width / 5, width: width / 5, marginBottom: 10}}
            source={require('../images/home/connect.png')}
          />
          <Text
            style={[
              {width: width / 2, textAlign: 'center', color: '#4E4D4D'},
              fontStyles.bold15,
            ]}>
            Search for Merchant you want to connect with
          </Text>
          {/* <View style={[{}, styles.searchView]}>
                        <Image
                            source={require('../images/connect/redsearch.png')}
                        />
                        <TextInput
                            label="Merchant Domain Name"
                            style={{ backgroundColor: 'transparent', }}
                            width={width / 1.3}
                            alignSelf={'center'}
                            color={'#000'}
                            onChangeText={text => this.setState({ search_text: text })}
                            onSubmitEditing={() => this.getMerchant()}
                        />
                    </View> */}
          <Searchbar
            placeholder="Merchant Domain"
            iconColor="#B1272C"
            // onChangeText={text => this.setState({ search_text: text })}
            style={{
              width: width / 1.2,
              alignSelf: 'center',
              marginTop: 10,
              elevation: 0,
              borderWidth: 1,
              borderColor: '#D8DCDE',
            }}
            onSubmitEditing={() => this.getMerchant()}
            value={this.state.search_text}
            onChangeText={text =>
              this.setState({search_text: text, isFound: null})
            }
            //update
          ></Searchbar>
        </View>

        <ScrollView>
          {this.state.isFound === false && (
            <View
              style={[
                {alignSelf: 'center', marginTop: height / 10},
                styles.deatilcontentView,
              ]}>
              <Icon name="briefcase" size={80} color={'#D8D8D8'} />
              <Text
                style={[
                  {
                    fontSize: 20,
                    color: '#929497',
                    fontWeight: 'bold',
                    fontFamily: 'Open Sans',
                  },
                ]}>
                No Merchant
              </Text>
              <Text style={[{color: '#929497'}, fontStyles.normal15]}>
                Search for a merchant
              </Text>
            </View>
          )}
          {this.state.merchant_id != 0 && (
            <View style={[{}, styles.detailContentView]}>
              {this.props.route.params &&
              this.props.route.params.header == 'Network' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                  }}>
                  <Image
                    style={{width: 35, height: 35, marginRight: 10}}
                    source={require('../images/bage.png')}
                  />
                  <Text style={[{}, styles.customerNameText]}>
                    {this.state.merchant_name}
                  </Text>
                </View>
              ) : (
                <>
                  <Image source={require('../images/bage.png')} />
                  <Text style={[{}, styles.customerNameText]}>
                    {this.state.merchant_name}
                  </Text>
                </>
              )}

              <View>
                <View style={[{}, styles.marchentRow]}>
                  <Text style={{color: '#4E4D4D'}}>{}</Text>
                </View>
                <View style={[{}, styles.marchentRow]}>
                  <View style={[{}, styles.marchentlableView]}>
                    <Text style={[{}, styles.marchentlableText]}>
                      Merchant ID
                    </Text>
                  </View>
                  <View style={[{}, styles.marchentInfoView]}>
                    <Text style={[{}, styles.marchentInfoText]}>
                      {this.state.merchant_id}
                    </Text>
                  </View>
                </View>
                <View style={[{}, styles.marchentRow]}>
                  <View style={[{}, styles.marchentlableView]}>
                    <Text style={[{}, styles.marchentlableText]}>
                      Business Sector
                    </Text>
                  </View>
                  <View style={[{}, styles.marchentInfoView]}>
                    <Text style={[{}, styles.marchentInfoText]}>
                      {this.state.business_sector}
                    </Text>
                  </View>
                </View>
                <View style={[{}, styles.marchentRow]}>
                  <View style={[{}, styles.marchentlableView]}>
                    <Text style={[{}, styles.marchentlableText]}>
                      Business Type
                    </Text>
                  </View>
                  <View style={[{}, styles.marchentInfoView]}>
                    <Text style={[{}, styles.marchentInfoText]}>
                      {this.state.business_type ?? ' - -'}
                    </Text>
                  </View>
                </View>
                <View style={[{}, styles.marchentRow]}>
                  <View style={[{}, styles.marchentlableView]}>
                    <Text style={[{}, styles.marchentlableText]}>Area</Text>
                  </View>
                  <View style={[{}, styles.marchentInfoView]}>
                    <Text style={[{}, styles.marchentInfoText]}>
                      {this.state.area ?? ' - -'}
                    </Text>
                  </View>
                </View>
                <View style={[{}, styles.marchentRow]}>
                  <View style={[{}, styles.marchentlableView]}>
                    <Text style={[{}, styles.marchentlableText]}>
                      Date Joined
                    </Text>
                  </View>
                  <View style={[{}, styles.marchentInfoView]}>
                    <Text style={[{}, styles.marchentInfoText]}>
                      {this.state.date_joined ?? ' - -'}
                    </Text>
                  </View>
                </View>
                {this.props.route.params &&
                this.props.route.params.header == 'Network' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.sendConnectRequest(this.state.merchant_id)
                      }
                      style={[
                        styles.connectBtnNew,
                        {backgroundColor: '#FFE9E9'},
                      ]}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../images/connectNet.png')}
                      />
                      <Text
                        style={{
                          color: '#B1272C',
                          fontWeight: 'bold',
                          marginBottom: 4,
                          marginTop: 4,
                        }}>
                        Trade with me
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#B1272C'}}>Connect Now</Text>
                        <Icon name="arrow-right" color="#B1272C" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.veiwShop()}
                      style={[
                        styles.connectBtnNew,
                        {backgroundColor: '#D5D5E4'},
                      ]}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../images/shopNet.png')}
                      />
                      <Text
                        style={{
                          color: '#2F2E7C',
                          fontWeight: 'bold',
                          marginBottom: 4,
                          marginTop: 4,
                        }}>
                        Buy from me
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F2E7C'}}>View my shop</Text>
                        <Icon name="arrow-right" color="#2F2E7C" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.sendConnectRequest(this.state.merchant_id)
                    }
                    style={[{}, styles.connectBtn]}>
                    <Text style={{color: '#fff'}}>Connect</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  approveConnect(item) {
    if (item.status != 'APPROVED') {
      this.props.navigation.replace('ConnectView', {item: item});
    }
  }

  onChangeTextRecieved = text => {
    this.setState({product_text: text});
    //  alert(this.state.product_text)
    console.log('goi', this.state.product_text);
    // if (this.state.product_text=="") {
    //     this.getProduct("receive")
    // }
  };
  onChangeTextPressed = text => {
    alert(this.state.product_text);
  };

  recievedView() {
    return (
      <ScrollView>
        <View>
          <Searchbar
            placeholder="Search a Merchants"
            iconColor="#929497"
            value={this.state.product_text}
            onClear={this.onChangeTextPressed}
            style={{
              width: width - 20,
              alignSelf: 'center',
              marginTop: 10,
              elevation: 0,
              borderWidth: 1,
              borderColor: '#D8DCDE',
            }}
            onChangeText={this.onChangeTextRecieved}
            onSubmitEditing={() => this.getProduct('receive')}
            //update
          ></Searchbar>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 15,
              width: width - 20,
              alignSelf: 'center',
              borderBottomColor: '#E6E6E6',
            }}></View>
          <View style={[{}, styles.recievedList]}>
            {this.state.received_arr.length > 0 ? (
              <FlatList
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View
                      style={[style.separator, highlighted && {marginLeft: 0}]}
                    />
                  ))
                }
                data={this.state.received_arr}
                renderItem={({item, index, separators}) => (
                  // <TouchableOpacity
                  //     key={item.key}
                  //     // onPress={() => this._onPress(item)}
                  //     onShowUnderlay={separators.highlight}
                  //     onHideUnderlay={separators.unhighlight}>
                  //     <View style={[{}, styles.flatCardView]}>
                  //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  //             <Image source={require('../images/bage.png')} />
                  //         </View>
                  //         <View style={{ flex: 5, flexDirection: 'column' }}>
                  //             <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>KNGS CROWN</Text>
                  //             <View style={{ flexDirection: 'row' }}>
                  //                 <Text style={[{ color: '#929497' }, fontStyles.bold13]}>342345 .  </Text>
                  //                 <Text style={[{ color: '#929497' }, fontStyles.normal12]}>2017-01-30 / 10:45 AM</Text>
                  //             </View>
                  //         </View>

                  //         <View style={[{ flex: 2, position: 'absolute', right: 10, bottom: 10, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                  //             <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                  //         </View>
                  //     </View>
                  // </TouchableOpacity>
                  <TouchableOpacity
                    key={item.key}
                    disabled={item.status == 'PENDING' ? false : true}
                    onPress={() =>
                      item.status == 'PENDING'
                        ? this.approveConnect(item)
                        : console.log('nothing happen')
                    }
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={[{}, styles.flatCardView]}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{height: 35, width: 35}}
                          source={require('../images/bage.png')}
                        />
                      </View>
                      <View style={{flex: 5, flexDirection: 'column'}}>
                        <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                          {item.buyer_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                            {item.buyer_id}{' '}
                          </Text>
                          <Text
                            style={[{color: '#929497'}, fontStyles.normal12]}>
                            {' '}
                            {this.timeConvertion(item.time_requested)}
                          </Text>
                        </View>
                      </View>

                      {/* <View style={[{flex:2, position: 'absolute', right: 10, bottom:10, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                    <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                </View> */}

                      {item.status == 'PENDING' ? (
                        <View
                          style={[
                            {
                              position: 'absolute',
                              right: 10,
                              bottom: 10,
                              backgroundColor: '#E6E6E6',
                              marginLeft: 10,
                              paddingHorizontal: 10,
                              borderRadius: 50,
                            },
                          ]}>
                          <Text style={[{color: '#929497'}]}>PENDING</Text>
                        </View>
                      ) : item.status == 'APPROVED' ? (
                        <View
                          style={[
                            {
                              position: 'absolute',
                              right: 10,
                              bottom: 10,
                              backgroundColor: '#DAF8EC',
                              marginLeft: 10,
                              paddingHorizontal: 10,
                              borderRadius: 50,
                            },
                          ]}>
                          <Text style={[{color: '#26C281'}]}>APPROVED</Text>
                        </View>
                      ) : (
                        <View
                          style={[
                            {
                              position: 'absolute',
                              right: 10,
                              bottom: 10,
                              backgroundColor: '#FFF4F4',
                              marginLeft: 10,
                              paddingHorizontal: 10,
                              borderRadius: 50,
                            },
                          ]}>
                          <Text style={[{color: '#B1272C'}]}>REJECTED</Text>
                        </View>
                      )}
                      {}
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  height: height / 1.75,
                  position: 'relative',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F0F0F0',
                  width: width - 20,
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 5,
                }}>
                <Image source={require('../images/Untitled-1.png')} />
                <Text
                  style={{
                    color: '#929497',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Open Sans',
                  }}>
                  No Product found
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
  sentConnect(item) {
    if (item.status != 'APPROVED') {
      this.props.navigation.navigate('ConnectView', {item: item});
    }
  }

  sentView() {
    console.log('this.props.navigation');
    return (
      <View>
        <Searchbar
          placeholder="Search a Merchants"
          iconColor="#929497"
          style={{
            width: width - 20,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 5,
            elevation: 0,
            borderWidth: 1,
            borderColor: '#D8DCDE',
          }}
          onChangeText={text => this.setState({product_text: text})}
          onSubmitEditing={() => this.getProduct('sent')}
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
        <View style={[{}, styles.recievedList]}>
          {this.state.send_arr.length > 0 ? (
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                (({highlighted}) => (
                  <View
                    style={[style.separator, highlighted && {marginLeft: 0}]}
                  />
                ))
              }
              data={this.state.send_arr}
              renderItem={({item, index, separators}) => (
                // <TouchableOpacity
                //     key={item.key}
                //   //  onPress={() => this.sentConnect(item)}
                //     // onPress={() => this.props.navigation.navigate('ConnectView',{item:item})}
                //     onShowUnderlay={separators.highlight}
                //     onHideUnderlay={separators.unhighlight}>
                <View style={[{}, styles.flatCardView]}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{height: 35, width: 35}}
                      source={require('../images/bage.png')}
                    />
                  </View>
                  <View style={{flex: 5, flexDirection: 'column'}}>
                    <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                      {item.seller_name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[{color: '#929497'}, fontStyles.bold13]}>
                        {item.buyer_id}{' '}
                      </Text>
                      <Text style={[{color: '#929497'}, fontStyles.normal12]}>
                        {this.timeConvertion(item.time_requested)}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={[{flex:2, position: 'absolute', right: 10, bottom:10, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                    <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                </View> */}

                  {item.status == 'PENDING' ? (
                    <View
                      style={[
                        {
                          position: 'absolute',
                          right: 10,
                          bottom: 10,
                          backgroundColor: '#E6E6E6',
                          marginLeft: 10,
                          paddingHorizontal: 10,
                          borderRadius: 50,
                        },
                      ]}>
                      <Text style={[{color: '#929497'}]}>PENDING</Text>
                    </View>
                  ) : item.status == 'APPROVED' ? (
                    <View
                      style={[
                        {
                          position: 'absolute',
                          right: 10,
                          bottom: 10,
                          backgroundColor: '#DAF8EC',
                          marginLeft: 10,
                          paddingHorizontal: 10,
                          borderRadius: 50,
                        },
                      ]}>
                      <Text style={[{color: '#26C281'}]}>APPROVED</Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        {
                          position: 'absolute',
                          right: 10,
                          bottom: 10,
                          backgroundColor: '#FFF4F4',
                          marginLeft: 10,
                          paddingHorizontal: 10,
                          borderRadius: 50,
                        },
                      ]}>
                      <Text style={[{color: '#B1272C'}]}>REJECTED</Text>
                    </View>
                  )}
                </View>
                // </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                height: height / 1.75,
                position: 'relative',
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F0F0F0',
                width: width - 20,
                padding: 10,
                borderRadius: 10,
                marginBottom: 5,
              }}>
              <Image source={require('../images/Untitled-1.png')} />
              <Text
                style={{
                  color: '#929497',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'Open Sans',
                }}>
                No Product found
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
  tabView = () => {
    if (this.state.tabViewIndex == 1) {
      return this.connectView();
    } else if (this.state.tabViewIndex == 2) {
      return this.recievedView();
    } else if (this.state.tabViewIndex == 3) {
      return this.sentView();
    }
  };

  render() {
    return (
      <Scaffold style={{flex: 1}}>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            cancelable={true}
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <ScrollView>
            <View style={{paddingHorizontal: 10}}>
              <NavBack
                title={
                  this.props.route.params &&
                  this.props.route.params.header == 'Network'
                    ? 'NETWORK'
                    : 'CONNECT'
                }
                onClick={() => this.props.navigation.goBack()}
              />
            </View>

            <View style={[{}, styles.tabView]}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    this.state.tabViewIndex === 1 ? '#FFF4F4' : '#fff',
                  borderRadius: 50,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  this.setState({tabViewIndex: 1});
                }}>
                <Text
                  style={{
                    color:
                      this.state.tabViewIndex === 1 ? '#B1272C' : '#4E4D4D',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Connect
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    this.state.tabViewIndex === 2 ? '#FFF4F4' : '#fff',
                  borderRadius: 50,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  this.setState({tabViewIndex: 2});
                }}>
                <Text
                  style={{
                    color:
                      this.state.tabViewIndex === 2 ? '#B1272C' : '#4E4D4D',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Received
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    this.state.tabViewIndex === 3 ? '#FFF4F4' : '#fff',
                  borderRadius: 50,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  this.setState({tabViewIndex: 3});
                }}>
                <Text
                  style={{
                    color:
                      this.state.tabViewIndex === 3 ? '#B1272C' : '#4E4D4D',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Sent
                </Text>
              </TouchableOpacity>
            </View>

            <this.tabView />
          </ScrollView>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Connect);
