import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/ResetpasswordCss';
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';


var { width, height } = Dimensions.get('window');

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }
    ressetPassword() {
        console.log("Resset Resset Resset ")

        // ()=>this.props.navigation.navigate('DrawerNavigation')
        // if (this.state.tenantId === '') {
        //     alert("tenantId required")
        // }
        // else if (this.state.username === '') {
        //     alert("email required")
        // }else if (this.state.password === '') {
        //     alert("password required")
        // }

        // else {
        //     this.setState({ Spinner: true })
        //     var formData = new FormData();
        //     // formData.append('email', this.state.email);
        //     // formData.append('password', this.state.password);
        //     formData.append('username', this.state.username);
        //     formData.append('password', this.state.password);
        //     formData.append('tenantId', this.state.tenantId);

        //     let postData = {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //             'Authorization': Constants.autherizationKey,
        //             'Authorization-Secure': Constants.autherizationKey,
        //             // this.props.user.access_token,
        //         },
        //         body: JSON.stringify({
        //             username: this.state.username,//cicodsandbox@yopmail.com
        //             password: this.state.password,//Sandbox@123
        //             tenantId: this.state.tenantId//sandbox
        //         })
        //     };
        //     fetch(Constants.login, postData)
        //         .then(response => response.json())
        //         .then(async responseJson => {
        //             // console.log("!!!!!!!!!!!",responseJson)
        //             if (responseJson.status === "SUCCESS") {
        //                 console.log("!!!!!!!!!!!",responseJson)
        //                 // console.log("!!!!!!!!!!!",responseJson.user.token)
        //                 this.props.setUser({
        //                     firstname: responseJson.user.firstname,
        //                     lastname: responseJson.user.lastname,
        //                     email: responseJson.user.email,
        //                     phone: responseJson.user.phone,
        //                     access_token: responseJson.user.token
        //                 });
        //                 this.setState({ Spinner: false })
        //                 // console.log("!!!!!!!!!!!",this.props.user)
        //             } else {
        //                 this.setState({ Spinner: false })
        //                 // this.setState({ Spinner: false })
        //                 let message = JSON.stringify(responseJson.status)
        //                 Alert.alert('Error', message)
        //                 this.refs.PopUp.setModal(true, responseJson.status);
        //             }
        //         }
        //         )
        //         .catch((error) => {
        //             console.log("Api call error", error);
        //             // Alert.alert(error.message);
        //         });
        // }
    }
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <View style={{ flexDirection: 'row', width: width, position: 'relative', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 10 }}>
                    <View

                        style={{ flex: 1 }}>

                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: 30, width: 120 }}
                            source={require('../images/headerLogo.png')}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', }}>

                    </View>
                </View>
                <View style={[{}, styles.headingRow]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>

                    <Text style={[{}, styles.resetText]}>Reset Password</Text>
                </View>
                <View style={[{}, styles.textInputView]}>
                    <TextInput
                        placeholder="Email Address"
                        color="#929497"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.ressetPassword()}
                    style={[{}, styles.btnContinuueView]}>
                    <Text style={{ color: '#FFFFFF' }}>Resent Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                    style={{ marginTop: 20 }}
                >
                    <Text style={{ color: '#2F2E7C', fontWeight: '600', fontSize: 20 }}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
