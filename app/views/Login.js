import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/LoginCss';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';


var { width, height } = Dimensions.get('window');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            tenantId: 'sandbox',//sandbox
            username: 'cicodsandbox@yopmail.com',//cicodsandbox@yopmail.com
            password: 'Sandbox@123',//Sandbox@123
            isChecked: false
        }
    }
    login() {
        console.log("Login Login Login ")

        // ()=>this.props.navigation.navigate('DrawerNavigation')
        if (this.state.tenantId === '') {
            alert("tenantId required")
        }
        else if (this.state.username === '') {
            alert("email required")
        } else if (this.state.password === '') {
            alert("password required")
        }

        else {
            // this.props.setUser({

            //     firstname: "sandbox last", //responseJson.user.firstname,
            //     lastname: "sandbox last", //responseJson.user.lastname,
            //     email: "cicodsandbox@yopmail.com",//responsejson.user.email,
            //     phone: "123314324",//responseJson.user.phone,
            //     access_token: "Bearer kD45wFxCZQcMzcjz6hqA",  //+ responseJson.token
            // });
            // this.setState({ Spinner: false })
            // this.props.navigation.navigate('Home')
            // return;
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
                    console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                    if (responseJson.status === "SUCCESS") {
                        this.props.setUser({
                            firstname: responseJson.user.firstname,
                            lastname: responseJson.user.lastname,
                            email: responseJson.user.email,
                            phone: responseJson.user.phone,
                            access_token: 'Bearer ' + responseJson.token
                        });
                        this.setState({ Spinner: false })


                        console.log('get user !!!!!!!!!!!!!!!!', this.props.user)
                        this.props.navigation.navigate('Home')
                    } else {
                        this.setState({ Spinner: false })
                        // this.setState({ Spinner: false })
                        let message = responseJson.messa
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
        return (
            <ScrollView>

                <View style={[{}, styles.mainView]}>
                    <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                    <View>
                        <Image
                            source={require('../images/loginlogo.png')}
                            style={{ height: width / 3, width: width / 1.4 }}
                        />
                    </View>
                    <View style={{ paddingTop: height / 25 }}>
                        <Text style={{ color: '#2F2E7C', fontSize: 20 }}>Login</Text>
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            style={{ flex: 3 }}
                            onChangeText={text => this.setState({ tenantId: text })}
                            placeholder="Domain Name"
                        />
                        <Text style={{ flex: 1, backgroundColor: '#CFCFCF', color: '#4E4D4D', paddingVertical: 15, paddingHorizontal: 5 }}>.cicod.com</Text>
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            onChangeText={text => this.setState({ username: text })}
                            placeholder="Email"
                        />
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            onChangeText={text => this.setState({ password: text })}
                            placeholder="Password"
                        />
                        <View
                            style={{ position: 'absolute', right: 10 }}
                        >
                            <Icon
                                name="eye-slash"
                                size={20}
                                color={'#929497'}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: width - 50, }}>


                        <CheckBox
                            style={{ width: width / 2, alignSelf: 'center', alignItems: 'center' }}
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                })
                            }}
                            isChecked={this.state.isChecked}
                            rightText={"Remember details"}

                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.login()}
                        style={[{}, styles.btnContinuueView]}>
                        <Text style={{ color: '#FFFFFF' }}>Continuue</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ResetPassword')}
                            style={{ marginTop: 10, }}>
                            <Text style={{ color: '#487AE0', fontSize: 12, textAlign: 'left', fontWeight: 'bold' }}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ marginBottom: 10 }}
                    >
                        <Image
                            source={require('../images/splashbottomlogo.png')}
                        />
                    </View>
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
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)
