import React from 'react';
import { Container, Input, InputGroup, List, ListItem } from 'native-base';
import { View, TouchableOpacity, Image, Dimensions, TouchableHighlight, Alert, Touchable, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Modal } from 'react-native-paper';
import fontStyles from '../css/FontCss'
import styles from '../css/BuyersViewCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from './Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER,SET_SUPPLIER } from '../redux/constants/index';


var { width, height } = Dimensions.get('window');
class BuyersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            supendModal: false,
            moreDeatailMOdal: false,
            items: {},
            orderList: [],
            search_order: ''
        }
    }

    componentDidMount() {
        this.setState({
            items: this.props.route.params.items,
            spinner: false,
        })
        if (this.props.route.params.heading == "SUPPLIER") {
            this.getSellerOrderHistory();

        } else {

            this.getBuyerOrderHistory()
        }
    }

    getSellerOrderHistory() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        let orderListUrl = Constants.orderslist + '?id=' + this.props.route.params.items.seller_id + '&sort=-id';

        fetch(orderListUrl, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false
                });
                if (responseJson.status === 'success') {
                    console.log('data data data res res res ', responseJson)
                    this.setState({
                        orderList: responseJson.data
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
    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    getBuyerOrderHistory() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        let orderListUrl = Constants.orderslist + '?merchant_id=' + this.props.route.params.items.buyer_id;
        console.log('order list url !!!!!!!!!!', orderListUrl);
        fetch(orderListUrl, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false
                });
                if (responseJson.status === 'success') {
                    console.log('data data data res res res ', responseJson)
                    this.setState({
                        orderList: responseJson.data
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
    viewProducts() {
        console.log('seller_id seller_id seller_id !!!!!!!!!!!', this.state.items.seller_id)
        let buyer_id = this.state.items.seller_id
        this.props.navigation.navigate('Products', { seller_id: buyer_id })
    }

    suspendBuyer(buyer_id) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.suspendBuyer + '?id=' + buyer_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('buyer un suspend Request !!!!!!!!!!', responseJson)
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {
                    // this.setState({
                    //     data: responseJson.data
                    // })
                    Alert.alert('message', responseJson.data.message);

                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    unsuspendBuyer(buyer_id) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.unsuspendBuyer + '?id=' + buyer_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('buyer un suspend Request !!!!!!!!!!', responseJson)
                this.setState({
                    spinner: false,
                });
                if (responseJson.success === true) {
                    // this.setState({
                    //     data: responseJson.data
                    // })
                    Alert.alert('message', responseJson.data.message);
                    this.props.navigation.navigate('Buyers')

                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    suspendSeller(seller_id) {

    }
    unsuspendSeller(seller_id) {

    }

    suspendAction(item) {

        this.setState({ supendModal: false })

        if (this.props.route.params.heading == "SUPPLIER") {
            if (item.is_active) {
                // suspend
                this.suspendSeller(item.seller_id);

            } else {
                // unsuspend
                this.unsuspendSeller(item.seller_id);
            }
        } else {
            if (item.is_active) {
                // suspend
                this.suspendBuyer(item.buyer_id);

            } else {
                // unsuspend
                this.unsuspendBuyer(item.buyer_id);
            }
        }

    }
    search() {

        if (this.props.route.params.heading == "SUPPLIER") {
            let search_url = Constants.buyerlist + '?filter[buyer_name]=' + this.state.search_buyers;
            this.getSellerOrderHistory();
            //merchant_id
        } else {
            this.getBuyerOrderHistory()
        }

        // let search_url = Constants.buyerlist + '?filter[buyer_name]=' + this.state.search_buyers;
        // this.buyerList(search_url);
        // console.log('search_url search_url', search_url);
    }
    itemDetail(item) {
        const id = item.id
        console.log("item_id item_id item_id item_id ", id)
        this.props.navigation.navigate('OrderDetail', { id })
    }

    createOrderFun(){
            this.props.setSupplier({
                id:this.state.items.seller_id,
                name:this.state.items.seller_name
            })
        this.props.navigation.navigate('CreateOrder', { heading: 'supplier' })
    }
    render() {
        console.log(' this state  this state items', this.state.items)
        return (

            <View>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View style={[{}, styles.backRowView]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-left" size={25} color={'#929497'} />
                        </TouchableOpacity>
                        <View style={[{}, styles.backRowHeadingView]}>
                            <Text style={[{}, styles.backRowHeadingText]}>{this.props.route.params.heading}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={[{}, styles.productDetailContainerView]}>
                            <Image 
                            style={{height:35,width:35}}
                            source={require('../images/bage.png')} />
                            {(this.props.route.params.heading == 'BUYERS') ?
                                <View>
                                    <Text style={[{textAlign:'center'}, styles.darkGrayBoldText]}>{this.state.items.buyer_name}</Text>
                                    <Text style={[{textAlign:'center'}, styles.lightGrayText]}>{this.state.items.buyer_id}</Text>
                                </View>
                                : <View>
                                    <Text style={[{}, styles.darkGrayBoldText]}>{this.state.items.seller_name}</Text>
                                    <Text style={[{}, styles.lightGrayText]}>{this.state.items.seller_id}</Text>
                                </View>}
                            <TouchableOpacity
                                onPress={() => this.setState({ supendModal: true })}
                                style={[{}, styles.iconRight]}
                            >
                                <Icon

                                    name="ellipsis-h"
                                    size={25}
                                    color={'#929497'}
                                />
                            </TouchableOpacity>


                        </View>
                        <View style={[{ borderWidth: 0.2, width: width - 30, marginVertical: 10, alignSelf: 'center' }]}></View>
                        <View>

                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>No of Products</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>{this.state.items.no_of_products}</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Order Created</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>{this.state.items.no_of_orders}</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Values of orders</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>N {this.state.items.value_of_orders}</Text>
                            </View>
                        </View>
                        {(this.props.route.params.heading == 'BUYERS') ?
                            <View style={[{}, styles.productDetailROwView]}>
                                <View style={[{}, styles.columnView]}>
                                    <Text style={[{}, styles.lightGrayText]}>Min. Spend</Text>
                                    <Text style={[{}, styles.darkGrayBoldText]}>N {this.state.items.minimum_spend}</Text>
                                </View>
                                <View style={[{}, styles.columnView]}>
                                </View>
                                <View style={[{}, styles.columnView]}>
                                </View>
                            </View> : null}
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                {(this.props.route.params.heading == 'BUYERS') ?
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('UpdateProduct', {fetch_action:'updateproduct', 
                                        buyer_detail: this.state.items })}
                                        style={[{}, styles.redTouch]}
                                    >

                                        <Text style={{ color: '#fff' }}>Update Products</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => this.createOrderFun()}
                                        style={[{}, styles.redTouch]}
                                    >

                                        <Text style={{ color: '#fff' }}>Create Order</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View style={[{}, styles.columnView]}>
                                <TouchableOpacity
                                    onPress={() => this.viewProducts()}
                                    style={[{}, styles.whiteTOuch]}
                                >
                                    <Text style={{ color: '#B1272C' }}>View Products</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({ moreDeatailMOdal: true })}
                            style={[{}, styles.moreTOuct]}>
                            <Text style={[{ marginRight: 10 }, styles.lightGrayText]}>More Details</Text>
                            <Icon
                                name="arrow-right"
                                color={'#B1272C'}
                                size={15}
                            />
                        </TouchableOpacity>

                    </View>
                    {/* <View style={[{}, styles.searRowView]}>
                        <Icon name="search" color={'#B1272C'} size={20} />
                        <TextInput
                            label="Search order ID, amount, ticket Id"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                        />
                        <TouchableOpacity
                            style={[{}, styles.settingIconView]}
                        >
                            <Image

                                source={require('../images/Order/settingicon.png')} />
                        </TouchableOpacity>

                    </View> */}
                    <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                            <Image
                                style={{height:20,width:20}}
                                source={require('../images/products/searchicon.png')}
                            />
                            <TextInput
                                label="Search order ID, amount, ticket Id"
                                // selectionColor={'#fff'}
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ search_order: text })}
                                onSubmitEditing={() => this.search()}
                            />
                        </View>

                        <TouchableOpacity
                            style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        // onPress={() => this.props.navigation.navigate('ProductFilter')}
                        >
                            <Image
                                style={{height:50,width:50}}
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>

                    </View>
                    <Text style={[{}, styles.historyHeadingText]}>ORDER HISTORY</Text>

                    <ScrollView
                        horizontal={true}
                        paddingHorizontal={10}
                        // marginBottom={10}
                        height={30}
                        marginTop={5}
                        marginBottom={5}
                        scrollEnabled={true}
                    >

                        <TouchableOpacity
                            onPress={() => this.customeList("")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'all' ? '#000' : '#e2e2e2',
                                fontWeight: 'bold', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>ALL</Text>
                        </TouchableOpacity >
                        <TouchableOpacity
                            onPress={() => this.customeList("pending")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'pending' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PENDING</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.customeList("paid")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'paid' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PAID</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.customeList("partPayment")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'partPayment' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PART PAYMENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.customeList("paidFromCredit")}
                        >
                            <Text style={{
                                color: this.state.is_active_list === 'paidFromCredit' ? '#000' : '#e2e2e2',
                                backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                            }}>PAID FROM CREDIT</Text>
                        </TouchableOpacity>

                    </ScrollView>
                    <ScrollView style={{ paddingBottom: 50, marginBottom: 20 }}>
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
                            data={this.state.orderList}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    onPress={() => this.itemDetail(item)}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={[{}, styles.flatlistMainContianer]}>
                                        <View style={[{}, styles.flatlistMainRow]}>
                                            <Image
                                                // source={[{}, styles.listImage]}
                                                style={{height:35,width:35}}
                                                source={require('../images/Order/bage.png')} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={[{}, styles.darkGrayBoldText]}>{item.cicod_order_id}</Text>
                                                <Text style={[{}, styles.lightGrayText]}>{item.description}</Text>
                                            </View>
                                            <View style={[{}, styles.actionContainer]}>
                                                <Text style={[{}, styles.darkGrayBoldText]}>N{item.amount}</Text>
                                                {(item.order_status == "PAID") ?
                                                    <View style={[{}, styles.greenView]}>
                                                        <Text style={[{}, styles.greenText]}>{item.order_status}</Text>
                                                    </View>
                                                    : (item.order_status == "PENDING") ?
                                                        <View style={[{}, styles.yellowView]}>
                                                            <Text style={[{}, styles.yellowText]}>{item.order_status}</Text>
                                                        </View>
                                                        : <View style={[{}, styles.greyView]}>
                                                            <Text style={[{}, styles.greyText]}>{item.order_status}</Text>
                                                        </View>}
                                            </View>
                                        </View>
                                        <Text style={[{}, styles.lightGrayText]}>{item.date_created}</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </ScrollView>
                </ScrollView>
                <Modal
                    visible={this.state.supendModal}

                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ supendModal: false })}
                    >
                        <View style={[{}, styles.modalBackGround]}>
                            <TouchableOpacity
                                onPress={() => this.suspendAction(this.state.items)}
                                style={[{}, styles.suspendTouch]}>
                                <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} />
                                <Text style={{}}>Cancle</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </Modal>
                {/* MoreDetail Modal */}
                <Modal
                    visible={this.state.moreDeatailMOdal}
                    transparent={true}
                >
                    <View style={[{}, styles.modalBackGround]}>
                        <View style={[{}, styles.moreDetailModalContentContainer]}>
                            <View style={[{}, styles.moreDeatialModalHeadingRow]}>
                                <Text style={[{}, styles.moreDetailHeadingText]}>MORE DETAIL</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({ moreDeatailMOdal: false })}
                                    style={[{}, styles.moreDetailModalCloseTouch]}
                                >
                                    <Icon name="close" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.moreDetailModalContentView]}>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Email: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>j.joghnson@gmail.com</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Phone: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>08123456789</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Address: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>45b,45b Admiralty way, Lekki Phase 1,</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Area: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>Eti Osa</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>State: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>Lagos</Text>
                                </View>
                                <View style={[{}, styles.moreDetailModalContentRow]}>
                                    <Text style={[{}, styles.moreDetailModalContentRowLable]}>Country: </Text>
                                    <Text style={[{}, styles.moreDetailModalContentRowInfo]}>Nigeria</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );

    }
}
function mapStateToProps(state) {
    return {
        user: state.userReducer,
        supplier: state.supplierReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        setSupplier: (value) => dispatch({ type: SET_SUPPLIER, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(BuyersView)