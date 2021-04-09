import React from 'react'
import { View, ImageBackground, ScrollView, Alert, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg';
import styles from '../css/CreateProductCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import { Constants } from '../views/Constant';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get('window')

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            categoryarr: [],
            spinner: false,
            category_id: 0,
            name: '',
            quantity: 0,
            code: '',
            price: 0,
            reservation_day: 0,
            description: '',
            is_web_shop: false,
            is_qty_limit: false,
            add_variation: false,
            validity: 0,
            image: '',
        }
    }

    componentDidMount() {

        this.getCategoryList()
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
                console.log('response json !!!!!!!!!@@@@@@@@@@@', responseJson);
                this.setState({ spinner: false });
                if (responseJson.status === 'success') {

                    let res = responseJson.data;
                    let categoryarr = res.map((x, key) => { return { label: x.name, value: x.id } });
                    console.log('category !!!!!!', categoryarr);
                    this.setState({
                        categoryarr: categoryarr,
                    });
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }

            })

    }
    onCategoryText(item) {
        this.setState({
            category_id: item
        })
    }

    createProduct() {


        this.setState({ spinner: true })

        if (this.state.name === '' || this.state.price === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Product name and Price are required")
            return;
        }
        else {


            let postData = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.user.access_token,
                },
                body: JSON.stringify({
                    category_id: 0,
                    name: this.state.name,//required
                    quantity: this.state.quantity,//sandbox
                    code: this.state.code,
                    price: this.state.price,// required
                    description: this.state.description,
                    validity: this.state.validity,
                    no_qty_limit: this.state.is_qty_limit, //Boolean 
                    has_vat: this.state.state_id, //Boolean 
                    image: this.state.image,
                    on_webshop: this.state.is_web_shop, //Boolean 
                })
            };
            console.log('Constants.productslist url ', Constants.productslist);
            console.log('Constants.productslist post data ', postData);
            fetch(Constants.productslist, postData)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log(" create customer response !!!!!!!!!!!", responseJson)

                    this.setState({ spinner: false })
                    if (responseJson.status === "success") {
                        Alert.alert('MESSAGE', responseJson.message)
                        let customer_id = responseJson.data.id;
                        this.createCustomerDelivery(customer_id);
                    } else {
                        // this.setState({ spinner: false })
                        let message = JSON.stringify(responseJson.message)
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


    render() {
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
                        onPress={() => this.props.navigation.navigate('Products')}
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
                                            items={this.state.categoryarr}
                                            containerStyle={{ height: 50, width: width - 35, marginTop: 15 }}
                                            style={{ backgroundColor: '#fff' }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            placeholder="Catagory"
                                            dropDownStyle={{ backgroundColor: '#000', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onCategoryText(item.value)}
                                        />}
                                </View>
                            </View>

                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="ProName*"
                                        onChangeText={text => this.setState({ name: text })}
                                    />

                                </View>
                            </View>

                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Description"
                                        onChangeText={text => this.setState({ description: text })}
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Product Code"
                                        onChangeText={text => this.setState({ code: text })}
                                    />

                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Price (.00)"
                                        onChangeText={text => this.setState({ price: text })}
                                        keyboardType='numeric'
                                    />

                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Reservation (Days)"
                                        onChangeText={text => this.setState({ reservation_day: text })}
                                        keyboardType='numeric'
                                    />

                                </View>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Quantity"
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
                                    />
                                </View>
                            </View>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ position: 'relative' }, styles.formColumn]}>
                                    <TextInput
                                        placeholder="VAT"
                                    />
                                    <Icon
                                        style={[{ position: 'absolute', right: width / 2 + 20 }]}
                                        name="caret-down" />
                                </View>
                            </View>
                            <View style={[{}, styles.addImageView]}>
                                <Text style={[{}, styles.addImageLableText]}>Image</Text>
                                <Image
                                    source={require('../images/redPlus.png')}
                                />
                            </View>
                        </View>
                        <View style={[{ marginTop: 10 }, styles.productDetailContainerView]}>
                            <View style={[{}, styles.formRowView]}>
                                <View style={[{ flexDirection: 'column' }]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                add_variation: !this.state.add_variation
                                            })
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
                                    <View style={[{}, styles.formRowView]}>
                                        <View style={[{ position: 'relative' }, styles.formColumn]}>
                                            <TextInput
                                                placeholder="Attribute"
                                            />
                                            <Icon
                                                style={[{}, styles.rightIcon]}
                                                name="caret-down" />
                                        </View>
                                        <View style={[{ position: 'relative' }, styles.formColumn]}>
                                            <TextInput
                                                placeholder="Price (.00)"
                                            />
                                        </View>
                                    </View>
                                    <View style={[{}, styles.formRowView]}>
                                        <TouchableOpacity style={[{ position: 'relative' }, styles.formColumn]}>
                                            <Text style={[{}, styles.redTouchText]}>
                                                + Add another variation
                                    </Text>
                                        </TouchableOpacity>
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
                                                placeholder="Quantity"
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
                                    <View>
                                        <Text style={[{}, styles.productImageLable]}>Images</Text>
                                        <View style={[{ position: 'relative', width: width / 4 }]}>
                                            <TouchableOpacity style={[{}, styles.productImageCross]}>
                                                <Image source={require('../images/productCross.png')} />
                                            </TouchableOpacity>
                                            <Image
                                                style={[[], styles.productImage]}
                                                source={require('../images/juice.png')} />
                                        </View>
                                    </View>

                                    <TouchableOpacity style={[{ alignSelf: 'center', marginVertical: 20 }, styles.formColumn]}>
                                        <Text style={[{}, styles.redTouchText]}>
                                            + Add another variation
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                                : null}

                        </View>
                        <TouchableOpacity
                            onPress={() => this.createProduct()}
                            style={[{}, styles.redTouch]}>
                            <Text style={{ color: '#fff' }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
