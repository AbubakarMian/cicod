import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/ResetpasswordCss';
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';


var { width, height } = Dimensions.get('window');

export default class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isChecked:false
        }
    }

    render() {
        return (
            <View style={[{}, styles.mainView]}>
              <Header/>
              <View style={[{},styles.headingRow]}>
              <Icon name="arrow-left" size={25} color="#929497" />
                <Text style={[{},styles.resetText]}>Reset Password</Text>
              </View>
              <View style={[{},styles.textInputView]}>
                <TextInput 
                placeholder="Email Address"
                color="#929497"
                />
              </View>
              <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}
                    style={[{}, styles.btnContinuueView]}>
                    <Text style={{ color: '#FFFFFF' }}>Resent Password</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
