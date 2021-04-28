import React from 'react'
import { View, ImageBackground, TouchableHighlight, FlatList, Alert, Dimensions, Image, Platform, TouchableOpacity, Modal, } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import styles from '../css/AddNewCustomerCss';
import fontStyles from '../css/FontCss'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
import { Text, TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class AddNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            complainModal: true,
            spinner: false,
            countries_arr: [],
            states_arr: [],
            lgas_arr: [],
            lgas_id: 772,
            delivery_lgas_id: 0,
            state_id: 36,
            delivery_state_id: 0,
            country_id: 3,
            delivery_country_id: 0,
            delivery_house_no: '',
            delivery_street: '',
            delivery_landmark: '',
            is_default: false,
            isFreeDelivery: false,
            isFreeVAT: false,
            is_same_as_customer: true,
            first_name: '',
            last_name: '',
            customer_code: '',
            phone_number: '',
            house_no: '',
            street: '',
            landmark: '',
            email: '',

        }

    }

    componentDidMount() {
        this.getCountryList()
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    ceateCustomer() {


        if (this.state.first_name === '' && this.state.last_name === '') {
            Alert.alert("Warning", "First name and Last Name are required")
            return;
        }
        else if (this.state.country_id === '' && this.state.delivery_country_id === '' && this.state.delivery_state_id === '' && this.state.state_id === '') {
            Alert.alert("Warning", "Country and State are required")
            return;
        }
        else if (this.state.house_no == '' && this.state.delivery_house_no == '') {
            Alert.alert("Warning", "House No required")
            return;
        }
        this.setState({ spinner: true })
        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token,
            },
            body: JSON.stringify({
                username: this.state.username,//cicodsandbox@yopmail.com
                password: this.state.password,//Sandbox@123
                tenantId: this.state.tenantId,//sandbox
                first_name: this.state.first_name, // required
                last_name: this.state.last_name,// required
                email: this.state.email,
                phone: this.state.phone_number,
                country_id: this.state.country_id, // required
                state_id: this.state.state_id, // required
                lga_id: this.state.lgas_id,
                house_no: this.state.house_no,
                street: this.state.street,
                landmark: this.state.landmark,
                enable_free_vat: this.state.isFreeVAT,// boolean
                enable_free_delivery: this.state.isFreeDelivery, // boolean
            })
        };
        fetch(Constants.customerlist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" create customer response !!!!!!!!!!!", responseJson)

                this.setState({ spinner: false })
                if (responseJson.status === "success") {
                    Alert.alert('MESSAGE', responseJson.message)
                    let customer_id = responseJson.data.id;
                    this.createCustomerDelivery(customer_id);
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
                // Alert.alert(error.message);
            });
    }
    createCustomerDelivery(customer_id) {
        this.setState({ spinner: true })


        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token,
            },
            body: JSON.stringify({
                customer_id: customer_id,
                country_id: this.state.delivery_country_id ?? this.state.country_id,
                state_id: this.state.delivery_state_id ?? this.state.state_id,
                lga_id: this.state.delivery_lgas_id ?? this.state.lgas_id,
                house_no: this.state.delivery_house_no ?? this.state.house_no,
                street: this.state.delivery_street ?? this.state.street,
                landmark: this.state.delivery_landmark ?? this.state.landmark,
                is_default: this.state.is_default,
            })
        };
        fetch(Constants.customerdelivery, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" delivery customer response!!!!!!!!!!!", responseJson)
                this.setState({ spinner: false })
                if (responseJson.status === "success") {

                } else {
                    this.setState({ spinner: false })
                    // this.setState({ spinner: false })
                    let message = JSON.stringify(responseJson.status)
                    Alert.alert('Error', message)
                    this.refs.PopUp.setModal(true, responseJson.status);
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }
    getCountryList() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.countrieslist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson', responseJson);
                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'success') {
                    let res = responseJson.data;
                    let countries_arr = res.map((x, key) => { return { label: x.name, value: x.id } });
                    console.log('countries_arr  !!!!!!', countries_arr);
                    this.setState({
                        countries_arr: countries_arr,
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

    getStateList(url) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson states !!!!!!@@@@@@@', responseJson);
                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'success') {

                    let res = responseJson.data;
                    let states_arr = res.map((x, key) => { return { label: x.name, value: x.id } });
                    console.log('states_arr  name name name !!!!!!', states_arr);
                    this.setState({
                        states_arr: states_arr,
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

    getLgaList(url) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson states !!!!!!@@@@@@@', responseJson);
                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'success') {

                    let res = responseJson.data;
                    let lgas_arr = res.map((x, key) => { return { label: x.name, value: x.id } });
                    console.log('lgas_arr  name name name !!!!!!', lgas_arr);
                    this.setState({
                        lgas_arr: lgas_arr,
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

    onSelectCountry(item) {
        console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item)
        this.setState({
            country_id: item
        })
        let statesUrl = Constants.stateslist + '?country_id=' + item;
        console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl)
        this.getStateList(statesUrl);

    }
    onSelectState(item) {
        console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item)
        this.setState({
            state_id: item
        });
        let lgasUrl = Constants.lgaslist + '?state_id=' + item;
        console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl)
        this.getLgaList(lgasUrl);

    }
    onSelectLgas(item) {
        this.setState({
            lgas_id: item
        });
    }
    onDeliverySelectCountry(item) {
        console.log('country Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item)
        this.setState({
            delivery_country_id: item
        })
        let statesUrl = Constants.stateslist + '?country_id=' + item;
        console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl)
        this.getStateList(statesUrl);

    }
    onDeliverySelectState(item) {
        console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item)
        this.setState({
            delivery_state_id: item
        });
        let lgasUrl = Constants.lgaslist + '?state_id=' + item;
        console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl)
        this.getLgaList(lgasUrl);

    }
    onDeliverySelectLgas(item) {
        this.setState({
            delivery_lgas_id: item
        });
    }
    // customerlist
    render() {
        console.log('countries_arr countries_arr countries_arr', this.state.countries_arr)
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('Customer')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color={'#929497'} />
                    </TouchableOpacity>
                    <View style={[{}, styles.backRowHeadingView]}>
                        <Text style={[{}, styles.backRowHeadingText]}>ADD NEW CUSTOMER</Text>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.mainFormView]}>
                            <TextInput
                                label="First Name*"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ first_name: text })}
                            />
                            <TextInput
                                label="Last Name*"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ last_name: text })}
                            />
                            <TextInput
                                label="Customer Code"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ customer_code: text })}
                            />
                            <TextInput
                                label="Email"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ email: text })}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, }}>
                                    <TextInput
                                        keyboardType='numeric'
                                        onChangeText={text => this.setState({ phone_number: text })}
                                        label="Phone Number"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width / 2 - 20}
                                        alignSelf={'center'}
                                        color={'#000'}
                                    />
                                </View>
                                <View style={{ flex: 1, marginHorizontal: 5 }}>
                                    <TextInput
                                        onChangeText={text => this.setState({ house_no: text })}
                                        label="House No."
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width / 2 - 20}
                                        alignSelf={'center'}
                                        color={'#000'}
                                    />
                                </View>
                            </View>
                            <TextInput
                                label="Street"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ street: text })}
                            />
                            <TextInput
                                label="Landmark"
                                style={{ backgroundColor: 'transparent', }}
                                width={width - 50}
                                alignSelf={'center'}
                                color={'#000'}
                                onChangeText={text => this.setState({ landmark: text })}
                            />
                            <View style={[{}, styles.formRow]}>
                                <View style={[{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }, styles.formColumn]}>


                                    {this.state.countries_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.countries_arr}
                                            containerStyle={{ height: 50, width: width / 2 - 10, }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            itemStyle={{
                                                justifyContent: 'flex-start',
                                            }}
                                            placeholder="Country *"
                                            dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectCountry(item.value)}  //this.onSelectCountry(item.value)}


                                        />}
                                </View>
                                <View style={[{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }, styles.formColumn]}>

                                    {this.state.states_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.states_arr}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.999
                                            }}
                                            placeholder="States *"
                                            containerStyle={{ height: 50, width: width / 2 - 10, }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onDeliverySelectState(item.value)}
                                        />}
                                </View>
                            </View>
                            <View style={[{ marginTop: 10, }, styles.formRow]}>
                                <View style={[{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }, styles.formColumn]}>
                                    {/* <TextInput
                                        placeholder="LGA*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" /> */}
                                    {this.state.lgas_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.lgas_arr}
                                            placeholder="LGA *"
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999999 }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            
                                            labelStyle={{ color: '#A9A9A9' }}
                                            containerStyle={{ height: 50, width: width / 2 - 10, }}
                                            dropDownStyle={{ zIndex: 99999999, height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectLgas(item.value)}
                                        />}
                                </View>
                                <View style={[{}, styles.formColumn]}>

                                </View>
                            </View>
                            <View style={[{ zIndex: -0.99999 }, styles.formRow]}>
                                <View style={[{ zIndex: -0.99999 }, styles.formColumn]}>
                                    <CheckBox
                                        style={[{ width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isFreeDelivery: !this.state.isFreeDelivery
                                            })
                                        }}
                                        isChecked={this.state.isFreeDelivery}
                                        rightText={"Enable Free Delivery"}

                                    />
                                </View>
                                <View style={[{}, styles.formColumn]}>
                                    <CheckBox
                                        style={[{ width: width / 2, zIndex: -99999 }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isFreeVAT: !this.state.isFreeVAT
                                            })
                                        }}
                                        size={2}
                                        isChecked={this.state.isFreeVAT}
                                        rightText={"Enable VAT Exemption"}

                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[{ marginTop: 10 }, styles.mainFormView]}>
                            <Text style={{ color: '#929497', fontWeight: 'bold' }}>Delivery Address</Text>

                            <View>
                                <CheckBox
                                    style={[{ width: width, }, styles.cheBox]}
                                    onClick={() => {
                                        this.setState({
                                            is_same_as_customer: !this.state.is_same_as_customer
                                        })
                                    }}
                                    size={2}
                                    isChecked={this.state.is_same_as_customer}
                                    rightText={"Same as customer’s address"}

                                />
                            </View>
                            {(this.state.is_same_as_customer == false) ?
                                <View>
                                    <TextInput
                                        label="House No.*"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ delivery_house_no: text })}
                                    />
                                    <TextInput
                                        label="Street*"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ delivery_street: text })}
                                    />
                                    <TextInput
                                        label="Landmark"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ delivery_landmark: text })}
                                    />
                                    <View style={[{}, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>
                                            {this.state.countries_arr.length < 1 ? null :
                                                <DropDownPicker
                                                    items={this.state.countries_arr}
                                                    autoScrollToDefaultValue={true}
                                                    style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999999 }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="Country *"
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    containerStyle={{ height: 50, width: width - 20,alignSelf:'center' }}
                                                    dropDownStyle={{ zIndex: 99999999, height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectCountry(item.value)}
                                                />}
                                        </View>

                                    </View>
                                    <View style={[{}, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>
                                            {this.state.states_arr.length < 1 ? null :
                                                <DropDownPicker
                                                    items={this.state.states_arr}
                                                    placeholder="State*"
                                                    style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999999 }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    containerStyle={{ height: 50, width: width / 2 - 10, }}
                                                    dropDownStyle={{ zIndex: 99999999, height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectState(item.value)}
                                                />}
                                        </View>
                                        <View style={[{}, styles.formColumn]}>
                                            {this.state.lgas_arr.length < 1 ? null :
                                                <DropDownPicker
                                                    items={this.state.lgas_arr}
                                                    placeholder="LGA *"
                                                    style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, zIndex: 9999999 }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    containerStyle={{ height: 50, width: width / 2 - 10, }}
                                                    dropDownStyle={{ zIndex: 99999999, height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectLgas(item.value)}
                                                />}
                                        </View>
                                    </View>
                                    <View>
                                        <CheckBox
                                            style={[{ width: width, }, styles.cheBox]}
                                            onClick={() => {
                                                this.setState({
                                                    is_default: !this.state.is_default
                                                })
                                            }}
                                            size={2}
                                            isChecked={this.state.is_default}
                                            rightText={"Set as default"}

                                        />
                                    </View>
                                </View>
                                : null}
                            <TouchableOpacity
                                onPress={() => this.ceateCustomer()}
                                style={[{}, styles.redTouchView]}
                            >
                                <Text style={{ color: '#fff' }}>Save</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>



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
export default connect(mapStateToProps, mapDispatchToProps)(AddNewCustomer)
