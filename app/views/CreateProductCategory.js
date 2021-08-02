import React from 'react'
import { View, ImageBackground, TouchableHighlight, ScrollView, Alert, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import styles from '../css/CreateProductCategoryCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, PRODUCT_RELOAD, PRODUCT_CATEGORY_RELOAD } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box';
import axios from 'axios';
const { width, height } = Dimensions.get('window')

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
            prod_image: {},
            id: 0
        }
    }

    componentDidMount() {
        console.log('sdf sdf sfd sf', this.props.route.params)
        if (this.props.route.params.screen == 'update') {
            this.setState({
                name: this.props.route.params.items.name,
                description: this.props.route.params.items.description,
                id: this.props.route.params.items.id
            })
        }
        this.getCategoryList();
    }

    createCategory() {
        this.setState({ spinner: true })
        let _that = this

        if (this.state.name === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Category name is required")
            return;
        }
        else {
            let token = this.props.user.access_token;
            // console.log('EEEEEEEEEEE', url)
            console.log('cccccccccc', token)
         
            var formData = new FormData();
              formData.append('category_id',this.state.category_id);  
              formData.append('name',this.state.name);  
              formData.append('description',this.state.description);  
              formData.append('image',{
              uri: this.state.prod_image.path,
                    type: 'multipart/form-data',
                    name: `image.jpg`,
                 
            }
              );  
              formData.append('on_webshop',this.state.add_weshop);  
            // let body = {
            //     category_id: this.state.category_id,
            //     name: this.state.name,//required
            //     description: this.state.description,
            //     image: this.state.prod_image,
            //     on_webshop: this.state.add_weshop, //Boolean             
            // }
            console.log('~~~~~~~~~~~~body',formData)
            let myheader = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
            if (this.state.id == 0) {
                let url = Constants.update_product_category;
                console.log('url',url,'!!!! token : ',this.props.user.access_token)
                axios.post(url,
                    formData,
                    myheader
                )
                    .then(function (response) {
                        _that.setState({ spinner: false })
                        console.log('axiso response 1111111', response.data);
                        if (response.data.status === 'success') {
                            console.log('GGGGGGGGGGG', response.data)
                            Alert.alert('Request Successful')
                            _that.props.setScreenReload({
                                reload: true
                            })
                            _that.props.navigation.navigate('ProductCategory');
                        }
                    })
                    .catch(function (error) {
                        _that.setState({ spinner: false })
                        console.log(error);
                    });
            }
            else {
                let url = Constants.update_product_category + '/' + this.state.id;

                axios.put(url,
                     formData,
                    myheader

                )
                    .then(function (response) {

                        console.log('axiso response 2222222', response.data);
                        _that.setState({ spinner: false })
                        if (response.data.status === 'success') {
                            console.log('GGGGGGGGGGG', response.data)
                            _that.props.setScreenReload({
                                reload: true
                            })
                            _that.props.navigation.navigate('ProductCategory');

                        }

                    })
                    .catch(function (error) {
                        _that.setState({ spinner: false })
                        console.log(error);
                    });
            }
        }
    }


    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
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
                console.log('$$$$$$$$$$$$$', responseJson)
                this.setState({ spinner: false });
                if (responseJson.status === 'success') {

                    let res = responseJson.data;
                    let categoryarr = res.map((x, key) => {
                        return { label: x.name, value: x.id }
                    });
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

    imageUpload() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            size: 1000000
        }).then(image => {
            console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
            this.setState({
                prod_image: image
            })
        });
    }
    render() {
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
                        // onPress={() => this.props.navigation.navigate('Home')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <Text style={[{ color: '#2F2E7C', fontWeight: '700', marginLeft: 10 }, fontStyles.normal15]}>CREATE PRODUCT CATEGORY</Text>
                </View>
                <View style={[{}, styles.mainContentView]}>
                    <DropDownPicker
                        items={this.state.categoryarr}
                        containerStyle={{ height: 70, width: width - 40, alignSelf: 'center' }}
                        style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                        itemStyle={{
                            justifyContent: 'flex-start', width: width - 50, height: 40
                        }}
                        placeholder="Product Category "
                        dropDownStyle={{ height: 120, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                        labelStyle={{ color: '#A9A9A9' }}
                        onChangeItem={item => this.setState({ category_id: item.value })}  //this.onSelectCountry(item.value)}
                    />
                    <View style={[{},]}>
                        <TextInput
                            onChangeText={text => this.setState({ name: text })}
                            label="Name*"
                            style={{ backgroundColor: 'transparent', borderColor: '#CFCFCF' }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            value={this.state.name}
                        />
                        <TextInput
                            onChangeText={text => this.setState({ description: text })}
                            label="Description"
                            style={{ backgroundColor: 'transparent', borderColor: '#CFCFCF' }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            value={this.state.description}
                        />
                        <CheckBox
                            style={[{ width: width / 2, alignSelf: 'flex-start', marginVertical: 10, alignItems: 'center' },]}
                            onClick={() => {
                                this.setState({
                                    add_weshop: !this.state.add_weshop
                                })
                            }}
                            isChecked={this.state.add_weshop}
                            rightText={"Add to Webshop"}
                            rightTextStyle={{ color: '#4E4D4D', fontSize: 13, fontFamily: 'Open Sans' }}
                            checkBoxColor={'#929497'}

                        />
                        <Text style={[{ color: '#4E4D4D', marginVertical: 10 }, fontStyles.bold13]}>Image</Text>
                        <View style={[{}, styles.addImageView]}>

                            <TouchableOpacity
                                onPress={() => this.imageUpload()}
                            >
                                {(this.state.prod_image == '') ?
                                    <Image
                                        source={require('../images/redPlus.png')}
                                    />
                                    : <Image
                                    style={{height:width/6,width:width/6}}
                                        source={{uri:this.state.prod_image.path}}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <TouchableOpacity
                    onPress={() => this.createCategory()}
                    style={[{}, styles.redBtn]}
                >
                    <Text style={{ color: '#fff' }}>Save</Text>
                </TouchableOpacity>
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
        setScreenReload: (value) => dispatch({ type: PRODUCT_CATEGORY_RELOAD, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProductCategory)
