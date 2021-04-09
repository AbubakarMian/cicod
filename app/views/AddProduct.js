import React from 'react'
import { View, Alert, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/AddProductCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, ADD_TO_PRODUCT } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            spinner: false,
            data: [],
            search_product: '',
            total_add_order: 0,
            categoryarr: [],
            category_id: 0,
            count: 0,
            selected_product: [],
            product_cart: []

        }
    }

    componentDidMount() {
        this.getCategoryList();
    }

    getProductList() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.productslist + '?is_active=1&search=' + this.state.search_product + '&category_id=' + this.state.category_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false
                });
                console.log('response !!!!!!!!', responseJson)
                if (responseJson.status === "success") {

                    let cart_data = this.props.cart.cart;
                    console.log('cart data : ', cart_data);
                    let data = responseJson.data;
                    for (let i = 0; i < data.length; i++) {
                        let product_found = false;
                        for (let c = 0; c < cart_data.length; c++) {
                            console.log('asd');
                            if (cart_data[c].id == data[i].id) {
                                data[i].purchased_quantity = cart_data[c].purchased_quantity;
                                data[i].is_added = true;
                                product_found = true;
                            }
                        }
                        if (!product_found) {
                            data[i].purchased_quantity = 0;
                            data[i].is_added = false;
                        }

                    }
                    this.setState({
                        data: data
                    })
                } else {
                    let message = JSON.stringify(responseJson.message)
                    Alert.alert('Error', message)
                }
            })
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
                    let categoryarr = res.map((x, key) => { return { label: x.name, value: x.id } });
                    this.setState({
                        categoryarr: categoryarr,
                    });
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }

            })

    }

    onCategoryText(text) {
        console.log('text !!!!!!!!!!!!!!!!!', text);
    }

    addProduct(item, index) {

        console.log('item !!!!!!!!!!!!', item)
        console.log('index !!!!!!!!!!!!', index)
        let data = this.state.data;
        data[index].is_added = !data[index].is_added;
        // let selected_product = this.state.selected_product ;
        // selected_product.push( item )
        // this.setState({
        //     data: data,
        //     selected_product: selected_product,
        // });

        this.props.addProduct({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            purchased_quantity: item.purchased_quantity,
            price: item.price,
        })
        this.props.navigation.navigate('CreateOrder', { screen: 'active' });

    }
    counterFun(action, index) {

        let data = this.state.data;
        console.log('fun called ');
        if (action == 'add') {

            if ((data[index].purchased_quantity + 1) > data[index].quantity) {
                alert('Out of stock');
            }
            else {
                this.props.cartReducer(data[index]);
                console.log('cart : ', this.props.cart);
                data[index].purchased_quantity = data[index].purchased_quantity + 1;
                this.setState({
                    data: data
                })
            }
        }
        else {
            if (data[index].purchased_quantity > 0) {
                data[index].purchased_quantity = data[index].purchased_quantity - 1;
                this.setState({
                    data: data
                })
            }
        }

        let cart_product = this.state.product_cart;

        // cart_product.forEach(item ,index, function(){

        //     return item ;
        // })

    }

    render() {
        console.log('this.state.selected_product ', this.state.selected_product);
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
                <Header navigation={this.props.navigation}/>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Sell')}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>ADD PRODUCT</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>
                        <View style={[{}, styles.searchContainer]}>
                            <Image
                                source={require('../images/products/searchicon.png')}
                            />
                            <TextInput
                                onChangeText={text => this.setState({ search_product: text })}
                                placeholder="Search Product"
                                onSubmitEditing={() => this.getProductList()}
                            />

                        </View>
                        <View style={[{}, styles.searchByCatCOntainer]}>

                            {this.state.categoryarr.length < 1 ? null :
                                <DropDownPicker
                                    items={this.state.categoryarr}
                                    containerStyle={{ height: 50, width: width - 25, marginTop: 15 }}
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


                        <View style={[{}, styles.OrderDetailContainer]}>
                            <View style={[{}, styles.OrderDetailHeadingRow]}>
                                <Text style={[{}, styles.OrderDetailHeadingRowText]}>Order Detail</Text>
                                <Text style={[{}, styles.OrderDetailNotificationText]}>{this.state.total_add_order}</Text>
                            </View>
                            {/* {(this.state.data === '') ? */}
                            <FlatList
                                data={this.state.data}
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
                                renderItem={({ item, index, separators }) => (
                                    <View style={[{ flexDirection: 'column', marginBottom: 20 }]}>
                                        <View style={[{}, styles.OrderDetailDataCOntainer]}>
                                            <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
                                                <View>
                                                    <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>{item.name}  {item.quantity}PACK</Text>
                                                    <Text style={[{}, styles.OrderDetailHeadingRowText]}>LAGOS- Palms</Text>
                                                </View>
                                            </View>


                                        </View>
                                        <View style={[{}, styles.orderDetailAmmountRow]}>
                                            <View style={[{}, styles.orderDetailAmmountColumn]}>
                                                <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>N200,000</Text>
                                            </View>
                                            <View style={[{}, styles.orderDetailAmmountColumn]}>

                                                <View style={[{}, styles.OrderDetailDataCOntainerCounterView]}>
                                                    <TouchableOpacity
                                                        onPress={() => this.counterFun('sub', index)}
                                                        style={[{}, styles.iconView]}>
                                                        <Icon name="minus" />
                                                    </TouchableOpacity>
                                                    <View style={[{}, styles.iconView]}>
                                                        <Text>{item.purchased_quantity}</Text>
                                                    </View>
                                                    <TouchableOpacity style={[{}, styles.iconView]}
                                                        onPress={() => this.counterFun('add', index)}
                                                    >
                                                        <Icon name="plus"
                                                            color="#B1272C"
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                {(item.is_added === false) ?
                                                    <TouchableOpacity
                                                        onPress={() => this.addProduct(item, index)}
                                                        style={{ flexDirection: 'row', backgroundColor: '#B1272C', position: 'absolute', right: 2, paddingHorizontal: 10, borderRadius: 100, paddingVertical: 2, width: width / 6, alignItems: 'center' }}
                                                    >
                                                        <Icon name="plus-circle" color={'#fff'} />
                                                        <Text style={{ color: '#fff', marginLeft: 5 }}>Add</Text>
                                                    </TouchableOpacity>
                                                    : null}
                                            </View>
                                        </View>

                                    </View>
                                )}
                            />
                            {/* : <View style={[{}, styles.contentView]}>
                                    <Image
                                        source={require('../images/noProduct.png')}
                                    />
                                    <Text style={[{}, styles.contentViewHeadingText]}>No product selected</Text>
                                    <Text style={[{}, styles.contentViewDescText]}>Search for a product</Text>
                                </View>} */}
                        </View>


                    </ScrollView>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
        cart: state.cartReducer
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        cartReducer: (value) => dispatch({ type: ADD_TO_PRODUCT, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
