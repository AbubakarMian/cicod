import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/ChangePasswordCss';
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';


var { width, height } = Dimensions.get('window');

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }
    ressetPassword() {
        console.log("Resset Resset Resset ")


    }
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.headingRow]}>
                    <Icon name="arrow-left" size={20} color={'#929497'} />
                    <Text style={[{}, styles.moreText]}>CHANGE PASSWORD</Text>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{},styles.contentContainer]}>
                           <View style={[{},styles.inputView]}>
                               <TextInput 
                               placeholder="Current password"
                               />
                           </View>
                           <View style={[{},styles.inputView]}>
                               <TextInput 
                               placeholder="New password"
                               />
                                <TouchableOpacity style={[{},styles.eyeIconView]}>
                                 <Icon name="eye-slash" size={20} color={'#929497'}/>
                               </TouchableOpacity>
                           </View>
                           <View style={[{},styles.inputView]}>
                               <TextInput 
                               placeholder="Confirm New password"
                               />
                               <TouchableOpacity style={[{},styles.eyeIconView]}>
                                 <Icon name="eye-slash" size={20} color={'#929497'}/>
                               </TouchableOpacity>
                               
                           </View>
                        </View>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('User')}
                        style={[{},styles.changePasswordView]}
                        >
                            <Text style={[{},styles.changePasswordText]}>Change Password</Text>
                        </TouchableOpacity>
                    </View>    
                </ScrollView>
            </View>
        );
    }
}
