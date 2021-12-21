import React from 'react';
import {
  View,
  Share,
  FlatList,
  Dimensions,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {Text, TextInput, Searchbar} from 'react-native-paper';

import fontStyles from '../css/FontCss';

import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import {connect} from 'react-redux';

import {
  SET_USER,
  LOGOUT_USER,
  UpdateTabbar,
  PRODUCT_RELOAD,
} from '../redux/constants/index';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';

import {Constants} from '../views/Constant';

// import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import NavBack from './Components/NavBack';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropDownModal from './Components/DropDownModal';
import moment from 'moment';
import Scaffold from './Components/Scaffold';
class Network extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectors: [],
      showdropDownModal: false,
      selected_sector: '',
      selectedStartDate: null,
      calenderModal: false,
      data: [],
      statistics: null,
      categoryarr: [],
      search_merchant: '',
      spinner: false,
      prod_image: '',
      reload: true,
      filters: [],
      get_merchant_url: '',
      isFetching: false,
      isMessage: false,
      message_text: '',
      pageNo: 1,
      isSearch:false
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onRefresh() {
    console.log('222222222222', this.state.isFetching);
    this.setState({isFetching: true,data:[]});
    // if(this.state.isFetching==true){

    let search_url = Constants.getMerchants;
    this.getData(search_url);
    return;
    // }
    console.log('333333333333', this.state.isFetching);
    // _that.setState({
    //     url_orders: url,
    // })
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  async componentDidMount() {
    console.log(
      '~~~~~~~~~~~~~~~~~~~~*************',
      this.props.user.access_token,
    );
    const that = this;
    const url = Constants.getMerchants + '?pageNo=' + this.state.pageNo;
    this.getData(url);
    this.getSectors();
  }

  async getSectors() {
    let _that = this;
    if (_that.state.isFetching == true) {
      _that.setState({isFetching: false});
    }

    this.setState({spinner: true});

    console.log('token ', this.props.user.access_token);

    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: this.props.user.access_token,
      },
    };
    console.log('dsdwe$##', postData, Constants.getSectors);
    fetch(Constants.getSectors, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('~~~~~~~~~~~~~~~~~~dddon @@@@@@@', responseJson);
        // console.log('responseJson.postData', postData);
        this.setState({
          spinner: false,
        });
        if (
          responseJson.status === 'SUCCESS' ||
          responseJson.success === true
        ) {
          let sectors = responseJson.list.map(item => {
            return {label: item.name, value: item.token};
          });
          await this.setState({
            sectors: sectors,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  async getData(url) {
    let _that = this;
    if (_that.state.isFetching == true) {
      _that.setState({isFetching: false});
    }

    this.setState({spinner: true});
    console.log('search url ', url);
    console.log('token ', this.props.user.access_token);

    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    console.log('fou$##', postData);
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log(
          '~~~~~~~~~~~~~~~~~~responseJson.responseJson responseJson responseJson @@@@@@@',
          responseJson,
        );
        // console.log('responseJson.postData', postData);
        this.setState({
          spinner: false,
          isFetching:false
        });
        if (
          responseJson.status === 'SUCCESS' ||
          responseJson.success === true
        ) {
          if(this.state.isSearch){
this.setState({
  data:responseJson.merchants,
  isSearch:false
})
          }else{

          
          // const data=responseJson.merchants
           this.setState({
            data: [...this.state.data, ...responseJson.merchants],
            statistics: responseJson.statistics,
            isSearch:false
          });
        }
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          console.log('eororo', responseJson);
          this.setState({
            isMessage: true,
            message_text: 'No Metchant Found',
          });
        }
      });
  }

  renderFooter = () => {
    
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    // if (!this.state.spinner) return null;
    // return <ActivityIndicator style={{color: '#000'}} />;
    return (
      <TouchableOpacity
        onPress={() => this.handleLoadMore()}
        style={{
          padding: 5,
          alignSelf: 'center',
          marginTop: 7,
          marginBottom: 350,
          padding:20
        }}>
        <Text style={{letterSpacing: 1.1, fontWeight: 'bold'}}>Load More</Text>
      </TouchableOpacity>
    );
  };

  handleLoadMore = () => {
    // if (!this.state.spinner) {
    //   alert();
    const pageNo = this.state.pageNo + 1; // increase page by 1
    this.setState({pageNo});
    const url = Constants.getMerchants + '?pageNo=' + pageNo;

    this.getData(url); // method for API call
    // } else {
    //   alert('here');
    // }
  };

  search() {
    let search_url = `${Constants.getMerchants}?searchType=merchant&searchKeyword=${this.state.search_merchant}`;
    console.log("dse#$$",search_url)
    this.getData(search_url);
  }

  onSelectSector = sector => {
    this.setState({selected_sector: sector, showdropDownModal: false,isSearch:true});
    //console.log(' category ID search !!!!!!!!!!!!!!!@@@@@@@@@@@@@@', category_id)
    let search_url = `${Constants.getMerchants}?searchType=sector&searchKeyword=${sector}`;
    console.log('koi$##', search_url);
    this.getData(search_url);
  };

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
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
    //console.log('categoryarr categoryarr categoryarr', this.props);
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    console.log('user$##', this.props.user);
    return (
      <Scaffold style={{flex: 1}}>
        <View
          style={{
            width: width,
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            flex: 1,
            // padding:10,

            borderRadius: 10,
            flexDirection: 'column',
          }}>
          <AwesomeAlert
            show={this.state.isMessage}
            showProgress={false}
            title={this.state.message_text}
            // message={this.state.message_text}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={false}
            cancelText="Close"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.setState({isMessage: false});
            }}
          />
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <Header navigation={this.props.navigation} />
          <View
            style={{
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <NavBack
              title="MERCHANTS DIRECTORY"
              onClick={() => this.props.navigation.goBack()}
            />
          </View>

          <View style={{padding: 10, width: '100%'}}>
            <TouchableOpacity
              onPress={() => this.shareNetwork()}
              style={{
                backgroundColor: '#D5D5E4',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                flexDirection: 'row',
              }}>
              <Icon name="user-plus" color="#2F2E7C" size={20} />
              <Text style={{color: '#2F2E7C', fontSize: 15, marginLeft: 5}}>
                Invite
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: '#DDE2E5',
              borderWidth: 1,
              width: '100%',
              marginTop: 10,
            }}
          />
          {/* <View
            style={{
              width: '100%',
              borderBottomColor: '#E6E6E6',
              borderBottomWidth: 1,
            }}>
            <Picker
              onValueChange={(itemValue, itemLabel, itemIndex) =>
                this.onSelectSector(itemValue, itemIndex)
              }
              selectedValue={this.state.selected_sector}>
              <Picker.Item
                style={{fontSize: 15}}
                color="#929497"
                label="Select Sector"
                value=""
              />
              {this.state.sectors.map(elem => {
                return (
                  <Picker.Item
                    style={{fontSize: 13}}
                    color="#929497"
                    label={elem.label}
                    value={elem.value}
                  />
                );
              })}
            </Picker>
          </View> */}

          <View
            style={{
              marginBottom: 5,
              flexDirection: 'row',
              width: width - 20,
              alignSelf: 'center',
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Searchbar
              placeholder="Search merchant"
              style={[{color: '#D8D8D8'}, fontStyles.normal14]}
              iconColor="#929497"
              style={{
                width: width / 1.3,
                alignSelf: 'center',
                marginTop: 5,
                marginBottom: 5,
                elevation: 0,
                borderColor: '#D8DCDE',
              }}
              onChangeText={text => this.setState({search_merchant: text,isSearch:true})}
              onSubmitEditing={() => this.search()}
              //update
            ></Searchbar>
            <View
              style={[
                {
                  borderBottomColor: '#E6E6E6',
                  borderBottomWidth: 0.5,
                  width: width - 20,
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                },
              ]}></View>

            <TouchableOpacity
              style={{position: 'absolute', right: 0, alignSelf: 'center'}}
              onPress={() => {
                this.setState({
                  showdropDownModal: true,
                });
                // this.props.navigation.navigate('ProductFilter');
              }}>
              <Image
                style={{height: 50, width: 50}}
                source={require('../images/Order/settingicon.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 5,
              padding: 10,
            }}>
            <Text style={{color: '#4E4D4D'}}>
              {moment().format('D, MMM Y')}
            </Text>
            <View
              style={{
                backgroundColor: '#DAF8EC',
                padding: 5,
                marginLeft: 10,
                marginTop: -5,
              }}>
              <Text>
                {this.state.statistics ? this.state.statistics.countToday : 0}{' '}
                Merchants Joined
              </Text>
            </View>
          </View>
          {/* <ScrollView></ScrollView> */}

          <View>
            {this.state.data.length < 1 ? (
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
                  No Merchant found
                </Text>
              </View>
            ) : (
              <FlatList
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                style={{}}
                data={this.state.data}
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View style={[highlighted && {marginLeft: 0}]} />
                  ))
                }
                // extraData={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index, separators}) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.isKycApproved) {
                        this.props.navigation.navigate('Connect', {
                          tenantId: item.tenantId,
                          header: 'Network',
                        });
                      } else {
                        Alert.alert('Info!', 'Merchant not verified');
                      }
                    }}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View
                      style={{
                        zIndex: -0.999,
                        position: 'relative',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        width: width - 20,
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 5,
                      }}>
                      <View style={[{zIndex: -0.999, flexDirection: 'row'}]}>
                        {item.image == null ? (
                          <Image
                            style={[{height: 40, width: 40, marginRight: 5}]}
                            source={require('../images/bage.png')}
                          />
                        ) : (
                          <Image
                            style={[{height: 50, width: 50}]}
                            source={{uri: item.image}}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          position: 'relative',
                          flex: 3,
                          marginLeft: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={[{color: '#4E4D4D'}, fontStyles.bold15]}>
                            {item.companyName}
                          </Text>
                          {item.isKycApproved && (
                            <Image
                              style={[{height: 17, width: 17, marginLeft: 3}]}
                              source={require('../images/greenTick.png')}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: 5,
                            flex: 1,
                            alignItems: 'center',
                          }}>
                          {item.state && (
                            <>
                              <View
                                style={{
                                  backgroundColor: '#EDE2E2',
                                  width: 10,
                                  height: 10,
                                  borderRadius: 50,
                                }}
                              />
                              <Text
                                style={[
                                  {
                                    color: '#929497',
                                    marginLeft: 3,
                                    marginRight: 5,
                                  },
                                  fontStyles.normal12,
                                ]}>
                                {item.state ?? '--'}
                              </Text>
                            </>
                          )}

                          {item.businesstype && (
                            <>
                              <View
                                style={{
                                  backgroundColor: '#EDE2E2',
                                  width: 10,
                                  height: 10,
                                  borderRadius: 50,
                                }}
                              />
                              <Text
                                style={[
                                  {
                                    color: '#929497',
                                    marginLeft: 3,
                                    marginRight: 5,
                                  },
                                  fontStyles.normal12,
                                ]}>
                                {item.businesstype ?? '--'}
                              </Text>
                            </>
                          )}
                          {item.sector && (
                            <>
                              <View
                                style={{
                                  backgroundColor: '#EDE2E2',
                                  width: 10,
                                  height: 10,

                                  borderRadius: 50,
                                }}
                              />
                              <View
                                style={
                                  {
                                    // flex: 1,
                                    // flexDirection: 'row',
                                    // flexWrap: 'wrap',
                                  }
                                }>
                                <Text
                                  style={[
                                    {
                                      color: '#929497',
                                      // flex: 1,
                                      flexWrap: 'wrap',
                                      marginLeft: 3,
                                      marginRight: 5,
                                    },
                                    fontStyles.normal12,
                                  ]}>
                                  {item.sector}
                                </Text>
                              </View>
                            </>
                          )}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[{color: '#929497'}, fontStyles.normal12]}>
                            {item.aboutUs ?? ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ListFooterComponent={this.renderFooter}
                // onEndReachedThreshold={0.1}
                // onEndReached={this.handleLoadMore}
              />
            )}
          </View>

          {/* <Modal
                 animationType="fade"
                 visible={true}//this.state.regionModal
                 transparent={true}
                 hasBackdrop={true}
                 deviceHeight={height}
                 deviceWidth={width}
                 ba
                 justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 backgroundColor={'#000'}
                 opacity={0.8}
                > */}
          <DropDownModal
            showdropDownModal={this.state.showdropDownModal}
            data={this.state.sectors}
            title="Select Sector"
            selected={this.state.selected_sector}
            onSelected={this.onSelectSector}
            handleClose={() => {
              this.setState({
                showdropDownModal: false,
              });
            }}
          />
        </View>
      </Scaffold>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    tabBar: state.tabBarReducer,
    reload: state.reloadReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setTabBar: value => dispatch({type: UpdateTabbar, value: value}),
    setScreenReload: value => dispatch({type: PRODUCT_RELOAD, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Network);
