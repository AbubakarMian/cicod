import React from 'react';
import { View,  TouchableOpacity, Dimensions,  ScrollView,  } from 'react-native';
import {   Text, TextInput, Alert} from 'react-native-paper';
import styles from '../css/UserCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from './Constant';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { SET_USER, LOGOUT_USER, ADD_TO_PRODUCT, REMOVE_FROM_CART } from '../redux/constants/index';


var { width, height } = Dimensions.get('window');

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            spinner: false,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            role: '',
           
        }
    }
    ressetPassword() {
        console.log("Resset Resset Resset ")


    }


    componentDidMount() {
        this.getUserDetail();
    }

    getUserDetail() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.marchantDetail, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson @@@@@@@@###########', responseJson)
                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'SUCCESS') {
                    let merchant_contact = responseJson.merchant
                    this.setState({
                        email: merchant_contact.email,
                        first_name: merchant_contact.contactPerson,
                        phone: merchant_contact.phone,
                        role: merchant_contact.customerCategory,
                    })

                } else {
                    let message = responseJson.message;
                    Alert.alert('Error', message)
                }
            })
    }

    logout_user(){

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
                    <Icon name="arrow-left" size={20} color={'#929497'} />
                    <Text style={[{}, styles.moreText]}>USER</Text>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.contentContainer]}>
                            <Text style={[{}, styles.userInfoLable]}>First Name</Text>
                            <Text style={[{}, styles.userInfo]}>{this.state.first_name}</Text>
                            <Text style={[{}, styles.userInfoLable]}>Last Name</Text>
                            <Text style={[{}, styles.userInfo]}>{this.state.last_name ?? this.state.first_name}</Text>
                            <Text style={[{}, styles.userInfoLable]}>Email</Text>
                            <Text style={[{}, styles.userInfo]}>{this.state.email}</Text>
                            <Text style={[{}, styles.userInfoLable]}>Phone Number</Text>
                            <Text style={[{}, styles.userInfo]}>{this.state.phone}</Text>
                            <Text style={[{}, styles.userInfoLable]}>Role</Text>
                            <Text style={[{}, styles.userInfo]}>{this.state.role}</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ChangePassword')}
                                style={[{}, styles.changePasswordView]}>
                                <Icon name="lock" color={'#B1272C'} size={30} />
                                <Text style={[{}, styles.changePasswordText]}>Change Password</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                        onPress={()=> this.logout_user()}
                        style={[{}, styles.logoutView]}>
                            <Icon name="sign-out" color={'#929497'} size={30} />
                            <Text style={[{}, styles.logoutText]}>Logout</Text>
                        </TouchableOpacity>
                        <Text
                            style={[{}, styles.bottomDescText]}
                            numberOfLines={2}
                        >CICOD Customer Order Management Mobile App Is a product of Crown Interactive</Text>
                        <Text style={[{}, styles.bottomVersioncText]}>Version 1.0</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(User)
