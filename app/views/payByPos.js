import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/PayByPosCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class PayByCash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false
        }
    }
    render() {
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'Pickup', value: 1 },
        ];
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },
            { label: 'Part Payment', value: 3 },
        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation}/>
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('MakePayment')}
                    
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>MAKE PAYMENT</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>
                        <View style={[{}, styles.contentContainer]}>
                            <Image style={{height:60,width:40}} source={require('../images/pos-terminal.png')} />
                            <Text style={[{}, styles.collectText]}>Collect the sum of</Text>
                            <Text style={[{}, styles.payText]}>N50,000.00</Text>
                            <View style={{flexDirection:'row'}}>
                            <Text style={[{}, styles.cashText]}>for CICOD ORDER ID </Text>
                            <Text style={[{fontWeight:'bold'}, styles.cashText]}> 14120252913</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <TouchableOpacity
                              style={[{backgroundColor:'#E6E6E6'},styles.touchView]}
                              >
                                  <Text style={{color:'#4E4D4D'}}>Cancel</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                              style={[{ backgroundColor:'#B1272C',},styles.touchView]}
                              >
                                  <Text style={{color:'#fff'}}>Confirm</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                       
                    </ScrollView>
                </View>
            </View>
        )
    }
}
