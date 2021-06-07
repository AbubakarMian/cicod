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
var { width, height } = Dimensions.get('window');

class PartPaytment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            calenderModal: false,
        }
    }
    render() {
        return (

            <View style={[{ position: 'relative' }, styles.mainView]}>
                <Spinner
                    visible={this.state.Spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <Header navigation={this.props.navigation} />
                <ScrollView>
                    <View>
                    <View style={[{}, styles.backHeaderRowView]}>
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('Order')}
                            onPress={() => this.props.navigation.goBack()}
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
                          <Text style={[{color:'#4E4D4D'},fontStyles.bold25]}>N1,612,500.00</Text>
                        </View>
                        <Text style={[{color:'#929497',fontSize:8}]}>Type of payment</Text>
                        <DropDownPicker
                            placeholder="Fixed amount"
                            // items={this.state.countries_arr}
                            items={[
                                {label: 'Item 1', value: 'item1'},
                                {label: 'Item 2', value: 'item2'},
                            ]}

                            autoScrollToDefaultValue={true}
                            containerStyle={{ height: 50, width: width - 20, alignSelf: 'center' }}
                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, opacity: 1, }}
                            labelStyle={{ color: '#A9A9A9' }}
                            onChangeItem={item => this.onSelectCountry(item)}
                        />
                        <Text style={{color:'#929497',fontSize:8,marginLeft:10,marginTop:10}}>Amount of pay</Text>                    
                        <TextInput
                                label="1,000,000"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ street: text })}
                            />
                            <Text style={[{color:'#929497',alignSelf:'center',marginTop:20},fontStyles.normal15]}>Amount to pay now</Text>
                            <View style={[{backgroundColor:'#FFF4F4'},styles.balanceView]}>
                          <Text style={[{color:'#4E4D4D'},fontStyles.bold25]}>N1,000,000.00</Text>
                        </View>
                        <View style={[{flexDirection:'row',marginTop:20,alignSelf:'center'}]}>
                        <Text style={[{color:'#B1272C'},fontStyles.normal15]}>Balance amount of </Text>
                        <Text style={[{color:'#B1272C'},fontStyles.bold15]}>N612,500.00 </Text>
                        <Text style={[{color:'#B1272C'},fontStyles.normal15]}>is due</Text>
                    </View>
                    <TouchableOpacity
                    onPress={()=>this.setState({calenderModal:true})}
                    style={[{},styles.calandetBtn]}
                    >
                        <Image
                        style={{height:15,width:15,position:'absolute',left:10}}
                        source={require('../images/calenderIcon.png')}
                        />
                        <Text style={[{color:'#909090'},fontStyles.normal12]}>DD-MM-YYY</Text>
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
                <Modal
                    visible={this.state.calenderModal}
                    transparent={true}
                    
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ calenderModal: false })}
                    >
                        <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: width, height: height / 2, justifyContent: 'center', alignItems: 'center', transparent: false, backgroundColor: '#fff' }}>
                                <CalendarPicker
                                    onDateChange={this.onDateChange}
                                    startDate={''}
                                />
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
