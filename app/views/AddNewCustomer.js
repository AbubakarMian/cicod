import React from 'react'
import { View, ImageBackground, TouchableHighlight, Alert, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Modal, } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import styles from '../css/AddNewCustomerCss';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
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
            first_name: 'Joe',
            last_name: 'Cross',
            customer_code: '',
            phone_number: '09011223344',
            house_no: '3',
            street: 'Gold Street',
            landmark: 'Century',
            email: 'jofedfscsdfvbds@yopmail.com'
        }

    }

    componentDidMount() {
        this.getCountryList()
    }

    ceateCustomer() {
        this.setState({ spinner: true })

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
                } else {
                    // this.setState({ spinner: false })
                    let message = JSON.stringify(responseJson.message)
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

                } else {
                    let message = JSON.stringify(responseJson.error.message)
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
                } else {
                    let message = JSON.stringify(responseJson.error.message)
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
                } else {
                    let message = JSON.stringify(responseJson.error.message)
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
        console.log('states_arr', this.state.states_arr)
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation}/>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Customer')}
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
                                placeholder="First Name*"
                                onChangeText={text => this.setState({ first_name: text })}
                            />
                            <TextInput
                                placeholder="Last Name*"
                                onChangeText={text => this.setState({ last_name: text })}
                            />
                            <TextInput
                                placeholder="Customer Code"
                                onChangeText={text => this.setState({ customer_code: text })}
                            />
                            <TextInput
                                placeholder="Email"
                                onChangeText={text => this.setState({ email: text })}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        keyboardType='numeric'
                                        onChangeText={text => this.setState({ phone_number: text })}
                                        placeholder="Phone Number"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        onChangeText={text => this.setState({ house_no: text })}
                                        placeholder="House No."
                                    />
                                </View>
                            </View>
                            <TextInput
                                placeholder="Street"
                                onChangeText={text => this.setState({ street: text })}
                            />
                            <TextInput
                                placeholder="Landmark"
                                onChangeText={text => this.setState({ landmark: text })}
                            />
                            <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>


                                    {this.state.countries_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.countries_arr}
                                            autoScrollToDefaultValue={true}
                                            containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                            style={{ backgroundColor: '#fff' }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            placeholder="Country *"
                                            dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,paddingBottom:20 }}
                                            labelStyle={{ color: '#A9A9A9', height:30 }}
                                            onChangeItem={item => this.onSelectCountry(item.value)}
                                        />}
                                </View>
                                <View style={[{}, styles.formColumn]}>

                                    {this.state.states_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.states_arr}
                                            containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                            style={{ backgroundColor: '#fff' }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            placeholder="States *"
                                            dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectState(item.value)}
                                        />}
                                </View>
                            </View>
                            <View style={[{ marginTop: 30 }, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
                                    {/* <TextInput
                                        placeholder="LGA*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" /> */}
                                    {this.state.lgas_arr.length < 1 ? null :
                                        <DropDownPicker
                                            items={this.state.lgas_arr}
                                            containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                            style={{ backgroundColor: '#fff' }}
                                            itemStyle={{
                                                justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            placeholder="LGA *"
                                            dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 ,height:height/5}}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            onChangeItem={item => this.onSelectLgas(item.value)}
                                        />}
                                </View>
                                <View style={[{}, styles.formColumn]}>

                                </View>
                            </View>
                            <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
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
                                        style={[{ width: width / 2, }, styles.cheBox]}
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
                                        placeholder="House No.*"
                                        onChangeText={text => this.setState({ delivery_house_no: text })}
                                    />
                                    <TextInput
                                        placeholder="Street*"
                                        onChangeText={text => this.setState({ delivery_street: text })}
                                    />
                                    <TextInput
                                        placeholder="Landmark"
                                        onChangeText={text => this.setState({ delivery_landmark: text })}
                                    />
                                    <View style={[{}, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>
                                            {this.state.countries_arr.length < 1 ? null :
                                                <DropDownPicker
                                                    items={this.state.countries_arr}
                                                    autoScrollToDefaultValue={true}
                                                    containerStyle={{ height: 50, width: width - 28, marginTop: 15 }}
                                                    style={{ backgroundColor: '#fff' }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="Country *"
                                                    dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100 }}
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
                                                    containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                                    style={{ backgroundColor: '#fff' }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="States *"
                                                    dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectState(item.value)}
                                                />}
                                        </View>
                                        <View style={[{}, styles.formColumn]}>
                                            {this.state.lgas_arr.length < 1 ? null :
                                                <DropDownPicker
                                                    items={this.state.lgas_arr}
                                                    containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                                    style={{ backgroundColor: '#fff' }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="LGA *"
                                                    dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
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
