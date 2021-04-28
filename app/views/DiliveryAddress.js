import React from 'react'
import { View, ImageBackground, ScrollView,Alert,  Dimensions, Image, Platform, TouchableOpacity, FlatList } from 'react-native'
import {   Text, TextInput} from 'react-native-paper';
import styles from '../css/DiliveryAddressCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from './Constant';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, SET_DELIVERY_ADDRESS } from '../redux/constants/index';
import { Container, Content, List, ListItem, Radio } from 'native-base';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class DiliveryAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            is_selected_address: false,
            addressarr: [],
            delivery_type: this.props.route.params.type ?? ''
        }

    }

    componentDidMount() {
        this.getDeliveryAddress();
    }

    getDeliveryAddress() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        console.log('url !!!!!!!!!!!', Constants.customerdelivery + '?customer_id=' + this.props.customer.id)
        fetch(Constants.customerdelivery + '?customer_id=7', postData) //+ this.props.customer.id
            .then(response => response.json())
            .then(async responseJson => {
                console.log('***************@@@@@@@@########### addrez apoi ', responseJson)

                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'success') {
                    let res = responseJson.data;
                    let addressarr = res.map((x, key) => { return { label: x.house_no + ',' + x.street + ',' + x.state.name + ',' + x.country.name, value: x.house_no + ',' + x.street + ',' + x.state.name + ',' + x.country.name } });
                    console.log('addressarr  !!!!!!', addressarr);
                    this.setState({
                        addressarr: addressarr,
                    });
                } else {
                    let message = responseJson.message;
                    Alert.alert('Message', message)
                }
            })
    }
    componentWillReceiveProps() {
        console.log('deliveryAddress deliveryAddress', this.props.deliveryAddress);
        this.getDeliveryAddress();
    }

    selectAddress(value) {
        this.setState({
            is_selected_address: !this.state.is_selected_address
        })
        console.log(' value !!!!!!!!!!!!!!', value);
        this.props.setDeliveryAddress({
            address: value
        })
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('BuyCreateOrder')}
                                onPress={() => this.props.navigation.goBack()}

                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>DELIVERY ADDRESS</Text>
                            </View>

                        </View>
                        <View style={[{}, styles.addressContainer]}>
                            <TouchableOpacity
                            // onPress={() => this.selectAddress(value)}
                            >
                                <View style={[{}, styles.radioFormView]}>

                                    <RadioForm
                                        isSelected={this.state.is_selected_address}
                                        color={'yellow'}
                                        // radio_props={radio_props_payment}
                                        size={5}
                                        buttonColor={'green'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        initial={0}
                                        onPress={(value) => this.selectAddress(value)} //{ this.setState({ value3Index: value }) }
                                    />
                                    {
                                        this.state.addressarr.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={this.state.is_selected_address}
                                                    onPress={(value) => this.selectAddress(value)}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}


                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(value) => this.selectAddress(value)}
                                                    // labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }


                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddDiliveryAddress')}
                        >
                            <View style={[{}, styles.customerContaineraddProductView]}>

                                <Image
                                    source={require('../images/products/circlePlus.png')}
                                />
                                <Text style={[{}, styles.customerContaineraddProductText]}>Add Address</Text>
                            </View>
                        </TouchableOpacity>




                    </View>
                </ScrollView>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.userReducer,
        customer: state.customReducer,
        deliveryAddress: state.deliveryAddressReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        setDeliveryAddress: (value) => dispatch({ type: SET_DELIVERY_ADDRESS, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DiliveryAddress)


