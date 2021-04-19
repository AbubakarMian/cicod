import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/ChangePasswordCss';
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
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
            current_password: 'Sandbox@123',
            new_password: '123456',
            confirm_password: '1234567',
            spinner: false,
            is_secure:false,
            
        }
    }

    changePasswordFun() {
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
        fetch(Constants.changePassword, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(" response Json responseJson responseJson!!!!!!!!!!!", responseJson)
                if (responseJson.status === "SUCCESS") {

                    this.setState({ spinner: false })

                    this.props.navigation.navigate('Home')
                } else {
                    this.setState({ spinner: false })
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
                    <Icon name="arrow-left" size={20} color={'#929497'} />
                    <Text style={[{}, styles.moreText]}>CHANGE PASSWORD</Text>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.contentContainer]}>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                    placeholder="Current password"
                                    onChangeText={text => this.setState({ current_password: text })}
                                />
                            </View>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                secureTextEntry={this.state.is_secure}
                                    placeholder="New password"
                                    onChangeText={text => this.setState({ new_password: text })}
                                />
                                <TouchableOpacity 
                                onPress={()=>this.setState({is_secure:!this.state.is_secure,})}
                                style={[{}, styles.eyeIconView]}>
                                    <Icon name="eye-slash" size={20} color={'#929497'} />
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.inputView]}>
                                <TextInput
                                   secureTextEntry={this.state.is_secure}
                                    onChangeText={text => this.setState({ confirm_password: text })}
                                    placeholder="Confirm New password"
                                />
                                <TouchableOpacity 
                                onPress={()=>this.setState({is_secure:!this.state.is_secure,})}
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
