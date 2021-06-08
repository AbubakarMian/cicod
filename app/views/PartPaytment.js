import React from 'react';
import {View,Dimensions, TouchableOpacity, ScrollView,Image  } from 'react-native';
// import { View, Text, Image, TextInput, TouchableOpacity,  Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/PartPaymentCss';
import fontStyles from '../css/FontCss'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
import { Text, TextInput, Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../views/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import CalendarPicker from 'react-native-calendar-picker';

import DateTimePickerModal from "react-native-modal-datetime-picker";
var { width, height } = Dimensions.get('window');

class PartPaytment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            calenderModal: false,
            order_detail: null,
            payment_link: null,
            order_id:0,
            amount_to_pay_now:this.props.route.params.amount_payable,
            total_amount:this.props.route.params.amount_payable,
            balance_amount:0,
            payment_option_selected :'fixed_amount',
            selected_date:'DD-MM-YYY',
            part_payment_balance_due_date:0,
        }
    }
    
    get_order_detail() {
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
        };

        let order_id = this.props.route.params.data.id;
        let url = Constants.orderslist + '/' + order_id
        console.log('---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
        console.log('order url detail ', url);
        console.log('order postData ', postData);
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("order response response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status.toUpperCase() === "SUCCESS") {
                    let data = responseJson.data;
                    this.setState({
                        spinner: false,
                        order_detail: data,
                        order_id:order_id
                    })
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.message
                    console.log('some error',responseJson)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }

    create_order(){

        // part_payment_balance_due_date: this.state.part_payment_balance_due_date //this.state.part_payment_balance_due_date,
        // part_payment_percent:  // this.state.part_payment_percent,
        // part_payment_amount:  // this.state.part_payment_amount,
        let part_payment_percent = 0;
        let part_payment_amount = 0;
        let part_payment_due_date = this.state.part_payment_balance_due_date;

        if(this.state.payment_option_selected == 'fixed_amount'){
            // amount_to_pay_now = this.state.amount_to_pay_now
            part_payment_amount = this.state.amount_to_pay_now;
        }
        else{ //percentage
            part_payment_percent = this.state.amount_to_pay_now;
        }
        
        // part_payment_balance_due_date:  //this.state.part_payment_balance_due_date,
        // part_payment_percent:  // this.state.part_payment_percent,
        // part_payment_amount:  // this.state.part_payment_amount,
        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
            body: JSON.stringify(bodyOrder)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log("create_order_id responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "success") {

                    this.setState({ spinner: false })
                    alert(responseJson.message)
                    let payment_link = responseJson.data.payment_link
                    if(this.state.payment_option_selected == 'Pay Account' || this.state.payment_option_selected == 'Pay Invoice'){
                        alert(responseJson.message)
                        this.props.navigation.navigate('PaymentWeb', { payment_link: payment_link });
                    }
                    else if(this.state.payment_option_selected == 'Part Payment'){

                    }
                    
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

    onSelectPaymentType(item){
        console.log('payment option selected ',item.value)
        this.setState({
            payment_option_selected:item.value
        })
    }
    get_payable_amount(amount_to_pay_now){
        console.log('1111111111111111',this.state.amount_to_pay_now)
        let total_amount = this.state.total_amount
        let balance_amount = 0
        if(this.state.payment_option_selected == 'fixed_amount'){
            // amount_to_pay_now = this.state.amount_to_pay_now
            balance_amount = total_amount - amount_to_pay_now
        }
        else{ //percentage
            console.log('elese hihihihihih')
            // amount_to_pay_now = this.state.amount_to_pay_now
            amount_to_pay_now =  amount_to_pay_now * total_amount *0.01;
            balance_amount = total_amount - amount_to_pay_now
            part_payment_percent = total_amount
        }
            this.setState({
                amount_to_pay_now:amount_to_pay_now,
                balance_amount:balance_amount
            })
        
    }
    setDate (date) {
        console.log('date ',date);
        var month = date.getUTCMonth() + 1; //months from 1-12     
        console.log('month ',month);   
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();    
        let newdate = day + "/" + month + "/" + year;
        let sendDate = year + "/" + month + "/" + day;
        var timestamp = Date.parse(new Date(sendDate));   
        console.log(sendDate + " is: " + timestamp);
        this.setState({
            part_payment_balance_due_date:timestamp,
            calenderModal:false,
            selected_date: newdate,
        })
        console.log('timestamp ',timestamp);
      }

    pay(_that) {
       _that = _that._that;
       let params = _that.props.route.params;
    //    console.log('part paymentr params ',params);
       let order = {};
       if(_that.state.order_detail == null || params.data.id != _that.state.order_id){
        //    order = _that.get_order_detail();
        //    return null;
       }        
    //    order = _that.state.order_detail
    // _that.get_payable_amount()
       
       return (
        <View style={[{ position: 'relative' }, styles.mainView]}>
        <Spinner
            visible={_that.state.Spinner}
            textContent={'Please Wait...'}
            textStyle={{ color: '#fff' }}
            color={'#fff'}
        />
        <Header navigation={_that.props.navigation} />
        <ScrollView>
            <View>
            <View style={[{}, styles.backHeaderRowView]}>
                <TouchableOpacity
                    onPress={() => _that.props.navigation.goBack()}
                >
                    <Icon name="arrow-left" size={25} color="#929497" />
                </TouchableOpacity>
                <View style={[{}, styles.backHeadingView]}>
                    <Text style={[{ color: '#2F2E7C' }, fontStyles.normal15]}>PART PAYMENT</Text>
                </View>
            </View>
            <View style={[{paddingHorizontal:10},styles.balanceHeadingView]}>
                <Text style={[{color:'#929497',alignSelf:'center'},fontStyles.normal15]}>TOTAL AMOUNT</Text>
                <View style={[{backgroundColor:'#DAF8EC'},styles.balanceView]}>
                  <Text style={[{color:'#4E4D4D'},fontStyles.bold25]}>N{params.amount_payable}</Text>
                </View>
                <Text style={[{color:'#929497',fontSize:8}]}>Type of payment</Text>
                <DropDownPicker
                    placeholder="Fixed amount"
                    // items={_that.state.countries_arr}
                    items={[ 
                        {label: 'Fixed amount', value: 'fixed_amount'},
                        {label: 'Percentage', value: 'percentage'},
                    ]}

                    autoScrollToDefaultValue={true}
                    containerStyle={{ height: 50, width: width - 20, alignSelf: 'center' }}
                    style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                    labelStyle={{ color: '#A9A9A9' }}
                    onChangeItem={item => _that.onSelectPaymentType(item)}
                />
                {/* <Text style={{color:'#929497',fontSize:8,marginLeft:10,marginTop:10}}>Amount of pay</Text>                     */}
                <TextInput
                        label="Amount of pay"
                        style={{ backgroundColor: 'transparent', }}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                        onChangeText={amount_to_pay_now => _that.get_payable_amount(amount_to_pay_now)}
                    />
                    <Text style={[{color:'#929497',alignSelf:'center',marginTop:20},fontStyles.normal15]}>Amount to pay now</Text>
                    <View style={[{backgroundColor:'#FFF4F4'},styles.balanceView]}>
                  <Text style={[{color:'#4E4D4D'},fontStyles.bold25]}>N{_that.state.amount_to_pay_now}</Text>
                </View>
                <View style={[{flexDirection:'row',marginTop:20,alignSelf:'center'}]}>
                <Text style={[{color:'#B1272C'},fontStyles.normal15]}>Balance amount of </Text>
                <Text style={[{color:'#B1272C'},fontStyles.bold15]}>N{_that.state.balance_amount} </Text>
                <Text style={[{color:'#B1272C'},fontStyles.normal15]}>is due</Text>
            </View>
            <TouchableOpacity
            onPress={()=>_that.setState({calenderModal:true})}
            style={[{},styles.calandetBtn]}
            >
                <Image
                style={{height:15,width:15,position:'absolute',left:10}}
                source={require('../images/calenderIcon.png')}
                />
                <Text style={[{color:'#909090'},fontStyles.normal12]}>{_that.state.selected_date}</Text>
                <Icon
                style={{position:'absolute',right:10}}
                name={'caret-down'}
                color={'#707070'}
                />
            </TouchableOpacity>
            <View style={[{},styles.btnRow]}>
            <View style={[{},styles.btnColumn]}>
                <TouchableOpacity
                style={[{borderColor:'#B1272C',borderWidth:1},styles.btnTouch]}
                >
                    <Text style={[{color:'#B1272C'},fontStyles.normal15]}>Send Invoice</Text>
                </TouchableOpacity>
            </View>
            <View style={[{},styles.btnColumn]}>
                <TouchableOpacity
                style={[{backgroundColor:'#B1272C',borderColor:'#B1272C',borderWidth:1},styles.btnTouch]}
                >
                    <Text style={[{color:'#fff'},fontStyles.normal15]}>Pay now</Text>
                </TouchableOpacity>
            </View>
            </View>                    
            </View>
           
            </View>
        </ScrollView>
        <DateTimePickerModal
            isVisible={_that.state.calenderModal}
            mode="date"
            date={new Date()}
            onConfirm={(date)=>_that.setDate(date)}
            onCancel={() => _that.setState({ calenderModal: false })}
        />
        <Modal
            visible={false}
            transparent={true}
            
        >
            <TouchableOpacity
                onPress={() => _that.setState({ calenderModal: false })}
            >
                <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: width, height: height / 2, justifyContent: 'center', alignItems: 'center', transparent: false, backgroundColor: '#fff' }}>
                        {/* <CalendarPicker
                            onDateChange={(date)=>_that.setDate(date)}
                            startDate={''}                            
                        /> */}
                        
                    </View>
                </View>
            </TouchableOpacity>
        </Modal> 
    </View>
       );
   }
   
   render() {
       return (
           <this.pay _that={this} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PartPaytment)
