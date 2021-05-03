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
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box';
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
            prod_image: '',
            id:0
        }
    }

    componentDidMount() {
        console.log('sdf sdf sfd sf',this.props.route.params)
        if(this.props.route.params.screen =='update'){
            this.setState({
                name: this.props.route.params.items.name,
                description: this.props.route.params.items.description,
                id:this.props.route.params.items.id
            })
        }
        this.getCategoryList();
    }

    createCategory() {
        this.setState({ spinner: true })

        if (this.state.name === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Category name is required")
            return;
        }
        else {


            let postData = {
                method: (this.state.id == 0)?'POST' :'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.user.access_token,
                },
                body: JSON.stringify({
                    category_id: this.state.category_id,
                    name: this.state.name,//required
                    description: this.state.description,
                    image: this.state.prod_image,
                    on_webshop: this.state.add_weshop, //Boolean 
                })
            };
            // let url =  Constants.productcategorylist '/'this.stat
            fetch(Constants.productcategorylist, postData)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log(" create customer response !!!!!!!!!!!", responseJson)

                    this.setState({ spinner: false })
                    if (responseJson.status === "success") {
                        Alert.alert('MESSAGE', responseJson.message)
                        this.props.navigation.navigate('ProductCategory')
                        // let customer_id = responseJson.data.id;
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
                    console.log("Api call error", error);
                    // Alert.alert(error.message);
                });
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
                prod_image: image.path
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
                        containerStyle={{ height: 60, width: width - 40, alignSelf: 'center' }}
                        style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                        itemStyle={{
                            justifyContent: 'flex-start', width: width - 50, height: 30
                        }}
                        placeholder="Product Category "
                        dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
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
                                {(this.state.prod_image != '') ?
                                    <Image
                                        source={require('../images/redPlus.png')}
                                    />
                                    : <Image
                                        source={require('../images/redPlus.png')}
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
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProductCategory)
