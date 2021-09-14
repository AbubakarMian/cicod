import React from 'react'
import { View, ImageBackground, TouchableHighlight, ScrollView, Alert, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/CreateProductCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import { Constants } from '../views/Constant';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, PRODUCT_RELOAD } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import Tooltip from 'react-native-walkthrough-tooltip';
import ImagePicker from 'react-native-image-crop-picker';
import {upsert,upsertAtttributes} from '../Common';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const { width, height } = Dimensions.get('window')

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prod_id: 0,
            value: 0,
            isChecked: false,
            categoryarr: [],
            spinner: false,
            category_id: 0,
            name: '',
            quantity: 120,
            code: '',
            price: 0,
            reservation_day: 0,
            description: '',
            is_web_shop: false,
            is_qty_limit: false,
            add_variation: false,
            validity: 0,
            has_vat: 0,
            variation_index_selected: 0,
            image: '',
            toolTipVisible: false,
            c: '',
            prod_image: null,
            attributeModal: false,
            attributes_set: false,
            attributes: [],
            variations: [],
            selected_variation:{
                    key: '',
                    quentity:0,
                    price: 0,
                    same_price:false,
                    no_qty_limit:false, 
                    selected_attributes:[]            
            }
        }
    }

    componentDidMount() {
        this.getCategoryList()
        // console.log('product detail peops @@@@@@@@!!!!!!!!!!!!!!', this.props.route.params);
    }
    add_new_variation() {
        console.log('********** add_new_variation')
        let variations = this.state.variations;
        variations.push({ title: 'Title Text', 
        key: 'item'+(variations.length+1) ,
        selected_attributes:[]
    });
        this.setState({
            variations:variations
        })
    }

    show_attribute_list(variation) {
        console.log('********** attributes')
        console.log('********** selected variation',variation)
        this.setState({
            attributeModal: true,
            selected_variation:variation            
        });
        
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
                // console.log('*************response json !!!!!!!!!@@@@@@@@@@@', responseJson);
                this.setState({ spinner: false });
                if (responseJson.status === 'success') {

                    let res = responseJson.data;
                    let category_value = (this.props.route.params.prodDetail) ? this.props.route.params.prodDetail.category : '';
                    let categoryarr = res.map((x, key) => {
                        let selected_bool = false;

                        console.log('name cat ', x.name);
                        if (category_value == x.name) {
                            selected_bool = true;
                        }

                        return { label: x.name, value: x.id, selected: selected_bool }
                    });
                    console.log('category !!!!!!!!!!!!!!!#@@@@@@@@@@ !!!!!!', categoryarr);
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

    get_attributes_list(){
        this.setState({ spinner: true })
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
                this.setState({ spinner: false });
                if (responseJson.status === 'success') {
                    let attributes_list = responseJson.data;
                    let requried_format = [];                    
                    let selected_attributes = [];
                    selected_attributes.push(0);

                    for(let i=0;i<attributes_list.length;i++ ){
                        requried_format = upsertAtttributes(requried_format,
                            {
                                key:attributes_list[i].name,
                                value:attributes_list[i],
                                selected_attributes:selected_attributes
                            }
                        );
                    }
                    console.log('requried_formatrequried_formatrequried_formatrequried_formatrequried_format',requried_format[0]);
                    // console.log('requried_formatrequried_formatrequried_formatrequried_formatrequried_format',requried_format[1]);
                    // console.log('requried_formatrequried_formatrequried_formatrequried_formatrequried_format',requried_format[2]);
                    
                    this.setState({
                        attributes: requried_format,
                        attributes_set:true
                    });
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }

            })
            console.log('**************',this.state.attributes)
    }
    onCategoryText(item) {
        this.setState({
            category_id: item
        })
    }
    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    updateProduct() {
        this.setState({ spinner: true })

        if (this.state.name === '' || this.state.price === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Product name and Price are required")
            return;
        }
        else {
            var formData = new FormData();
            formData.append('category_id', 5);//this.state.category_id
            formData.append('name', 'product name');//this.state.name
            formData.append('quantity', 25);//this.state.quantity
            formData.append('price', 500);//this.state.price
            formData.append('description', "this.state.description");
            // if(this.state.prod_image != '' || this.state.prod_image != null){
            //     console.log('**********AAAAAAAAAA')
            formData.append('image', {
                uri: this.state.prod_image,
                type: 'multipart/form-data',
                name: `image.jpg`,
            });
            console.log('%%%%%%%%%%%', formData)
            let postData = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.user.access_token,
                },
                body: formData
            };
            console.log('*********', Constants.productslist + "/" + this.state.prod_id)
            fetch(Constants.productslist + "/" + this.state.prod_id, postData)

                .then(response => response.json())
                .then(async responseJson => {
                    console.log(" create customer response !!!!!!!!!!!", responseJson)

                    this.setState({ spinner: false })
                    if (responseJson.status === "success") {
                        Alert.alert('MESSAGE', responseJson.message)
                        await this.props.setScreenReload({
                            reload: true
                        })
                        this.props.navigation.navigate('Products', { seller_id: 0 })
                    } else if (responseJson.status == 401) {
                        this.unauthorizedLogout();
                    }
                    else {
                        let message = responseJson.message
                        Alert.alert('Error', message)
                    }
                }
                )
                .catch((error) => {
                    this.setState({ spinner: false })
                    console.log("Api call error new", error);
                    // Alert.alert(error.message);
                });
        }

    }
    createProduct() {
        
        return;
        this.setState({ spinner: true })
        if (this.state.name === '' || this.state.price === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Product name and Price are required")
            return;
        }
        else if (this.state.category_id == 0) {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Category is required")
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
            formData.append('quantity', this.state.quantity);
            formData.append('code', this.state.code);
            formData.append('price', this.state.price);
            formData.append('description', this.state.description);
            formData.append('validity', this.state.validity);
            formData.append('no_qty_limit', this.state.is_qty_limit);
            formData.append('has_vat', this.state.state_id);
            formData.append('on_webshop', this.state.is_web_shop);
            let postData = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': this.props.user.access_token,
                },
                body: formData,
            };
            console.log('###########', postData)

            console.log('Constants.productslist url ', Constants.productslist);
            console.log('Constants.productslist post data ', postData);
            fetch(Constants.productslist, postData)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log(" create customer response !!!!!!!!!!!", responseJson)

                    this.setState({ spinner: false })
                    this.props.setScreenReload({
                        reload: true
                    })
                    if (responseJson.status === "success") {
                        Alert.alert('MESSAGE', responseJson.message)

                        let customer_id = responseJson.data.id;
                        this.props.navigation.navigate('Products', { seller_id: 0 })
                        // this.createCustomerDelivery(customer_id);
                    } else if (responseJson.status == 401) {
                        this.unauthorizedLogout();
                    }
                    else {
                        let message = responseJson.message
                        Alert.alert('Error', message)
                    }
                }
                )
                .catch((error) => {
                    this.setState({ spinner: false })
                    console.log("Api call error", error);
                    // Alert.alert(error.message);
                });
        }

    }

    add_variation(){
        let add_variation = !this.state.add_variation
        let variations = this.state.variations;
        if(!this.state.attributes_set){            
            this.get_attributes_list()
        }
        if(add_variation){
            this.add_new_variation();
        }
        else{
            variations = [];
        }

        
        this.setState({
            add_variation: add_variation,
            variations:variations
        })
    }

    imageUpload() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            size: 1000000
        }).then(image => {
            console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
            this.setState({
                prod_image: image.path
            })
        });
    }
    onSaveFun() {
        if (this.props.route.params.action == "update") {
            this.updateProduct();
        } else {
            this.createProduct();
        }
    }

    setPrice(text) {
        console.log(' text @@@@@@@@@', text)
        if (text > -1) {
            this.setState({
                price: text
            })
            // Alert.alert('Warning','Value can not be negative')
        }
    }

    getProduct() {
        if (this.props.route.params.action == "update" && this.props.route.params.prodDetail.id != this.state.prod_id) {
            console.log('sdkf hsjkdhfjkshgkfdgs djgjsgdfjgsdf', this.props.route.params.prodDetail);
            this.setState({
                prod_id: this.props.route.params.prodDetail.id,
                category_id: this.props.route.params.prodDetail.category,
                name: this.props.route.params.prodDetail.name,
                quantity: this.props.route.params.prodDetail.quantity + '',
                code: this.props.route.params.prodDetail.code,
                price: this.props.route.params.prodDetail.price + '',
                description: this.props.route.params.prodDetail.description,
                is_qty_limit: (this.props.route.params.prodDetail.no_qty_limit == false) ? 0 : 1,
                validity: this.props.route.params.prodDetail.validity,
                has_vat: this.props.route.params.prodDetail.has_vat,
                prod_image: this.props.route.params.prodDetail.image,
            })

        }
    }

    update_selected_attribute(item,index){
        let attributes = this.state.attributes;
        
        // let selected_attributes = attributes[index].selected_attributes;
        
        let selected_variation = this.state.selected_variation
        let selected_attributes = selected_variation.selected_attributes 

        let index_found = selected_attributes.indexOf(item.id);
        
        if (index_found > -1) {
            selected_attributes.splice(index_found, 1);
        }
        else{
            console.log('pushed',item)
            selected_attributes.push(item.id);
        }
        console.log('attributes',attributes[index]);
        console.log('attributes index_found',index_found);
        // return
        attributes[index].selected_attributes = selected_attributes
        // let selected_variation = this.state.selected_variation
        selected_variation.selected_attributes = selected_attributes

        this.setState({
            attributes:attributes,
            selected_variation:selected_variation
        })
        
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
    Attributes_list(props){
        let _that = props.that;
        let attribute_item = props.item;        
        let selected_attributes = _that.state.selected_variation.selected_attributes;
        let index_attribute = props.index;

        this.setState({
            variation_index_selected:index_attribute
        })
        
        console.log('item_values3333333333333333333333333333333333333333333333333333 attributesattributesattributes',_that.state.attributes);
        console.log('item_values3333333333333333333333333333333333333333333333333333 index',index_attribute);
        console.log('item_values3333333333333333333333333333333333333333333333333333 attribute_item.selected_attributes',selected_attributes);

        // let selected_variation=_that.state.selected_variation;
        // selected_variation.price=50,
        // selected_variation.selected_attributes=selected_attributes;
        // console.log('@@@@@@@@@@@@@@@@@@',selected_variation)

        return(
            <FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({ highlighted }) => (
      <View
        style={[
          style.separator,
          highlighted && { marginLeft: 0 }
        ]}
      />
    ))
  }
  data={attribute_item.value}
  renderItem={({ item, index, separators }) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => _that._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{ backgroundColor: 'white',width:width/1.5,padding:10,justifyContent:'center',alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>                          
            <View style={{flexDirection:'column',}}>
                <CheckBox
                    style={[{marginLeft:30 }, styles.cheBox]}
                    onClick={() => {
                        _that.update_selected_attribute(item,index_attribute)
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
        )
        return (<View>
        <Text style={{ backgroundColor: 'white',width:width/1.5,padding:10,justifyContent:'center',alignSelf:'center'}}>{item.key} asddddddddddddddddddddddddddddd</Text>
        <Text style={{fontSize:15,fontWeight:'bold',marginBottom:15}}>{item.value[0].value}</Text>
        <CheckBox
                                            style={[{marginLeft:30 }, styles.cheBox]}
                                            onClick={() => {
                                                console.log('item',item)
                                            }}
                                            isChecked={true}
                                            rightText={item.name}
                                        /> 
        </View>
        )
        return(
            <View style={{ backgroundColor: 'white',width:width/1.5,padding:10,justifyContent:'center',alignSelf:'center'}}>

                    <Text style={{fontSize:15,fontWeight:'bold',marginBottom:15}}>{item.key} sadasdasdasdasdsa</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',marginBottom:15}}>{item.key} sadasdasdasdasdsa</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',marginBottom:15}}>{item.key} sadasdasdasdasdsa</Text>
                                        {
                                            item.value.map((values,index)=>{
                                                return(
                                            <View style={{flexDirection:'column',}}>
                                                <Text>{values.value}esadsadsad</Text>
                                        <CheckBox
                                            style={[{marginLeft:30 }, styles.cheBox]}
                                            onClick={() => {
                                                that.setState({
                                                    add_variation:true
                                                })
                                            }}
                                            isChecked={true}
                                            // rightText={values.value}
                                        /> 
                                    </View>
                                                )
                                            })
                                        }
                                        
                                        
            )                                        
        </View>
        );
    }

    render() {

        this.getProduct();
        console.log('this.state.price', this.state.categoryarr)
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'Pickup', value: 1 },
        ];
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },
            { label: 'Part Payment', value: 3 },
        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('Products')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color={'#929497'} />
                    </TouchableOpacity>
                    <View style={[{}, styles.backRowHeadingView]}>
                        <Text style={[{}, styles.backRowHeadingText]}>CREATE PRODUCT</Text>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.productDetailContainerView]}>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    {this.state.categoryarr.length < 1 ? null :
                                        <DropDownPicker
                                            scrollViewProps={{
                                                persistentScrollbar: true,
                                            }}
                                            items={this.state.categoryarr}
                                            containerStyle={{ height: 50, width: width - 35, marginTop: 15, alignSelf: 'center' }}
                                            style={{ backgroundColor: '#fff' }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            placeholder="Catagory"
                                            dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onCategoryText(item.value)}
                                        />
                                    }
                                </View>
                            </View>

                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        label="Name*"
                                        min="0"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        value={this.state.name}
                                        onChangeText={text => this.setState({ name: text })}
                                    />

                                </View>
                            </View>

                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        label="Description"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        value={this.state.description}
                                        onChangeText={text => this.setState({ description: text })}
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        label="Product Code"
                                        style={{ backgroundColor: 'transparent', marginRight: 5 }}
                                        width={width / 2 - 20}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        value={this.state.code}
                                        onChangeText={text => this.setState({ code: text })}
                                    />

                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        label="Price (.00)"
                                        style={{ backgroundColor: 'transparent', marginLeft: 5 }}
                                        width={width / 2 - 20}

                                        alignSelf={'center'}
                                        color={'#000'}
                                        value={this.state.price}
                                        // onChangeText={text => this.setState({ price: text })}
                                        onChangeText={text => this.setPrice(text)}
                                        keyboardType='numeric'
                                    />

                                </View>
                            </View>
                            <View style={[{ marginBottom: 10 }, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        label="Reservation (Days)"
                                        style={{ backgroundColor: 'transparent', marginRight: 5 }}
                                        width={width / 2 - 20}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ reservation_day: text })}
                                        keyboardType='numeric'
                                    />

                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        label="Quantity"
                                        style={{ backgroundColor: 'transparent', marginLeft: 5 }}
                                        width={width / 2 - 20}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        value={this.state.quantity}
                                        keyboardType='numeric'
                                        onChangeText={text => this.setState({ quantity: text })}
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                is_web_shop: !this.state.is_web_shop
                                            })
                                        }}
                                        isChecked={this.state.is_web_shop}
                                        rightText={"Add to Webshop"}
                                        rightTextStyle={{ color: '#4E4D4D' }}
                                        checkedCheckBoxColor={'#4E4D4D'}
                                        checkBoxColor={'#4E4D4D'}
                                    />
                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                is_qty_limit: !this.state.is_qty_limit
                                            })
                                        }}
                                        isChecked={this.state.is_qty_limit}
                                        rightText={"No Quantity Limit?"}
                                        rightTextStyle={{ color: '#4E4D4D' }}
                                        checkedCheckBoxColor={'#4E4D4D'}
                                        checkBoxColor={'#4E4D4D'}
                                    />
                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>

                                    <DropDownPicker
                                        scrollViewProps={{
                                            persistentScrollbar: true,
                                        }}
                                        placeholder="VAT"
                                        items={[
                                            { label: 'Yes', value: 1 },
                                            { label: 'No', value: 0 }
                                        ]}
                                        containerStyle={{ height: 50, width: width / 2 - 10, }}
                                        style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                        labelStyle={{ color: '#A9A9A9' }}
                                        onChangeItem={item => this.setState({ has_vat: item.value })}
                                    />
                                </View>
                            </View>
                            <View style={[{}, styles.addImageView]}>
                                <Text style={[{}, styles.addImageLableText]}>Image</Text>
                                <TouchableOpacity
                                    onPress={() => this.imageUpload()}
                                >
                                    {(this.state.prod_image != '' || this.state.prod_image != null) ?
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={{ uri: this.state.prod_image }}
                                        />
                                        : <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../images/redPlus.png')}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{ marginTop: 10 }, styles.productDetailContainerView]}>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ flexDirection: 'column' }]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                           this.add_variation()
                                        }}
                                        isChecked={this.state.add_variation}
                                        rightText={"Add Variation"}
                                    />
                                    <Text style={[{}, styles.lightGrayText]}>This product has more than one option</Text>
                                    <Text style={[{}, styles.varaitionText]}>Variation</Text>
                                </View>
                            </View>
                            {(this.state.add_variation == true) ?
                                <View>


                                    <ScrollView

                                    >
                                        <FlatList

                                            ItemSeparatorComponent={
                                                Platform.OS !== 'android' &&
                                                (({ highlighted }) => (
                                                    <View
                                                        style={[
                                                            style.separator,
                                                            highlighted && { marginLeft: 0 }
                                                        ]}
                                                    />
                                                ))
                                            }
                                            data={this.state.variations}
                                            renderItem={({ item, index, separators }) => (
                                                <TouchableHighlight
                                                    key={item.key}
                                                    onPress={() => console.log(item)}
                                                    onShowUnderlay={separators.highlight}
                                                    onHideUnderlay={separators.unhighlight}>
                                                    <View style={{ backgroundColor: 'white' }}>
                                                        <View>
                                                            <View style={[{}, styles.formRowView]}>
                                                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                                                    <TouchableOpacity
                                                                        onPress={() => this.show_attribute_list(item) }
                                                                        style={[{ position: 'relative' }, styles.formColumn]}>
                                                                        <Text

                                                                            style={[{}, styles.redTouchText]}>
                                                                            + Attribute

                                                                        </Text>

                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                                                    <TextInput
                                                                        label="Price (.00)"
                                                                        style={{ backgroundColor: 'transparent', }}
                                                                        width={width - 50}
                                                                        alignSelf={'center'}
                                                                        color={'#000'}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={[{}, styles.formRowView]}>


                                                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                                                    <CheckBox
                                                                        style={[{ width: width / 2, }, styles.cheBox]}
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isChecked: !this.state.isChecked
                                                                            })
                                                                        }}
                                                                        isChecked={this.state.isChecked}
                                                                        rightText={"same price"}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={[{}, styles.formRowView]}>
                                                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                                                    <TextInput
                                                                        label="Quantity"
                                                                        style={{ backgroundColor: 'transparent', }}
                                                                        width={width - 50}
                                                                        alignSelf={'center'}
                                                                        color={'#000'}
                                                                    />
                                                                </View>
                                                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                                                    <CheckBox
                                                                        style={[{ width: width / 2, }, styles.cheBox]}
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isChecked: !this.state.isChecked
                                                                            })
                                                                        }}
                                                                        isChecked={this.state.isChecked}
                                                                        rightText={"No Quantity Limit?"}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <Text style={[{}, styles.productImageLable]}>Images</Text>
                                                            <TouchableOpacity
                                                                onPress={() => this.imageUpload()}
                                                                style={[{ position: 'relative', width: width / 4 }]}>

                                                                {/* {(this.state.prod_image != null || this.state.prod_image !='') ? */}
                                                                {(this.state.prod_image == null || this.state.prod_image == '') ?
                                                                    <Image
                                                                        style={{ height: 60, width: 30 }}
                                                                        source={require('../images/redPlus.png')}
                                                                    /> :
                                                                    <Image
                                                                        style={{ height: 60, width: 30 }}
                                                                        source={{ uri: this.state.prod_image }}
                                                                    />
                                                                }
                                                            </TouchableOpacity>

                                                        </View>
                                                    </View>
                                                </TouchableHighlight>
                                            )}
                                        />
                                    </ScrollView>
                                    <TouchableOpacity
                                        onPress={() => this.add_new_variation()}
                                        style={[{ alignSelf: 'center', marginVertical: 20 }, styles.formColumn]}>
                                        <Text style={[{}, styles.redTouchText]}>
                                            + Add another variation
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                                : null}


                        </View>
                        <TouchableOpacity
                            onPress={() => this.onSaveFun()}
                            style={[{}, styles.redTouch]}>
                            <Text style={{ color: '#fff' }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    visible={this.state.attributeModal}//
                    transparent={true}
                    hasBackdrop={true}
                    onBackdropPress={() => this.setState({ attributeModal: false })}
                    deviceHeight={height}
                    deviceWidth={width}
                    justifyContent={'center'}
                    alignItems={'center'}
                    backgroundColor={'#000'}
                    opacity={0.8}
                >
                     <View
                 style={{maxHeight:height/1.5,width:width/1.5,backgroundColor:'white',zIndex:9999, opacity:1,paddingHorizontal:5,borderRadius:5,paddingVertical:5}}
                 >
                        <FlatList
                            ItemSeparatorComponent={
                                Platform.OS !== 'android' &&
                                (({ highlighted }) => (
                                    <View
                                        style={[
                                            style.separator,
                                            highlighted && { marginLeft: 0 }
                                        ]}
                                    />
                                ))
                            }
                            data={this.state.attributes}                            
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    // onPress={() => this.setState({attributeModal:false})}
                                    onPress={() => console.log('~~~~~~~~~~~~~~~~~~~list item',item)}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                        <View>
                                            <Text>{item.key}</Text>
                                            
                                    <this.Attributes_list that={this} item={item} index={index}/>
                                    </View>
                                </TouchableHighlight>
                                
                            )}
                        />
                    </View>
                </Modal>
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
        setScreenReload: (value) => dispatch({ type: PRODUCT_RELOAD, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
