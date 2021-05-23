import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Touchable, ScrollView, } from 'react-native';
import { Text, TextInput, Alert } from 'react-native-paper';
import styles from '../css/MoreCss';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';


var { width, height } = Dimensions.get('window');

class PaymentWeb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }

    componentDidMount(){
    }

    render() {
        return (

            <WebView source={{ uri: this.props.route.params.payment_link }} />
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWeb)
