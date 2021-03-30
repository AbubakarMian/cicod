import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/LoginCss';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/dist/FontAwesome';



var { width, height } = Dimensions.get('window');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }

    render() {
        return (
            <ScrollView>
                
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
                <View style={[{flexDirection:'row',alignItems:'center'}, styles.textInputView]}>
                    <TextInput
                    style={{flex:3}}
                        placeholder="Domain Name"
                    />
                    <Text style={{flex:1,backgroundColor:'#CFCFCF',color:'#4E4D4D',paddingVertical:15,paddingHorizontal:5}}>.cicod.com</Text>
                </View>
                <View style={[{}, styles.textInputView]}>
                    <TextInput
                        placeholder="Email"
                    />
                </View>
                <View style={[{flexDirection:'row',alignItems:'center',position:'relative'}, styles.textInputView]}>
                    <TextInput
                        placeholder="Password"
                    />
                   <View
                   style={{position:'absolute',right:10}}
                   >
                   <Icon 
                    name="eye-slash"
                    size={20}
                    color={'#929497'}
                  
                    />
                   </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: width - 50,  }}>
                    
                    
                    <CheckBox
                        style={{   width: width/2 ,alignSelf:'center',alignItems:'center' }}
                        onClick={() => {
                            this.setState({
                                isChecked: !this.state.isChecked
                            })
                        }}
                        isChecked={this.state.isChecked}
                        rightText={"Remember details"}

                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}
                    style={[{}, styles.btnContinuueView]}>
                    <Text style={{ color: '#FFFFFF' }}>Continuue</Text>
                </TouchableOpacity>
                <View style={{ flex: 1,justifyContent:'flex-start',alignItems:'flex-start' }}>
                        <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('ResetPassword')}
                        style={{ marginTop: 10, }}>
                            <Text style={{ color: '#487AE0',fontSize:12,textAlign:'left',fontWeight:'bold' }}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                <View 
                style={{marginBottom:10}}
                >
                    <Image
                        source={require('../images/splashbottomlogo.png')}
                    />
                </View>
            </View>
            
            </ScrollView>
        );
    }
}
