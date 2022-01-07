/* eslint-disable prettier/prettier */
import React from 'react';
import { View,  TouchableOpacity, Dimensions,  ScrollView, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import styles from '../css/ChangePasswordCss';

import Header from '../views/Header'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from '../views/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';


var { width, height } = Dimensions.get('window');
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            current_password: '',
            new_password: '',
            confirm_password: '',
            spinner: false,
            is_secure: false,

        }
    }

    changePasswordFun() {
        if(this.state.current_password=='' || this.state.current_password=='' || this.state.new_password=='' || this.state.new_password==null || this.state.confirm_password=='' ||this.state.confirm_password==null){
           Alert.alert('All fields are required!');
           return;
        }
        console.log('Constants.changePassword', Constants.changePassword)

        this.setState({ spinner: true })
        let postData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token,
            },
            body: JSON.stringify({
                newPassword: this.state.new_password,//cicodsandbox@yopmail.com
                oldPassword: this.state.current_password,//Sandbox@123
                confirmPassword: this.state.confirm_password//sandbox
            })
        };
        console.log('************',postData);
        fetch(Constants.changePassword, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false })
                console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "SUCCESS") {

                    
                    Alert.alert("Your password has been changed successfully!");
                    this.props.navigation.navigate('Home')
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.status
                    Alert.alert('Error', message)
                }
            }
            )
            .catch((error) => {
                this.setState({ spinner: false })
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });


    }
    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
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
                <View style={[{}, styles.headingRow]}>
                    <TouchableOpacity
                        // onPress={()=>this.props.navigation.navigate('User')}
                        onPress={() => this.props.navigation.goBack()}

                    >
                        <Icon name="arrow-left" size={20} color={'#929497'} />
                    </TouchableOpacity>
                    <Text style={[{}, styles.moreText]}>CHANGE PASSWORD</Text>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.contentContainer]}>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                    label="Current password"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                    onChangeText={text => this.setState({ current_password: text })}
                                />
                            </View>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                    secureTextEntry={this.state.is_secure}
                                    label="New password"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                    onChangeText={text => this.setState({ new_password: text })}
                                />
                                <TouchableOpacity
                                    onPress={() => this.setState({ is_secure: !this.state.is_secure, })}
                                    style={[{}, styles.eyeIconView]}>
                                    <Icon name="eye-slash" size={20} color={'#929497'} />
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                    secureTextEntry={this.state.is_secure}
                                    onChangeText={text => this.setState({ confirm_password: text })}
                                    label="Confirm new password"
                                    style={{ backgroundColor: 'transparent', }}
                                    width={width - 50}
                                    alignSelf={'center'}
                                    color={'#000'}
                                />
                                <TouchableOpacity
                                    onPress={() => this.setState({ is_secure: !this.state.is_secure, })}
                                    style={[{}, styles.eyeIconView]}>
                                    <Icon name="eye-slash" size={20} color={'#929497'} />
                                </TouchableOpacity>

                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.changePasswordFun()}
                            style={[{}, styles.changePasswordView]}
                        >
                            <Text style={[{}, styles.changePasswordText]}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
