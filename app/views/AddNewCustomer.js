import React from 'react'
import { View, ImageBackground, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Modal, } from 'react-native'
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
            lgas_id: 0,
            delivery_lgas_id: 0,
            state_id: 0,
            delivery_state_id: 0,
            country_id: 0,
            delivery_country_id: 0,
            delivery_house_no: '',
            delivery_street: '',
            delivery_landmark: '',
            is_default: false,
            isFreeDelivery: false,
            isFreeVAT: false,
            is_same_as_customer: true,
            first_name:'',
            last_name:'',
            customer_code:'',
            phone_number:0,
            house_no:'',
            street:'',
            landmark:'',
        }

    }

    componentDidMount() {
        this.getCountryList()
    }

    ceateCustomer() {
        this.setState({ spinner: true })
        var formData = new FormData();
        formData.append('first_name', this.state.first_name); // required
        formData.append('last_name', this.state.last_name);// required
        formData.append('email', this.state.tenantId);
        formData.append('phone	', this.state.tenantId);
        formData.append('country_id', this.state.tenantId); // required
        formData.append('state_id', this.state.tenantId); // required
        formData.append('lga_id', this.state.tenantId);
        formData.append('house_no', this.state.tenantId);
        formData.append('street', this.state.tenantId);
        formData.append('landmark', this.state.tenantId);
        formData.append('enable_free_vat', this.state.tenantId); // boolean
        formData.append('enable_free_delivery', this.state.tenantId); // boolean

        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Constants.autherizationKey,
                'Authorization-Secure': Constants.autherizationKey,
                // this.props.user.access_token,
            },
            body: JSON.stringify({
                username: this.state.username,//cicodsandbox@yopmail.com
                password: this.state.password,//Sandbox@123
                tenantId: this.state.tenantId//sandbox
            })
        };
        fetch(Constants.login, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" create customer response !!!!!!!!!!!", responseJson)

                this.setState({ spinner: false })
                if (responseJson.status === "SUCCESS") {

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
    createCustomerDelivery() {
        this.setState({ spinner: true })
        var formData = new FormData();
        formData.append('customer_id', this.state.username); // required
        formData.append('country_id', this.state.delivery_country_id);// required
        formData.append('state_id', this.state.delivery_state_id);
        formData.append('lga_id	', this.state.delivery_lgas_id);
        formData.append('house_no', this.state.delivery_house_no); // required
        formData.append('street', this.state.delivery_street); // required
        formData.append('landmark', this.state.tenantId);
        formData.append('is_default', this.state.tenantId);

        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Constants.autherizationKey,
                'Authorization-Secure': Constants.autherizationKey,
                // this.props.user.access_token,
            },
            body: JSON.stringify({
                username: this.state.username,//cicodsandbox@yopmail.com
                password: this.state.password,//Sandbox@123
                tenantId: this.state.tenantId//sandbox
            })
        };
        fetch(Constants.login, postData)
            .then(response => response.json())
            .then(async responseJson => {
                // console.log("!!!!!!!!!!!",responseJson)
                if (responseJson.status === "SUCCESS") {
                    // console.log("!!!!!!!!!!!",responseJson)
                    // console.log("!!!!!!!!!!!",responseJson.user.token)
                    this.props.setUser({
                        firstname: responseJson.user.firstname,
                        lastname: responseJson.user.lastname,
                        email: responseJson.user.email,
                        phone: responseJson.user.phone,
                        access_token: "Bearer fPw9BRvnBQeDw5E2pAwu" + responseJson.token
                    });
                    this.setState({ spinner: false })
                    this.props.navigation.navigate('Home')
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
                <Header />
                <Spinner
                    visible={this.state.Spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity>
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
                                            dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100 }}
                                            labelStyle={{ color: '#A9A9A9' }}
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
                                            dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
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
                                    />
                                    <TextInput
                                        placeholder="Street*"
                                    />
                                    <TextInput
                                        placeholder="Landmark"
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
