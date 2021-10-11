import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Alert  } from 'react-native';
import { Text, TextInput} from 'react-native-paper';
import styles from '../css/ResetpasswordCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from '../views/Constant';


var { width, height } = Dimensions.get('window');

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            email:''
        }
    }
    ressetPassword() {
        console.log("Resset Resset Resset ")
        if(this.state.email == ''){
            Alert.alert('Message','Email is required')
        }
        let valid_email=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!this.state.email.match(valid_email)){
            Alert.alert('Error','Invalid Email')
            return

        }
        let postData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Constants.autherizationKey
            },
            body: JSON.stringify({
                token: "RZyvWDiVdo",
                newPassword: "Crown123!\"#$%&}~",
                confirmPassword: "Crown123!\"#$%&}~"
            })
        };
        let myurl ='https://api.cicodsaasstaging.com/sso/auth/password_reset'+'/'+this.state.email;// Constants.reset_password
        console.log('myurlmyurlmyurlmyurlmyurlmyurl',myurl);
        fetch(myurl, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ Spinner: false })
                console.log("response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "SUCCESS") {
                    this.props.setUser({
                        firstname: responseJson.user.firstname,
                        lastname: responseJson.user.lastname,
                        email: responseJson.user.email,
                        phone: responseJson.user.phone,
                        access_token: 'Bearer ' + responseJson.token
                    });
                    


                    console.log('get user !!!!!!!!!!!!!!!!', this.props.user)
                    this.props.navigation.navigate('Home')
                } else {
                    this.setState({ Spinner: false })
                    // this.setState({ Spinner: false })
                    let message = responseJson.error
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
                        // onPress={() => this.props.navigation.navigate('Login')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>

                    <Text style={[{fontSize:15,fontWeight:'700',fontFamily:'Open Sans',color:'#2F2E7C',marginLeft:10}]}>Reset Password</Text>
                </View>
                <View style={[{}, styles.textInputView]}>
                    <TextInput
                        label="Email Address"
                        style={{ backgroundColor: 'transparent', }}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                        color="#929497"
                        keyboardType={'email-address'}
                        onChangeText={(text)=>this.setState({email:text})}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.ressetPassword()}
                    style={[{}, styles.btnContinuueView]}>
                    <Text style={{ color: '#FFFFFF' }}>Reset Password</Text>
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
