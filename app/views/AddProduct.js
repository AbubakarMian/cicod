import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Alert, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import { Text, TextInput, Searchbar } from 'react-native-paper';
import styles from '../css/AddProductCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';

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
            // catelog_products_total: 0,
            selected_product: [],
        }
    }

    componentDidMount() {
    
        console.log("sellers s@@@##",this.props.route.params.item)
        if(this.props.route.params.heading=="supplier"){
            this.getSellersProducts(Constants.sellerProductList+'?id='+this.props.route.params.item.seller_id);
        }
        this.getCategoryList();
        // this.getSellersProducts();
    }

    getSellersProducts(url){
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        //Constants.productslist + '?is_active=1&search=' + this.state.search_product
        // let search_url =  '?is_active=1&search=' + this.state.search_product + '&category_id=' + this.state.category_id
      
        console.log('sllerszX@@##$$ ', url);
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false
                });
                console.log('@@@@....sellers Products!! !!!!!!!!', responseJson)
                if (responseJson.success) {

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
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    getProductList(search_product, category_id) {

        if (search_product == '' && category_id == '') {
            return;
        }
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        //Constants.productslist + '?is_active=1&search=' + this.state.search_product
        // let search_url =  '?is_active=1&search=' + this.state.search_product + '&category_id=' + this.state.category_id
        let category_search = (category_id == 0 || category_id == '' )?'' : '&category_id=' + category_id;
        let search_url = Constants.productslist + '?is_active=1&search=' + search_product + category_search;
        console.log('search url ', search_url);
        console.log('postData ', postData);
        fetch(search_url, postData)
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
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
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
        fetch(this.props.route.params.heading=="supplier"? Constants.sellerProductCategoryList+'?id='+this.props.route.params.item.seller_id:Constants.productcategorylist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false });
                if (responseJson.success|| responseJson.status === 'success') {

                    let res = responseJson.data;
                    let categoryarr = res.map((x, key) => { return { label: x.name, value: x.id } });
                    console.log('categoryarr !!!!!!!!!!!!!!!!!!', categoryarr);
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

    onCategoryText(category_id) {
        console.log('text !!!!!!!!!!!!!!!!!', category_id);
        this.setState({
            category_id: category_id
        })
        if(this.props.route.params.heading=="supplier"){
            const url=`${Constants}`
            this.getSellersProducts(Constants.sellerProductList+'?id='+this.props.route.params.item.seller_id)+'&filter[category_id]='+category_id;
        } else {
            this.getProductList(this.state.search_product, category_id);
        }
        
    }

    async addProduct(index) {
        let data = this.state.data;
        if (data.length== 0 ) {// && data[index].purchased_quantity == 0  this.props.cart.cart.length 
            Alert.alert('Error ', 'Cart is empty')
            return; 
        } else {

            for(let i = 0 ; i < data.length; i++){
                
                if(data[i].purchased_quantity > 0){
                    if(data[i].minimum_order > data[i].purchased_quantity){
                        Alert.alert("Info!",`${data[i].name} purchased quantity less than minimum order ${data[i].minimum_order}`)
                        continue;
                    }
                    await this.props.cartReducer(data[i]);
                }
            }            
            console.log('aadded cart',data[index])
            this.props.navigation.navigate('CreateOrder', { screen: 'active' });
        }
    }
    catelog_count(){
        let data = this.state.data;
        let count = 0;
        for(let i = 0 ; i < data.length; i++){
            if(data[i].purchased_quantity > 0){
                count = count + 1;
            }
        }
        // this.setState({
        //     catelog_products_total:count
        // })
        return count;
    }
    async counterFun(action, index) {

        let data = this.state.data;
        if (action == 'add') {

            let updated_purchased_quantity = data[index].purchased_quantity + 1;
            if (updated_purchased_quantity > data[index].quantity && !data[index].no_qty_limit) {
                alert('Out of stock');
            }
            else {
                console.log('here in else condition !!!!!!!!!', data[index].purchased_quantity);
                // await this.props.cartReducer(data[index]);
                data[index].purchased_quantity = updated_purchased_quantity;
                console.log('here in else condition !!!!!!!!! after : ', data[index].purchased_quantity);

                this.setState({
                    data: data
                });
                // this.props.cartReducer(data[index]);

                console.log('cart : ', this.props.cart);
            }
        }
        else {
            let updated_purchased_quantity = data[index].purchased_quantity - 1;

            if (data[index].purchased_quantity > 0) {
                await this.props.removeFromCart(data[index]);
                data[index].purchased_quantity = updated_purchased_quantity;
                this.setState({
                    data: data
                })
                console.log(' remove from cart cart : ', this.props.cart);
            }
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
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('CreateOrder')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>ADD PRODUCT</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>

                        <Searchbar
                            placeholder="Search Product"
                            iconColor="#929497"
                            style={{ width: width - 20, alignSelf: 'center', marginTop: 10, marginBottom: 5, elevation: 0, fontSize: 14, color: '#D5D5D5', borderColor: '#D8DCDE' }}
                            onSubmitEditing={() =>this.getProductList(this.state.search_product, this.state.category_id)}
                            onChangeText={text => this.setState({ search_product: text })}
                        //update
                        ></Searchbar>
                        {/* <View style={[{}, styles.searchByCatCOntainer]}> */}

                        {this.state.categoryarr.length < 1 ? null :
                            <DropDownPicker
                                scrollViewProps={{
                                    persistentScrollbar: true,
                                }}
                                dropDownDirection="AUTO"
                                bottomOffset={200}
                                items={this.state.categoryarr}
                                placeholder="Catagory"
                                containerStyle={{ height: 50, width: width - 20, alignSelf: 'center', marginVertical: 10, borderRadius: 5 }}
                                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}

                                dropDownStyle={{ height: 160, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                labelStyle={{ color: '#A9A9A9' }}
                                // onChangeItem={item => this.onSelectCountry(item.value)}  //this.onSelectCountry(item.value)}
                                onChangeItem={item => this.onCategoryText(item.value)}
                            />}
                        {/* </View> */}

                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#E6E6E6', width: width - 20, alignSelf: 'center', marginBottom: 10 }}></View>
                        <View style={[{ zIndex: -0.9999 }, styles.OrderDetailContainer]}>

                            <View style={[{}, styles.OrderDetailHeadingRow]}>
                                <Text style={[{}, styles.OrderDetailHeadingRowText]}>Product Catalog</Text>
                                <Text style={[{}, styles.OrderDetailNotificationText]}>{this.catelog_count()}</Text>
                            </View>

                            {(this.state.data.length != 0) ?
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
                                                        <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>{item.name} {item.no_qty_limit?'':item.quantity}PACK</Text>
                                                        <Text style={[{}, styles.OrderDetailHeadingRowText]}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[{}, styles.orderDetailAmmountRow]}>
                                                <View style={[{}, styles.orderDetailAmmountColumn]}>
                                                    <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>{this.props.currency.currency} {item.price}</Text>
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
                                                    <TouchableOpacity
                                                        onPress={() => this.addProduct(index)}
                                                        style={{ flexDirection: 'row', backgroundColor: '#B1272C', position: 'absolute', right: 10, paddingHorizontal: 10, borderRadius: 100, paddingVertical: 2, width: width / 6, alignItems: 'center' }}
                                                    >
                                                        <Icon name="plus-circle" color={'#fff'} />
                                                        <Text style={{ color: '#fff', marginLeft: 5 }}>Add</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    )}
                                />
                                : <View style={[{}, styles.contentView]}>
                                    <Image
                                        style={{ height: 100, width: 100 }}
                                        source={require('../images/noProduct.png')}
                                    />
                                    <Text style={[{}, styles.contentViewHeadingText]}>No product selected</Text>
                                    <Text style={[{ color: '#929497' }, fontStyles.normal15]}>Search for a product</Text>
                                </View>}
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
        cart: state.cartReducer,
        currency: state.currencyReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        cartReducer: (value) => dispatch({ type: ADD_TO_PRODUCT, value: value }),
        removeFromCart: (value) => dispatch({ type: REMOVE_FROM_CART, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
