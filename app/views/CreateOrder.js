import React from 'react'
import { View, ImageBackground, ScrollView, Text, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CreateOrderCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            value3Index: 0
        }
    }

    componentWillReceiveProps() {
        console.log(' componentWillReceiveProps CreateOrder', this.props.route)
        let customer_data = this.props.route.params.customer_data;

        this.setState({
            customer_name: customer_data.customer_name,
            customer_email: customer_data.customer_email,
            customer_phone: customer_data.customer_phone
        })
    }

    createOrder() {
        this.setState({ spinner: true })

        if (this.state.name === '' || this.state.price === '') {
            this.setState({ spinner: false })
            Alert.alert("Warning", "Product name and Price are required")
            return;
        }
        else {


            let postData = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.user.access_token,
                },
                body: JSON.stringify({
                    customer_name: this.state.category_id,//required
                    customer_phone: this.state.name,//required
                    customer_email: this.state.quantity,//sandbox
                    products: this.state.code,
                    delivery_type: this.state.price,// required
                    delivery_address: this.state.description,
                    payment_mode: this.state.validity,//required
                    country_id: this.state.is_qty_limit,
                    state_id: this.state.state_id,
                    lga_id: this.state.image,
                    note: this.state.is_web_shop,
                    discount_amount: this.state.is_web_shop,
                    discount_percent: this.state.is_web_shop,
                })
            };
            fetch(Constants.orderslist, postData)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log(" create customer response !!!!!!!!!!!", responseJson)

                    this.setState({ spinner: false })
                    if (responseJson.status === "success") {
                        Alert.alert('MESSAGE', responseJson.message)
                        let customer_id = responseJson.data.id;
                        // this.createCustomerDelivery(customer_id);
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
    }

    render() {
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'Pickup', value: 1 },
        ];
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },
            { label: 'Part Payment', value: 3 },
        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation}/>
                
        
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
