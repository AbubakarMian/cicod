import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/UserCss';
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
            spinner: false
        }
    }
    ressetPassword() {
        console.log("Resset Resset Resset ")


    }


    componentDidMount() {
        // marchantDetail
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
                if (responseJson.success === true) {
                    // this.setState({
                    //     data: responseJson.data
                    // })

                } else {
                    let message = responseJson.message;
                    Alert.alert('Error', message)
                }
            })
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
                            <Text style={[{}, styles.userInfo]}>Johnson</Text>
                            <Text style={[{}, styles.userInfoLable]}>Last Name</Text>
                            <Text style={[{}, styles.userInfo]}>Gilbert</Text>
                            <Text style={[{}, styles.userInfoLable]}>Email</Text>
                            <Text style={[{}, styles.userInfo]}>Johnny.Gilbert@gmail.com</Text>
                            <Text style={[{}, styles.userInfoLable]}>Phone Number</Text>
                            <Text style={[{}, styles.userInfo]}>08000111111</Text>
                            <Text style={[{}, styles.userInfoLable]}>Role</Text>
                            <Text style={[{}, styles.userInfo]}>SALES MANAGER</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ChangePassword')}
                                style={[{}, styles.changePasswordView]}>
                                <Icon name="lock" color={'#B1272C'} size={30} />
                                <Text style={[{}, styles.changePasswordText]}>Change Password</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[{}, styles.logoutView]}>
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
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(User)
