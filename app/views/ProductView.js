/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  Modal as OtherModal
} from 'react-native';
import {Text, TextInput, Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/ProductViewCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import {Constants} from '../views/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import NavBack from './Components/NavBack';
import {SET_USER, LOGOUT_USER, PRODUCT_RELOAD} from '../redux/constants/index';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isChecked: false,
      searchPress: 1,
      productImageModal: false,
      spinner: false,
      prodDetail: {},
      supendModal: false,
      action: 'suspend',
      pro_url: '',
    };
  }

  componentDidMount() {
    console.log('Rtt', this.props.route.params);
    if (this.props.route.params.heading == 'SUPPLIERS') {
      console.log('detailRop', this.props.route.params.item);
      this.setState({
        prodDetail: this.props.route.params.item,
        action: this.props.route.params.item.is_active
          ? 'unsuspend'
          : 'suspend',
      });
    } else {
      console.log('eereeee');
      // if(this.state.pro_url != pro_url){
      let pro_url = Constants.products + '/' + this.props.route.params.prod_id;
      this.getProductDetail(pro_url);
      // this.setState({
      //     pro_url:pro_url
      // })
    }
  }

  getProductDetail(url) {
    let token = this.props.user.access_token;
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson.message', responseJson);
        this.setState({
          spinner: false,
        });
        console.log(
          'response json in products detail !!!!!!!!!!!!!!!!!!',
          responseJson,
        );
        if (
          responseJson.status === 'success' ||
          responseJson.success === true
        ) {
          if (responseJson.data.is_active == true) {
            this.setState({
              prodDetail: responseJson.data,
              action: 'suspend',
            });
          } else {
            this.setState({
              prodDetail: responseJson.data,
              action: 'unsuspend',
            });
          }
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  suspendUnsuspendFun() {
    // https://com.cicodsaasstaging.com/com/api/products/23?action=suspend
    let url =
      Constants.products +
      '/' +
      this.state.prodDetail.id +
      '?action=' +
      this.state.action;
    console.log(' suspend product url !!!!!!!!!!!!', url);
    let token = this.props.user.access_token;
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    fetch(url, postData)
      .then(response => response.json())
      .then(async responseJson => {
        console.log('responseJson.message', responseJson);
        this.setState({
          spinner: false,
        });
        console.log(
          'response json suspend product  !!!!!!!!!!!!!!!!!!',
          responseJson,
        );
        if (
          responseJson.status === 'success' ||
          responseJson.success === true
        ) {
          let _that = this;
          Alert.alert('Message', responseJson.message);
          _that.props.setScreenReload({
            reload: true,
          });
          this.props.navigation.navigate('Products');
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  updateProductFun() {
    this.setState({
      supendModal: false,
    });
    this.props.navigation.navigate('CreateProduct', {
      action: 'update',
      prodDetail: this.state.prodDetail,
      heading: this.props.route.params.heading,
      items:this.props.route.params.items
    });
  }
  ProductViewRender(_that) {
    _that = _that._that;
    let pro_url = Constants.products + '/' + _that.props.route.params.prod_id;

    console.log('***********', _that.state.prodDetail);

    return (
      <View style={[{}, styles.mainView]}>
        <Header navigation={_that.props.navigation} />
        <Spinner
          visible={_that.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{color: '#fff'}}
          color={'#fff'}
        />
        <NavBack
          title="PRODUCT"
          onClick={() => _that.props.navigation.goBack()}
        />

        <View style={[{}, styles.productDeatailContainer]}>
          <View style={[{}, styles.productDeatailHeaderRow]}>
            {_that.state.prodDetail.is_active == true ? (
              <View style={[{}, styles.aciveView]}>
                <Text style={{color: '#26C281'}}>ACTIVE</Text>
              </View>
            ) : (
              <View style={[{}, styles.inaciveView]}>
                <Text style={{color: '#B1272C'}}>IN ACTIVE</Text>
              </View>
            )}
            <Image
              style={[{alignSelf: 'baseline', width: 30, height: 30}]}
              source={require('../images/ticket.png')}
            />
            {_that.props.route.params.heading != 'SUPPLIERS' && (
              <TouchableOpacity
                style={[{padding: 10,}, styles.settingIcon]}
                onPress={() => _that.setState({supendModal: true})}>
                <Icon size={25} color={'#929497'} name="ellipsis-h" />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={[
              {color: '#4E4D4D', textAlign: 'center'},
              fontStyles.bold18,
            ]}>
            {_that.props.route.params.heading == 'SUPPLIERS'
              ? _that.state.prodDetail.name
              : _that.state.prodDetail.name}
          </Text>
          <Text
            style={[
              {color: '#929497', textAlign: 'center'},
              fontStyles.normal12,
            ]}>
            {_that.state.prodDetail.code}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#E6E6E6',
              marginVertical: 10,
            }}></View>
          <View style={[{}, styles.descRow]}>
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Quantity</Text>
              <Text style={[{}, styles.darkGarayText]}>
                {_that.props.route.params.heading == 'SUPPLIERS'
                  ? _that.state.prodDetail.no_qty_limit
                    ? 'No Qty Limit'
                    : _that.state.prodDetail.qnty
                  : _that.state.prodDetail.no_qty_limit
                  ? 'No Qty Limit'
                  : _that.state.prodDetail.quantity}
              </Text>
            </View>
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Price</Text>
              <Text style={[{}, styles.darkGarayText]}>
                {_that.state.prodDetail.currency}
                {_that.state.prodDetail.price}
              </Text>
            </View>
            {/* {_that.props.route.params.heading!='SUPPLIERS' &&(
                            <> */}
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Category</Text>
              <Text style={[{}, styles.darkGarayText]}>
                {_that.state.prodDetail.category}
              </Text>
            </View>
          </View>
          <View style={[styles.descRow, {marginTop: 15}]}>
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Reservation (Days)</Text>
              <Text style={[{}, styles.darkGarayText]}>0</Text>
            </View>
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Created By</Text>
              <Text style={[{}, styles.darkGarayText]}>
                {_that.props.route.params.heading == 'SUPPLIERS'
                  ? '--'
                  : _that.state.prodDetail.created_by}{' '}
              </Text>
            </View>
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Created Date</Text>
              <Text style={[{}, styles.darkGarayText]}>
                {_that.props.route.params.heading == 'SUPPLIERS'
                  ? '--'
                  : _that.state.prodDetail.date_created}
              </Text>
              {/* <Text style={[{}, styles.darkGarayText]}>10:30 AM</Text> */}
            </View>
          </View>
          <View style={[styles.descRow, {marginTop: 15}]}>
            <View style={[{}, styles.descColumn]}>
              <Text style={[{}, styles.lightGrayTex]}>Updated Date</Text>
              <Text style={[{}, styles.darkGarayText]}>
                {_that.state.prodDetail.date_updated || '-'}
              </Text>
            </View>
            <View style={[{}, styles.descColumn]}></View>
            <View style={[{}, styles.descColumn]}></View>
          </View>

          {_that.props.route.params.heading == 'SUPPLIERS' && (
            <>
              <View style={[{}, styles.descColumn]}>
                <Text style={[{}, styles.lightGrayTex]}>Min. Order</Text>
                <Text style={[{}, styles.darkGarayText]}>
                  {_that.state.prodDetail.minimum_order}
                </Text>
              </View>
            </>
          )}
        </View>
{_that.state.prodDetail.image_url=="" || _that.state.prodDetail.image_url!=null ||_that.state.prodDetail.image==""||_that.state.prodDetail.image!==null &&(
 <Text style={[{}, styles.imageHeadingText]}>IMAGE</Text>

)}
       
        <TouchableOpacity
          onPress={() => _that.setState({productImageModal: true})}>
          <Image
            // style={[{}, styles.productImage]}
            style={{height: 60, width: 60, marginLeft: 10}}
            // source={require('../images/juice.png')} />
            source={{
              uri:
                _that.props.route.params.heading == 'SUPPLIERS'
                  ? _that.state.prodDetail.image_url
                  : _that.state.prodDetail.image,
            }}
          />
        </TouchableOpacity>
        <Modal visible={_that.state.productImageModal} transparent={true}>
          <View style={[{}, styles.modalBackGroung]}>
            <TouchableOpacity
              onPress={() => _that.setState({productImageModal: false})}
              style={[{}, styles.modalCloseTouch]}>
              <Icon name="close" color={'#fff'} size={25} />
              <Text style={{color: '#fff', marginLeft: 10}}>Close</Text>
            </TouchableOpacity>

            <Image
              style={{height: height / 2, width: width / 1.3}}
              // source={require('../images/juice.png')}

              source={{
                uri:
                  _that.props.route.params.heading == 'SUPPLIERS'
                    ? _that.state.prodDetail.image_url
                    : _that.state.prodDetail.image,
              }}
            />
          </View>
        </Modal>

        <Modal visible={_that.state.supendModal} transparent={true}>
          <TouchableOpacity
            onPress={() => _that.setState({supendModal: false})}>
            <View style={[{}, styles.suspendmodalBackGround]}>
              <View
                style={[
                  
                  styles.suspendTouch,
                  {flexDirection: 'column', alignSelf: 'baseline'}
                ]}>
                <TouchableOpacity
                  onPress={() => _that.updateProductFun()}
                  style={[{flexDirection: 'row', alignItems: 'center'}]}>
                  {/* <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} /> */}
                  <Icon
                    name="edit"
                    color={'gray'}
                    size={20}
                    style={[{}, styles.banImage]}
                  />
                  <Text style={{}}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => _that.suspendUnsuspendFun()}
                  style={[
                    {
                      flexDirection: 'row',
                      marginTop: 25,
                      marginVertical: 10,
                      alignItems: 'center',
                    },
                  ]}>
                  <Image
                    source={require('../images/ban.png')}
                    style={[{}, styles.banImage]}
                  />
                  {_that.state.action == 'suspend' ? (
                    <Text style={{}}>Suspend</Text>
                  ) : (
                    <Text style={{}}>Unsuspend</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
  render() {
    return (
      <Scaffold>
        <this.ProductViewRender _that={this} />
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    reload: state.reloadReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setScreenReload: value => dispatch({type: PRODUCT_RELOAD, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
