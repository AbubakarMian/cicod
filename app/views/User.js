import React from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView, Alert,Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
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
        console.log(this.props.user.access_token)
        console.log('url',Constants.marchantDetail)
        fetch(Constants.marchantDetail, postData)
            .then(response => response.json())
            .then(async responseJson => {
                // console.log('!!!!!!!!!responseJson @@@@@@@@###########', responseJson.data)
                // console.log('Constants.marchantDetail @@@@@@@@###########', Constants.marchantDetail)
                // console.log('this.props.user.access_token@@@@@@@@###########', this.props.user.access_token)
                this.setState({
                    spinner: false,
                });
                if (responseJson.status === 'SUCCESS') {
                    let merchant_contact = responseJson.merchant
                    console.log('~~~~~~~~~~',responseJson.merchant.contact)
                    this.setState({
                        email: merchant_contact.email,
                        first_name: merchant_contact.companyName, //contactPerson
                        phone: merchant_contact.phone,
                        role: merchant_contact.customerCategory,
                    })

                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    logout_user() {

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
                        // onPress={()=>this.props.navigation.navigate('More')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={20} color={'#929497'} />
                    </TouchableOpacity>
                    <Text style={[{}, styles.moreText]}>USER</Text>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.contentContainer]}>
                            <View style={{ flexDirection: 'row', width: width }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[{}, styles.userInfoLable]}>First Name</Text>
                                    <Text style={[{ color: '#4E4D4D', marginBottom: 10 }, fontStyles.normal15]}>{this.state.first_name}</Text>
                                    <Text style={[{}, styles.userInfoLable]}>Last Name</Text>
                                    <Text style={[{ color: '#4E4D4D', marginBottom: 10 }, fontStyles.normal15]}>{this.state.last_name ?? this.state.first_name}</Text>
                                </View>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Image
                                        style={{ height: 50, width: 50 }}
                                        source={require('../images/profilepic.png')}
                                    />
                                </View>
                            </View>
                            <Text style={[{}, styles.userInfoLable]}>Email</Text>
                            <Text style={[{ color: '#4E4D4D', marginBottom: 10 }, fontStyles.normal15]}>{this.state.email}</Text>
                            <Text style={[{}, styles.userInfoLable]}>Phone Number</Text>
                            <Text style={[{ color: '#4E4D4D', marginBottom: 10 }, fontStyles.normal15]}>{this.state.phone}</Text>
                            <Text style={[{}, styles.userInfoLable]}>Role</Text>
                            <Text style={[{ color: '#4E4D4D', marginBottom: 10 }, fontStyles.normal15]}>{this.state.role}</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ChangePassword')}
                                style={[{}, styles.changePasswordView]}>
                                <Icon name="lock" color={'#B1272C'} size={30} />
                                <Text style={[{}, styles.changePasswordText]}>Change Password</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.logout_user()}
                            style={[{}, styles.logoutView]}>
                            <Icon name="sign-out" color={'#929497'} size={30} />
                            <Text style={[{}, styles.logoutText]}>Logout</Text>
                        </TouchableOpacity>
                        <Text
                            style={[{ alignSelf: 'center' }, styles.bottomDescText]}
                            numberOfLines={2}
                        >CICOD Customer Order Management Mobile App Is a product of Crown Interactive</Text>
                        <Text style={[{ alignSelf: 'center' }, styles.bottomVersioncText]}>Version 1.0</Text>
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
