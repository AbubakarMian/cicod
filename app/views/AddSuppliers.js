import React from 'react'
import { View, ImageBackground, ScrollView, Dimensions, Image, Platform, TouchableOpacity, FlatList } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import styles from '../css/AddDiliveryAddressCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from '../views/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, SET_DELIVERY_ADDRESS } from '../redux/constants/index';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class AddSuppliers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            countries_arr: [],
            states_arr: [],
            lgas_arr: [],
            country_id: 0,
            state_id: 0,
            lgas_id: 0,
            lgas_name: '',
            state_name: '',
            country_name: '',
            house_no: '',
            street: '',
            landmark: '',
            is_default: false,
        }

    }

    componentDidMount() {
        this.getCountryList()
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
            country_id: item.value,
            country_name: item.label
        })
        let statesUrl = Constants.stateslist + '?country_id=' + item.value;
        console.log('statesUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', statesUrl)
        this.getStateList(statesUrl);

    }
    onSelectState(item) {
        console.log('state Id !!!!!!!!!!!!!!@@@@@@@@@@@@@', item)
        this.setState({
            state_id: item.value,
            state_name: item.lable
        });
        let lgasUrl = Constants.lgaslist + '?state_id=' + item.value;
        console.log('lgasUrl !!!!!!!!!!!!!!@@@@@@@@@@@@@', lgasUrl)
        this.getLgaList(lgasUrl);

    }
    onSelectLgas(item) {
        this.setState({
            lgas_id: item.value,
            lgas_name: item.lable,
        });
    }

    createDeliveryAddress() {


        if (this.state.street === '') {
            Alert.alert("Warning", "Street Name are required")
            return;
        }
        else if (this.state.house_no === '') {
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
                customer_id: this.props.customer.id,
                country_id: this.state.country_id,
                state_id: this.state.state_id,
                lga_id: this.state.lgas_id,
                house_no: this.state.house_no,
                street: this.state.street,
                landmark: this.state.landmark,
                is_default: this.state.is_default,
            })
        };
        fetch(Constants.customerdelivery, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false })
                if (responseJson.status === "success") {
                    let address = this.state.house_no + ',' + this.state.street + ',' + this.state.landmark + ',' + this.state.state_name + ',' + this.state.country_name;
                    this.props.setDeliveryAddress({
                        address: address
                    })
                    Alert.alert('Message', responseJson.message)
                    this.props.navigation.navigate('CreateOrder', { render: true })
                } else {
                    this.setState({ spinner: false })
                    let message = responseJson.status
                    Alert.alert('Error', message)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }

    render() {
        var radio_props_per = [
            { label: 'Picked up by the supplier', value: 0 },
            { label: 'Delivered to supplier', value: 1 },

        ];
        var radio_props_product = [
            { label: 'All Products', value: 0 },
            { label: 'Some Products', value: 1 },

        ];

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
                                <Text style={[{}, styles.backHeadingText]}>Add SUPPLIER</Text>
                            </View>

                        </View>
                        <View style={[{}, styles.addressContainer]}>
                            <View style={[{ marginTop: 10 }, styles.mainFormView]}>
                                <View>
                                    <TextInput
                                        label="First Name*"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ house_no: text })}
                                    />
                                    <TextInput
                                        label="Last Name*"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ house_no: text })}
                                    />
                                    <TextInput
                                        label="Business Name"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ house_no: text })}
                                    />
                                    <TextInput
                                        label="Email"
                                        style={{ backgroundColor: 'transparent', }}
                                        width={width - 50}
                                        alignSelf={'center'}
                                        color={'#000'}
                                        onChangeText={text => this.setState({ house_no: text })}
                                    />

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <TextInput
                                                label="Phone Number"
                                                style={{ backgroundColor: 'transparent', }}
                                                width={width - 50}
                                                alignSelf={'center'}
                                                color={'#000'}
                                                onChangeText={text => this.setState({ house_no: text })}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TextInput
                                                label="House No.*"
                                                style={{ backgroundColor: 'transparent', }}
                                                width={width - 50}
                                                alignSelf={'center'}
                                                color={'#000'}
                                                onChangeText={text => this.setState({ house_no: text })}
                                            />
                                        </View>

                                    </View>
                                    <TextInput
                                        label="Street*"
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
                                    <View style={[{ flexDirection: 'row' }, styles.formRow]}>
                                        <View style={[{ flex: 1, }, styles.formColumn]}>

                                            <DropDownPicker
                                                items={this.state.countries_arr}
                                                autoScrollToDefaultValue={true}
                                                containerStyle={{ zIndex: 9999, height: 50, width: width / 2 - 20, marginRight: 10, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0, }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start', zIndex: 999
                                                }}
                                                placeholder="Country *"
                                                dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100 }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectCountry(item)}
                                            />
                                        </View>
                                        <View style={[{ flex: 1 }, styles.formColumn]}>
                                            <DropDownPicker
                                                items={this.state.states_arr}
                                                containerStyle={{ height: 50, width: width / 2 - 10, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0 }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start', zIndex: 9999
                                                }}
                                                placeholder="States *"
                                                dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectState(item)}
                                            />
                                        </View>
                                    </View>
                                    <View style={[{ flexDirection: 'row', }, styles.formRow]}>
                                        <View style={[{ flex: 1 }, styles.formColumn]}>
                                            <DropDownPicker
                                                items={this.state.countries_arr}
                                                placeholder="Area *"
                                                autoScrollToDefaultValue={true}
                                                containerStyle={{ height: 50, width: width / 2 - 20, marginRight: 10, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                                                style={{ backgroundColor: '#fff', borderWidth: 0, zIndex: 9999 }}
                                                itemStyle={{
                                                    justifyContent: 'flex-start',
                                                }}
                                                dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100, }}
                                                labelStyle={{ color: '#A9A9A9' }}
                                                onChangeItem={item => this.onSelectCountry(item)}
                                            />
                                        </View>
                                        <View style={[{ flex: 1 }, styles.formColumn]}>
                                        </View>
                                    </View>
                                    <View style={[{}, styles.mainContentView]}>
                                        <View style={[{}, styles.formRow]}>

                                            <RadioForm
                                                formHorizontal={true}
                                                animation={true}
                                                onPress={(index, lable) => this.radioBtnFun(index, lable)}
                                            >
                                                {
                                                    radio_props_per.map((obj, i) => (
                                                        <RadioButton labelHorizontal={true} key={i}
                                                            style={{ zIndex: -0.999, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.value3Index === i ? '#F6EBEB' : '#fff' }}
                                                        >
                                                            <RadioButtonInput
                                                                obj={obj}
                                                                index={i}
                                                                isSelected={this.state.value3Index === i}
                                                                onPress={(index) => this.setState({ value3Index: index })}
                                                                //   onPress={()=>console.log('button input')}
                                                                borderWidth={2}
                                                                buttonInnerColor={'#e74c3c'}
                                                                // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                                buttonSize={7}
                                                                buttonOuterSize={20}
                                                                buttonStyle={{ zIndex: -0.999, }}
                                                                buttonWrapStyle={{ marginLeft: 10 }}
                                                            />
                                                            <RadioButtonLabel
                                                                obj={obj}
                                                                index={i}
                                                                labelHorizontal={true}
                                                                onPress={(index) => this.setState({ value3Index: index })}
                                                                labelStyle={{ fontSize: 12, color: '#000', paddingVertical: 10 }}
                                                                labelWrapStyle={{ marginRight: 10 }}
                                                            />
                                                        </RadioButton>
                                                    ))
                                                }
                                            </RadioForm>

                                        </View>
                                        <View style={[{ flexDirection: 'row', marginVertical: 10 }, styles.formRow]}>
                                            <Text style={{ color: '#929497', fontWeight: 'bold' }}>Supplier picks?</Text>
                                        </View>
                                        <View style={[{}, styles.formRow]}>

                                            <RadioForm
                                                formHorizontal={true}
                                                animation={true}
                                                onPress={(index, lable) => this.radioBtnFun(index, lable)}
                                            >

                                                {
                                                    radio_props_product.map((obj, i) => (
                                                        <RadioButton labelHorizontal={true} key={i}
                                                            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.value3Index === i ? '#F6EBEB' : '#fff' }}

                                                        >

                                                            <RadioButtonInput
                                                                obj={obj}
                                                                index={i}
                                                                isSelected={this.state.value3Index === i}
                                                                onPress={(index) => this.setState({ value3Index: index })}
                                                                //   onPress={()=>console.log('button input')}
                                                                borderWidth={2}
                                                                buttonInnerColor={'#e74c3c'}
                                                                // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                                buttonSize={7}
                                                                buttonOuterSize={20}
                                                                buttonStyle={{}}
                                                                buttonWrapStyle={{ marginLeft: 10 }}
                                                            />
                                                            <RadioButtonLabel
                                                                obj={obj}
                                                                index={i}
                                                                labelHorizontal={true}
                                                                onPress={(index) => this.setState({ value3Index: index })}
                                                                labelStyle={{ fontSize: 12, color: '#000', paddingVertical: 10 }}
                                                                labelWrapStyle={{ marginRight: 10 }}
                                                            />
                                                        </RadioButton>
                                                    ))
                                                }
                                            </RadioForm>

                                        </View>
                                        {/* <DropDownPicker
                                            items={this.state.countries_arr}
                                            placeholder="Country *"
                                            containerStyle={{ height: 50, width: width  - 20, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            itemStyle={{
                                              justifyContent: 'flex-start', zIndex: 0.99
                                            }}
                                            dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                            // autoScrollToDefaultValue={true}
                                            // containerStyle={{ height: 50, width: width - 50, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                                            // style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            // itemStyle={{
                                            //     justifyContent: 'flex-start', zIndex: 0.99
                                            // }}
                                            
                                            // dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100 }}
                                            // labelStyle={{ color: '#A9A9A9', }}
                                            onChangeItem={item => this.onSelectCountry(item)}
                                        /> */}

                                        <TouchableOpacity
                                            onPress={() => this.createDeliveryAddress()}
                                            style={[{ zIndex: -0.999 }, styles.redBtn]}
                                        >
                                            <Text style={{ color: '#fff' }}>Save</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>



                            </View>
                        </View>
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
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        setDeliveryAddress: (value) => dispatch({ type: SET_DELIVERY_ADDRESS, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSuppliers)


