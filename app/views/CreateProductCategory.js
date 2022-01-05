/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
 
  Alert,
  Dimensions,
  Image,

  TouchableOpacity,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import styles from '../css/CreateProductCategoryCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from '../views/Constant';
import {connect} from 'react-redux';
import {
  SET_USER,
  LOGOUT_USER,
  PRODUCT_RELOAD,
  PRODUCT_CATEGORY_RELOAD,
} from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import NavBack from './Components/NavBack';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');

class CreateProductCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      categoryarr: [],
      add_weshop: false,
      category_id: 0,
      name: '',
      description: '',
      prod_image: this.props.route.params.items
        ? this.props.route.params.items.image
        : '',
      id: 0,
      product_category: this.props.route.params.items ?? {
        id: 0,
        name: '',
        description: '',
        prod_image: '',
        on_webshop: false,
      },
      screen: '',
      isMessage: false,
      message_text: '',
    };
  }

  get_edit_product_category() {
    if (this.props.route.params.items == null) {
      // && this.state.screen != 'update'
      if (this.state.id == 0) {
        return;
      }
      this.setState({
        product_category: {
          id: 0,
          name: '',
          description: '',
          prod_image: '',
          on_webshop: false,
        },
        screen: 'new',
      });
    } else {
      if (this.state.id == this.props.route.params.items.id) {
        return;
      }
      let product_category = this.props.route.params.items;
      product_category.prod_image = this.props.route.params.items.image;
      console.log('edit prodcat', product_category);
      this.setState({
        product_category: product_category,
        screen: 'update',
        id: this.props.route.params.items.id,
      });
    }
    // this.getCategoryList();
  }

  setImage(props) {
    let _that = props._that;
    console.log(
      '~~~~~~~~~~~******************** _that.state._that.state.product_category',
      _that.state.product_category,
    );
    if (_that.state.product_category.prod_image != '') {
      return (
        <Image
          style={{height: width / 6, width: width / 6}}
          source={{uri: _that.state.product_category.prod_image}}
        />
      );
    } else {
      return (
        <Image
          style={{height: width / 6, width: width / 6}}
          source={require('../images/redPlus.png')}
        />
      );
    }
  }

  createCategory() {
    console.log('this.state.product_category', this.state.product_category);
    // if(this.state.prod_image.path==''){
    // if(this.state.product_category.prod_image==''){
    //     Alert.alert("Warning", "Category Image is required");
    //     return;
    // }
    this.setState({spinner: true});
    let _that = this;

    if (this.state.product_category.name === '') {
      this.setState({spinner: false});
      Alert.alert('Warning', 'Category name is required');
      return;
    } else {
      let token = this.props.user.access_token;
      console.log('cccccccccc', token);

      var formData = new FormData();
      formData.append('name', this.state.product_category.name);
      formData.append('description', this.state.product_category.description);

      //   formData.append('image',{
      //     uri: this.state.product_category.prod_image,
      //         type: 'multipart/form-data',
      //         name: `image.jpg`,

      //     }
      //   );

      // formData.append('on_webshop',this.state.add_weshop);
      formData.append(
        'on_webshop',
        this.state.product_category.on_webshop ? 1 : 0,
      );
      console.log('222222222222222~~~~~~~~~~~~body formdata', formData);
      console.log(
        '222222222222222~~~~~~~~~~~~body this.state.product_category.on_webshop',
        this.state.product_category.on_webshop,
      );
      // return
      console.log('222222222222222~~~~~~~~~~~~body formdata image', {
        uri: this.state.product_category.prod_image,
        type: 'multipart/form-data',
        name: 'image.jpg',
      });
      // return;
      let myheader = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      if (this.state.id == 0) {
        let url = Constants.update_product_category;
        console.log('url', url, '!!!! token : ', this.props.user.access_token);
        axios
          .post(url, formData, myheader)
          .then(function (response) {
            _that.setState({spinner: false});
            console.log('axiso response 1111111', response.data);
            if (response.data.status === 'success') {
              console.log('GGGGGGGGGGG', response.data);
              _that.setState({
                name:'',
                description:'',
                prod_image:'',
                product_category: {
                  id: 0,
                  name: '',
                  description: '',
                  prod_image: '',
                  on_webshop: false,
                },
                screen: 'new',
                isMessage: true,
                message_text: 'Product Category Created Successfully',
              });
              // Alert.alert('Product Category Created Successfully')
            } else {
              Alert.alert(response.data.message);
            }
          })
          .catch(function (error) {
            _that.setState({spinner: false});
            console.log(error);
          });
      } else {
        let url = Constants.update_product_category + '/' + this.state.id;
        console.log('~~~~~~~~~~ update category', url);

        axios
          .put(url, formData, myheader)
          .then(function (response) {
            console.log('axiso response 2222222', response.data);
            _that.setState({spinner: false});
            if (response.data.status === 'success') {
              console.log('GGGGGGGGGGG', response.data);
              _that.setState({
                name:'',
                description:'',
                prod_image:'',
                product_category: {
                  id: 0,
                  name: '',
                  description: '',
                  prod_image: '',
                  on_webshop: false,
                },
                screen: 'new',
              });;
              Alert.alert('Success','Product Category Updated Successfully!',[
                {
                  text:'OK',
                  onPress: () => {
                    _that.props.setScreenReload({
                      reload: true,
                    });
                    _that.props.navigation.navigate('ProductCategory');
                  },
                },
              ]);
            } else {
              Alert.alert(response.response.message);
            }
          })
          .catch(function (error) {
            _that.setState({spinner: false});
            console.log(error);
            Alert.alert(error);
          });
      }
    }
  }

  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  getCategoryList() {
    this.setState({spinner: true});
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
        console.log('$$$$$$$$$$$$$', responseJson);
        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let categoryarr = res.map((x, key) => {
            return {label: x.name, value: x.id};
          });
          this.setState({
            categoryarr: categoryarr,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }

  imageUpload() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      size: 1000000,
    }).then(image => {
      console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
      let product_category = this.state.product_category;
      product_category.prod_image = image.path;
      this.setState({
        prod_image: image.path,
        product_category: product_category,
      });
    });
  }
  setName(text) {
    let product_category = this.state.product_category;
    console.log('text name', text);
    product_category.name = text;
    this.setState({product_category: product_category});
  }

  setDescription(text) {
    let product_category = this.state.product_category;
    product_category.description = text;
    this.setState({product_category: product_category});
  }
  change_on_webshop() {
    let product_category = this.state.product_category;
    product_category.on_webshop = !product_category.on_webshop;
    this.setState({
      product_category: product_category,
    });
  }
  render() {
    this.get_edit_product_category();
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

          <AwesomeAlert
            show={this.state.isMessage}
            showProgress={false}
            title={this.state.message_text}
            // message={this.state.message_text}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="Close"
            confirmText="Ok"
            confirmButtonColor="#26C281"
            //   onCancelPressed={() => {
            //     this.setState({isMessage:false})
            //   }}
            onConfirmPressed={() => {
              this.setState({isMessage: false});
              this.props.setScreenReload({
                reload: true,
              });
              this.props.navigation.navigate('ProductCategory');
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
              justifyContent: 'space-between',
            }}>
            <NavBack
              onClick={() =>
                this.props.route.params &&
                this.props.route.params.action == 'create'
                  ? this.props.navigation.goBack()
                  : this.props.navigation.navigate('CreateProduct', {
                      action: 'create',
                      prodDetail: null,
                    })
              }
              title={
                this.props.route.params.items == null
                  ? 'CREATE PRODUCT CATEGORY'
                  : 'EDIT PRODUCT CATEGORY'
              }
            />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProductCategory')}>
              <Icon name="list" color="#929497" size={20} />
            </TouchableOpacity>
          </View>

          {/* <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('Home')}
                        onPress={() => this.props.route.params.action==null? this.props.navigation.goBack():this.props.navigation.navigate("CreateProduct",{action: 'create', prodDetail: null})}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <Text style={[{ color: '#2F2E7C', fontWeight: '700', marginLeft: 10 }, fontStyles.normal15]}>
                        {this.props.route.params.items == null?'CREATE':'EDIT'} PRODUCT CATEGORY</Text>
                </View> */}
          <View style={[{}, styles.mainContentView]}>
            <View style={[{}]}>
              <TextInput
                onChangeText={text => this.setName(text)}
                label="Name*"
                style={{backgroundColor: 'transparent', borderColor: '#CFCFCF'}}
                width={width - 50}
                alignSelf={'center'}
                color={'#000'}
                value={this.state.product_category.name}
              />
              <TextInput
                onChangeText={text => this.setDescription(text)}
                label="Description"
                style={{backgroundColor: 'transparent', borderColor: '#CFCFCF'}}
                width={width - 50}
                alignSelf={'center'}
                color={'#000'}
                value={this.state.product_category.description}
              />
              <CheckBox
                style={[
                  {
                    width: width / 2,
                    alignSelf: 'flex-start',
                    marginVertical: 10,
                    alignItems: 'center',
                  },
                ]}
                onClick={() => {
                  this.change_on_webshop();
                }}
                isChecked={this.state.product_category.on_webshop}
                rightText={'Add to Webshop'}
                rightTextStyle={{
                  color: '#4E4D4D',
                  fontSize: 13,
                  fontFamily: 'Open Sans',
                }}
                checkBoxColor={'#929497'}
              />
              <Text
                style={[
                  {color: '#4E4D4D', marginVertical: 10},
                  fontStyles.bold13,
                ]}>
                Image
              </Text>
              <View style={[{}, styles.addImageView]}>
                <TouchableOpacity onPress={() => this.imageUpload()}>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: '#aaa',
                      height: width / 6,
                      width: width / 6,
                    }}>
                    <this.setImage _that={this} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.createCategory()}
            style={[{}, styles.redBtn]}>
            <Text style={{color: '#fff'}}>Save</Text>
          </TouchableOpacity>
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
    setScreenReload: value =>
      dispatch({type: PRODUCT_CATEGORY_RELOAD, value: value}),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProductCategory);
