import React from 'react'
import { View, ScrollView, FlatList, Dimensions, Image, Platform, TouchableOpacity, SectionList, StatusBar, Alert } from 'react-native'
import { Text, TextInput, Modal } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/UpdateProductCss'
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Constants } from './Constant';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'

class UpdateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            spinner: false,
            isChecked: false,
            searchPress: 1,
            updateProductModal: false,
            prod_list: [],
            prod_selected: [],
            buyer_detail: {},
            is_default: false,
            categories: [],
            products: [],
        }

    }
    componentDidMount() {
        this.setState({
            buyer_detail: this.props.route.params.buyer_detail
        })
        console.log('buyer_detail', this.props.route.params.buyer_detail);
        this.getData(Constants.products);
    }
    componentWillReceiveProps() {
        console.log('here in receive props !!!!!!!!!!!!!!!', this.props)
        if (this.props.route == null || this.props.route.params == null) {
            return;
        }
       
        this.setState({
            buyer_detail: this.props.route.params.buyer_detail
        });

        console.log('this.props.route', this.props.route.params.filters);
        // console.log('this.props.route',this.props.route.params);
        // this.getData(Constants.productslist);
        let filters = this.props.route.params.filters;
        let filter = '?';
        for (let i = 0; i < filters.length; i++) {
            filter = filter + filters[i].key + '=' + filters[i].value;
            if (i != filters.length - 1) {
                filter = filter + '&';
            }
        }

        this.getData(Constants.productslist + filter);
    }

    getData(url) {
        let token = this.props.user.access_token;
        this.setState({ spinner: true })
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
                this.setState({
                    spinner: false,

                });
                if (responseJson.status === "success" || responseJson.success === true) {

                    let datares_arr = responseJson.data;
                    // console.log('all data  ', datares_arr);
                    let categories = [];
                    let data_arr = [];
                    for (let i = 0; i < datares_arr.length; i++) {
                        let cat_name = '';
                        if (!datares_arr[i].category || datares_arr[i].category == null) {
                            continue;
                        }
                        cat_name = datares_arr[i].category;
                        if (this.in_array(categories, cat_name) === -1) {
                            categories.push(datares_arr[i].category);
                            data_arr.push({
                                category: cat_name,
                                data: []
                            });
                            for (let j = 0; j < datares_arr.length; j++) {
                                if (datares_arr[j].category == cat_name) {
                                    datares_arr[j].isChecked = false;
                                    data_arr[(data_arr.length - 1)].data.push(datares_arr[j]);
                                }
                            }
                        }
                    }
                    this.setState({
                        data: responseJson.data,
                        prod_list: data_arr
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

    in_array(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
        return -1;
    }
    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    updateProductAccess() {
        let products = this.state.products;

        let postData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token,
            },
            body: JSON.stringify({
                products: products
                // products: [
                //     "100",
                //     "101",
                //     "102"
                // ]
            })
        };
        let buyer_id = this.state.buyer_detail.buyer_id;
        console.log('buyer_id ', buyer_id);
        fetch(Constants.updateBuyerProduct + '?id=' + buyer_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('update products access data ', postData)
                console.log('update products access respones ', responseJson)
                this.setState({ spinner: false })
                if (responseJson.success) {
                    Alert.alert('Message',responseJson.data.message)
                    // this.props.navigation.navigate('Home')
                    this.props.navigation.goBack();
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
            });
    }
    onItemPress(item) {
        let list = this.state.prod_list;
        list = this.updateList(list, item);
        this.setState({
            prod_list: list
        })
    }

    updateList(list, item) {
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].data.length; j++) {
                let search_id = list[i].data[j].id;
                if (item.id == search_id) {
                    list[i].data[j].isChecked = !list[i].data[j].isChecked;
                }
            }
        }
        return list;
    }
    category_pressed(category) {
        let list = this.state.prod_list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].category == category) {
                list[i].isChecked = !list[i].isChecked;
                for (let j = 0; j < list[i].data.length; j++) {
                    list[i].data[j].isChecked = list[i].isChecked;
                }
            }
        }
        this.setState({
            prod_list: list
        })
    }

    Item = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => this.onItemPress(item)}
            >
                <View style={[{}, styles.flatListRowView]}>
                    <Image source={require('../images/ticket.png')} />
                    <Text style={[{}, styles.flatListRowText]}> {item.name}</Text>
                    <Icon
                        style={[{ right: 10 }, styles.flatelistHeadingIcon]}
                        name="check-circle"
                        color={item.isChecked ? '#26C281' : '#aaa'}
                        size={20}
                    />

                </View>
            </TouchableOpacity>)
    }

    showUpdateProductAccessPopup() {
        let list = this.state.prod_list;
        let products = this.state.products;
        let categories = [];
        for (let i = 0; i < list.length; i++) {
            let cat_marked = false;
            for (let j = 0; j < list[i].data.length; j++) {
                if (list[i].data[j].isChecked) {
                    products.push(list[i].data[j].id);
                    cat_marked = true;
                }
            }
            if (cat_marked) {
                categories.push(list[i].category);
            }
        }
        this.setState({
            products: products,
            categories: categories,
            updateProductModal: true
        })
    }

    render() {

        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('Buyers')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>UPDATE PRODUCTS - {this.state.buyer_detail.buyer_name}</Text>
                    </View>
                </View>
                <View style={[{}, styles.headingDescView]}>
                    <Text style={[{}, styles.headingDescText]}>Select Product category or products you want Merchant to have access to</Text>
                </View>
                <View style={[{}, styles.headingBoxView]}>
                    <Image source={require('../images/bage.png')} />
                    <Text style={[{}, styles.headingBoxText]}>{this.state.buyer_detail.buyer_name}</Text>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#E6E6E6', marginVertical: 10, width: width - 20, alignSelf: 'center' }}></View>
                <View style={[{}, styles.searchRowView]}>
                    <View>
                        <Image source={require('../images/products/searchicon.png')} />
                    </View>
                    <View>
                        <TextInput
                            label="Search product or product category"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Filter', { screen: 'UpdateProduct' })}
                        style={[{}, styles.searchRowSettingIconView]}>
                        <Image
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>
                </View>
                {/* <ScrollView> */}
                <View style={[{}, styles.selectedProductRowView]}>
                    <Text style={[{}, styles.darkGrayBoldText]}>10 </Text>
                    <Text style={[{}, styles.darkGrayNormalText]}>product selected</Text>
                </View>
                {this.state.prod_list.length == 0 ? null :
                    <SectionList
                        refreshing={true}
                        sections={this.state.prod_list}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <this.Item item={item} />}
                        renderSectionHeader={({ section: { category, isChecked } }) => (
                            <TouchableOpacity onPress={() => this.category_pressed(category)}>
                                <Text style={[{}, styles.flatelistHeadingText]}>{category}</Text>
                                <Icon
                                    style={[{ right: 20 }, styles.flatelistHeadingIcon]}
                                    name="check-circle"
                                    // color={'#E6E6E6'}
                                    color={isChecked ? '#26C281' : '#aaa'}
                                    size={20}
                                />
                            </TouchableOpacity>
                        )}
                    />}

                {/* </ScrollView> */}
                <TouchableOpacity
                    onPress={() => this.showUpdateProductAccessPopup()}
                    style={[{}, styles.redTouchView]}
                >
                    <Text style={{ color: '#fff' }}>Update Product Access</Text>
                </TouchableOpacity>

                <Modal
                    visible={this.state.updateProductModal}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ updateProductModal: false })}
                        style={[{}, styles.modalMainContainer]}>
                        <View style={[{}, styles.modalCOntainer]}>
                            <Image source={require('../images/bluequesmark.png')} />
                            <Text style={[{}, styles.modalNormalText]}>You are about to give</Text>
                            <View style={[{}, styles.modalTextRowView]}>
                                <Text style={[{}, styles.modalNormalText]}>{this.state.buyer_detail.buyer_name} access to</Text>
                                <Text style={[{}, styles.modalBOldText]}> {this.state.products.length} </Text>
                            </View>
                            <View style={[{}, styles.modalTextRowView]}>
                                <Text style={[{}, styles.modalBOldText]}>products </Text>
                                <Text style={[{}, styles.modalNormalText]}>in {this.state.categories.length} product category</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.updateProductAccess()}
                                style={[{ backgroundColor: '#B1272C', }, styles.modalTouchView]}
                            >
                                <Text style={{ color: '#fff' }}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ updateProductModal: false })}
                                style={[{ backgroundColor: '#fff', }, styles.modalTouchView]}
                            >
                                <Text style={{ color: '#929497' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)