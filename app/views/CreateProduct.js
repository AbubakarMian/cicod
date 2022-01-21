/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Modal as OtherModal,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/CreateProductCss';
import fontStyles from '../css/FontCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import {Constants} from '../views/Constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import SearchBar from 'react-native-search-bar';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER, PRODUCT_RELOAD} from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import Tooltip from 'react-native-walkthrough-tooltip';
import ImagePicker from 'react-native-image-crop-picker';
import {upsert, upsertAtttributes} from '../Common';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {serialize} from 'object-to-formdata';
import CategoryDropdown from './Components/CategoryDropdown';
import DropDownModal from './Components/DropDownModal';
import Scaffold from './Components/Scaffold';
import { createORUpdateProduct } from '../redux/actions/product_action';

const {width, height} = Dimensions.get('window');

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageModal: false,
      galler_cameraModa: false,
      galler_cameraAttriModa: false,
      selected_index: '',
      prod_id: '',
      value: '',
      selected_cat: '',
      isChecked: false,
      categoryarr: [],
      spinner: false,
      category_id: '',
      name: '',
      quantity: "",
      code: '',
      price: '',
      reservation_day: '',
      description: '',
      is_web_shop: false,
      no_qty_limit: false,
      add_variation: false,
      validity: '',
      has_vat: '',
      variation_index_selected: '',
      image: '',
      toolTipVisible: false,
      c: '',
      prod_image: null,
      attributeModal: false,
      attributes_set: false,
      attributes: [],
      variations: [],
      prod_image_url:null,
      selected_variation: {
        key: '',
        quentity: '',
        price: '',
        same_price: false,
        no_qty_limit: false,
        selected_attributes: [],
        image: null,
      },
    };
  }

  componentDidMount() {
    this.getCategoryList();
    console.log(
      'product detail peops @@@@@@@@!!!!!!!!!!!!!!',
      this.props.route.params,
    );
  }
  add_new_variation() {
    console.log('********** add_new_variation');
    let variations = this.state.variations;
    variations.push({
      title: 'Title Text',
      key: 'item' + (variations.length + 1),
      selected_attributes: [],
      price: 0,
      is_same_price: false,
      quantity: 0,
      no_quantity_limit: false,
      image: null,
    });
    this.setState({
      variations: variations,
    });
  }

  componentDidUpdate(prevProps) {
    console.log('oprs$', prevProps.barcode, 'ne2@', this.props.barcode);
    if (prevProps.barcode.code !== this.props.barcode.code) {
      this.setState({code: this.props.barcode.code});
    }
  }
  show_attribute_list(variation) {
    console.log('********** attributes');
    console.log('********** selected variation', variation);
    this.setState({
      attributeModal: true,
      selected_variation: variation,
    });
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
        // console.log('*************response json !!!!!!!!!@@@@@@@@@@@', responseJson);
        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          let res = responseJson.data;
          let category_value = this.props.route.params.prodDetail
            ? this.props.route.params.prodDetail.category
            : '';
          let categoryarr = res.map((x, key) => {
            let selected_bool = false;

            console.log('name cat ', x.name);
            if (category_value == x.name) {
              selected_bool = true;
            }

            return {label: x.name, value: x.id, selected: selected_bool};
          });
          if(this.props.route.params.action=="update"){
            if (this.props.route.params.prodDetail.category!=null || this.props.route.params.prodDetail.category!=="") {
              let data = categoryarr.filter(itm => itm.label == this.props.route.params.prodDetail.category);
              console.log("cateDFE#",data)
              if (data.length>0) {
                this.setState({
                  selected_cat: data[0].label,
                  category_id:data[0].value,
                  categoryarr: categoryarr,
                });
              } else {
                this.setState({
                 
                  categoryarr: categoryarr,
                });
              }
            }else {
              this.setState({
               
                categoryarr: categoryarr,
              });
            }
           
            
          }else{
            this.setState({
              
              categoryarr: categoryarr,
            });
          }
          
          console.log(
            'category !!!!!!!!!!!!!!!#@@@@@@@@@@ !!!!!!',
            categoryarr,
          );

          
         
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          console.log('catftApi#e', responseJson);
          this.getCategoryList()
          // Alert.alert('Info', "Could not fetch category",[
          //   {
          //     text:"Reload",
          //     onPress:()=>this.getCategoryList()
          //   },
          //   {
          //     text:"Close",
          //     onPress:()=>{
          //       console.log("close")
          //     }
          //   }
          // ]);
        }
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log('ajo#$$$', error);
      });
  }

  get_attributes_list() {
    this.setState({spinner: true});
    let postData = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.user.access_token,
      },
    };
    fetch(Constants.get_attribute, postData)
      .then(response => response.json())
      .then(async responseJson => {
        // console.log('************attributes !!!!!!!!!@@@@@@@@@@@', responseJson);
        this.setState({spinner: false});
        if (responseJson.status === 'success') {
          let attributes_list = responseJson.data;
          let requried_format = [];
          let selected_attributes = [];
          selected_attributes.push(0);

          for (let i = 0; i < attributes_list.length; i++) {
            requried_format = upsertAtttributes(requried_format, {
              key: attributes_list[i].name,
              value: attributes_list[i],
              selected_attributes: selected_attributes,
            });
          }
          console.log(
            'requried_formatrequried_formatrequried_formatrequried_formatrequried_format',
            requried_format[0],
          );
          // console.log('requried_formatrequried_formatrequried_formatrequried_formatrequried_format',requried_format[1]);
          // console.log('requried_formatrequried_formatrequried_formatrequried_formatrequried_format',requried_format[2]);

          this.setState({
            attributes: requried_format,
            attributes_set: true,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          let message = responseJson.message;
          console.log('Api call error else', responseJson);
          Alert.alert('Error', message);
        }
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log('Api call error', error);
      });
    console.log('**************', this.state.attributes);
  }
  onCategoryText = item => {
    // alert(item);
    let data = this.state.categoryarr.filter(itm => itm.value == item);
    console.log(
      'hr$$#',
      item,
      't%$',
      // this.state.categoryarr[item].label,
      'uu$#',
      data,
      'd87E',
      this.state.categoryarr,
    );
    this.setState({
      selected_cat: data[0].label,
      showdropDownModal: false,
      category_id: item,
    });
  };
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }
  create_or_update_Product() {
    // this.setState({ spinner: true })

    // if (this.state.validity==0 || this.state.validity=="") {
    //   Alert.alert("Warning","Please Enter reservation days");
    //   return;
    // }

     if ((this.state.quantity==0 || this.state.quantity=="") && !this.state.no_qty_limit) {
      Alert.alert("Warning","Please Enter quantity");
      return;
    }
    if (this.state.name.trim() === '' || this.state.price === '') {
      this.setState({spinner: false});
      Alert.alert('Warning', 'Product name and Price are required');
      return;
    }
    
    else {
      var formData = new FormData();
      if (this.state.prod_image != null && this.state.prod_image != '') {
        formData.append('image', {
          uri: this.state.prod_image,
          type: 'multipart/form-data',
          name: `image.jpg`,
        });
      }
      formData.append('category_id', this.state.category_id);
      formData.append('name', this.state.name);
      formData.append('description', this.state.description);
      formData.append('code', this.state.code);
      formData.append('price', this.state.price);
      formData.append('validity', this.state.validity==""?0:this.state.validity);
      formData.append('quantity', this.state.quantity==""?1:this.state.quantity);
      formData.append('no_qty_limit', this.state.no_qty_limit?1:0);
      formData.append('has_vat', this.state.has_vat);
      formData.append('on_webshop', this.state.is_web_shop ? 1 : 0);

      let all_variations = this.state.variations;
      let variations_form = [];
      for (let i = 0; i < all_variations.length; i++) {
        let sel_attr = all_variations[i];
        let attributes_variation = sel_attr.selected_attributes;
        if (sel_attr.image != null) {
          variations_form.push({
            attributes: sel_attr.selected_attributes,
            quantity: sel_attr.quantity,
            price: sel_attr.price,
            no_qty_limit: sel_attr.no_quantity_limit,

            image: {
              uri: sel_attr.image,
              type: 'multipart/form-data',
              name: `image.jpg`,
            },
          });
        } else {
          variations_form.push({
            attributes: sel_attr.selected_attributes,
            quantity: sel_attr.quantity,
            price: sel_attr.price,
            no_qty_limit: sel_attr.no_quantity_limit,
          });
        }
        // this.setState({variations:all_variaitons})
        // variations.push(variation);
        // console.log('sel_attr',sel_attr)
        // console.log('sel_attr.image',sel_attr.image)

        // formData.append('variations[0][image]', {
        //         uri: sel_attr.image,
        //         type: 'multipart/form-data',
        //         name: `image.jpg`,
        //     } );
        // formData.append('variations[0][attributes[0]]', 22 ); // 22,1   sel_attr.selected_attributes[0]
        // formData.append('variations[0][attributes[0]]', 22 ); // 22,1   sel_attr.selected_attributes[0]
        // formData.append('variations[0][quantity]', 5);//sel_attr.quantity
        // formData.append('variations[0][no_quantity_limit]', );sel_attr.no_quantity_limit
        // formData.append('variations[0][price]', 5);//sel_attr.price

        // formData.append('variations[]', JSON.stringify({
        //     'attributes[]':22,
        //     quantity:5,
        //     price:5,
        // }));//sel_attr.price
      }


     
      let url = '';
url=this.props.route.params.action == 'update'?Constants.productslist + '/' + this.state.prod_id:Constants.productslist;

      this.props.create_or_update_Product(url,formData,this.props.route.params.action,()=>{
        if (this.props.route.params.action == 'create') {
          Alert.alert('SUCCESS', "Product Created Successfully!",[
            {
              text:"OK",
              onPress:()=>this.props.navigation.navigate('Products', {seller_id: 1})
            }
          ]);
          
        } else {
          Alert.alert('SUCCESS', "Product Updated Successfully!",[
            {
              text:"OK",
              onPress:()=>{
                if (this.props.route.params.heading=="BUYERS") {
                  this.props.navigation.navigate('BuyersProducts', {items:this.props.route.params.items,heading:this.props.route.params.heading})
                } else {
                this.props.navigation.navigate('Products', {seller_id: 1})
                  
                }

              }
            }
          ]);
          // this.props.navigation.navigate('Products', {seller_id: 0});
          //this.props.navigation.goBack();
        }
      }) 
    }
  }
  add_variation() {
    let add_variation = !this.state.add_variation;
    let variations = this.state.variations;
    if (!this.state.attributes_set) {
      this.get_attributes_list();
      this.setState({attributes_set: true});
    }
    if (add_variation) {
      this.add_new_variation();
    } else {
      variations = [];
    }

    this.setState({
      add_variation: add_variation,
      variations: variations,
    });
  }
  my_camera() {
    this.setState({galler_cameraModa: false});
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      size: 1000000,
    }).then(image => {
      console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
      if (image.size > 1024) {
        Alert.alert('Max size 1MB');
        return;
      }
      this.setState({
        prod_image: image.path,
      });
    });
  }
  my_gallery() {
    this.setState({galler_cameraModa: false});
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      size: 1000000,
    }).then(image => {
      console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
      // if(image.size>5024){
      //    Alert.alert("Max size 5MB")
      //    return
      // }
      this.setState({
        imageModal: false,
        prod_image: image.path,
      });
    });
  }

  imageUploadCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      size: 1000000,
    }).then(image => {
      console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
      this.setState({
        imageModal: false,
        prod_image: image.path,
      });
    });
  }
  imageUpload() {}
  onSaveFun() {
    this.create_or_update_Product();
  }

  setPrice(text) {
    console.log(' text @@@@@@@@@', text);
    if (text > -1) {
      this.setState({
        price: text,
      });
      // Alert.alert('Warning','Value can not be negative')
    }
  }
  setValidity(text) {
    console.log(' text @@@@@@@@@', text);
    let ex = /^[0-9]\d*$/;
    if (text.match(ex)) {
      this.setState({validity: text});
      // Alert.alert('Warning','Value can not be negative')
    }else{
      this.setState({validity:""})
    }
  }
  setQuentity(text) {
    console.log(' text @@@@@@@@@', text);
    let ex = /^[1-9]\d*$/;
    if (text.match(ex)) {
      this.setState({quantity: text});
      // Alert.alert('Warning','Value can not be negative')
    }else{
      this.setState({quantity: ""});
    }
  }
  setVariationSamePrice(index) {
    let variations = this.state.variations;
    variations[index].is_same_price = !variations[index].is_same_price;
    if (variations[index].is_same_price) {
      variations[index].price = this.state.price + '';
    }
    this.setState({
      variations: variations,
    });
  }
  setVariationNoQuantityLimit(index) {
    let variations = this.state.variations;
    variations[index].no_quantity_limit = !variations[index].no_quantity_limit;
    if (variations[index].no_quantity_limit) {
      variations[index].quantity = '0';
    }

    this.setState({
      variations: variations,
    });
  }
  setVariationQuantity(index, text) {
    let variations = this.state.variations;
    variations[index].quantity = text;
    this.setState({
      variations: variations,
    });
  }

  setVariationPrice(index, text) {
    console.log(' text @@@@@@@@@ variation', text);
    // if(NaN(text)){
    //     alert(text+' is not a number');
    // }
    if (text > -1) {
      let variations = this.state.variations;
      variations[index].price = text;
      this.setState({
        variations: variations,
      });
      // Alert.alert('Warning','Value can not be negative')
    }
  }
  onpen_attribute_image_modal(index) {
    this.setState({galler_cameraAttriModa: true, selected_index: index});
  }
  async setVariationImage(type) {
    let index = this.state.selected_index;
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiii', index, 'rrrrrrrrrr', type);
    let image = null;
    // console.log('vvvvvvvvvvvvvv',variations)
    if (type == 'camera') {
      await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        size: 1000000,
      }).then(image => {
        console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
        if (image.size > 1024) {
          Alert.alert('Max size 1MB');
          return;
        }
        // this.setState({
        //     prod_image: image.path
        // })

        let variations = this.state.variations;
        variations[index].image = image.path;
        this.setState({
          variations: variations,
          test_img: image,
        });
      });
    } else if (type == 'gallery') {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        size: 1000000,
      }).then(image => {
        console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
        if (image.size > 1024) {
          Alert.alert('Max size 1MB');
          return;
        }
        // this.setState({
        //     prod_image: image.path
        // })

        let variations = this.state.variations;
        variations[index].image = image.path;
        this.setState({
          variations: variations,
          test_img: image,
        });
      });
    }

    this.setState({galler_cameraAttriModa: false});
   
  }

  async getProduct() {
    if (
      this.props.route.params.action == 'update' &&
      this.props.route.params.prodDetail.id != this.state.prod_id
    ) {
      // await this.get_attributes_list()
      console.log(
        'sdkf hsjkdhfjkshgkfdgs djgjsgdfjgsdf',
        this.props.route.params.prodDetail,
      );
   
console.log("caeee$#");
      let pre_product = this.props.route.params.prodDetail;
      this.setState({
        
        prod_id: this.props.route.params.prodDetail.id,
        // category_id: this.props.route.params.prodDetail.category,
        name: this.props.route.params.prodDetail.name,
        quantity: this.props.route.params.prodDetail.quantity,
        code: this.props.route.params.prodDetail.code,
        price: this.props.route.params.prodDetail.price,
        description: this.props.route.params.prodDetail.description,
        no_qty_limit: this.props.route.params.prodDetail.no_qty_limit,
        validity: this.props.route.params.prodDetail.validity,
        has_vat: this.props.route.params.prodDetail.has_vat,
        prod_image_url: this.props.route.params.prodDetail.image,
        is_web_shop: this.props.route.params.prodDetail.on_webshop,
      });
      if (this.props.route.params.prodDetail.variations.length > 0) {
        let variation_pre = [];
        variation_pre = this.state.variations;
        let data = pre_product.variations;
        for (let i = 0; i < data.length; i++) {
          variation_pre.push({
            // attributes:[15,16,17,22],
            selected_attributes: [15, 16, 17, 22],
            price: data[i].price,
            quantity: data[i].quantity,
            is_same_price: data[i].price == pre_product.price,
            no_quantity_limit: data[i].no_qty_limit,
          });
          if (i == 0) {
            this.setState({
              selected_variation: variation_pre[0],
            });
          }
        }

        console.log(
          '9999999999999999999',
          JSON.stringify(this.props.route.params.prodDetail.variations),
        );
        console.log(
          '9999999999999999999 variation_pre',
          JSON.stringify(variation_pre),
        );
        this.setState({add_variation: true, variations: variation_pre});
      }
      let aaa = 1;
      if (aaa == 1) {
        this.get_attributes_list();
      }
    }
  }

  update_selected_attribute(item, index) {
    let attributes = this.state.attributes;

    // let selected_attributes = attributes[index].selected_attributes;

    let selected_variation = this.state.selected_variation;
    let selected_attributes = selected_variation.selectfseed_attributes;

    let index_found = selected_attributes.indexOf(item.id);

    if (index_found > -1) {
      selected_attributes.splice(index_found, 1);
    } else {
      console.log('pushed', item);
      selected_attributes.push(item.id);
    }
    console.log('attributes', attributes[index]);
    console.log('attributes index_found', index_found);
    // return
    attributes[index].selected_attributes = selected_attributes;
    // let selected_variation = this.state.selected_variation
    selected_variation.selected_attributes = selected_attributes;

    this.setState({
      attributes: attributes,
      selected_variation: selected_variation,
    });

    // for(let i =0 ; i<selected_attributes.length ; i++){
    //     if(selected_attributes[i] == item.value.id){
    //         value_exist = true;
    //         at_index = i;
    //         break;
    //     }
    // }
    // if(value_exist){
    //     selected_attributes
    // }
  }
  Attributes_list(props) {
    let _that = props.that;
    let attribute_item = props.item;
    let selected_attributes =
      _that.state.selected_variation.selected_attributes;
    let index_attribute = props.index;

    // _that.setState({
    //     variation_index_selected:index_attribute
    // })

    // let selected_variation=_that.state.selected_variation;
    // selected_variation.price=50,
    // selected_variation.selected_attributes=selected_attributes;
    // console.log('@@@@@@@@@@@@@@@@@@',selected_variation)

    return (
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          ))
        }
        data={attribute_item.value}
        renderItem={({item, index, separators}) => (
          <TouchableHighlight
            key={item.key}
            onPress={() => _that._onPress(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View
              style={{
                backgroundColor: 'white',
                width: width / 1.5,
                padding: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#aaa',
              }}>
              <View style={{flexDirection: 'column'}}>
                <CheckBox
                  style={[{marginLeft: 30}, styles.cheBox]}
                  onClick={() => {
                    _that.update_selected_attribute(item, index_attribute);
                    // _that.setState({
                    //     add_variation: !_that.state.add_variation
                    // })
                  }}
                  // isChecked={ _that.state.attributes[index_attribute].selected_attributes.indexOf(item.id) > -1}
                  isChecked={selected_attributes.indexOf(item.id) > -1}
                  rightText={item.value}
                />
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }

  render() {
    console.log(
      '~~~~~~~~~~~~~~~~~~~~~~this.state.no_qty_limit',
      this.state.no_qty_limit,
    );
    this.getProduct();
    console.log('this.state.price', this.state.categoryarr);
    return (
      <Scaffold style={{flex: 1}}>
            <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        // style={{marginBottom: 150}}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <View style={[{}, styles.mainView]}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={ this.props.products.isSubmitting}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('Products')}
            onPress={() => this.props.navigation.goBack()}>
            <View style={[{}, styles.backRowView]}>
              <Icon name="arrow-left" size={25} color={'#929497'} />

              <View style={[{}, styles.backRowHeadingView]}>
                <Text style={[{}, styles.backRowHeadingText]}>
                  {this.props.route.params.action == 'create'
                    ? 'CREATE PRODUCT'
                    : 'UPDATE PRODUCT'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView>
            <View>
              <View style={[{}, styles.productDetailContainerView]}>
                {
                  this.state.categoryarr.length < 1 ? null : (
                    <View
                      style={[
                        {
                          position: 'relative',
                          width: '100%',
                          borderBottomColor: '#E6E6E6',
                          borderBottomWidth: 1,
                        },
                      ]}>
                      <CategoryDropdown
                        title={
                          this.state.selected_cat == ''
                            ? 'Select Product Category'
                            : this.state.selected_cat
                        }
                        onPress={() => this.setState({showdropDownModal: true})}
                      />
                    </View>
                  )
                  // <DropDownPicker
                  //     scrollViewProps={{
                  //         persistentScrollbar: true,
                  //     }}
                  //     items={this.state.categoryarr}
                  //     containerStyle={{ height: 50, width: width - 40, marginTop: 15, alignSelf: 'center' }}
                  //     style={{ backgroundColor: '#fff' }}
                  //     itemStyle={{
                  //         justifyContent: 'flex-start', zIndex: 0.99
                  //     }}
                  //     placeholder="Category"
                  //     dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                  //     labelStyle={{ color: '#A9A9A9' }}
                  //     onChangeItem={item => this.onCategoryText(item.value)}
                  // />
                }

                {/* <TouchableOpacity
                            onPress={() => this.props.navigation.replace('CreateProductCategory', { action: 'create'})}
                        >
                            <Image
                                style={{ height: 30, width: 30 }}
                                source={require('../images/products/circlePlus.png')}
                            />
                        </TouchableOpacity> */}

                <View style={[{}, styles.formRowView]}>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <TextInput
                      label="Name*"
                      min="0"
                      style={{backgroundColor: 'transparent'}}
                      width={width - 50}
                      alignSelf={'center'}
                      color={'#000'}
                      value={this.state.name}
                      onChangeText={text => this.setState({name: text})}
                    />
                  </View>
                </View>

                <View style={[{}, styles.formRowView]}>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <TextInput
                      label="Description"
                      style={{backgroundColor: 'transparent'}}
                      width={width - 50}
                      alignSelf={'center'}
                      color={'#000'}
                      value={this.state.description}
                      onChangeText={text => this.setState({description: text})}
                    />
                  </View>
                </View>
                <View style={[styles.formRowView, {alignItems: 'center'}]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('BarcodeScannerView')
                    }
                    style={{marginTop: 20}}>
                    <Image
                      style={{height: 30, width: 30}}
                      source={require('../images/barcode-scanner.png')}
                    />
                  </TouchableOpacity>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <TextInput
                      label="Product Code"
                      style={{backgroundColor: 'transparent', marginRight: 5}}
                      width={width / 2 - 20}
                      alignSelf={'center'}
                      color={'#000'}
                      value={this.state.code}
                      onChangeText={text => this.setState({code: text})}
                    />
                  </View>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <TextInput
                      label="Price (.00)"
                      style={{backgroundColor: 'transparent', marginLeft: 5}}
                      width={width / 2 - 20}
                      alignSelf={'center'}
                      color={'#000'}
                      // value={this.state.price}
                      // onChangeText={text => this.setState({ price: text })}
                      onChangeText={text => this.setPrice(text)}
                      keyboardType="numeric"
                      value={this.state.price.toString()}
                    />
                  </View>
                </View>
                <View style={[{marginBottom: 10}, styles.formRowView]}>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <TextInput
                      label="Reservation (Days)"
                      style={{backgroundColor: 'transparent', marginRight: 5}}
                      width={width / 2 - 20}
                      alignSelf={'center'}
                      color={'#000'}
                      onChangeText={text => this.setValidity(text)}
                      keyboardType="numeric"
                      value={this.state.validity.toString()}
                    />
                  </View>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <TextInput
                      label="Quantity"
                      style={{backgroundColor: 'transparent', marginLeft: 5}}
                      width={width / 2 - 20}
                      alignSelf={'center'}
                      color={'#000'}
                      // value={this.state.quantity}
                      disabled={this.state.no_qty_limit}
                      keyboardType="numeric"
                      onChangeText={text => this.setQuentity(text)}
                      value={this.state.quantity.toString()}
                    />
                  </View>
                </View>
                <View style={[{}, styles.formRowView]}>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <CheckBox
                      style={[{width: width / 2}, styles.cheBox]}
                      onClick={() => {
                        this.setState({
                          is_web_shop: !this.state.is_web_shop,
                        });
                      }}
                      isChecked={this.state.is_web_shop}
                      rightText={'Add to Webshop'}
                      rightTextStyle={{color: '#4E4D4D'}}
                      checkedCheckBoxColor={'#4E4D4D'}
                      checkBoxColor={'#4E4D4D'}
                    />
                  </View>
                  <View style={[{position: 'relative'}, styles.formColumn]}>
                    <CheckBox
                      style={[{width: width / 2}, styles.cheBox]}
                      onClick={() => {
                        this.setState({
                          no_qty_limit: !this.state.no_qty_limit,
                          quantity: '',
                        });
                      }}
                      isChecked={this.state.no_qty_limit}
                      rightText={'No Quantity Limit?'}
                      rightTextStyle={{color: '#4E4D4D'}}
                      checkedCheckBoxColor={'#4E4D4D'}
                      checkBoxColor={'#4E4D4D'}
                    />
                  </View>
                 
                </View>
                {this.state.is_web_shop&& <Text onPress={()=>Linking.openURL(`${Constants.sass_url}/login`)} style={{fontSize:12}}>
                  For your products to be visible on your webshop, please make sure to set up your delivery rate card. Click here
                  </Text>}
                <View style={[{}, styles.formRowView]}>
                  <View style={[ {position: 'relative', width: 150,marginVertical:5}]}>
                
                  <Picker
                          selectedValue={this.state.has_vat}
                          onValueChange={(itemValue, itemLabel, itemIndex) => {
                            console.log("change#",itemValue)
                            this.setState({has_vat: itemValue})
                          }}>
                            <Picker.Item
                            style={{fontSize: 13}}
                            color="#000"
                            label="Vat"
                            value={""}
                          />
                          <Picker.Item
                            style={{fontSize: 13}}
                            color="#000"
                            label="Yes"
                            value={1}
                          />
                          <Picker.Item
                            style={{fontSize: 13}}
                            color="#000"
                            label="No"
                            value={0}
                          />
                        </Picker>
                 
                  </View>
                </View>
                <View style={[{}, styles.addImageView]}>
                  <Text style={[{}, styles.addImageLableText]}>Image</Text>
                  <TouchableOpacity
                    style={{marginBottom: 10}}
                    onPress={() => this.setState({imageModal: true})}>
                    <Image
                      style={{height: 50, width: 50}}
                      source={require('../images/redPlus.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={()=> this.imageUpload()}
                  >
                    {this.state.prod_image != '' ||
                    this.state.prod_image != null || this.state.prod_image_url!=null ? (
                      <Image
                        style={{height: 50, width: 50}}
                        source={{uri: this.state.prod_image || this.state.prod_image_url }}
                      />
                    ) : (
                      <View style={{flex: 1}}>
                        <Icon name="photo" />
                        <Image
                          style={{height: 50, width: 50}}
                          source={require('../images/redPlus.png')}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            
              <TouchableOpacity
                onPress={() => this.onSaveFun()}
                style={[{}, styles.redTouch]}>
                <Text style={{color: '#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>

            <OtherModal
              visible={this.state.imageModal}
              onRequestClose={() => this.setState({imageModal: false})}
              transparent={true}>
              <TouchableOpacity
                onPress={() => this.setState({imageModal: false})}>
                <View style={[{}, styles.modalBackGround]}>
                  <TouchableWithoutFeedback>
                    <View style={styles.suspendModal}>
                      <View
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../images/gallery.png')}
                        />
                        <TouchableOpacity
                          onPress={() => this.my_gallery()}
                          style={[{marginLeft: 7}, styles.suspendTouch]}>
                          <Text style={{color: '#808080'}}>
                            Choose from Gallery
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../images/camera.png')}
                        />
                        <TouchableOpacity
                          onPress={() => this.imageUploadCamera()}
                          style={[{marginLeft: 7}, styles.suspendTouch]}>
                          <Text style={{color: '#808080'}}>Use Camera</Text>
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
          </ScrollView>
          <DropDownModal
            title="Product Categories"
            selected={this.state.category_id}
            showdropDownModal={this.state.showdropDownModal}
            handleClose={() => this.setState({showdropDownModal: false})}
            onSelected={this.onCategoryText}
            data={this.state.categoryarr}
          />
          <Modal
            animationType="fade"
            visible={this.state.attributeModal} //
            transparent={true}
            hasBackdrop={true}
            onBackdropPress={() => this.setState({attributeModal: false})}
            deviceHeight={height}
            deviceWidth={width}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'#000'}
            opacity={0.8}>
            <View
              style={{
                maxHeight: height / 1.5,
                width: width / 1.5,
                backgroundColor: 'white',
                zIndex: 9999,
                opacity: 1,
                paddingHorizontal: 5,
                borderRadius: 5,
                paddingVertical: 5,
              }}>
              <FlatList
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View
                      style={[styles.separator, highlighted && {marginLeft: 0}]}
                    />
                  ))
                }
                data={this.state.attributes}
                renderItem={({item, index, separators}) => (
                  <TouchableHighlight
                    key={item.key}
                    // onPress={() => this.setState({attributeModal:false})}
                    onPress={() =>
                      console.log('~~~~~~~~~~~~~~~~~~~list item', item)
                    }
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View>
                      <Text>{item.key}</Text>

                      <this.Attributes_list
                        that={this}
                        item={item}
                        index={index}
                      />
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
          </Modal>
          <Modal
            isVisible={this.state.galler_cameraModa}
            // onBackdropPress={() => this.whats_app_Modal_Press()}
            onBackdropPress={() =>
              console.log('*********************************')
            }
            backdropColor={'#000'}
            opacity={0.8}
            position={'relative'}
            justifyContent={'center'}
            alignItems={'center'}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                width: width,
                position: 'absolute',
                left: -20,
                bottom: -20,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.my_gallery()}
                style={{marginHorizontal: 30}}>
                <Icon name="image" size={30} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.my_camera()}
                style={{marginHorizontal: 30}}>
                <Icon name="camera" size={30} color={'#000'} />
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal
            isVisible={this.state.galler_cameraAttriModa}
            // onBackdropPress={() => this.whats_app_Modal_Press()}
            onBackdropPress={() =>
              this.setState({galler_cameraAttriModa: false})
            }
            backdropColor={'#000'}
            opacity={0.8}
            position={'relative'}
            justifyContent={'center'}
            alignItems={'center'}>
            <View
              style={{
                backgroundColor: '#fff',
                opacity: 1,
                zIndex: 0.999999,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                padding: 20,
                paddingBottom: 50,
                width: width,
                position: 'absolute',
                left: -20,
                bottom: -20,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.setVariationImage('gallery')}
                style={{marginHorizontal: 30}}>
                <Icon name="image" size={50} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setVariationImage('camera')}
                style={{marginHorizontal: 30}}>
                <Icon name="camera" size={50} color={'#000'} />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        </KeyboardAwareScrollView>
      </Scaffold>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    reload: state.reloadReducer,
    barcode: state.barcodeReducer,
    products: state.products_reducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setScreenReload: value => dispatch({type: PRODUCT_RELOAD, value: value}),
    create_or_update_Product:(url,body, type,next)=>dispatch(createORUpdateProduct(url,body,type,next))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
