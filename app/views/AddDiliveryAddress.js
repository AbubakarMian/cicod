import React from 'react'
import { View, ImageBackground, ScrollView, Text, Alert, TextInput, Dimensions, Image, Platform, TouchableOpacity, FlatList } from 'react-native'
import styles from '../css/AddDiliveryAddressCss'
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
class AddDiliveryAddress extends React.Component {
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
                                onPress={() => this.props.navigation.navigate('BuyCreateOrder')}

                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>Add DELIVERY ADDRESS</Text>
                            </View>

                        </View>
                        <View style={[{}, styles.addressContainer]}>
                            <View style={[{ marginTop: 10 }, styles.mainFormView]}>




                                <View>
                                    <TextInput
                                        placeholder="House No.*"
                                        onChangeText={text => this.setState({ house_no: text })}
                                    />
                                    <TextInput
                                        placeholder="Street*"
                                        onChangeText={text => this.setState({ street: text })}
                                    />
                                    <TextInput
                                        placeholder="Landmark"
                                        onChangeText={text => this.setState({ landmark: text })}
                                    />
                                    <View style={[{}, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>

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
                                                onChangeItem={item => this.onSelectCountry(item)}
                                            />
                                        </View>

                                    </View>
                                    <View style={[{ flexDirection: 'row' }, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>

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
                                                onChangeItem={item => this.onSelectState(item)}
                                            />
                                        </View>
                                        <View style={[{}, styles.formColumn]}>

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
                                                onChangeItem={item => this.onSelectLgas(item)}
                                            />
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

                                <TouchableOpacity
                                    onPress={() => this.createDeliveryAddress()}
                                    style={[{}, styles.redBtn]}
                                >
                                    <Text style={{ color: '#fff' }}>Save</Text>
                                </TouchableOpacity>

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
export default connect(mapStateToProps, mapDispatchToProps)(AddDiliveryAddress)


