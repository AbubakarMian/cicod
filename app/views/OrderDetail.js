import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/OrderDetailCss';
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';

var { width, height } = Dimensions.get('window');

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
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
            amount_paid_from_credit_limit: '',
            data: {

                customer: {
                    name: '',
                    phone: '',
                    address: '',
                    email: '',
                },

            },
            item: {
                item_name: '',
            },
        };

    }
    componentDidMount() {
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
        fetch('https://com.cicodsaasstaging.com/com/api/orders/1', postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    Spinner: false,
                    data: responseJson.data,
                    cicod_order_id: responseJson.data.cicod_order_id,
                    delivery_type: responseJson.data.delivery_type,
                    payment_mode: responseJson.data.payment_mode,
                    order_status: responseJson.data.order_status,
                    payment_status: responseJson.data.payment_status,
                    ticket_id: responseJson.data.ticket_id,
                    created_by: responseJson.data.created_by,
                    payment_date: responseJson.data.payment_date,
                    amount_paid_from_credit_limit: responseJson.data.amount_paid_from_credit_limit,
                });
                if (responseJson.status === 'success') {
                    console.log('data data data res res res ', this.state.delivery_type)
                    // this.props.navigation.navigate('DrawerNavigation')
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }
                console.log("this.state.item.item_name this.state.item.item_name this.state.item.item_name", this.state.item.item_name)
            })
    }
    render() {
        return (
            <ScrollView>
                <View style={[{}, styles.mainView]}>
                    <Header />
                    <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                    <View style={[{}, styles.headingRow]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{}, styles.resetText]}>ORDER DETAIL</Text>
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <Text style={{ color: '#aaa' }}>{this.state.data.cicod_order_id}</Text>
                        <Text style={{ fontWeight: 'bold' }}>103943535</Text>
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('Home')}
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
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.customer.name}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Phone Number</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.customer.phone}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Delivery Type</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.delivery_type}</Text>
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
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.customer.address}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Email Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{ fontSize: 12 }, styles.detailColumn2text]}>{this.state.data.customer.email}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Mode</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.payment_mode}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Order Status</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{ borderRadius: 50, paddingHorizontal: 5, backgroundColor: '#DAF8EC', color: '#26C281', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                    {this.state.order_status}
                                </Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Status</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.payment_status}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Ticket Id</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.ticket_id}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Created By</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.created_by}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Due Date</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.payment_date}</Text>
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
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.amount_paid_from_credit_limit}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[{}, styles.detailMainView]}>
                        <View style={[{ alignSelf: 'flex-start', width: width - 20, paddingHorizontal: 10, marginVertical: 10, flexDirection: 'row' }]}>
                            <Image
                                source={require('../images/Order/invoice.png')}
                            />
                            <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                <Text style={[{}, styles.detailColumn1text]}>Invoice Number:</Text>
                                <Text style={[{ fontWeight: 'bold' }, styles.detailColumn2text]}>PCIN00000915</Text>
                            </View>
                        </View>
                        <View style={{}, styles.invoiceRow}>
                            <View style={{ flexDirection: 'column', width: width - 50 }}>
                                <Text style={{ color: '#4E4D4D' }}>{this.state.item.name}</Text>
                                <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#929497' }}>Unit Price: </Text>
                                    <Text style={{ fontSize: 8, color: '#929497', marginRight: 20 }}>N100,000 </Text>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#929497' }}>QTY: </Text>
                                    <Text style={{ fontSize: 8, color: '#929497', marginRight: width / 4 }}>5 </Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#929497', textAlign: 'right', alignSelf: 'flex-end' }}>N500,000 </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{}, styles.invoiceRow}>
                            <View style={{ flexDirection: 'column', width: width - 50 }}>
                                <Text style={{ color: '#4E4D4D' }}>Pure ORANGE JUICE 12PACK</Text>
                                <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#929497' }}>Unit Price: </Text>
                                    <Text style={{ fontSize: 8, color: '#929497', marginRight: 20 }}>N100,000 </Text>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#929497' }}>QTY: </Text>
                                    <Text style={{ fontSize: 8, color: '#929497', marginRight: width / 4 }}>5 </Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#929497', textAlign: 'right', alignSelf: 'flex-end' }}>N500,000 </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Total:  </Text>
                            <Text style={{ fontWeight: 'bold' }}>N750,000</Text>
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
