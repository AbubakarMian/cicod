import React from 'react';
import { View, Image, TouchableOpacity, Dimensions,FlatList, Touchable, ScrollView,Alert } from 'react-native';
import { Text, TextInput,Modal } from 'react-native-paper';
import styles from '../css/OrderDetail_pendingCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, ORDER_RELOAD } from '../redux/constants/index';
import { Constants } from './Constant';

var { width, height } = Dimensions.get('window');

class OrderDetail_pending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            order_id:  0,
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
            currency: '',
            supendModal:false,
            bodyOrder:{},
            amount_paid_from_credit_limit: '',
            order_detail_url:'',
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
    get_order_detail() {
        let order_id = this.props.route.params.id;
        let order_detail_url = Constants.orderslist + '/' + order_id
       
        if(this.state.order_id == order_id){
            return;            
        }
        this.setState({
            order_detail_url:order_detail_url,
            order_id:order_id
        })
        console.log('KKKKKKKKKKK',order_id)
        this.setState({ Spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        console.log('urllllllllllll',Constants.orderslist + '/' + order_id)
       
        fetch(order_detail_url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    Spinner: false,
                });
                console.log('data data data res res res  order detail', responseJson.data)
                if (responseJson.status === 'success') {
                    if (responseJson.message == "Order not found") {
                        // this.props.navigation.goBack();
                        this.props.navigation.navigate('Order')
                        Alert.alert('Message', responseJson.message)
                        return
                    }
                    let total_ammount = 0;
                    let product_items = responseJson.data.items;

                    for (let i = 0; product_items.length > i; i++) {
                        total_ammount = total_ammount + (product_items[i].price * product_items[i].quantity);
                    }
                    let resdata = responseJson.data;
                    this.setState({
                        pending_order_res: responseJson,
                        data: resdata,
                        cicod_order_id: resdata.cicod_order_id,
                        delivery_type: resdata.delivery_type,
                        payment_mode: resdata.payment_mode,
                        order_status: resdata.order_status,
                        payment_status: resdata.payment_status,
                        ticket_id: resdata.ticket_id,
                        created_by: resdata.created_by,
                        payment_date: resdata.payment_date,
                        currency: resdata.currency,
                        item: product_items,
                        total_amount: total_ammount,
                        amount_paid_from_credit_limit: resdata.amount_paid_from_credit_limit,
                        bodyOrder:{
                            customer_name: resdata.customer.name,
                            customer_phone: resdata.customer.phone, //this.state.customer_phone,//required
                            customer_email: resdata.customer.email,//this.state.customer_email,
                            products:  resdata.items,//[]
                            delivery_type:resdata.delivery_type,//dilevery_type,?? 'PICKUP'
                            delivery_address: resdata.customer.address ?? '',
                            payment_mode: resdata.payment_mode, //required
                            amount: resdata.amount, //required
                            country_id: resdata.customer.country_id,
                            state_id: resdata.customer.state_id,
                            lga_id: resdata.customer.lga_id,
                            note: resdata.note ?? '',
                            discount_amount: resdata.discount_amount,
                            discount_percent: resdata.discount_percent,
                            accept_multiple_part_payment: resdata.is_part_payment,
                        }
                    })
                    console.log("%%%%%%%%%% bodyOrder bodyOrder bodyOrder~~~~~~~~~~~~~~~",this.state.data)
                  

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
                    // console.log('data data data res res res ', responseJson)
                    Alert.alert('Success', responseJson.message)
                    // this.props.navigation.navigate('DrawerNavigation')
                } else {
                    // let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', responseJson.message)
                }
            })

    }
    pay(){
        let bodyOrder = this.state.bodyOrder;
        let payment_mode = bodyOrder.payment_mode;
        let amount_payable = 0;
        // console.log('CCCCCCCCCCCCCCCC',this.state.pending_order_res.data.balance_part_payment[0])
        // return;
        if(this.state.pending_order_res.data.balance_part_payment.length == 0 ){
            amount_payable = this.state.bodyOrder.amount; // amount_payable not available,bodyOrder.amount
        }
        else{
            amount_payable = this.state.pending_order_res.data.balance_part_payment[0].amount; // amount_payable not available,bodyOrder.amount
        }
        let order_id = order_id; // this.props.route.params.id
        
        this.props.navigation.navigate('MakePayment',{
            bodyOrder,
            payment_mode,
            amount_payable,
            pending_order_res:this.state.pending_order_res
          
    })
    }
    cancelOrder(){
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
        };

        // https://com.cicodsaasstaging.com/com/api/orders/179?action=cancel_order
        let order_id = this.props.route.params.id;
        let url = Constants.orderslist + '/' + order_id+'?action=cancel_order'
        console.log('order postData ', postData);
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("order response response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status.toUpperCase() === "SUCCESS") {
                    Alert.alert('Message',responseJson.message);
                    this.props.setScreenReload({
                        reload:true
                    })
                    this.props.navigation.navigate('Order')
                    // this.props.navigation.goBack();
                    // let payment_link = responseJson.data.payment_link
                    // this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.message
                    console.log('some error', responseJson)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }
    send_order_confirmation(){
        let url=Constants.orderslist+"/"+this.state.order_id+"?action=send_invoice";
        console.log()
          let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
            // body: JSON.stringify(bodyOrder)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("~~~~~~~~~~~~~~~~~~create_order_id responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "success") {

                    Alert.alert('Message',responseJson.message);
                    
                }
                else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.message
                    alert(message)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }
    go_back_btn(){
        console.log('go back btn');
        this.props.setScreenReload({reload:true});
        this.props.navigation.navigate('Order')
    }
    render() {
        this.get_order_detail()
      
        return (
            <View style={{height:height,width:width,backgroundColor:'#fff'}}>
            <ScrollView>
                <View style={[{backgroundColor:'red'}, styles.mainView]}>
                    <Header navigation={this.props.navigation} />
                    <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.goBack()}
                        onPress={() => this.go_back_btn()}
                    >
                        <View style={[{alignItems:'center'}, styles.headingRow]}>
                            <Icon name="arrow-left" size={25} color="#929497" />
                            {/* <Text style={[{color:'#2F2E7C',fontWeight:'700',marginLeft:10,}fontStyles.normal15]}>ORDER DETAIL</Text> */}
                            <Text style={[{color:'#2F2E7C',fontWeight:'700',marginLeft:10,},fontStyles.normal15]}>ORDER DETAILS</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[{}, styles.textInputView]}>
                        <Text style={{ color: '#aaa' }}>CICOD Order ID</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.data.cicod_order_id}</Text>
                        <View style={[{flexDirection:'row',width:width-20,alignSelf:'center'}]}>
                        <TouchableOpacity
                            // onPress={() => this.ReciptResend()}
                            onPress={()=>this.pay()}
                            style={[{}, styles.btnContinuueView]}>
                            <Text style={{ color: '#FFFFFF' }}>Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.ReciptResend()}
                            onPress={()=>this.send_order_confirmation()}
                            style={[{}, styles.btnSend]}>
                            <Text style={{ color: '#B1272C' }}>Send order confirmation</Text>
                        </TouchableOpacity>
                        
                        </View>
                        <TouchableOpacity 
                        onPress={()=>this.setState({supendModal:true})}
                        style={[{position:'absolute',top:0,right:0,paddingVertical:10,paddingHorizontal:10}]}>
                            <Icon
                            name="ellipsis-h"
                            color={'#929497'}
                            size={20}
                            />
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
                                <Text style={[{}, styles.detailColumn2text]}>{this.state.data.delivery_address ?? '--'}</Text>
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
                                <Text style={[{ fontWeight: 'bold' }, styles.detailInvoiceDarkGraytext]}>{"PCIN  "+this.state.data.cicod_order_id}</Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                        <FlatList
                        data={this.state.item}
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
                            
                            <View style={{}, styles.invoiceRow}>
                                <View style={{ flexDirection: 'column', width: width - 50 }}>
                                    <Text style={[{}, styles.detailInvoiceLable]}>{item.name}</Text>
                                    {/* <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text> */}
                                    <View style={{ flexDirection: 'row',position:'relative' }}>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>Unit Price: </Text>
                                        <Text style={{ fontSize: 13, color: '#929497', textAlign: 'right', }}>{item.price} </Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>QTY: </Text>
                                        <Text style={{ fontSize: 13, color: '#929497', marginRight: width / 4,textAlign: 'right', }}>{item.quantity} </Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497', textAlign: 'right', alignSelf: 'flex-end',position:'absolute',right:5 }}>{this.state.currency+" "+ this.state.total_amount}</Text>
                                   
                                    </View>
                                </View>
                           
                           </View>
                        )}
                       />
                       </View>
                        <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row' }}>
                        
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>Total:  </Text>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}> {this.state.currency +" "+ this.state.total_amount}</Text>
                        </View>
                        <View style={[{flexDirection:'row',width:width-20,alignSelf:'center'}]}>
                        <TouchableOpacity
                            onPress={() => this.pay()}
                            style={[{}, styles.btnContinuueView]}>
                            <Text style={{ color: '#FFFFFF' }}>Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.ReciptResend()}
                            style={[{}, styles.btnSend]}>
                            <Text style={{ color: '#B1272C' }}>Send order confirmation</Text>
                        </TouchableOpacity>
                        
                        </View>

                    </View>
                    <View style={[{},styles.noteView]}>
                        <Text style={[{color:'#929497',marginLeft:10,marginBottom:10},fontStyles.bold15]}>Notes</Text>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6'}}></View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingVertical:20}}>
                            <Image
                            style={{height:width/6,width:width/6}} 
                            source={require('../images/Order/note.png')}
                            />
                            <Text style={[{color:'#929497'},fontStyles.normal15]}>No note found</Text>
                        </View> 
                    </View>
                  
                </View>
            </ScrollView>
            <Modal
                    visible={this.state.supendModal}
                     
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ supendModal: false })}
                    >
                        <View style={[{zIndex:0.9999}, styles.suspendmodalBackGround]}>
                            <View style={[{ flexDirection: 'column', alignSelf: 'baseline' }, styles.suspendTouch]}>
                                {/* <TouchableOpacity
                                    onPress={() => this.updateProductFun()}
                                    style={[{ flexDirection: 'row' },]}>
                                    <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} /> 
                                    <Icon name="edit" color={'gray'} size={20} style={[{}, styles.banImage]} />
                                    <Text style={{}}>Update</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => this.cancelOrder()}
                                    style={[{ flexDirection: 'row', marginVertical: 10,paddingBottom:30 },]}>
                                    <Image source={require('../images/ban.png')} style={[{}, styles.banImage]} />
                                    <Text>Cancel</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableOpacity>

                </Modal>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.userReducer,
        currency: state.currencyReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        setScreenReload: (value) => dispatch({ type: ORDER_RELOAD, value: value }),
        setScreenReload: (value) => dispatch({ type: ORDER_RELOAD, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail_pending)
