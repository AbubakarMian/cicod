import React from 'react';
import { View, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/LoginCss';
import fontStyles from '../css/FontCss'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER,CLEAR_ORDER,RESET,SET_CURRENCY } from '../redux/constants/index';
import { Constants } from '../views/Constant';
import { Text, TextInput, Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


var { width, height } = Dimensions.get('window');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            tenantId: 'ndanitv',// rico  
            username: 'ndanitv@sharklasers.com',// rico@yopmail.com  
            password: 'Ndanitv@123456',// @Ecomax1759 
            isChecked: false,
            hide_password: true,
            domain_text_color: 'black',
            rememberIsChecked: false
        }
    }
    async componentDidMount() {
        let remember_credentials = await AsyncStorage.getItem('remember_credentials');
        console.log('remember_credentials', remember_credentials);
        if (remember_credentials === 'true') {
            let user_credentials = await AsyncStorage.getItem('user_credentials');
            user_credentials = JSON.parse(user_credentials);
            console.log('user_credentials', user_credentials);
            console.log('username', user_credentials.username);

            this.setState({
                username: user_credentials.username,
                password: user_credentials.password,
                tenantId: user_credentials.tenantId,
                rememberIsChecked: true
            })
        }        
    }
    resetReducer(){
        this.props.emptyOrder();
        this.props.resetDeliveryAddress();
        this.props.resetCustomer();
        this.props.resetSupplier();
    }
    login() {
        console.log("Login Login Login ")
        this.resetReducer();
        if (this.state.tenantId === '') {
            alert("Domain required")
        }
        else if (this.state.username === '') {
            alert("Email required")
        } else if (this.state.password === '') {
            alert("Password required")
        }

        else {
            if (this.state.rememberIsChecked) {
                let user_credentials = {
                    username: this.state.username,//cicodsandbox@yopmail.com
                    password: this.state.password,//Sandbox@123
                    tenantId: this.state.tenantId//sandbox
                }
                AsyncStorage.setItem('user_credentials', JSON.stringify(user_credentials));
                AsyncStorage.setItem('remember_credentials', 'true');
            }
            else {
                this.setState({
                    username: '',
                    password: '',
                    tenantId: ''
                })
                AsyncStorage.setItem('remember_credentials', 'false');
                AsyncStorage.removeItem('user_credentials');
            }
            this.setState({ Spinner: true })
            let postData = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': Constants.autherizationKey,
                    'Authorization-Secure': Constants.autherizationKey
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
                    console.log("response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                    if (responseJson.status === "SUCCESS") {
                        let user_token = 'Bearer ' + responseJson.token;
                        this.props.setUser({
                            firstname: responseJson.user.firstname,
                            lastname: responseJson.user.lastname,
                            email: responseJson.user.email,
                            phone: responseJson.user.phone,
                            access_token: user_token
                        });
                        this.setState({ Spinner: false })

                        this.setCurrency(user_token);
                        console.log('get user !!!!!!!!!!!!!!!!', this.props.user)
                        this.props.navigation.navigate('Home')
                    } else {
                        this.setState({ Spinner: false })
                        // this.setState({ Spinner: false })
                        let message = responseJson.status
                        if (message == '') {
                            message = 'Server responded with error contact admin'
                        }
                        Alert.alert('Error', message)
                    }
                }
                )
                .catch((error) => {
                    this.setState({ Spinner: false })
                    console.log("Api call error", error);
                    // Alert.alert(error.message);
                });
        }
    }

    setCurrency(user_token){
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': user_token,
            },
        };
        fetch(Constants.currency, postData)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log("response Json currency!!!!!!!!!!!", responseJson)
                    console.log("responseJson.data.symbol Json currency!!!!!!!!!!!", responseJson.data.symbol)
                    if ((responseJson.status).toUpperCase() === "SUCCESS") {
                        this.props.setCurrency({
                            currency: responseJson.data.symbol,
                        });
                       
                    } else {
                        this.setState({ Spinner: false })
                        // this.setState({ Spinner: false })
                        let message = responseJson.status
                        if (message == '') {
                            message = 'Server responded with error contact admin'
                        }
                        Alert.alert('Error', message)
                    }
                }
                )
                .catch((error) => {
                    this.setState({ Spinner: false })
                    console.log("Currency Api call error", error);
                    // Alert.alert(error.message);
                });
    }
    render() {
        return (
            <ScrollView>
                <View style={[{ position: 'relative', }, styles.mainView]}>
                    <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                    <View
                    >
                        <View
                            style={{ backgroundColor: '#fff4f4', paddingTop: 60, paddingBottom: 50, width: width * 1.3, alignItems: 'center', borderBottomLeftRadius: 360, borderBottomRightRadius: 360 }}
                        >
                            <Image
                                source={require('../images/loginlogo.png')}
                                style={{ height: width / 3, width: width / 3.6 }}
                            />
                        </View>
                    </View>
                    <View style={{ paddingTop: height / 25 }}>
                        <Text style={{ color: '#2F2E7C', fontSize: 22, fontWeight: '700', fontFamily: 'Open Sans' }}>Login</Text>
                    </View>
                    <View style={{ height: 50, flexDirection: 'row', width: width - 50, alignSelf: 'center', }}>
                        <View style={{ height: 50, borderWidth: 0.25, borderTopLeftRadius: 5, borderRightWidth: 0, borderBottomLeftRadius: 5, flex: 4, justifyContent: 'center', paddingLeft: 10 }}>
                            <TextInput
                                onChangeText={text => this.setState({ tenantId: text })}
                                label="Domain Name"
                                style={{ height: 50, backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderColor: '#CFCFCF' }}
                                alignSelf={'center'}
                                color={'#000'}

                                onFocus={() => { this.setState({ domain_text_color: 'red' }) }}
                                onBlur={() => { this.setState({ domain_text_color: 'black' }) }}
                                width={width - 50}
                                height={height / 12}
                                alignSelf={'flex-start'}
                                value={this.state.tenantId}
                            />
                        </View>
                        <View style={{ backgroundColor: '#E6E6E6', height: 50, borderWidth: 0.25, borderColor: '#E6E6E6', flex: 1.5, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                            <Text>.cicod.com</Text>
                        </View>
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            onChangeText={text => this.setState({ username: text })}
                            label="Email"
                            style={{ backgroundColor: 'transparent', borderWidth: 1, borderBottomWidth: 0, borderColor: '#CFCFCF' }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            value={this.state.username}
                        />
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            secureTextEntry={this.state.hide_password}
                            onChangeText={text => this.setState({ password: text })}
                            placeholder="Password"
                            width={width - 50}
                            style={{ backgroundColor: 'transparent', borderWidth: 1, borderBottomWidth: 0, borderColor: '#CFCFCF' }}

                            alignSelf={'center'}
                            color={'#000'}
                            value={this.state.password}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 10 }}
                            onPress={() => { this.setState({ hide_password: !this.state.hide_password }) }}
                        >
                            <Icon
                                name={this.state.hide_password ? 'eye-slash' : 'eye'}
                                size={20}
                                color={'#929497'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: width - 50, marginTop: 20, marginBottom: 10 }}>
                        <CheckBox
                            style={{ width: width / 2, alignSelf: 'center', alignItems: 'center' }}
                            onClick={() => {
                                this.setState({
                                    rememberIsChecked: !this.state.rememberIsChecked
                                })
                            }}
                            isChecked={this.state.rememberIsChecked}
                            rightText={"Remember details"}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.login()}
                        style={[{}, styles.btnContinuueView]}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'Open Sans' }}>Continue</Text>
                    </TouchableOpacity>
                        <TouchableOpacity
                           style={{ marginTop: 20,zIndex:0.9999,marginBottom:height/10}}
                            onPress={() => this.props.navigation.navigate('ResetPassword')}
                            >
                            <Text style={{ color: '#487AE0', fontSize: 14, textAlign: 'left', fontFamily: 'Open Sans' }}>Reset Password</Text>
                        </TouchableOpacity>
                        {/* <View>
                           <Image
                           source={require('../images/home/1.png')}
                                style={{ height: width / 3, width: width / 3.6 }}
                           />
                        </View> */}
                    
                </View>

            </ScrollView>
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
        setCurrency: (value) => dispatch({ type: SET_CURRENCY, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        emptyOrder: () => dispatch({ type: CLEAR_ORDER }),
        resetDeliveryAddress: () => dispatch({ type: RESET}),
        resetCustomer: () => dispatch({ type: RESET }),
        resetSupplier: () => dispatch({ type: RESET}),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)
