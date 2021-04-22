import React from 'react';
import { View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
// import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/LoginCss';
import fontStyles from '../css/FontCss'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
import { Text, TextInput, Alert } from 'react-native-paper';


var { width, height } = Dimensions.get('window');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spinner: false,
            tenantId: 'sandbox',//sandbox
            username: 'cicodsandbox@yopmail.com',//cicodsandbox@yopmail.com
            password: 'Sandbox@123',//Sandbox@123
            isChecked: false,
            domain_text_color:'black'
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
            //     access_token: "Bearer yfuK5hA9TgZA0BOY06xs ",  //+ responseJson.token
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
                <View style={[{ position: 'relative' }, styles.mainView]}>
                    <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                    <View
                    >
                        <View
                            style={{ backgroundColor: '#FFE5E5', paddingTop: 60, paddingBottom: 50, width: width, alignItems: 'center', borderBottomLeftRadius: 360, borderBottomRightRadius: 360 }}
                        >
                            <Image
                                source={require('../images/loginlogo.png')}
                                style={{ height: width / 3, width: width / 1.4 }}
                            />
                        </View>
                    </View>
                    <View style={{ paddingTop: height / 25 }}>
                        <Text style={{ color: '#2F2E7C', fontSize: 20 }}>Login</Text>
                    </View>
                    <View style={[{position:'relative'}, styles.comtextInputView]}>
                        <TextInput
                            
                            onChangeText={text => this.setState({ tenantId: text })}
                            label="Domain Name"
                            placeholder="Domain Name"
                            style={{backgroundColor:'transparent',borderWidth:1,borderBottomWidth:0,borderColor:'#CFCFCF'}}
                            alignSelf={'center'}
                            color={'#000'}
                            onFocus={()=>{this.setState({domain_text_color:'red'})}}
                            onBlur={()=>{this.setState({domain_text_color:'black'})}}
                            width={width-50}
                            height={height/12}
                            alignSelf={'flex-start'}
                        />
                       {/* <Text style={{paddingVertical:50,borderBottomWidth:1,borderBottomColor:this.state.domain_text_color, height:height/12,textAlignVertical:'center', backgroundColor: '#CFCFCF', color: '#4E4D4D',position:'absolute',right:0, paddingVertical: 15, paddingHorizontal: 5 }}>.cicod.com</Text> */}
                       <Text style={{  height:height/12-3,textAlignVertical:'center', backgroundColor: '#CFCFCF', color: '#4E4D4D',position:'absolute',right:0, paddingHorizontal: 5 }}>.cicod.com</Text>
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            onChangeText={text => this.setState({ username: text })}
                            label="Email"
                            style={{backgroundColor:'transparent',borderWidth:1,borderBottomWidth:0,borderColor:'#CFCFCF'}}
                            width={width-50}
                            alignSelf={'center'}
                            color={'#000'}
                            
                        />
                    </View>
                    <View style={[{}, styles.textInputView]}>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            placeholder="Password"
                            width={width-50}
                            style={{backgroundColor:'transparent',borderWidth:1,borderBottomWidth:0,borderColor:'#CFCFCF'}}

                            alignSelf={'center'}
                            color={'#000'}

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
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: width - 50, marginTop: 20, marginBottom: 10 }}>
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
