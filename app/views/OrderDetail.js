import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Touchable, ScrollView,Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import styles from '../css/OrderDetailCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from './Constant';

var { width, height } = Dimensions.get('window');

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            order_id: this.props.route.params.id ?? 0,
            selectedStartDate: null,
            calenderModal: false,
            cicod_order_id: '',
            delivery_type: '',
            payment_mode: '',
            order_status: '',
            payment_status: '',
            ticket_id: '',
            created_by: '',
            payment_date: '',
            total_amount: 0,
            amount_paid_from_credit_limit: '',
            data: {

                customer: {
                    name: '',
                    phone: '',
                    address: '',
                    email: '',
                },

            },
            item: [],
        };
    }
    componentDidMount() {
        let order_id = this.props.route.params.id;
        this.setState({ Spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.orderslist + '/' + order_id, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    Spinner: false,
                });
                console.log('data data data res res res ', responseJson.message)
                if (responseJson.status === 'success') {
                    if (responseJson.message == "Order not found") {
                        this.props.navigation.goBack();
                        Alert.alert('Message', responseJson.message)
                        return
                    }
                    let total_ammount = 0;
                    let product_items = responseJson.data.items;

                    for (let i = 0; product_items.length > i; i++) {
                        total_ammount = total_ammount + (product_items[i].price * product_items[i].quantity);
                    }
                    this.setState({
                        data: responseJson.data,
                        cicod_order_id: responseJson.data.cicod_order_id,
                        delivery_type: responseJson.data.delivery_type,
                        payment_mode: responseJson.data.payment_mode,
                        order_status: responseJson.data.order_status,
                        payment_status: responseJson.data.payment_status,
                        ticket_id: responseJson.data.ticket_id,
                        created_by: responseJson.data.created_by,
                        payment_date: responseJson.data.payment_date,
                        item: product_items,
                        total_amount: total_ammount,
                        amount_paid_from_credit_limit: responseJson.data.amount_paid_from_credit_limit,
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
    unauthorizedLogout(){
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    ReciptResend() {
        //https://com.cicodsaasstaging.com/com/api/orders/957?action=send_receipt
        this.setState({ Spinner: true })
        console.log("rrrrrrrrrrrrr", this.props.route.params.id)
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        let reciptUrl = Constants.orderslist + '/' + this.state.order_id;

        fetch(reciptUrl, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    Spinner: false
                });
                if (responseJson.status === 'success') {
                    console.log('data data data res res res ', responseJson)
                    Alert.alert('Success', responseJson.message)
                    // this.props.navigation.navigate('DrawerNavigation')
                } else {
                    // let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', responseJson.message)
                }
            })

    }
    render() {
        return (
            <ScrollView>
                <View style={[{}, styles.mainView]}>
                    <Header navigation={this.props.navigation} />
                    <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={[{alignItems:'center'}, styles.headingRow]}>
                            <Icon name="arrow-left" size={25} color="#929497" />
                            {/* <Text style={[{color:'#2F2E7C',fontWeight:'700',marginLeft:10,}fontStyles.normal15]}>ORDER DETAIL</Text> */}
                            <Text style={[{color:'#2F2E7C',fontWeight:'700',marginLeft:10,},fontStyles.normal15]}>ORDER DETAIL</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[{}, styles.textInputView]}>
                        <Text style={{ color: '#aaa' }}>CICOD Order ID</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.data.cicod_order_id}</Text>
                        <TouchableOpacity
                            onPress={() => this.ReciptResend()}
                            style={[{}, styles.btnContinuueView]}>
                            <Text style={{ color: '#FFFFFF' }}>Send receipt</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[{}, styles.detailMainView]}>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Customer Name</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.customer.name ?? ''}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Phone Number</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.customer.phone ?? 0}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Delivery Type</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.delivery_type ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Order Channel</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>Order Channel</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Customer Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.customer.address ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Email Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{ fontSize: 12 }, styles.detailColumn2text]}>{this.state.data.customer.email ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Mode</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.payment_mode ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Order Status</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>

                                {(this.state.order_status == 'PENDING') ?
                                    <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#FFF3DB', color: '#FDB72B', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                        {this.state.order_status}
                                    </Text>
                                    : (this.state.order_status == 'PAID') ?
                                        <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#DAF8EC', color: '#26C281', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                            {this.state.order_status}
                                        </Text>
                                        : (this.state.order_status == 'PART PAYMENT') ?
                                            <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#E6E6E6', color: '#929497', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                {this.state.order_status}
                                            </Text>
                                            : null}
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Status</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.payment_status ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Ticket Id</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.ticket_id ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Created By</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.created_by ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Due Date</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.payment_date ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Delivery Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>Delivery Address</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{ fontSize: 11 }, styles.detailColumn1text]}>Amount Paid From Credit Limit</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.amount_paid_from_credit_limit ?? '--'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[{}, styles.detailMainView]}>
                        <View style={[{ alignSelf: 'flex-start', borderBottomWidth: 0.25, paddingBottom: 10, width: width - 20, paddingHorizontal: 10, marginVertical: 10, flexDirection: 'row' }]}>
                            <Image
                                style={{height:40,width:30}}
                                source={require('../images/Order/invoice.png')}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Text style={[{}, styles.detailInvoiceGraytext]}>Invoice Number:</Text>
                                <Text style={[{ fontWeight: 'bold' }, styles.detailInvoiceDarkGraytext]}>PCIN00000915</Text>
                            </View>
                        </View>
                        <View style={{}, styles.invoiceRow}>
                            <View style={{ flexDirection: 'column', width: width - 50 }}>
                                <Text style={[{}, styles.detailInvoiceLable]}>Pure ORANGE JUICE 12PACK</Text>
                                <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>Unit Price: </Text>
                                    <Text style={{ fontSize: 13, color: '#929497', marginRight: 20 }}>N100,000 </Text>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>QTY: </Text>
                                    <Text style={{ fontSize: 13, color: '#929497', marginRight: width / 4 }}>5 </Text>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497', textAlign: 'right', alignSelf: 'flex-end' }}>N500,000 </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{}, styles.invoiceRow}>
                            <View style={{ flexDirection: 'column', width: width - 50 }}>
                                <Text style={[{}, styles.detailInvoiceLable]}>APPLE BUST FRUTTA 250ML</Text>
                                <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>Unit Price: </Text>
                                    <Text style={{ fontSize: 13, color: '#929497', marginRight: 20 }}>N50,000 </Text>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>QTY: </Text>
                                    <Text style={{ fontSize: 13, color: '#929497', marginRight: width / 4 }}>5 </Text>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497', textAlign: 'right', alignSelf: 'flex-end',paddingRight:10 }}>N250,000 </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row',paddingRight:5 }}>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>Total:  </Text>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans',paddingRight:5 }}>N750,000</Text>
                        </View>

                    </View>

                </View>
            </ScrollView>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
