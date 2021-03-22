import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/LoginCss';




var { width, height } = Dimensions.get('window');

export default class MyVues extends React.Component {

    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <View>
                    <Image
                        source={require('../images/loginlogo.png')}
                        style={{ height: height / 5, width: width / 1.4 }}
                    />
                </View>
                <View style={{ paddingTop: height / 25 }}>
                    <Text style={{ color: '#2F2E7C', fontSize: 20 }}>Login</Text>
                </View>
                <View style={[{}, styles.textInputView]}>
                    <TextInput
                        placeholder="Domain Name"
                    />
                </View>
                <View style={[{}, styles.textInputView]}>
                    <TextInput
                        placeholder="Email"
                    />
                </View>
                <View style={[{}, styles.textInputView]}>
                    <TextInput
                        placeholder="Password"
                    />
                </View>
               
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Home')}
                style={[{}, styles.btnContinuueView]}>
                    <Text style={{ color: '#FFFFFF' }}>Continuue</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
